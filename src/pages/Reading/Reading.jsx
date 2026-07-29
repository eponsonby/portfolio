import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Reading.module.css';
import MediaGrid from '../../components/MediaGrid/MediaGrid.jsx';
import { getMediaData } from '../../data/getMediaData.js';

// Notion date-only strings ("2026-05-24") parse as UTC midnight if handed
// straight to `new Date()`, which can shift a day off in local time — build
// the date from its parts instead.
function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function sortByRecent(items, field) {
  return [...items].sort((a, b) => {
    if (!a[field] && !b[field]) return 0;
    if (!a[field]) return 1;
    if (!b[field]) return -1;
    return b[field].localeCompare(a[field]);
  });
}

export default function Reading() {
  const books = getMediaData().filter((item) => item.type === 'Book');
  const inProgress = sortByRecent(books.filter((b) => b.status === 'In Progress'), 'dateStarted');
  const finished = books.filter((b) => b.status === 'Finished');

  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Play / Reading</p>
        <h1 className={shared.title}>Reading</h1>
        <p className={shared.desc}>Books I'm reading, and books I've read.</p>
      </div>

      {inProgress.length > 0 && (
        <section className={shared.sectionNarrow}>
          <p className={shared.sectionTitle}>Currently reading</p>
          <div className={styles.wipList}>
            {inProgress.map((item) => (
              <Card key={item.id} className={styles.wipCard}>
                {item.coverUrl ? (
                  <img className={styles.wipCover} src={item.coverUrl} alt={`${item.title} cover`} />
                ) : (
                  <div className={styles.wipCoverPlaceholder} aria-hidden="true" />
                )}
                <div className={styles.wipText}>
                  <h3 className={styles.wipTitle}>{item.title}</h3>
                  {item.creator && <p className={styles.wipCreator}>{item.creator}</p>}
                  {item.dateStarted && <p className={styles.wipMeta}>Started {formatDate(item.dateStarted)}</p>}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className={shared.section}>
        {finished.length > 0 && <p className={shared.sectionTitle}>Finished</p>}
        <MediaGrid
          items={finished}
          emptyMessage={
            <>
              Nothing logged yet — run <code>npm run fetch-data</code> once your Notion Media Log has book entries in it.
            </>
          }
        />
      </section>
    </>
  );
}
