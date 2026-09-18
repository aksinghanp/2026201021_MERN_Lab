import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/notes';

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.75h7.8L19 7.95v12.3H7V3.75Z" />
      <path d="M14.5 3.75v4.5H19M10 12h6M10 15.5h6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.75 7.25h14.5M9.5 3.75h5l1 3.5h-7l1-3.5ZM7 7.25l.75 13h8.5l.75-13M10 11v5.5M14 11v5.5" />
    </svg>
  );
}

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(API_URL);
        setNotes(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Could not load your notes. Is the server running?');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      setError('Please enter both a title and some content.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await axios.post(API_URL, {
        title: cleanTitle,
        content: cleanContent,
      });
      setNotes((currentNotes) => [response.data, ...currentNotes]);
      setTitle('');
      setContent('');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not save the note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setError('');

    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((currentNotes) => currentNotes.filter((note) => note._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not delete the note. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date));

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Student Notes home">
          <span className="brand-mark"><NoteIcon /></span>
          <span>Student Notes</span>
        </a>
        <span className="course-label">MERN LAB</span>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">YOUR STUDY SPACE</p>
          <h1 id="page-title">Capture what matters.</h1>
          <p className="hero-copy">
            Keep class ideas, quick reminders, and study notes together in one clean place.
          </p>
        </section>

        <section className="workspace">
          <form className="note-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <div>
                <p className="section-kicker">NEW NOTE</p>
                <h2>Add something worth remembering</h2>
              </div>
              <span className="form-number">01</span>
            </div>

            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. MongoDB revision"
              maxLength="100"
              required
            />

            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write down your thought, task, or study note..."
              rows="6"
              maxLength="1000"
              required
            />

            <div className="form-footer">
              <span>{content.length}/1000</span>
              <button className="primary-button" type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Add note'}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>

          <section className="notes-section" aria-labelledby="notes-heading">
            <div className="notes-heading-row">
              <div>
                <p className="section-kicker">YOUR COLLECTION</p>
                <h2 id="notes-heading">Recent notes</h2>
              </div>
              <span className="note-count">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </span>
            </div>

            {error && <div className="error-message" role="alert">{error}</div>}

            {loading ? (
              <div className="status-card" role="status">
                <span className="spinner" />
                <p>Loading your notes…</p>
              </div>
            ) : notes.length === 0 ? (
              <div className="status-card empty-state">
                <span className="empty-icon"><NoteIcon /></span>
                <h3>A fresh page</h3>
                <p>No notes yet — add one above!</p>
              </div>
            ) : (
              <div className="notes-grid">
                {notes.map((note, index) => (
                  <article className="note-card" key={note._id}>
                    <div className="card-topline">
                      <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => handleDelete(note._id)}
                        disabled={deletingId === note._id}
                        aria-label={`Delete ${note.title}`}
                      >
                        <TrashIcon />
                        <span>{deletingId === note._id ? 'Deleting…' : 'Delete'}</span>
                      </button>
                    </div>
                    <h3>{note.title}</h3>
                    <p className="note-content">{note.content}</p>
                    <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

      <footer>
        <span>Student Notes</span>
        <span>Built with MongoDB · Express · React · Node</span>
      </footer>
    </div>
  );
}

export default App;

