import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Play.module.css';

// Walking in NYC and Watching are hidden for now (not deleted — routes still
// work, just off this hub) until there's real data behind them.
const sections = [
  { to: '/play/knitting', title: 'Knitting', desc: 'Current WIPs and finished projects.' },
  { to: '/play/running', title: 'Running', desc: 'Miles, pace, and recent runs.' },
  { to: '/play/reading', title: 'Reading', desc: "Books I'm reading, and books I've read." },
];

export default function Play() {
  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Play</p>
        <h1 className={shared.title}>Outside of work.</h1>
        <p className={shared.desc}>The things that make the work better. Or at least more interesting to talk about.</p>
      </div>

      <section className={shared.section}>
        <div className={shared.cardGrid}>
          {sections.map((section) => (
            <Card key={section.to} as={Link} to={section.to} viewTransition className={styles.card}>
              <h3>{section.title}</h3>
              <p>{section.desc}</p>
              <span className={styles.cardLink}>Explore →</span>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
