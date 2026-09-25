import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Work.module.css';
import { blogPosts } from '../../data/blogPosts.js';

const thingsBuilt = [
  {
    title: 'Media tracker',
    desc: 'A Notion backed book, movie, and TV show log with a Python CLI that pulls metadata from TMDB and Open Library.',
    tags: ['Python', 'Notion API', 'Open Library API', 'TMDB API'],
  },
  {
    title: 'This fancy site',
    desc: 'React frontend, data in Notion, various APIs.',
    tags: ['React', 'Vite', 'Strava API', 'Ravelry API', 'Claude Code', 'Vercel'],
  },
];

export default function Work() {
  const latestPost = blogPosts[0];

  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>PM'in</p>
        <h1 className={shared.title}>Work</h1>
        <p className={shared.desc}>Endlessly curious. Always tinkering.</p>
      </div>

      <section className={shared.sectionNarrow}>
        <Card className={styles.resumeCard}>
          <div>
            <p className={styles.resumeName}>Erin Ponsonby</p>
            <p className={styles.resumeRole}>Product Manager · NYC</p>
          </div>
          <a className={styles.button} href="/Erin-Ponsonby-Resume.pdf" download>
            Download resume
          </a>
        </Card>
      </section>

      <section className={shared.section}>
        <p className={shared.sectionTitle}>Things I've built</p>
        <div className={shared.cardGrid}>
          {thingsBuilt.map((item) => (
            <Card key={item.title} className={styles.builtCard}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className={styles.tagRow}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
          <Card className={`${styles.builtCard} ${styles.addSlot}`}>More coming soon</Card>
        </div>
      </section>

    </>
  );
}
