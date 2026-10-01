export default function FilterBar({
  query,
  subject,
  mode,
  sort,
  subjects,
  onQuery,
  onSubject,
  onMode,
  onSort,
}) {
  return (
    <form className="card filters" onSubmit={(e) => e.preventDefault()}>
      <div className="field">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Name, subject or topic"
        />
      </div>

      <div className="field">
        <label htmlFor="subject">Subject</label>
        <select id="subject" value={subject} onChange={(e) => onSubject(e.target.value)}>
          <option value="all">All subjects</option>
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="mode">Mode</label>
        <select id="mode" value={mode} onChange={(e) => onMode(e.target.value)}>
          <option value="all">Any mode</option>
          <option value="Online">Online</option>
          <option value="Hybrid">Hybrid</option>
          <option value="In person">In person</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort</label>
        <select id="sort" value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="rating">Highest rating</option>
          <option value="price-low">Lowest rate</option>
          <option value="price-high">Highest rate</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </form>
  );
}
