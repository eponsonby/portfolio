import styles from './ProgressPill.module.css';

export default function ProgressPill({ label, pct, color = 'var(--raspberry)', labelWidth, showPct = false }) {
  return (
    <div className={styles.pill} style={labelWidth ? { '--label-width': labelWidth } : undefined}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.track}>
        <span style={{ width: `${pct}%`, background: color }} />
      </span>
      {showPct && <span className={`${styles.pct} tabular-nums`}>{pct}%</span>}
    </div>
  );
}
