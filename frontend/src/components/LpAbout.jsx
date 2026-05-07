import { CheckIcon, CodeIcon, ExternalLinkIcon } from './lp-icons';

export default function LpAbout() {
  return (
    <section className="lp-about" id="about">
      <div className="lp-container">
        <div className="lp-about-card">
          <div className="lp-about-left">
            <div className="lp-about-tag">
              <CodeIcon /> Built by a developer
            </div>
            <h2 className="lp-about-h">Need something built like this?</h2>
            <p className="lp-about-p">
              Subscription Tracker is a production-grade full-stack application — React + Vite frontend,
              Express.js backend, MongoDB, JWT auth, background workflows, and security middleware —
              deployed on Vercel. No tutorials followed, no boilerplate copied.
            </p>
            <p className="lp-about-p">
              I build clean, fast, maintainable web apps. If you have a product idea
              or need a developer who can take it from zero to shipped, let's talk.
            </p>

            <div className="lp-stack-list">
              {[
                { label: 'Frontend', pills: ['React', 'Vite', 'CSS Modules'],            color: 'blue'   },
                { label: 'Backend',  pills: ['Node.js', 'Express', 'MongoDB'],            color: 'green'  },
                { label: 'Infra',    pills: ['Vercel', 'JWT Auth', 'Upstash', 'Arcjet'],  color: 'purple' },
              ].map(({ label, pills, color }) => (
                <div key={label} className="lp-stack-row">
                  <span className="lp-stack-label">{label}</span>
                  <div className="lp-stack-pills">
                    {pills.map((p) => (
                      <span key={p} className={`lp-stack-pill ${color}`}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="lp-about-ctas">
              <a href="mailto:cipheroot@proton.me" className="lp-btn-primary lp-btn-sm">
                Get in touch <ExternalLinkIcon />
              </a>
              <a href="https://github.com/cipheroot6" target="_blank" rel="noopener noreferrer" className="lp-btn-ghost lp-btn-sm">
                View on GitHub
              </a>
            </div>
          </div>

          <div className="lp-about-right">
            <div className="lp-skills-card">
              <div className="lp-skills-title">What I can build for you</div>
              <div className="lp-skills-list">
                {[
                  'SaaS web applications end-to-end',
                  'REST APIs & backend services',
                  'Authentication & user management',
                  'Admin dashboards & analytics',
                  'Real-time features & notifications',
                  'Database design & optimisation',
                  'Deployment pipelines (Vercel / Railway)',
                  'Performance & security reviews',
                ].map((item) => (
                  <div className="lp-skill-item" key={item}>
                    <div className="lp-skill-check"><CheckIcon /></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
