# 🎓 ExamPrep AI - Smart Exam Notes & Revision Generator

ExamPrep AI turns university syllabi, model question papers, and course handouts into high-yield, verified exam notes. It features both a modern academic **Document** view and a realistic **Handwritten Notebook** view with live Mermaid diagrams, 2/5/10-mark structured answers, and source citations.

---

## 📸 Core Features & UI Highlights

1. **Role-Tagged File Upload & Ingestion (RAG Grounding)**:
   - 📘 **Syllabus**: Defines what topics to cover and scope boundaries.
   - 📝 **Model Papers**: Defines how questions are asked, mark weightage (2-Mark, 5-Mark, 10-Mark), and frequent patterns.
   - 📎 **Course Material / Handouts**: Supplies technical proofs, definitions, formulas, and diagrams.
   - Real-time status chips: `Uploading` → `Processing` → `Ready ✓`.
   - Inspection drawer to verify extracted text for each document.

2. **Dual Output Formats**:
   - 📄 **Document Mode**: Clean typography, badge chips for target marks (2M, 5M, 10M), verbatim definitions callouts, step-by-step scoring tips, and live Mermaid flowcharts & Gantt charts.
   - ✍️ **Handwritten Mode**: Authentic ruled university notebook paper (with red vertical margin line and horizontal lines), handwritten Google Fonts (*Kalam*, *Caveat*, *Patrick Hand*), multi-colored ink pens (blue body, red headings, green mnemonics, purple formulas), highlighters, and sketchy hand-drawn diagrams.

3. **Multi-Format Download Options**:
   - When clicking **⬇ Download**, you can choose:
     - 📄 **PDF – Clean Academic Document**: Print-ready formatted sheet.
     - ✍️ **PDF – Handwritten Notebook Notes**: Ruled paper with handwriting fonts & highlighters.
     - 📝 **Microsoft Word (.doc / .docx)**: Editable structured document.
     - 📑 **Markdown (.md)**: Standard Markdown with Mermaid code blocks.
     - 📦 **Complete Project ZIP + README Guide**: Full code archive with setup steps, markdown, HTML, and JSON data.

4. **Public Link Sharing**:
   - When clicking **Share ↗**, generates a shareable link that anyone can open to view the exact generated notes, diagrams, and citations. Includes one-click copy, QR code for mobile scanning, and native mobile share menu.

5. **AI Deep Reasoning & Thinking Mode**:
   - Powered by Gemini with `ThinkingLevel.HIGH` reasoning for complex mathematical formulas, Banker's algorithm safe sequence derivations, and university-level proofs.

---

## 🛠️ Local Setup & Running Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** or **yarn**

### 2. Installation
\`\`\`bash
# Install all required packages
npm install
\`\`\`

### 3. Setting Your Gemini API Key
\`\`\`bash
# Copy the environment template
cp .env.example .env
\`\`\`
Open `.env` and add your Gemini API key:
\`\`\`env
GEMINI_API_KEY="your_gemini_api_key_here"
\`\`\`
*(In Google AI Studio Build, the API key is automatically attached to the server environment.)*

### 4. Running the Dev Server
\`\`\`bash
npm run dev
\`\`\`
Open your browser to:
**http://localhost:3000**

### 5. Production Build
\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📂 Project Structure

\`\`\`
├── server.ts                    # Full-stack Express backend with Gemini API & Vite middleware
├── src/
│   ├── App.tsx                  # Main application orchestrating layout and state
│   ├── types.ts                 # TypeScript interfaces (SourceFile, ExamNotesResult, etc.)
│   ├── data/
│   │   └── sampleData.ts        # Sample packs (Operating Systems Unit 2, Computer Networks)
│   ├── components/
│   │   ├── Header.tsx           # Logo, title, Download button, Share button, Thinking toggle
│   │   ├── Sidebar.tsx          # Drag & Drop role-tagged upload with status chips
│   │   ├── ControlsBar.tsx      # Output format toggle, Depth selector, Marks filter
│   │   ├── DocumentView.tsx     # Crisp academic document notes renderer
│   │   ├── HandwrittenView.tsx  # Ruled notebook paper with handwritten inks & highlighters
│   │   ├── MermaidRenderer.tsx  # Live Mermaid flowcharts & Gantt charts renderer
│   │   ├── ImportantQuestionsView.tsx # Recurring 10M/5M/2M questions with checklists
│   │   ├── ComparisonsView.tsx  # Side-by-side comparison tables
│   │   ├── FlashcardsView.tsx   # Interactive 3D flip card active recall drill
│   │   ├── SourcesUsedBar.tsx   # Grounded citations bar with file & page numbers
│   │   ├── PromptChatBar.tsx    # Bottom prompt box with suggestions & multi-turn chat
│   │   ├── DownloadModal.tsx    # Format selection modal (PDF, Word, Markdown, ZIP)
│   │   ├── ShareModal.tsx       # Share link generator with QR code
│   │   └── FileInspectorModal.tsx # Source text verification drawer
├── index.html                   # HTML entry point with Caveat, Kalam, Patrick Hand fonts
├── package.json
└── tsconfig.json
\`\`\`

---
Built with Google AI Studio • Designed for University Students & Exam Success
