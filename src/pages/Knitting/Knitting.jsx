import Card from '../../components/Card/Card.jsx';
import ProgressPill from '../../components/ProgressPill/ProgressPill.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Knitting.module.css';
import { getKnittingData } from '../../data/getKnittingData.js';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Most recent first (by the given field); items missing that field sort last.
function sortByRecent(items, field) {
  return [...items].sort((a, b) => {
    if (!a[field] && !b[field]) return 0;
    if (!a[field]) return 1;
    if (!b[field]) return -1;
    return b[field].localeCompare(a[field]);
  });
}

export default function Knitting() {
  const projects = getKnittingData();
  const inProgress = sortByRecent(projects.filter((p) => p.status === 'In progress'), 'started');
  const finished = sortByRecent(projects.filter((p) => p.status === 'Finished'), 'completed');

  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Play / Knitting</p>
        <h1 className={shared.title}>Knitting</h1>
        <p className={shared.desc}>Current WIPs and finished objects.</p>
      </div>

      {inProgress.length > 0 && (
        <section className={shared.sectionNarrow}>
          <p className={shared.sectionTitle}>On the needles</p>
          <div className={styles.wipList}>
            {inProgress.map((item) => (
              <Card key={item.id} className={styles.wipCard}>
                <div className={styles.wipHeader}>
                  <div className={styles.wipNames}>
                    <h3 className={styles.wipName}>{item.name}</h3>
                    {item.patternName && item.patternName !== item.name && (
                      <p className={styles.wipPattern}>{item.patternName}</p>
                    )}
                  </div>
                  {item.progress != null && <span className={`${styles.wipPct} tabular-nums`}>{item.progress}%</span>}
                </div>
                {item.progress != null && <ProgressPill pct={item.progress} color="var(--raspberry)" />}
                {item.started && <p className={styles.wipMeta}>Started {formatDate(item.started)}</p>}
              </Card>
            ))}
          </div>
        </section>
      )}

      {finished.length > 0 && (
        <section className={shared.section}>
          <p className={shared.sectionTitle}>Finished objects</p>
          <div className={styles.gallery}>
            {finished.map((item) => (
              <div key={item.id} className={styles.galleryItem}>
                {item.photoUrl ? (
                  <img className={styles.galleryPhoto} src={item.photoUrl} alt={`${item.name} photo`} />
                ) : (
                  <div className={styles.galleryPhotoPlaceholder} aria-hidden="true" />
                )}
                <p className={styles.galleryName}>{item.name}</p>
                {item.patternName && item.patternName !== item.name && (
                  <p className={styles.galleryPattern}>{item.patternName}</p>
                )}
                {item.completed && <p className={styles.galleryDate}>{formatDate(item.completed)}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
