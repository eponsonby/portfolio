import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import ProgressPill from '../../components/ProgressPill/ProgressPill.jsx';
import BlobBarChart from '../../components/BlobBarChart/BlobBarChart.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Home.module.css';

// Placeholder until the Notion/Strava data pipelines are wired up.
const knittingWips = [
  { label: 'Sweater', pct: 80, color: 'var(--raspberry)' },
  { label: 'Socks', pct: 45, color: 'var(--mint)' },
  { label: 'Blanket', pct: 20, color: 'var(--marigold)' },
];

const weekMiles = [2.1, 3.8, 1.4, 4.9, 2.8, 6.2, 1.0];
const weekColors = ['var(--mint)', 'var(--mint)', 'var(--marigold)', 'var(--mint)', 'var(--marigold)', 'var(--raspberry)', 'var(--marigold)'];
const totalMiles = weekMiles.reduce((a, b) => a + b, 0).toFixed(1);

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>product manager, nyc</p>
          <h1 className={styles.headline}>
            Work stuff &amp;
            <br />
            <mark>play stuff.</mark>
          </h1>
          <p className={styles.sub}>One product manager, several spreadsheets' worth of hobbies.</p>
        </div>
      </section>

      <section className={shared.section}>
        <div className={shared.cardGrid}>
          <Link to="/work" viewTransition className={styles.hubCard}>
            <h3>Work</h3>
            <p>What I build for a living — resume, projects, apps I like, and a short-form blog.</p>
            <span className={styles.hubCardLink}>Explore Work →</span>
          </Link>
          <Link to="/play" viewTransition className={styles.hubCard}>
            <h3>Play</h3>
            <p>What I build for fun — knitting, running, yoga, media, and blocks walked around NYC.</p>
            <span className={styles.hubCardLink}>Explore Play →</span>
          </Link>
          <Link to="/about" viewTransition className={styles.hubCard}>
            <h3>About</h3>
            <p>The person behind the spreadsheets.</p>
            <span className={styles.hubCardLink}>Read more →</span>
          </Link>
        </div>
      </section>

      <section className={shared.section}>
        <p className={shared.sectionTitle}>Right now</p>
        <div className={shared.cardGrid}>
          <Card>
            <p className={styles.widgetTitle}>Currently reading</p>
            <p className={styles.readingTitle}>Demon Copperhead</p>
            <p className={styles.readingAuthor}>Barbara Kingsolver</p>
            <ProgressPill pct={64} color="var(--raspberry)" />
            <p className={`${styles.readingPct} tabular-nums`}>64% through</p>
          </Card>

          <Card>
            <p className={styles.widgetTitle}>This week: running</p>
            <p className={`${styles.milesStat} tabular-nums`}>{totalMiles} mi</p>
            <BlobBarChart values={weekMiles} colors={weekColors} caption="Mon → Sun" ariaLabel={`${totalMiles} miles this week, Monday through Sunday`} />
          </Card>

          <Card>
            <p className={styles.widgetTitle}>On the needles</p>
            <div className={styles.pillRow}>
              {knittingWips.map((wip) => (
                <ProgressPill key={wip.label} label={wip.label} pct={wip.pct} color={wip.color} />
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
