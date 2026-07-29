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
        <Link to="/work/blog" className={styles.backLink}>
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className={shared.pageHeader}>
      <Link to="/work/blog" viewTransition className={styles.backLink}>
        ← Back to blog
      </Link>
      <p className={shared.eyebrow}>Work / Blog</p>
      <h1 className={shared.title}>{post.title}</h1>
      <p className={styles.meta}>{post.date}</p>
      <p className={styles.body}>{post.body}</p>
    </div>
  );
}
