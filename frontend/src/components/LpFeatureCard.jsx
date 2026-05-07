export default function LpFeatureCard({ icon, iconBg, iconColor, title, description }) {
  return (
    <div className="lp-feature-card">
      <div className="lp-feature-icon" style={{ background: iconBg, border: `1px solid ${iconColor}28`, color: iconColor }}>
        {icon}
      </div>
      <h3 className="lp-feature-title">{title}</h3>
      <p className="lp-feature-desc">{description}</p>
    </div>
  );
}
