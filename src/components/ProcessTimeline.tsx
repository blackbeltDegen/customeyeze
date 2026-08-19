import type { ReactNode } from "react";

export type TimelineStep = {
  number: string;
  title: string;
  desc: string;
  icon?: ReactNode;
  details?: string[];
};

type Props = {
  steps: TimelineStep[];
  /** Lets the parent page control how each step reveals (framer-motion, GSAP, or none) without ProcessTimeline depending on either. */
  renderStep?: (index: number, content: ReactNode) => ReactNode;
};

export default function ProcessTimeline({ steps, renderStep }: Props) {
  const wrap = renderStep ?? ((_i: number, node: ReactNode) => node);

  return (
    <div className="timeline">
      {steps.map((step, i) =>
        wrap(
          i,
          <div key={step.number} className="timeline-row">
            <div className="timeline-node-col">
              <div className="timeline-node">{step.icon ?? step.number}</div>
              {i < steps.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <span className="timeline-number">{step.number}</span>
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-desc">{step.desc}</p>
              {step.details && (
                <ul className="timeline-details">
                  {step.details.map((d) => (
                    <li key={d}>
                      <span className="timeline-check">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )
      )}

      <style>{`
        .timeline { display: flex; flex-direction: column; }
        .timeline-row { display: flex; gap: 28px; }
        .timeline-node-col { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        .timeline-node {
          width: 56px; height: 56px; border-radius: 50%;
          background-color: rgba(76,175,80,0.12); border: 1px solid rgba(76,175,80,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #4CAF50; flex-shrink: 0;
        }
        .timeline-line { width: 2px; flex: 1; min-height: 24px; background: linear-gradient(#4CAF50, rgba(76,175,80,0.15)); margin: 6px 0; }
        .timeline-content { flex: 1; padding-bottom: 40px; }
        .timeline-number { font-family: var(--font-poppins); font-size: 13px; font-weight: 400; color: #4CAF50; letter-spacing: 0.08em; }
        .timeline-title { font-family: var(--font-poppins); font-size: 22px; font-weight: 400; color: #fff; letter-spacing: -0.5px; margin: 4px 0 10px; }
        .timeline-desc { font-size: 15px; color: #7A7A9A; line-height: 1.75; }
        .timeline-details { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
        .timeline-details li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #ccc; }
        .timeline-check { color: #4CAF50; font-weight: 700; font-size: 13px; margin-top: 1px; flex-shrink: 0; }
        @media (max-width: 560px) {
          .timeline-row { gap: 18px; }
          .timeline-node { width: 44px; height: 44px; }
        }
      `}</style>
    </div>
  );
}
