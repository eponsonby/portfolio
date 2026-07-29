import styles from './BlobBarChart.module.css';

export default function BlobBarChart({ values, colors, labels, caption, ariaLabel }) {
  const max = Math.max(...values, 1);

  return (
    <div>
      <div className={styles.chart} role="img" aria-label={ariaLabel ?? caption}>
        {values.map((v, i) => (
          <div key={i} className={styles.barSlot}>
            <div className={styles.barTrack}>
              <span
                className={styles.bar}
                style={{ height: `${Math.max((v / max) * 100, 8)}%`, background: colors[i % colors.length] }}
              />
            </div>
            {labels && <span className={styles.barLabel}>{labels[i]}</span>}
          </div>
        ))}
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
