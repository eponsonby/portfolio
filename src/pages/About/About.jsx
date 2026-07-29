import Card from '../../components/Card/Card.jsx';
import shared from '../../styles/shared.module.css';
import styles from './About.module.css';

// Placeholder — LinkedIn/GitHub hrefs need your real profile URLs.
const links = [
  { label: 'Email', href: 'mailto:erinponsonby@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/erinponsonby/', newTab: true },
  { label: 'GitHub', href: 'https://github.com/eponsonby', newTab: true },
  { label: 'Resume', href: '/Erin-Ponsonby-Resume.pdf', newTab: true },
];

export default function About() {
  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>About</p>
        <h1 className={shared.title}>About</h1>
      </div>

      <section className={shared.section}>
        <div className={styles.layout}>
          <div className={styles.bio}>
            {/* Placeholder bio — swap in your real story. */}
            <p>
              I'm a product manager based in New York City. During the day I build software; outside of
              it I build almost everything else — spreadsheets for my hobbies included.
            </p>
            <p>
              This site is where the two sides live side by side: the things I ship at work, and the
              things I make, walk, read, and knit when I'm not working.
            </p>
          </div>

          <Card className={styles.sidebar}>
            <p className={styles.sidebarTitle}>Connect</p>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.linkRow}
                {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                <span>→</span>
              </a>
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
