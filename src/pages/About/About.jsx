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
            <p>
              Brooklyn based product manager. At work, I love to collaborate with kind, growth-minded folks to build software. Outside of it, you'll find me
              running around the city, ostensibly for exercise, attempting to knit something way above my paygrade, and general shenanigan-ing.
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
