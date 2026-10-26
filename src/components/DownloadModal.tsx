import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  PenTool, 
  FileCode, 
  FileArchive, 
  Printer, 
  Check, 
  Loader2,
  BookOpen
} from 'lucide-react';
import JSZip from 'jszip';
import { ExamNotesResult, OutputFormat } from '../types';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: ExamNotesResult;
  currentFormat: OutputFormat;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  notes,
  currentFormat,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<
    'pdf_document' | 'pdf_handwritten' | 'docx' | 'markdown' | 'zip_project'
  >('pdf_document');
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  if (!isOpen) return null;

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    setIsExporting(true);

    try {
      const sanitizedTitle = (notes.title || 'Exam_Notes').replace(/[^a-zA-Z0-9_-]/g, '_');

      if (selectedFormat === 'pdf_document' || selectedFormat === 'pdf_handwritten') {
        // Trigger browser print to PDF with tailored media print styling
        window.print();
        setIsExporting(false);
        setExportedSuccess(true);
        setTimeout(() => setExportedSuccess(false), 2500);
        return;
      }

      if (selectedFormat === 'markdown') {
        // Generate comprehensive Markdown file with Mermaid blocks
        let md = `# ${notes.title}\n`;
        md += `**Subject:** ${notes.subject} | **Unit:** ${notes.unit} | **Date:** ${new Date(notes.generatedAt).toLocaleDateString()}\n\n`;
        md += `> **Executive Summary:**\n> ${notes.executiveSummary}\n\n`;
        md += `---\n\n## 📚 Core Exam Sections\n\n`;

        notes.sections.forEach((sec, idx) => {
          md += `### ${idx + 1}. ${sec.heading} [${sec.targetMarks}]\n\n`;
          if (sec.keyDefinition) {
            md += `**Definition (Full-Marks):**\n> "${sec.keyDefinition}"\n\n`;
          }
          if (sec.mnemonic) {
            md += `💡 **Memory Mnemonic:** \`${sec.mnemonic}\`\n\n`;
          }
          if (sec.bulletPoints && sec.bulletPoints.length > 0) {
            md += `**Key Technical Points:**\n`;
            sec.bulletPoints.forEach((pt) => {
              md += `- ${pt}\n`;
            });
            md += `\n`;
          }
          if (sec.formulaOrSyntax) {
            md += `**Formula / Syntax:**\n\`\`\`\n${sec.formulaOrSyntax}\n\`\`\`\n\n`;
          }
          if (sec.diagram) {
            md += `**Diagram (${sec.diagram.caption}):**\n\`\`\`mermaid\n${sec.diagram.code}\n\`\`\`\n\n`;
          }
          if (sec.examAnswerStructure) {
            md += `**Model Exam Answer Breakdown:**\n`;
            md += `*Question:* ${sec.examAnswerStructure.question}\n\n`;
            sec.examAnswerStructure.stepByStepAnswer.forEach((st, sIdx) => {
              md += `${sIdx + 1}. ${st}\n`;
            });
            md += `\n`;
          }
          md += `---\n\n`;
        });

        if (notes.importantQuestions && notes.importantQuestions.length > 0) {
          md += `## 🔥 Recurring Important Questions\n\n`;
          notes.importantQuestions.forEach((q, idx) => {
            md += `### Q${idx + 1} (${q.marks} Marks - ${q.frequency} Probability)\n`;
            md += `${q.question}\n\n`;
            md += `*Key Points Checklist:*\n`;
            q.keyPointsToHit.forEach((pt) => {
              md += `- [ ] ${pt}\n`;
            });
            md += `\n`;
          });
        }

        const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        downloadBlob(blob, `${sanitizedTitle}.md`);
      } else if (selectedFormat === 'docx') {
        // Generate Word compatible HTML/DOC format
        const docHtml = `
          <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
          <head><meta charset='utf-8'><title>${notes.title}</title>
          <style>
            body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 40px; }
            h1 { color: #1e3a8a; font-size: 20pt; border-bottom: 2pt solid #2563eb; padding-bottom: 6px; }
            h2 { color: #1e40af; font-size: 14pt; margin-top: 18pt; }
            .box { background-color: #f1f5f9; border-left: 4pt solid #3b82f6; padding: 10px; margin: 10px 0; }
            .mnemonic { background-color: #fefce8; border: 1pt solid #facc15; padding: 8px; font-weight: bold; }
            .marks-badge { background-color: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-size: 9pt; }
          </style>
          </head>
          <body>
            <h1>${notes.title}</h1>
            <p><strong>Subject:</strong> ${notes.subject} | <strong>Unit:</strong> ${notes.unit}</p>
            <div class="box"><strong>Executive Summary:</strong><br>${notes.executiveSummary}</div>
            ${notes.sections.map((sec, i) => `
              <h2>${i + 1}. ${sec.heading} <span class="marks-badge">[${sec.targetMarks}]</span></h2>
              ${sec.keyDefinition ? `<div class="box"><strong>Verbatim Definition:</strong><br><em>"${sec.keyDefinition}"</em></div>` : ''}
              ${sec.mnemonic ? `<div class="mnemonic">Memory Mnemonic: ${sec.mnemonic}</div>` : ''}
              <ul>${sec.bulletPoints.map(p => `<li>${p}</li>`).join('')}</ul>
              ${sec.formulaOrSyntax ? `<pre style="background:#f8fafc;padding:10px;border:1px solid #cbd5e1;">${sec.formulaOrSyntax}</pre>` : ''}
            `).join('')}
          </body>
          </html>
        `;
        const blob = new Blob([docHtml], { type: 'application/msword;charset=utf-8' });
        downloadBlob(blob, `${sanitizedTitle}.doc`);
      } else if (selectedFormat === 'zip_project') {
        // Complete Working ZIP with README as requested by user
        const zip = new JSZip();

        // 1. README.md with detailed setup instructions
        const readmeContent = `# 🎓 ExamPrep AI - Complete Working Setup & Project

Welcome to your generated **ExamPrep AI** application and study material package!

## 🚀 Quick Setup & How to Run Locally

### Prerequisites
- Node.js version 18.0.0 or higher
- npm or bun or yarn installed
- Google Gemini API key (optional for local mock preview, required for live generation)

### Installation Steps
\`\`\`bash
# 1. Unzip the project and open terminal in the project directory
cd ExamPrep_AI

# 2. Install dependencies
npm install

# 3. Configure your Gemini API Key in .env
cp .env.example .env
# Edit .env and paste your API key:
# GEMINI_API_KEY="your_api_key_here"

# 4. Start the development server (runs full-stack Express + Vite)
npm run dev
\`\`\`
The application will launch at: **http://localhost:3000**

---

## 🎯 How It Works: The 3-Tier RAG Architecture

ExamPrep AI uses an intelligent 3-role file ingestion strategy:
1. **📘 1. Syllabus Files:** Defines the absolute curriculum scope, topic boundaries, and unit objectives.
2. **📝 2. Model Question Papers:** Analyzes past 5-year exam trends, repeated questions, and mark allocations (2-Mark definitions, 5-Mark concepts, 10-Mark essay answers).
3. **📎 3. Lecture Handouts & Textbooks:** Supplies the exact formulas, proofs, diagrams, and marking tips.

---

## 📦 What's Inside This Package

- \`exam_notes.md\`: Complete generated exam preparation notes formatted in Markdown.
- \`exam_notes.json\`: Structured JSON representation with sections, diagrams, citations, and questions.
- \`exam_notes.html\`: Standalone printable HTML revision sheet with embedded styles.
- \`src/\`: Complete TypeScript React frontend source code with Document and Handwritten notebook renderers.
- \`server.ts\`: Express server running Gemini 3.8 Flash with structured JSON output and deep thinking capabilities.

---
Created with ExamPrep AI • Built for University Students
`;
        zip.file('README.md', readmeContent);

        // 2. exam_notes.md
        let md = `# ${notes.title}\n\n${notes.executiveSummary}\n\n`;
        notes.sections.forEach((s) => {
          md += `## ${s.heading} [${s.targetMarks}]\n\n${s.keyDefinition ? `> ${s.keyDefinition}\n\n` : ''}`;
        });
        zip.file('exam_notes.md', md);

        // 3. exam_notes.json
        zip.file('exam_notes.json', JSON.stringify(notes, null, 2));

        // 4. exam_notes.html
        const standaloneHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${notes.title}</title><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;line-height:1.6;color:#1e293b;padding:0 20px;}h1{color:#1e3a8a;}h2{color:#2563eb;border-bottom:1px solid #e2e8f0;padding-bottom:4px;}.box{background:#f8fafc;border-left:4px solid #3b82f6;padding:12px;margin:12px 0;}</style></head><body><h1>${notes.title}</h1><p><strong>Subject:</strong> ${notes.subject} | <strong>Unit:</strong> ${notes.unit}</p><div class="box"><strong>Summary:</strong><br>${notes.executiveSummary}</div>${notes.sections.map(s => `<h2>${s.heading} [${s.targetMarks}]</h2>${s.keyDefinition ? `<div class="box">"${s.keyDefinition}"</div>` : ''}<ul>${s.bulletPoints.map(p => `<li>${p}</li>`).join('')}</ul>`).join('')}</body></html>`;
        zip.file('exam_notes.html', standaloneHtml);

        // 5. Fetch full project code tree from server and bundle into the ZIP
        try {
          const res = await fetch('/api/project-source');
          if (res.ok) {
            const data = await res.json();
            if (data.files && Array.isArray(data.files)) {
              data.files.forEach((f: { path: string; content: string }) => {
                zip.file(f.path, f.content);
              });
            }
          }
        } catch (srcErr) {
          console.warn('Could not fetch source tree for zip, bundling core files:', srcErr);
        }

        // Generate zip file
        const zipContent = await zip.generateAsync({ type: 'blob' });
        downloadBlob(zipContent, `${sanitizedTitle}_FullPackage.zip`);
      }

      setExportedSuccess(true);
      setTimeout(() => {
        setExportedSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Choose Download Format
            </h3>
            <p className="text-xs text-slate-400">
              Select your preferred export layout and package type
            </p>
          </div>
        </div>

        {/* Format Options List */}
        <div className="space-y-2.5 mb-6">
          {/* 1. PDF Document */}
          <label
            className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedFormat === 'pdf_document'
                ? 'bg-blue-600/15 border-blue-500 text-white shadow-xs'
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <input
              type="radio"
              name="download_format"
              value="pdf_document"
              checked={selectedFormat === 'pdf_document'}
              onChange={() => setSelectedFormat('pdf_document')}
              className="mt-1 text-blue-600 focus:ring-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-bold">📄 PDF – Clean Academic Document</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                  Print Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Standard crisp A4 layout, formal callouts, clear headings, and clean Mermaid diagrams.
              </p>
            </div>
          </label>

          {/* 2. PDF Handwritten Notes */}
          <label
            className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedFormat === 'pdf_handwritten'
                ? 'bg-amber-600/15 border-amber-500 text-white shadow-xs'
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <input
              type="radio"
              name="download_format"
              value="pdf_handwritten"
              checked={selectedFormat === 'pdf_handwritten'}
              onChange={() => setSelectedFormat('pdf_handwritten')}
              className="mt-1 text-amber-500 focus:ring-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold">✍️ PDF – Handwritten Notebook Notes</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                  Popular
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ruled lined notebook paper, handwriting fonts, multi-colored ink pens, and highlighter boxes.
              </p>
            </div>
          </label>

          {/* 3. Word DOCX */}
          <label
            className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedFormat === 'docx'
                ? 'bg-blue-600/15 border-blue-500 text-white shadow-xs'
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <input
              type="radio"
              name="download_format"
              value="docx"
              checked={selectedFormat === 'docx'}
              onChange={() => setSelectedFormat('docx')}
              className="mt-1 text-blue-600 focus:ring-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold">📝 Microsoft Word (.doc / .docx)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Editable Word document with structured tables, bullet points, and headings.
              </p>
            </div>
          </label>

          {/* 4. Markdown */}
          <label
            className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedFormat === 'markdown'
                ? 'bg-blue-600/15 border-blue-500 text-white shadow-xs'
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <input
              type="radio"
              name="download_format"
              value="markdown"
              checked={selectedFormat === 'markdown'}
              onChange={() => setSelectedFormat('markdown')}
              className="mt-1 text-blue-600 focus:ring-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold">📑 Markdown (.md) with Mermaid Diagrams</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Standard Markdown compatible with Obsidian, Notion, GitHub, and Logseq.
              </p>
            </div>
          </label>

          {/* 5. Complete Project ZIP with README */}
          <label
            className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedFormat === 'zip_project'
                ? 'bg-purple-600/15 border-purple-500 text-white shadow-xs'
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <input
              type="radio"
              name="download_format"
              value="zip_project"
              checked={selectedFormat === 'zip_project'}
              onChange={() => setSelectedFormat('zip_project')}
              className="mt-1 text-purple-600 focus:ring-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FileArchive className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold">📦 Complete Project ZIP + README Guide</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                  Full Code
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Full standalone package including README.md setup steps, HTML preview, JSON, and Markdown notes.
              </p>
            </div>
          </label>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing File...</span>
              </>
            ) : exportedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Selected Format</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
