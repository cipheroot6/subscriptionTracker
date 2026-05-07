export default function LpProofStrip() {
  return (
    <div className="lp-proof-strip">
      <div className="lp-container">
        <div className="lp-proof-grid">
          {[
            { val: '$200+', label: 'avg. saved per year'       },
            { val: '5 min', label: 'to set up your dashboard'  },
            { val: '100%',  label: 'your data, always'         },
            { val: '0',     label: 'annoying upsells'          },
          ].map(({ val, label }) => (
            <div className="lp-proof-stat" key={label}>
              <span className="lp-proof-val">{val}</span>
              <span className="lp-proof-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}