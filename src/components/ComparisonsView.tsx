import React from 'react';
import { Columns, CheckCircle } from 'lucide-react';
import { ComparisonTable } from '../types';

interface ComparisonsViewProps {
  comparisons: ComparisonTable[];
}

export const ComparisonsView: React.FC<ComparisonsViewProps> = ({ comparisons }) => {
  if (!comparisons || comparisons.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12 text-slate-500">
        <p>No comparison tables generated for this unit yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Columns className="w-4 h-4" />
          <span>High-Yield Differences & Comparisons</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100">
          Comparative Analysis Tables
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          University examiners regularly ask "Differentiate between X and Y" as 5-mark and 10-mark questions. Use these standardized parameter tables.
        </p>
      </div>

      {comparisons.map((comp, idx) => (
        <div
          key={comp.id || idx}
          className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg"
        >
          <div className="p-4 sm:p-5 bg-slate-850 border-b border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="text-indigo-400">#{idx + 1}</span>
              <span>{comp.title}</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-800/80 text-slate-300 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4 w-1/4">Comparison Parameter</th>
                  <th className="py-3 px-4 w-3/8 text-blue-400 font-bold">{comp.topicA}</th>
                  <th className="py-3 px-4 w-3/8 text-purple-400 font-bold">{comp.topicB}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {comp.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-200 bg-slate-900/60">
                      {row.parameter}
                    </td>
                    <td className="py-3 px-4 leading-relaxed">
                      {row.featureA}
                    </td>
                    <td className="py-3 px-4 leading-relaxed">
                      {row.featureB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
