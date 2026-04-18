import './SubscriptionFilters.css';

const STATUSES = ['all', 'active', 'expired', 'canceled', 'pending'];
const CATEGORIES = ['all', 'entertainment', 'sports', 'news', 'education', 'health', 'other'];
const SORTS = [
  { value: 'renewalDate', label: 'Renewal date' },
  { value: 'price', label: 'Price (high–low)' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'createdAt', label: 'Recently added' },
];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export default function SubscriptionFilters({ filters, onChange }) {
  const { search, status, category, sort, view } = filters;

  const set = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <div className="sf-bar">
      <div className="sf-search-wrap">
        <SearchIcon />
        <input
          className="sf-search"
          placeholder="Search subscriptions…"
          value={search}
          onChange={e => set('search', e.target.value)}
        />
      </div>

      <div className="sf-pills">
        {STATUSES.map(s => (
          <button
            key={s}
            className={`sf-pill${status === s ? ' sf-pill--active' : ''}`}
            onClick={() => set('status', s)}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="sf-right">
        <select className="sf-select" value={category} onChange={e => set('category', e.target.value)}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c === 'all' ? 'All categories' : c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <select className="sf-select" value={sort} onChange={e => set('sort', e.target.value)}>
          {SORTS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <div className="sf-view-toggle">
          <button className={`sf-view-btn${view === 'table' ? ' sf-view-btn--active' : ''}`} onClick={() => set('view', 'table')} title="Table view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button className={`sf-view-btn${view === 'cards' ? ' sf-view-btn--active' : ''}`} onClick={() => set('view', 'cards')} title="Card view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
