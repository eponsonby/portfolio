import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './Work.module.css';
import { blogPosts } from '../../data/blogPosts.js';

const thingsBuilt = [
  {
    title: 'Media Tracker',
    desc: 'A Notion-backed book, movie, and show log with a Python CLI that pulls metadata from TMDb and Open Library.',
    tags: ['Python', 'Notion API'],
  },
  {
    title: 'This site',
    desc: "The portfolio you're looking at right now — React front end, Notion as the data backend.",
    tags: ['React', 'Vite'],
  },
];

// Flip to true whenever you're ready to show this section again.
const SHOW_APPS_I_LIKE = false;

// Placeholder — swap for the apps you actually reach for.
const appsILike = [
  { name: 'Notion', url: 'https://notion.so', blurb: 'Runs basically every list in my life, including this site’s data.' },
  { name: 'Linear', url: 'https://linear.app', blurb: 'The bar every other project tracker gets measured against.' },
  { name: 'Are.na', url: 'https://are.na', blurb: 'A quiet place to collect things without an algorithm getting involved.' },
];

export default function Work() {
  const latestPost = blogPosts[0];

  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Work</p>
        <h1 className={shared.title}>Work</h1>
        <p className={shared.desc}>What I build for a living, and the tools I build it with.</p>
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

      {SHOW_APPS_I_LIKE && (
        <section className={shared.section}>
          <p className={shared.sectionTitle}>Apps I like</p>
          <div className={shared.cardGrid}>
            {appsILike.map((app) => (
              <Card key={app.name} className={styles.appCard}>
                <div className={styles.appName}>
                  <h3>{app.name}</h3>
                  <a className={styles.appLink} href={app.url} target="_blank" rel="noreferrer">
                    Visit ↗
                  </a>
                </div>
                <p>{app.blurb}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className={shared.sectionNarrow}>
        <p className={shared.sectionTitle}>From the blog</p>
        <Card as={Link} to={`/work/blog/${latestPost.slug}`} viewTransition className={styles.blogPreviewCard}>
          <div>
            <p className={styles.blogPreviewTitle}>{latestPost.title}</p>
            <p className={styles.blogPreviewMeta}>{latestPost.date}</p>
          </div>
          <span className={styles.blogPreviewLink}>Read the blog →</span>
        </Card>
      </section>
    </>
  );
}
