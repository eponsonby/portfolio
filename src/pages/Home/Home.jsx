import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import ProgressPill from '../../components/ProgressPill/ProgressPill.jsx';
import BlobBarChart from '../../components/BlobBarChart/BlobBarChart.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Home.module.css';
import { getMediaData } from '../../data/getMediaData.js';
import { getRunningData } from '../../data/getRunningData.js';
import { getKnittingData } from '../../data/getKnittingData.js';

const WIP_COLORS = ['var(--raspberry)', 'var(--mint)', 'var(--marigold)'];

// Monday-start of the week containing `date` — matches Running.jsx.
function weekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function Home() {
  // Currently reading: the in-progress book, or fall back to the most
  // recently finished one so this widget is never just empty.
  const books = getMediaData().filter((b) => b.type === 'Book');
  const reading =
    books.find((b) => b.status === 'In Progress') ??
    [...books].filter((b) => b.dateFinished).sort((a, b) => b.dateFinished.localeCompare(a.dateFinished))[0] ??
    null;

  // This week's running, Monday-start, same logic as Running.jsx.
  const runs = getRunningData();
  const start = weekStart(new Date());
  const thisWeek = runs.filter((r) => new Date(r.date) >= start);
  const totalMiles = thisWeek.reduce((sum, r) => sum + r.distanceMiles, 0);
  const dayMiles = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    return thisWeek
      .filter((r) => new Date(r.date) >= day && new Date(r.date) < nextDay)
      .reduce((sum, r) => sum + r.distanceMiles, 0);
  });
  const dayColors = ['var(--mint)', 'var(--marigold)', 'var(--mint)', 'var(--marigold)', 'var(--mint)', 'var(--raspberry)', 'var(--marigold)'];

  // On the needles: real in-progress Ravelry projects.
  const knittingWips = getKnittingData()
    .filter((p) => p.status === 'In progress')
    .map((p, i) => ({ label: p.name, pct: p.progress ?? 0, color: WIP_COLORS[i % WIP_COLORS.length] }));

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
            {reading ? (
              <>
                <p className={styles.readingTitle}>{reading.title}</p>
                {reading.creator && <p className={styles.readingAuthor}>{reading.creator}</p>}
                <p className={`${styles.readingPct} tabular-nums`}>
                  {reading.status === 'In Progress' ? 'In progress' : 'Last finished'}
                </p>
              </>
            ) : (
              <p className={styles.readingAuthor}>Nothing logged yet.</p>
            )}
          </Card>

          <Card>
            <p className={styles.widgetTitle}>This week: running</p>
            <p className={`${styles.milesStat} tabular-nums`}>{totalMiles.toFixed(1)} mi</p>
            <BlobBarChart values={dayMiles} colors={dayColors} caption="Mon → Sun" ariaLabel={`${totalMiles.toFixed(1)} miles this week, Monday through Sunday`} />
          </Card>

          <Card>
            <p className={styles.widgetTitle}>On the needles</p>
            {knittingWips.length > 0 ? (
              <div className={styles.pillRow}>
                {knittingWips.map((wip) => (
                  <ProgressPill key={wip.label} label={wip.label} pct={wip.pct} color={wip.color} labelWidth="110px" />
                ))}
              </div>
            ) : (
              <p className={styles.readingAuthor}>Nothing on the needles right now.</p>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}
