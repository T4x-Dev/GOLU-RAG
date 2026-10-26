export type FileRole = 'syllabus' | 'model_paper' | 'other';

export interface SourceFile {
  id: string;
  name: string;
  role: FileRole;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  size: number;
  pageCount: number;
  extractedText: string;
  summary?: string;
  keyTopics?: string[];
  error?: string;
}

export type OutputFormat = 'document' | 'handwritten';
export type DepthMode = 'quick' | 'standard' | 'mastery';
export type MarksFilter = 'all' | '2-mark' | '5-mark' | '10-mark';

export interface ExamCitation {
  fileId: string;
  fileName: string;
  pageNumber?: number;
  snippet: string;
  role: FileRole;
}

export interface NoteSection {
  id: string;
  heading: string;
  targetMarks: '2-Mark' | '5-Mark' | '10-Mark' | 'Concept';
  keyDefinition: string;
  bulletPoints: string[];
  mnemonic?: string;
  formulaOrSyntax?: string;
  diagram?: {
    type: 'mermaid' | 'flowchart' | 'table' | 'svg';
    code: string;
    caption: string;
  };
  examAnswerStructure: {
    question: string;
    stepByStepAnswer: string[];
    scoringTips: string[];
    diagramNote?: string;
  };
  sourceCitations: ExamCitation[];
}

export interface ImportantQuestion {
  id: string;
  question: string;
  marks: number;
  frequency: 'High' | 'Repeated' | 'Probable';
  appearedInYears?: string[];
  modelPaperRef?: string;
  keyPointsToHit: string[];
}

export interface ComparisonTable {
  id: string;
  title: string;
  topicA: string;
  topicB: string;
  rows: Array<{
    parameter: string;
    featureA: string;
    featureB: string;
  }>;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface ExamNotesResult {
  id: string;
  title: string;
  subject: string;
  unit: string;
  executiveSummary: string;
  sections: NoteSection[];
  importantQuestions: ImportantQuestion[];
  comparisons?: ComparisonTable[];
  flashcards?: Flashcard[];
  sourcesUsed: Array<{
    fileName: string;
    page: string;
    role: FileRole;
    relevance: string;
  }>;
  generatedAt: string;
  depth: DepthMode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  actionTaken?: string;
}
