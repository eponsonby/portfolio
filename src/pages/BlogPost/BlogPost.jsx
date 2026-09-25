import { Link, useParams } from 'react-router-dom';
import shared from '../../styles/shared.module.css';
import styles from './BlogPost.module.css';
import { blogPosts } from '../../data/blogPosts.js';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Work / Blog</p>
        <h1 className={shared.title}>Post not found</h1>
        <Link to="/blog" className={styles.backLink}>
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className={shared.pageHeader}>
      <Link to="/blog" viewTransition className={styles.backLink}>
        ← Back to blog
      </Link>
      <p className={shared.eyebrow}>Work / Blog</p>
      <h1 className={shared.title}>{post.title}</h1>
      <p className={styles.meta}>{post.date}</p>
      {post.body.trim().split(/\n\s*\n/).flatMap((block, i) => {
        const trimmed = block.trim();
        if (!trimmed.startsWith('## ')) {
          return [
            <p key={i} className={styles.body}>
              {trimmed}
            </p>,
          ];
        }
        const [headingLine, ...rest] = trimmed.split('\n');
        const elements = [
          <h2 key={`${i}-heading`} className={styles.heading}>
            {headingLine.slice(3)}
          </h2>,
        ];
        const restText = rest.join('\n').trim();
        if (restText) {
          elements.push(
            <p key={`${i}-body`} className={styles.body}>
              {restText}
            </p>
          );
        }
        return elements;
      })}
    </div>
  );
}
