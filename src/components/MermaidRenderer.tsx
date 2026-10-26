import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  code: string;
  caption?: string;
  isHandwritten?: boolean;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({
  code,
  caption,
  isHandwritten = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isHandwritten ? 'neutral' : 'default',
      securityLevel: 'loose',
      fontFamily: isHandwritten ? '"Kalam", cursive' : '"Plus Jakarta Sans", sans-serif',
      themeVariables: isHandwritten
        ? {
            primaryColor: '#e0f2fe',
            primaryBorderColor: '#0284c7',
            primaryTextColor: '#0369a1',
            lineColor: '#1e293b',
            secondaryColor: '#fef08a',
            tertiaryColor: '#fbcfe8',
          }
        : {
            primaryColor: '#eff6ff',
            primaryBorderColor: '#3b82f6',
            primaryTextColor: '#1e40af',
            lineColor: '#64748b',
          },
    });

    let isMounted = true;
    const renderDiagram = async () => {
      if (!code || !code.trim()) return;
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

      try {
        setHasError(false);
        const { svg } = await mermaid.render(id, code.trim());
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.warn('Mermaid render error:', err);
        if (isMounted) {
          setHasError(true);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [code, isHandwritten]);

  if (hasError) {
    return (
      <div className="my-3 p-3 rounded-lg border border-amber-300/60 bg-amber-50/50 text-amber-900 text-xs font-mono overflow-x-auto">
        <p className="font-semibold text-amber-800 mb-1">Diagram Code Representation:</p>
        <pre className="whitespace-pre-wrap">{code}</pre>
        {caption && <p className="mt-2 text-xs text-slate-500 italic">{caption}</p>}
      </div>
    );
  }

  return (
    <div className={`my-4 flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
      isHandwritten
        ? 'bg-[#fffef0] border-2 border-dashed border-sky-400/80 shadow-sm'
        : 'bg-slate-50/80 border border-slate-200 shadow-xs'
    }`}>
      <div
        ref={containerRef}
        className="w-full flex justify-center overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      {caption && (
        <p className={`mt-2.5 text-xs text-center font-medium ${
          isHandwritten ? 'font-kalam text-sky-800 text-sm' : 'text-slate-500'
        }`}>
          {caption}
        </p>
      )}
    </div>
  );
};
