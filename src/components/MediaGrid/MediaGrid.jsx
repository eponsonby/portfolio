import Card from '../Card/Card.jsx';
import { sortByRecent } from '../../utils.js';
import styles from './MediaGrid.module.css';

export default function MediaGrid({ items, emptyMessage }) {
  if (items.length === 0) {
    return <Card className={styles.emptyState}>{emptyMessage}</Card>;
  }

  return (
    <Card className={styles.list}>
      {sortByRecent(items, 'dateFinished').map((item) => (
        <div key={item.id} className={styles.row}>
          {item.coverUrl ? (
            <img className={styles.cover} src={item.coverUrl} alt={`${item.title} cover`} />
          ) : (
            <div className={styles.coverPlaceholder} aria-hidden="true" />
          )}
          <div className={styles.rowText}>
            <p className={styles.itemTitle}>{item.title}</p>
            {item.creator && <p className={styles.itemCreator}>{item.creator}</p>}
          </div>
          <div className={styles.itemMeta}>
            {item.rating != null && <span className="tabular-nums">★ {item.rating}</span>}
            {item.status && <span>{item.status}</span>}
          </div>
        </div>
      ))}
    </Card>
  );
}
