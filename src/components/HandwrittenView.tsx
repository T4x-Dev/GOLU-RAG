import React from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  ExternalLink,
  Star,
  Pin
} from 'lucide-react';
import { ExamNotesResult, MarksFilter, NoteSection } from '../types';
import { MermaidRenderer } from './MermaidRenderer';

interface HandwrittenViewProps {
  notes: ExamNotesResult;
  marksFilter: MarksFilter;
  handwritingFont: 'kalam' | 'caveat' | 'patrick';
  paperPattern: 'ruled' | 'grid';
  onSelectCitation: (fileName: string, page?: number) => void;
}

export const HandwrittenView: React.FC<HandwrittenViewProps> = ({
  notes,
  marksFilter,
  handwritingFont,
  paperPattern,
  onSelectCitation,
}) => {
  const fontClass = 
    handwritingFont === 'caveat' 
      ? 'font-caveat text-lg leading-relaxed' 
      : handwritingFont === 'patrick' 
      ? 'font-patrick text-base leading-relaxed' 
      : 'font-kalam text-base leading-relaxed';

  const paperClass = paperPattern === 'grid' ? 'paper-grid' : 'paper-ruled';

  const filteredSections = notes.sections.filter((sec) => {
    if (marksFilter === 'all') return true;
    if (marksFilter === '2-mark') return sec.targetMarks === '2-Mark';
    if (marksFilter === '5-mark') return sec.targetMarks === '5-Mark';
    if (marksFilter === '10-mark') return sec.targetMarks === '10-Mark';
    return true;
  });

  return (
    <div className={`print-area max-w-4xl mx-auto ${paperClass} text-[#1e293b] rounded-xl shadow-2xl p-6 sm:p-12 border-2 border-[#e2e8f0] relative overflow-hidden transition-all select-text`}>
      {/* Red Left Margin Line (for realistic university ruled notebook) */}
      {paperPattern === 'ruled' && (
        <div className="absolute top-0 bottom-0 left-[54px] w-0.5 bg-red-400/70 pointer-events-none hidden sm:block" />
      )}

      {/* Top Handwritten Notebook Header */}
      <div className={`border-b-2 border-dashed border-red-300 pb-5 mb-8 sm:pl-10 ${fontClass}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-red-600 mb-1">
          <span className="bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full border border-red-300">
            Subject: {notes.subject || 'Operating Systems'}
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            Exam Prep Notebook • {notes.unit || 'Unit 2'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#b91c1c] tracking-wide mt-1">
          ✍️ {notes.title}
        </h1>

        {notes.executiveSummary && (
          <div className="mt-4 bg-[#fefce8] p-4 rounded-xl border-2 border-dashed border-amber-400 text-amber-950 shadow-xs relative">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>Quick Revision Memo:</span>
            </div>
            <p className="text-base sm:text-lg text-amber-900 leading-snug">
              {notes.executiveSummary}
            </p>
          </div>
        )}
      </div>

      {/* Handwritten Sections */}
      <div className={`space-y-10 sm:pl-10 ${fontClass}`}>
        {filteredSections.map((section, idx) => (
          <HandwrittenSection
            key={section.id || idx}
            section={section}
            index={idx + 1}
            onSelectCitation={onSelectCitation}
          />
        ))}

        {filteredSections.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg">No sections match the current marks filter.</p>
          </div>
        )}
      </div>

      {/* Notebook Bottom Signature */}
      <div className="mt-12 pt-6 border-t-2 border-dashed border-slate-300 sm:pl-10 flex flex-wrap items-center justify-between text-xs text-slate-500 font-kalam">
        <span>Prepared for Final Semester University Examination</span>
        <span className="text-emerald-700 font-bold">✓ Grounded with Syllabus & Model Papers</span>
      </div>
    </div>
  );
};

interface HandwrittenSectionProps {
  section: NoteSection;
  index: number;
  onSelectCitation: (fileName: string, page?: number) => void;
}

const HandwrittenSection: React.FC<HandwrittenSectionProps> = ({
  section,
  index,
  onSelectCitation,
}) => {
  return (
    <div className="relative space-y-4 pt-2">
      {/* Section Title in Red/Maroon Ink */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-red-200 pb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#991b1b] flex items-center gap-2">
          <span className="text-red-500 text-xl font-bold">#{index}</span>
          <span className="underline decoration-wavy decoration-red-400">{section.heading}</span>
        </h2>
        <span className="bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-sm font-bold border border-amber-300 rotate-[-1deg] shadow-xs">
          ★ {section.targetMarks} Question
        </span>
      </div>

      {/* Verbatim Definition with Yellow Highlighter */}
      {section.keyDefinition && (
        <div className="sketch-border p-4 bg-[#eff6ff]/70 text-[#1e3a8a] my-2 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1e40af] mb-1">
            <Pin className="w-4 h-4 text-red-500 rotate-45" />
            <span>Definition (Verbatim full-marks text):</span>
          </div>
          <p className="text-lg sm:text-xl text-[#0f172a] font-semibold leading-relaxed">
            <span className="highlight-yellow">"{section.keyDefinition}"</span>
          </p>
        </div>
      )}

      {/* Bullet Points with Blue Ink */}
      {section.bulletPoints && section.bulletPoints.length > 0 && (
        <div className="space-y-1.5 pl-2 text-[#0f172a]">
          <span className="text-sm font-bold text-sky-900 uppercase block tracking-wider">
            Important Explanatory Points:
          </span>
          <ul className="space-y-2 text-lg sm:text-xl leading-relaxed">
            {section.bulletPoints.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold shrink-0 text-xl">☞</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sticky Note Mnemonic in Green Highlighter Ink */}
      {section.mnemonic && (
        <div className="bg-[#f0fdf4] border-2 border-emerald-400 p-3 rounded-lg text-emerald-950 shadow-xs max-w-xl rotate-[0.5deg]">
          <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-800">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            <span>Memory Trick (Easy to recall in exam hall):</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-emerald-900 mt-1">
            <span className="highlight-green">{section.mnemonic}</span>
          </p>
        </div>
      )}

      {/* Formula Box in Purple Ink with Rough Border */}
      {section.formulaOrSyntax && (
        <div className="bg-[#faf5ff] border-2 border-dashed border-purple-400 rounded-xl p-4 text-purple-950 shadow-xs rotate-[-0.5deg]">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block mb-1">
            Key Formula / Algorithm Code:
          </span>
          <div className="font-mono text-base sm:text-lg font-bold text-purple-900 whitespace-pre-wrap bg-white/70 p-3 rounded-lg border border-purple-200">
            {section.formulaOrSyntax}
          </div>
        </div>
      )}

      {/* Handwritten Diagram / Flowchart */}
      {section.diagram && (
        <div className="my-4">
          <div className="text-sm font-bold text-sky-800 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Draw this in exam paper (Diagram fetches 40% marks):</span>
          </div>
          <MermaidRenderer
            code={section.diagram.code}
            caption={`Hand-drawn schematic: ${section.diagram.caption}`}
            isHandwritten={true}
          />
        </div>
      )}

      {/* Model Exam Scoring Strategy */}
      {section.examAnswerStructure && (
        <div className="bg-[#fefce8]/90 border border-amber-300 rounded-xl p-4 text-amber-950 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-sm font-bold text-amber-900 border-b border-amber-200 pb-1.5">
            <span>📝 How to write this {section.targetMarks} answer in exam:</span>
            <span className="highlight-yellow text-xs font-mono">Full Marks Strategy</span>
          </div>

          <p className="text-base font-bold text-amber-950">
            Q: {section.examAnswerStructure.question}
          </p>

          <div className="space-y-1 text-base text-amber-900">
            {section.examAnswerStructure.stepByStepAnswer.map((step, sIdx) => (
              <div key={sIdx} className="flex items-start gap-2">
                <span className="font-bold text-blue-700 shrink-0">Step {sIdx + 1}:</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {section.examAnswerStructure.scoringTips && section.examAnswerStructure.scoringTips.length > 0 && (
            <div className="pt-2 border-t border-amber-200 text-sm text-emerald-900 font-semibold space-y-0.5">
              <span className="text-xs font-bold text-emerald-800 uppercase block">
                ★ Examiner Marks Checklist:
              </span>
              {section.examAnswerStructure.scoringTips.map((tip, tIdx) => (
                <div key={tIdx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Citations Tag */}
      {section.sourceCitations && section.sourceCitations.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500 font-sans">
          <span className="font-semibold text-slate-400">Sources:</span>
          {section.sourceCitations.map((cit, cIdx) => (
            <button
              key={cIdx}
              onClick={() => onSelectCitation(cit.fileName, cit.pageNumber)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <span>{cit.fileName}</span>
              {cit.pageNumber && <span>p.{cit.pageNumber}</span>}
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
