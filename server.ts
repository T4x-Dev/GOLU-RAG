import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sharedNotesStore = new Map<string, any>();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Helper to initialize GoogleGenAI safely
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. API calls will use fallback processing.');
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Endpoint: Extract text & metadata from uploaded file
  app.post('/api/extract-file', async (req, res) => {
    try {
      const { fileName, fileType, fileData, role } = req.body;
      const ai = getAI();

      if (!ai) {
        // Return simulated high quality extraction
        return res.json({
          success: true,
          text: `[Extracted content for ${fileName}]\nRole: ${role}\nProcessed standard textual representation.`,
          summary: `Extracted academic material for ${fileName}`,
          pageCount: 3,
          keyTopics: ['Core Topics', 'Formulas', 'Definitions']
        });
      }

      // If text/markdown or plain text
      if (fileType.includes('text') || fileType.includes('json') || fileType.includes('markdown')) {
        const textContent = Buffer.from(fileData, 'base64').toString('utf-8');
        return res.json({
          success: true,
          text: textContent,
          summary: textContent.slice(0, 200) + '...',
          pageCount: Math.max(1, Math.ceil(textContent.length / 2000)),
          keyTopics: ['Exam Concepts', 'Syllabus Terms']
        });
      }

      // Use Gemini Vision/Multimodal extraction
      const prompt = `You are a document analyzer for university exam preparation.
Analyze the attached document (${fileName}, classified as ${role}).
Extract all syllabus topics, exam questions, definitions, formulas, and lecture notes.
Keep page number indicators if visible (e.g. [Page 1], [Page 2]).
Return a JSON object with:
{
  "extractedText": "clean formatted text",
  "summary": "1-2 sentence high-level summary",
  "pageCount": estimated_number_of_pages,
  "keyTopics": ["topic1", "topic2", "topic3"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                data: fileData,
                mimeType: fileType || 'application/pdf',
              },
            },
            { text: prompt },
          ],
        },
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        text: parsed.extractedText || 'Extracted document content',
        summary: parsed.summary || `Extracted ${fileName}`,
        pageCount: parsed.pageCount || 1,
        keyTopics: parsed.keyTopics || ['Key Topics']
      });
    } catch (err: any) {
      console.error('Error in /api/extract-file:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to extract text from file'
      });
    }
  });

  // Endpoint: Generate Exam Notes from combined files
  app.post('/api/generate-notes', async (req, res) => {
    try {
      const {
        files = [],
        prompt = 'Make unit 2 notes, 10-mark answers',
        depth = 'standard',
        marksFocus = 'all',
        enableThinking = false,
      } = req.body;

      const ai = getAI();

      // Aggregate context separated by role
      const syllabusFiles = files.filter((f: any) => f.role === 'syllabus');
      const modelPapers = files.filter((f: any) => f.role === 'model_paper');
      const otherMaterials = files.filter((f: any) => f.role === 'other');

      const syllabusText = syllabusFiles.map((f: any) => `[FILE: ${f.name}]\n${f.extractedText}`).join('\n\n') || 'General University Syllabus';
      const modelPaperText = modelPapers.map((f: any) => `[FILE: ${f.name}]\n${f.extractedText}`).join('\n\n') || 'Standard Exam Questions';
      const materialsText = otherMaterials.map((f: any) => `[FILE: ${f.name}]\n${f.extractedText}`).join('\n\n') || 'Lecture Handouts';

      if (!ai) {
        // Fallback response if no API key is provided
        return res.json({
          success: true,
          notes: {
            id: `notes-${Date.now()}`,
            title: 'Generated Exam Preparation Notes',
            subject: 'Computer Science',
            unit: 'Unit Notes',
            depth,
            generatedAt: new Date().toISOString(),
            executiveSummary: `Generated comprehensive exam revision notes based on prompt: "${prompt}". Focused on ${marksFocus} questions.`,
            sections: [
              {
                id: 'sec-1',
                heading: 'Core Concept Definition & Overview',
                targetMarks: '5-Mark',
                keyDefinition: 'Fundamental definition synthesized from uploaded syllabus and lecture materials.',
                bulletPoints: [
                  'Primary mechanism explained with step-by-step breakdown.',
                  'Scoring points directly answering model question patterns.',
                  'Key differences and trade-offs highlighted.'
                ],
                mnemonic: 'K-E-Y-S ("Keep Every Yield Solid")',
                diagram: {
                  type: 'mermaid',
                  code: `graph LR
    A[Input State] --> B(Processing Phase)
    B --> C{Validation}
    C -->|Pass| D[Final Output]
    C -->|Fail| E[Retry Loop]`,
                  caption: 'Figure 1: Architectural Flowchart for Exam Scoring'
                },
                examAnswerStructure: {
                  question: `Explain the fundamental concepts requested: "${prompt}". [5 Marks]`,
                  stepByStepAnswer: [
                    'Step 1: Write formal definition with clear keywords.',
                    'Step 2: Draw the flowchart/diagram clearly with labeled blocks.',
                    'Step 3: List the 4 essential rules and conclude with real-world application.'
                  ],
                  scoringTips: [
                    'Underline key terms in your answer sheet.',
                    'Draw the diagram before beginning the explanatory text.'
                  ]
                },
                sourceCitations: files.map((f: any) => ({
                  fileId: f.id,
                  fileName: f.name,
                  pageNumber: 1,
                  snippet: `Referenced content from ${f.name}`,
                  role: f.role
                }))
              }
            ],
            importantQuestions: [
              {
                id: 'q-1',
                question: `Explain the primary topics from ${prompt} with diagrams. [10 Marks]`,
                marks: 10,
                frequency: 'High',
                appearedInYears: ['2024 Model Paper', '2023 University Exam'],
                modelPaperRef: 'Model Paper Q1',
                keyPointsToHit: ['Definition', 'Diagram', 'Mathematical or Logical Proof', 'Conclusion']
              }
            ],
            comparisons: [
              {
                id: 'comp-1',
                title: 'Primary Comparison Table',
                topicA: 'Method A',
                topicB: 'Method B',
                rows: [
                  { parameter: 'Working Principle', featureA: 'Dynamic allocation', featureB: 'Static allocation' },
                  { parameter: 'Time Complexity', featureA: 'O(log n)', featureB: 'O(n)' },
                  { parameter: 'Suitability', featureA: 'High-throughput systems', featureB: 'Resource-constrained systems' }
                ]
              }
            ],
            flashcards: [
              {
                id: 'fc-1',
                category: 'Key Definitions',
                front: 'What is the most critical exam definition for this unit?',
                back: 'The formal definition synthesized directly from the prescribed textbook and syllabus guidelines.'
              }
            ],
            sourcesUsed: files.map((f: any) => ({
              fileName: f.name,
              page: 'p. 1-3',
              role: f.role,
              relevance: `Primary source for ${f.role === 'syllabus' ? 'topic scope' : f.role === 'model_paper' ? 'question patterns' : 'detailed technical proofs'}`
            }))
          }
        });
      }

      // Generation using Gemini
      const systemInstruction = `You are an elite University Professor and Chief Examiner creating the ultimate Exam Preparation and Revision Notes for students.
Your job is to read:
1. Prescribed SYLLABUS: defines exactly what topics must be covered.
2. MODEL PAPERS & PREVIOUS YEARS: defines what questions are frequently asked and their marks weightage (2-Mark, 5-Mark, 10-Mark).
3. HANDOUTS & TEXTBOOK MATERIAL: supplies the exact technical explanations, formulas, algorithms, and proofs.

RULES FOR OUTPUT:
- Structure the notes into comprehensive sections targeting specific marks (2-Mark, 5-Mark, 10-Mark).
- Include verbatim technical definitions that fetch full marks.
- Include catchy memory mnemonics for memorizing bullet lists.
- Include valid Mermaid diagrams (graph TD, graph LR, or gantt) or ASCII flowcharts. Make sure Mermaid code is strictly syntax-valid without unsupported characters.
- Include step-by-step model exam answers with examiner scoring tips ("Scoring Breakdown: 2 marks for diagram, 3 marks for derivation, 5 marks for algorithm").
- Include citations specifying which source file and page contributed to each section.
- Extract recurring Important Questions with frequency ratings (High, Repeated, Probable).
- Provide a side-by-side comparison table (e.g. Preemptive vs Non-Preemptive, or Prevention vs Avoidance).
- Provide 4-6 quick-fire flashcards for rapid revision.

Return STRICT JSON matching this schema:
{
  "title": "Subject & Unit Title",
  "subject": "Subject Name",
  "unit": "Unit Number or Name",
  "executiveSummary": "Concise high-yield summary of what is covered in this exam guide",
  "sections": [
    {
      "id": "sec-1",
      "heading": "Section Heading (e.g. 1. Process Lifecycle & PCB)",
      "targetMarks": "2-Mark" | "5-Mark" | "10-Mark" | "Concept",
      "keyDefinition": "Verbatim definition to memorize",
      "bulletPoints": ["Point 1", "Point 2", "Point 3"],
      "mnemonic": "e.g. M-H-N-C for 4 deadlock conditions",
      "formulaOrSyntax": "Mathematical formula or algorithm pseudo-syntax (optional)",
      "diagram": {
        "type": "mermaid",
        "code": "strict valid mermaid diagram code",
        "caption": "Figure caption"
      },
      "examAnswerStructure": {
        "question": "Sample exact exam question",
        "stepByStepAnswer": ["Step 1...", "Step 2...", "Step 3..."],
        "scoringTips": ["Tip 1: draw diagram first", "Tip 2: highlight formula"]
      },
      "sourceCitations": [
        {
          "fileName": "name of file",
          "pageNumber": 1,
          "snippet": "relevant line from source",
          "role": "syllabus" | "model_paper" | "other"
        }
      ]
    }
  ],
  "importantQuestions": [
    {
      "id": "q-1",
      "question": "Full exam question text",
      "marks": 10,
      "frequency": "High" | "Repeated" | "Probable",
      "appearedInYears": ["2024 Model Paper", "2023 End-Sem"],
      "modelPaperRef": "Reference to model paper section",
      "keyPointsToHit": ["Point 1", "Point 2", "Point 3"]
    }
  ],
  "comparisons": [
    {
      "id": "comp-1",
      "title": "Comparison Title",
      "topicA": "Concept A",
      "topicB": "Concept B",
      "rows": [
        { "parameter": "Criteria 1", "featureA": "Detail A", "featureB": "Detail B" }
      ]
    }
  ],
  "flashcards": [
    {
      "id": "fc-1",
      "category": "Topic Category",
      "front": "Front question/prompt",
      "back": "Back answer/definition"
    }
  ],
  "sourcesUsed": [
    {
      "fileName": "filename.pdf",
      "page": "p. 1-3",
      "role": "syllabus" | "model_paper" | "other",
      "relevance": "How this file grounded the notes"
    }
  ]
}`;

      const userPrompt = `USER REQUEST: ${prompt}
REQUESTED DEPTH: ${depth} (quick = 2-page cheat sheet; standard = full exam prep; mastery = in-depth 10-mark breakdowns)
MARKS FOCUS: ${marksFocus}

=== SYLLABUS SOURCE (Defines what must be covered) ===
${syllabusText}

=== MODEL EXAM PAPERS SOURCE (Defines how questions are asked and marks weightage) ===
${modelPaperText}

=== LECTURE / OTHER SOURCE MATERIALS (Defines technical proofs, definitions, formulas) ===
${materialsText}

Generate the complete structured Exam Prep Notes JSON adhering strictly to the university marking standards.`;

      const modelConfig: any = {
        systemInstruction,
        responseMimeType: 'application/json',
      };

      if (enableThinking) {
        modelConfig.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: modelConfig,
      });

      const responseText = response.text || '{}';
      let parsedNotes;
      try {
        parsedNotes = JSON.parse(responseText);
      } catch (e) {
        // Fallback cleanup if model wrapped in markdown
        const cleaned = responseText.replace(/```json\n?|\n?```/g, '').trim();
        parsedNotes = JSON.parse(cleaned);
      }

      parsedNotes.id = `notes-${Date.now()}`;
      parsedNotes.depth = depth;
      parsedNotes.generatedAt = new Date().toISOString();

      return res.json({
        success: true,
        notes: parsedNotes
      });
    } catch (err: any) {
      console.error('Error in /api/generate-notes:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to generate exam notes'
      });
    }
  });

  // Endpoint: Multi-turn Chat & Note Refinement
  app.post('/api/chat-refine', async (req, res) => {
    try {
      const { message, currentNotes, history = [] } = req.body;
      const ai = getAI();

      if (!ai) {
        return res.json({
          success: true,
          reply: `I have noted your request: "${message}". In this demo mode without API key, your notes remain active. You can toggle between Document and Handwritten views or download the package!`,
          updatedNotes: currentNotes
        });
      }

      const chatPrompt = `You are the ExamPrep AI tutor.
The student currently has generated exam notes for: "${currentNotes?.title || 'Exam Notes'}".
Current Executive Summary: "${currentNotes?.executiveSummary || ''}".
Number of current sections: ${currentNotes?.sections?.length || 0}.

The student says: "${message}"

Task:
1. Answer the student's question or fulfill their refinement request (e.g. "Add a comparison table for FCFS vs SJF", "Explain Banker's Algorithm with a 5-step matrix", "Make section 2 more concise", "Add a diagram").
2. If their request requires modifying or enhancing the notes (adding a section, clarifying a formula, updating diagrams), provide the updated or newly enriched note object.
3. If it's a general question or clarification, explain it clearly like a friendly university professor.

Return JSON format:
{
  "reply": "Your clear, encouraging professor-style response in 2-4 sentences explaining what you changed or clarified",
  "updatedNotes": ... full updated notes object matching ExamNotesResult schema ...
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: chatPrompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        reply: parsed.reply || 'Notes updated successfully!',
        updatedNotes: parsed.updatedNotes || currentNotes
      });
    } catch (err: any) {
      console.error('Error in /api/chat-refine:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to process chat refinement'
      });
    }
  });

  // Endpoint: Save notes for sharing
  app.post('/api/share', (req, res) => {
    const { notes } = req.body;
    if (!notes) {
      return res.status(400).json({ error: 'No notes provided' });
    }
    const shareId = Math.random().toString(36).substring(2, 10);
    sharedNotesStore.set(shareId, notes);
    return res.json({ success: true, shareId });
  });

  // Endpoint: Retrieve shared notes
  app.get('/api/share/:id', (req, res) => {
    const { id } = req.params;
    const notes = sharedNotesStore.get(id);
    if (!notes) {
      return res.status(404).json({ error: 'Shared notes not found or expired' });
    }
    return res.json({ success: true, notes });
  });

  // Helper to collect readable project source files for complete project ZIP export
  function getProjectFiles(dir: string, baseDir: string = dir): Array<{ path: string; content: string }> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let results: Array<{ path: string; content: string }> = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(baseDir, fullPath);
      if (['node_modules', '.git', 'dist', '.aistudio', 'bun.lock'].some(ignore => relPath === ignore || relPath.startsWith(ignore + '/') || relPath.startsWith(ignore + '\\'))) {
        continue;
      }
      if (entry.isDirectory()) {
        results = results.concat(getProjectFiles(fullPath, baseDir));
      } else if (entry.isFile()) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          results.push({ path: relPath, content });
        } catch {
          // Skip binary or unreadable files
        }
      }
    }
    return results;
  }

  // Endpoint: Provide full project source files for downloadable ZIP
  app.get('/api/project-source', (req, res) => {
    try {
      const files = getProjectFiles(__dirname);
      return res.json({ success: true, files });
    } catch (err: any) {
      console.error('Error in /api/project-source:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Serve static files or Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ExamPrep AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
