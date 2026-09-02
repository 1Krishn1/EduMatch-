import { useEffect, useMemo, useState } from "react";
import FilterBar from "../components/tutors/FilterBar.jsx";
import TutorList from "../components/tutors/TutorList.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { loadTutors } from "../data/loadTutors.js";

export default function Mentors() {
  const [tutors, setTutors] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("all");
  const [mode, setMode] = useState("all");
  const [sort, setSort] = useState("rating");

  useEffect(() => {
    let active = true;
    loadTutors()
      .then((list) => {
        if (!active) return;
        setTutors(list);
        setStatus("ready");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Could not load mentors.");
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  const subjects = useMemo(
    () => [...new Set(tutors.map((item) => item.subject))].sort(),
    [tutors]
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = tutors.filter((item) => {
      const haystack = `${item.name} ${item.subject} ${(item.topics || []).join(" ")}`.toLowerCase();
      const matchesQuery = term ? haystack.includes(term) : true;
      const matchesSubject = subject === "all" || item.subject === subject;
      const matchesMode = mode === "all" || item.mode === mode;
      return matchesQuery && matchesSubject && matchesMode;
    });

    return filtered.sort((a, b) => {
      if (sort === "price-low") return a.rate - b.rate;
      if (sort === "price-high") return b.rate - a.rate;
      if (sort === "name") return a.name.localeCompare(b.name);
      return b.rating - a.rating;
    });
  }, [tutors, query, subject, mode, sort]);

  if (status === "loading") return <Spinner />;
  if (status === "error") {
    return <EmptyState title="Could not load mentors" message={error} />;
  }

  return (
    <section>
      <h1>Find mentors</h1>
      <p className="muted">
        {visible.length} mentor{visible.length === 1 ? "" : "s"} shown
      </p>
      <FilterBar
        query={query}
        subject={subject}
        mode={mode}
        sort={sort}
        subjects={subjects}
        onQuery={setQuery}
        onSubject={setSubject}
        onMode={setMode}
        onSort={setSort}
      />
      <TutorList tutors={visible} />
    </section>
  );
}