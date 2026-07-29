import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Running.module.css';
import { getRunningData } from '../../data/getRunningData.js';

function formatPace(secPerMile) {
  if (secPerMile == null) return '—';
  const min = Math.floor(secPerMile / 60);
  const sec = Math.round(secPerMile % 60);
  return `${min}:${String(sec).padStart(2, '0')} /mi`;
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}:${String(sec).padStart(2, '0')}`;
}

function formatShortDate(isoStr) {
  return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatMonthYear(isoStr) {
  return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Monday-start of the week containing `date`.
function weekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function Running() {
  const runs = getRunningData();
  const sorted = [...runs].sort((a, b) => new Date(b.date) - new Date(a.date));

  const start = weekStart(new Date());
  const thisWeek = runs.filter((r) => new Date(r.date) >= start);

  const totalMiles = thisWeek.reduce((sum, r) => sum + r.distanceMiles, 0);
  const totalSeconds = thisWeek.reduce((sum, r) => sum + r.movingTimeSeconds, 0);
  const avgPace = totalMiles > 0 ? totalSeconds / totalMiles : null;
  const longestRun = thisWeek.reduce((max, r) => Math.max(max, r.distanceMiles), 0);

  // All-time highlights, computed from the full running history.
  const longestEver = runs.reduce((best, r) => (!best || r.distanceMiles > best.distanceMiles ? r : best), null);
  const fastestEver = runs
    .filter((r) => r.paceSecondsPerMile != null)
    .reduce((best, r) => (!best || r.paceSecondsPerMile < best.paceSecondsPerMile ? r : best), null);
  const earliestRun = sorted.length > 0 ? sorted[sorted.length - 1] : null;
  const yearsRunning = earliestRun ? (Date.now() - new Date(earliestRun.date)) / (1000 * 60 * 60 * 24 * 365.25) : 0;

  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Play / Running</p>
        <h1 className={shared.title}>Running</h1>
      </div>

      <section className={shared.sectionNarrow}>
        <p className={shared.sectionTitle}>This week</p>
        <div className={styles.statRow}>
          <Card className={styles.statCard}>
            <p className={`${styles.statValue} tabular-nums`}>{totalMiles.toFixed(1)}</p>
            <p className={styles.statLabel}>Miles this week</p>
          </Card>
          <Card className={styles.statCard}>
            <p className={`${styles.statValue} tabular-nums`}>{avgPace != null ? formatPace(avgPace).replace(' /mi', '') : '—'}</p>
            <p className={styles.statLabel}>Avg pace /mi</p>
          </Card>
          <Card className={styles.statCard}>
            <p className={`${styles.statValue} tabular-nums`}>{longestRun.toFixed(1)}</p>
            <p className={styles.statLabel}>Longest run (mi)</p>
          </Card>
        </div>

        <p className={shared.sectionTitle}>All-time</p>
        <div className={styles.statRow} style={{ marginBottom: 'var(--space-6)' }}>
          <Card className={styles.statCard}>
            <p className={`${styles.statValue} tabular-nums`}>{longestEver ? longestEver.distanceMiles.toFixed(1) : '—'}</p>
            <p className={styles.statLabel}>Longest run ever (mi)</p>
            {longestEver && <p className={styles.statSub}>{formatMonthYear(longestEver.date)}</p>}
          </Card>
          <Card className={styles.statCard}>
            <p className={`${styles.statValue} tabular-nums`}>{fastestEver ? formatPace(fastestEver.paceSecondsPerMile).replace(' /mi', '') : '—'}</p>
            <p className={styles.statLabel}>Fastest pace /mi</p>
            {fastestEver && <p className={styles.statSub}>{formatMonthYear(fastestEver.date)}</p>}
          </Card>
          <Card className={styles.statCard}>
            <p className={`${styles.statValue} tabular-nums`}>{yearsRunning.toFixed(1)}</p>
            <p className={styles.statLabel}>Years running</p>
            {earliestRun && <p className={styles.statSub}>Since {formatMonthYear(earliestRun.date)}</p>}
          </Card>
        </div>

        <p className={shared.sectionTitle}>Recent runs</p>
        <Card>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Pace</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {sorted.slice(0, 10).map((run) => (
                  <tr key={run.id}>
                    <td>{formatShortDate(run.date)}</td>
                    <td className="tabular-nums">{run.distanceMiles.toFixed(2)} mi</td>
                    <td className="tabular-nums">{formatPace(run.paceSecondsPerMile)}</td>
                    <td className="tabular-nums">{formatDuration(run.movingTimeSeconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </>
  );
}
