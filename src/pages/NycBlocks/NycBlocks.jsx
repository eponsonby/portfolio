import Card from '../../components/Card/Card.jsx';
import ProgressPill from '../../components/ProgressPill/ProgressPill.jsx';
import shared from '../../styles/shared.module.css';
import styles from './NycBlocks.module.css';

// Example numbers only — real tracking pipeline (Apple Watch → Strava →
// street-segment matching) is planned but not built yet.
const boroughs = [
  { name: 'Manhattan', pct: 62, color: 'var(--raspberry)' },
  { name: 'Brooklyn', pct: 18, color: 'var(--mint)' },
];

export default function NycBlocks() {
  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Play / Walking in NYC</p>
        <h1 className={shared.title}>Walking in NYC</h1>
        <p className={shared.desc}>Tracking every block I've walked across Manhattan and Brooklyn.</p>
      </div>

      <section className={shared.sectionNarrow}>
        <Card className={styles.noteCard}>
          I currently track my walks with WalkNYC. Live data here is a work in progress — the plan is an
          Apple Watch → Strava pipeline that matches my GPS trail against NYC's street grid. Until that's
          built, here's what the finished widget will look like.
        </Card>

        <Card className={styles.progressCard}>
          {boroughs.map((borough) => (
            <div key={borough.name} className={styles.borough}>
              <div className={styles.boroughHeader}>
                <span className={styles.boroughName}>{borough.name}</span>
                <span className={`${styles.boroughPct} tabular-nums`}>{borough.pct}%</span>
              </div>
              <ProgressPill pct={borough.pct} color={borough.color} />
            </div>
          ))}
          <p className={styles.exampleTag}>Example data, not live yet</p>
        </Card>
      </section>
    </>
  );
}
