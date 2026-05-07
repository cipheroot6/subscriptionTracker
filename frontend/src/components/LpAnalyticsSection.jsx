import LpAnalyticsPreview from './LpAnalyticsPreview';
import { CheckIcon } from './lp-icons';

export default function LpAnalyticsSection() {
  return (
    <section className="lp-analytics" id="analytics">
      <div className="lp-container">
        <div className="lp-analytics-grid">
          <div className="lp-analytics-left">
            <span className="lp-section-label">Analytics</span>
            <h2 className="lp-section-h">Insights that actually mean something</h2>
            <p className="lp-section-sub" style={{ marginBottom: '2rem' }}>
              Not just a table of numbers. A set of visual charts designed to answer
              the questions you actually care about.
            </p>
            <div className="lp-analytics-points">
              {[
                { title: 'Category breakdown',  desc: 'Donut chart of where your money goes — entertainment, dev tools, health, education and more.' },
                { title: 'Top subscriptions',   desc: "Ranked by monthly cost with each one's share of your total spend shown as a visual bar." },
                { title: 'Payment method view', desc: 'See exactly how much is charged to each card or payment method every month.' },
                { title: 'Status distribution', desc: 'Visual split of active vs. canceled vs. expired subscriptions across your whole account.' },
              ].map(({ title, desc }) => (
                <div className="lp-analytics-point" key={title}>
                  <div className="lp-analytics-check"><CheckIcon /></div>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-analytics-right">
            <LpAnalyticsPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
