import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  Clock, 
  CheckSquare, 
  Square, 
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { ImportantQuestion } from '../types';

interface ImportantQuestionsViewProps {
  questions: ImportantQuestion[];
}

export const ImportantQuestionsView: React.FC<ImportantQuestionsViewProps> = ({
  questions,
}) => {
  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>({});
  const [filterMarks, setFilterMarks] = useState<'all' | '10' | '5' | '2'>('all');

  const togglePoint = (key: string) => {
    setCheckedPoints((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filtered = questions.filter((q) => {
    if (filterMarks === 'all') return true;
    return q.marks === parseInt(filterMarks);
  });

  const getFrequencyBadge = (freq: string) => {
    switch (freq) {
      case 'Repeated':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'High':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            AI Exam Trend Analysis
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {questions.length} Predicted Questions
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100">
          Recurring University Examination Questions
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Synthesized by cross-referencing your uploaded model papers, syllabus outcomes, and grading rubrics.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-semibold mr-1">Filter by marks:</span>
          {(['all', '10', '5', '2'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setFilterMarks(m)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterMarks === m
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {m === 'all' ? 'All Questions' : `${m}-Mark Questions`}
            </button>
          ))}
        </div>
      </div>

      {/* Question Cards */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={item.id || idx}
            className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-sm hover:border-slate-700 transition-all"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                  Q{idx + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-100 leading-snug">
                    {item.question}
                  </h3>
                  {item.modelPaperRef && (
                    <span className="text-xs text-slate-400 font-mono mt-1 block">
                      Ref: {item.modelPaperRef}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getFrequencyBadge(item.frequency)}`}>
                  {item.frequency === 'Repeated' ? '🔥 Repeated in Papers' : `${item.frequency} Probability`}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {item.marks} Marks
                </span>
              </div>
            </div>

            {/* Appeared in Years Tags */}
            {item.appearedInYears && item.appearedInYears.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Appeared in:</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.appearedInYears.map((year, yIdx) => (
                    <span
                      key={yIdx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Checklist of Mandatory Scoring Points */}
            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Examiner Mandatory Scoring Points Checklist:
              </span>
              <div className="space-y-1.5">
                {item.keyPointsToHit.map((point, ptIdx) => {
                  const checkKey = `${item.id}-pt-${ptIdx}`;
                  const isChecked = !!checkedPoints[checkKey];
                  return (
                    <button
                      key={ptIdx}
                      type="button"
                      onClick={() => togglePoint(checkKey)}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center gap-2.5 transition-all ${
                        isChecked
                          ? 'bg-emerald-950/20 text-emerald-300 line-through border border-emerald-800/30'
                          : 'bg-slate-850 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>{point}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
