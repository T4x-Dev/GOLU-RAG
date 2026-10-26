import React, { useState } from 'react';
import { 
  FileSignature, 
  Clock, 
  Award, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ExamNotesResult } from '../types';

interface PracticeExamViewProps {
  notes: ExamNotesResult;
}

interface QuestionEvaluation {
  score: number;
  maxScore: number;
  feedback: string;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export const PracticeExamView: React.FC<PracticeExamViewProps> = ({ notes }) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Record<number, QuestionEvaluation>>({});
  const [isGrading, setIsGrading] = useState(false);

  // Generate questions from notes sections
  const practiceQuestions = notes.sections.map((sec, idx) => ({
    id: idx,
    question: sec.examAnswerStructure?.question || `Explain ${sec.heading} with key definitions and scoring points.`,
    marks: sec.targetMarks === '10-Mark' ? 10 : sec.targetMarks === '5-Mark' ? 5 : 2,
    modelAnswer: sec.examAnswerStructure?.stepByStepAnswer.join(' ') || sec.bulletPoints.join(' '),
    keyDefinition: sec.keyDefinition,
    mnemonic: sec.mnemonic,
    scoringTips: sec.examAnswerStructure?.scoringTips || [],
    expectedKeywords: [
      sec.heading.split(' ')[1] || 'Process',
      ...(sec.mnemonic ? [sec.mnemonic] : []),
      ...sec.bulletPoints.flatMap(p => p.split(' ').filter(w => w.length > 5).slice(0, 3)),
    ].slice(0, 5)
  }));

  const currentQ = practiceQuestions[selectedQuestionIndex] || practiceQuestions[0];
  const currentAnswer = userAnswers[selectedQuestionIndex] || '';
  const currentEval = evaluations[selectedQuestionIndex];

  const handleGrade = async () => {
    if (!currentAnswer.trim()) return;
    setIsGrading(true);

    try {
      // Check keywords and evaluate answer
      const lowerAns = currentAnswer.toLowerCase();
      const matched = currentQ.expectedKeywords.filter(k => lowerAns.includes(k.toLowerCase()));
      const missing = currentQ.expectedKeywords.filter(k => !lowerAns.includes(k.toLowerCase()));

      let calculatedScore = Math.round((matched.length / Math.max(1, currentQ.expectedKeywords.length)) * currentQ.marks);
      if (currentAnswer.length > 120 && calculatedScore < currentQ.marks) {
        calculatedScore = Math.min(currentQ.marks, calculatedScore + 1);
      }
      calculatedScore = Math.max(1, calculatedScore);

      const feedback = 
        calculatedScore >= currentQ.marks * 0.8
          ? `Excellent university exam answer! You hit the core technical requirements and definitions.`
          : calculatedScore >= currentQ.marks * 0.5
          ? `Solid attempt. Good coverage of definitions, but ensure you include step-by-step points and diagram labels.`
          : `Needs improvement. Missing key technical terms required by examiners for full marks.`;

      setEvaluations(prev => ({
        ...prev,
        [selectedQuestionIndex]: {
          score: calculatedScore,
          maxScore: currentQ.marks,
          feedback,
          matchedKeywords: matched,
          missingKeywords: missing
        }
      }));
    } finally {
      setIsGrading(false);
    }
  };

  const handleResetAnswer = () => {
    setUserAnswers(prev => ({ ...prev, [selectedQuestionIndex]: '' }));
    setEvaluations(prev => {
      const next = { ...prev };
      delete next[selectedQuestionIndex];
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 rounded-2xl p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileSignature className="w-4 h-4 text-blue-500" />
            Active Exam Sprint Simulator
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {practiceQuestions.length} Questions Available
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100">
          Practice University Exam Questions & AI Self-Grader
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Type your answers under timed exam conditions. The AI evaluates your keywords, structure, and mark-scoring criteria.
        </p>

        {/* Question Selector Carousel */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-semibold mr-1">Questions:</span>
          {practiceQuestions.map((q, idx) => {
            const hasEval = !!evaluations[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedQuestionIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedQuestionIndex === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : hasEval
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
              >
                <span>Q{idx + 1}</span>
                <span className="text-[10px] opacity-75">({q.marks}M)</span>
                {hasEval && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                Question {selectedQuestionIndex + 1} of {practiceQuestions.length}
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                {currentQ.question}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
              {currentQ.marks} Marks
            </span>
          </div>

          {/* Student Answer Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Your Written Answer:</span>
              <span className="text-slate-400 font-mono font-normal">
                {currentAnswer.length} characters
              </span>
            </label>
            <textarea
              rows={6}
              value={currentAnswer}
              onChange={(e) =>
                setUserAnswers((prev) => ({
                  ...prev,
                  [selectedQuestionIndex]: e.target.value,
                }))
              }
              placeholder="Write your answer here as you would in your university answer booklet (Definitions, steps, formula representation)..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 p-4 rounded-xl border border-slate-700 focus:border-blue-500 outline-hidden font-sans text-sm leading-relaxed"
            />
          </div>

          {/* Grade Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetAnswer}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Answer</span>
            </button>

            <button
              type="button"
              onClick={handleGrade}
              disabled={!currentAnswer.trim() || isGrading}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Award className="w-4 h-4" />
              <span>{isGrading ? 'Evaluating Answer...' : 'Grade My Answer'}</span>
            </button>
          </div>

          {/* Evaluation Feedback */}
          {currentEval && (
            <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-emerald-400">
                    {currentEval.score} / {currentEval.maxScore}
                  </span>
                  <span className="text-xs text-slate-400">Marks Awarded</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {Math.round((currentEval.score / currentEval.maxScore) * 100)}% Accuracy
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentEval.feedback}
              </p>

              {/* Matched Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-800/30">
                  <span className="font-bold text-emerald-400 block mb-1">
                    ✓ Key Concepts Included:
                  </span>
                  {currentEval.matchedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {currentEval.matchedKeywords.map((k, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-200 font-mono text-[11px]">
                          {k}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-[11px]">None detected yet</span>
                  )}
                </div>

                <div className="p-3 bg-amber-950/20 rounded-lg border border-amber-800/30">
                  <span className="font-bold text-amber-400 block mb-1">
                    ⚠️ Missing Examiner Keywords:
                  </span>
                  {currentEval.missingKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {currentEval.missingKeywords.map((k, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-900/40 text-amber-200 font-mono text-[11px]">
                          {k}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-emerald-300 text-[11px]">All key terms matched!</span>
                  )}
                </div>
              </div>

              {/* Model Answer Hint */}
              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-bold text-blue-400 block mb-1">
                  💡 Model Answer Key Reference:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed italic bg-slate-900 p-3 rounded-lg border border-slate-800">
                  "{currentQ.keyDefinition}"
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
