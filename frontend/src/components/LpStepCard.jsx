export default function LpStepCard({ number, numBg, numColor, title, description }) {
  return (
    <div className="lp-step-card">
      <div className="lp-step-num" style={{ background: numBg, color: numColor }}>{number}</div>
      <h3 className="lp-step-title">{title}</h3>
      <p className="lp-step-desc">{description}</p>
    </div>
  );
}
