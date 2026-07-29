import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import styles from './Nav.module.css';

const links = [
  { to: '/work', label: 'Work' },
  { to: '/play', label: 'Play' },
  { to: '/about', label: 'About' },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 0 0 11.2 11.2Z" />
    </svg>
  );
}

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.nav} aria-label="Primary">
      <NavLink to="/" className={styles.brand}>
        erin p.
      </NavLink>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              viewTransition
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
