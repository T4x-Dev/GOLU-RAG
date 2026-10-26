import React from 'react';
import {
  BookOpen,
  Award,
  Lightbulb,
  FileCheck,
  Compass,
  ExternalLink,
  Target,
  Copy,
  Check
} from 'lucide-react';
import { ExamNotesResult, MarksFilter, NoteSection } from '../types';
import { MermaidRenderer } from './MermaidRenderer';

interface DocumentViewProps {
  notes: ExamNotesResult;
  marksFilter: MarksFilter;
  onSelectCitation: (fileName: string, page?: number) => void;
}

export const DocumentView: React.FC<DocumentViewProps> = ({
  notes,
  marksFilter,
  onSelectCitation,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSections = notes.sections.filter((sec) => {
    if (marksFilter === 'all') return true;
    if (marksFilter === '2-mark') return sec.targetMarks === '2-Mark';
    if (marksFilter === '5-mark') return sec.targetMarks === '5-Mark';
    if (marksFilter === '10-mark') return sec.targetMarks === '10-Mark';
    return true;
  });

  return (
    <div
      className="print-area max-w-4xl mx-auto overflow-hidden"
      style={{
        background: '#ffffff',
        boxShadow: '8px 8px 30px rgba(10,60,85,0.14), -4px -4px 18px rgba(225,242,250,0.7)',
        border: '1px solid rgba(23,134,180,0.12)',
        borderRadius: 22,
      }}
    >
      {/* Document Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #04202E 0%, #0A3C55 50%, #0F5E83 100%)',
          padding: '28px 32px',
          borderBottom: '3px solid #1786B4',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(79,179,218,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,179,218,0.05) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />
        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,179,218,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative' }}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4FB3DA', textTransform: 'uppercase', letterSpacing: 1.2 }}>
              {notes.subject || 'University Examination Material'}
            </span>
            <span
              style={{
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 20,
                background: 'rgba(79,179,218,0.15)',
                border: '1px solid rgba(79,179,218,0.35)',
                color: '#98D5EE',
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              {notes.unit || 'Unit Notes'}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900, color: '#E1F2FA', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 14 }}>
            {notes.title}
          </h1>

          {notes.executiveSummary && (
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(79,179,218,0.2)',
                borderRadius: 12,
                padding: '12px 16px',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 800, color: '#4FB3DA', textTransform: 'uppercase', letterSpacing: 1.2, display: 'block', marginBottom: 6 }}>
                📋 Executive Revision Summary
              </span>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#98D5EE' }}>{notes.executiveSummary}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Sections */}
      <div className="p-6 sm:p-8 space-y-6" style={{ background: '#f8fbff' }}>
        {filteredSections.map((section, idx) => (
          <SectionCard
            key={section.id || idx}
            section={section}
            index={idx + 1}
            onCopy={handleCopy}
            copiedId={copiedId}
            onSelectCitation={onSelectCitation}
          />
        ))}

        {filteredSections.length === 0 && (
          <div
            className="text-center py-12"
            style={{ color: 'rgba(15,94,131,0.4)', fontSize: 14 }}
          >
            No sections match the current marks filter.
          </div>
        )}
      </div>
    </div>
  );
};

interface SectionCardProps {
  section: NoteSection;
  index: number;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
  onSelectCitation: (fileName: string, page?: number) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  index,
  onCopy,
  copiedId,
  onSelectCitation,
}) => {
  const getBadgeStyle = (marks: string): React.CSSProperties => {
    switch (marks) {
      case '10-Mark': return { background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(109,40,217,0.1))', border: '1px solid rgba(139,92,246,0.35)', color: '#7c3aed' };
      case '5-Mark': return { background: 'linear-gradient(135deg, rgba(23,134,180,0.12), rgba(15,94,131,0.08))', border: '1px solid rgba(23,134,180,0.3)', color: '#0F5E83' };
      case '2-Mark': return { background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.08))', border: '1px solid rgba(16,185,129,0.3)', color: '#047857' };
      default: return { background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.2)', color: '#475569' };
    }
  };

  return (
    <article
      className="transition-all"
      style={{
        background: '#ffffff',
        boxShadow: '4px 4px 16px rgba(10,60,85,0.08), -2px -2px 10px rgba(225,242,250,0.7)',
        border: '1px solid rgba(23,134,180,0.1)',
        borderRadius: 16,
        padding: '20px 24px',
        space: 'space-y-5',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 22px rgba(10,60,85,0.12), -3px -3px 14px rgba(225,242,250,0.8)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(23,134,180,0.2)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 16px rgba(10,60,85,0.08), -2px -2px 10px rgba(225,242,250,0.7)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(23,134,180,0.1)';
      }}
    >
      {/* Heading & Badge */}
      <div className="flex flex-wrap items-start justify-between gap-2 pb-3" style={{ borderBottom: '1px solid rgba(23,134,180,0.08)', marginBottom: 16 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#04202E', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(23,134,180,0.15), rgba(15,94,131,0.1))',
              border: '1px solid rgba(23,134,180,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 800,
              color: '#0F5E83',
              flexShrink: 0,
              boxShadow: '2px 2px 6px rgba(10,60,85,0.1), -1px -1px 4px rgba(225,242,250,0.6)',
            }}
          >
            {index}
          </span>
          <span>{section.heading}</span>
        </h2>
        <span
          style={{
            ...getBadgeStyle(section.targetMarks),
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.3,
            boxShadow: '2px 2px 6px rgba(10,60,85,0.08)',
            whiteSpace: 'nowrap',
          }}
        >
          {section.targetMarks} Question
        </span>
      </div>

      {/* Definition Callout */}
      {section.keyDefinition && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(225,242,250,0.8), rgba(152,213,238,0.2))',
            boxShadow: 'inset 2px 2px 8px rgba(23,134,180,0.06), inset -1px -1px 5px rgba(255,255,255,0.5)',
            borderLeft: '4px solid #1786B4',
            borderRadius: '0 12px 12px 0',
            padding: '12px 16px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#0A3C55', textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 5 }}>
              <BookOpen size={12} color="#1786B4" />
              Verbatim Definition (For Full Marks)
            </span>
            <button
              onClick={() => onCopy(section.keyDefinition, `def-${section.id}`)}
              style={{
                background: 'rgba(23,134,180,0.1)',
                border: '1px solid rgba(23,134,180,0.2)',
                borderRadius: 7,
                padding: '3px 6px',
                cursor: 'pointer',
                color: copiedId === `def-${section.id}` ? '#059669' : '#1786B4',
                transition: 'all 0.2s',
              }}
              title="Copy definition"
            >
              {copiedId === `def-${section.id}` ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#04202E', lineHeight: 1.65, fontStyle: 'italic' }}>
            "{section.keyDefinition}"
          </p>
        </div>
      )}

      {/* Key Points */}
      {section.bulletPoints?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 10, fontWeight: 800, color: 'rgba(15,94,131,0.6)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            Key Technical Concepts & Explanations:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {section.bulletPoints.map((point, pIdx) => (
              <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#1e293b', lineHeight: 1.55 }}>
                <span
                  style={{
                    minWidth: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1786B4, #4FB3DA)',
                    boxShadow: '0 0 6px rgba(23,134,180,0.4)',
                    marginTop: 7,
                    flexShrink: 0,
                  }}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mnemonic */}
      {section.mnemonic && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(254,243,199,0.8), rgba(253,230,138,0.3))',
            boxShadow: 'inset 2px 2px 7px rgba(180,120,0,0.06)',
            border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginBottom: 16,
          }}
        >
          <Lightbulb size={15} color="#d97706" style={{ marginTop: 1, flexShrink: 0 }} />
          <div style={{ fontSize: 12 }}>
            <span style={{ fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: 0.5 }}>Memory Mnemonic: </span>
            <span style={{ fontWeight: 600, color: '#78350f' }}>{section.mnemonic}</span>
          </div>
        </div>
      )}

      {/* Formula / Syntax */}
      {section.formulaOrSyntax && (
        <div
          style={{
            background: 'linear-gradient(145deg, #071e2b, #0a2d40)',
            boxShadow: '4px 4px 14px rgba(2,12,18,0.4), -2px -2px 8px rgba(23,134,180,0.08)',
            border: '1px solid rgba(23,134,180,0.2)',
            borderRadius: 12,
            padding: '12px 16px',
            fontFamily: 'JetBrains Mono, monospace',
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 9.5, color: '#4FB3DA', textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, display: 'block', marginBottom: 8 }}>
            Essential Formula / Syntax:
          </span>
          <pre style={{ fontSize: 12, color: '#E1F2FA', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}>{section.formulaOrSyntax}</pre>
        </div>
      )}

      {/* Diagram */}
      {section.diagram && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#0F5E83', marginBottom: 8 }}>
            <Compass size={13} color="#1786B4" />
            Examiner Diagram / Flowchart:
          </div>
          <MermaidRenderer
            code={section.diagram.code}
            caption={section.diagram.caption}
            isHandwritten={false}
          />
        </div>
      )}

      {/* Exam Answer Structure */}
      {section.examAnswerStructure && (
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(225,242,250,0.5), rgba(152,213,238,0.1))',
            boxShadow: 'inset 2px 2px 8px rgba(10,60,85,0.06)',
            border: '1px solid rgba(23,134,180,0.12)',
            borderRadius: 14,
            padding: '16px 18px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 800, color: '#0A3C55', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            <Award size={14} color="#7c3aed" />
            Model University Exam Answer & Scoring Breakdown
          </div>

          <div
            style={{
              background: '#ffffff',
              boxShadow: '2px 2px 8px rgba(10,60,85,0.06)',
              border: '1px solid rgba(23,134,180,0.1)',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: '#04202E',
              marginBottom: 12,
            }}
          >
            Q: {section.examAnswerStructure.question}
          </div>

          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(15,94,131,0.6)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
              Step-by-Step Scoring Points:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {section.examAnswerStructure.stepByStepAnswer.map((step, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    background: '#ffffff',
                    boxShadow: '2px 2px 6px rgba(10,60,85,0.05)',
                    border: '1px solid rgba(23,134,180,0.08)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 12,
                    color: '#1e293b',
                  }}
                >
                  <span style={{ fontWeight: 800, color: '#1786B4', flexShrink: 0, fontSize: 12 }}>{sIdx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {section.examAnswerStructure.scoringTips?.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(23,134,180,0.1)', paddingTop: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                <FileCheck size={12} color="#059669" />
                Examiner Scoring Tips:
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {section.examAnswerStructure.scoringTips.map((tip, tIdx) => (
                  <li key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12, color: '#065f46' }}>
                    <span style={{ color: '#059669', fontWeight: 800, flexShrink: 0 }}>✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Source Citations */}
      {section.sourceCitations?.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 6,
            paddingTop: 12,
            borderTop: '1px solid rgba(23,134,180,0.08)',
            fontSize: 11,
          }}
        >
          <span style={{ fontWeight: 700, color: 'rgba(15,94,131,0.5)' }}>Sources:</span>
          {section.sourceCitations.map((cit, cIdx) => (
            <button
              key={cIdx}
              onClick={() => onSelectCitation(cit.fileName, cit.pageNumber)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 10px',
                borderRadius: 999,
                background: 'linear-gradient(135deg, rgba(23,134,180,0.08), rgba(15,94,131,0.06))',
                boxShadow: '2px 2px 6px rgba(10,60,85,0.06), -1px -1px 3px rgba(225,242,250,0.5)',
                border: '1px solid rgba(23,134,180,0.15)',
                color: '#0F5E83',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(23,134,180,0.15), rgba(15,94,131,0.1))';
                e.currentTarget.style.borderColor = 'rgba(23,134,180,0.3)';
                e.currentTarget.style.color = '#1786B4';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(23,134,180,0.08), rgba(15,94,131,0.06))';
                e.currentTarget.style.borderColor = 'rgba(23,134,180,0.15)';
                e.currentTarget.style.color = '#0F5E83';
              }}
              title={`View citation in ${cit.fileName}`}
            >
              {cit.fileName}
              {cit.pageNumber && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(15,94,131,0.6)' }}>p.{cit.pageNumber}</span>}
              <ExternalLink size={10} style={{ opacity: 0.6 }} />
            </button>
          ))}
        </div>
      )}
    </article>
  );
};
