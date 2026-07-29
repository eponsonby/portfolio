import shared from '../../styles/shared.module.css';
import MediaGrid from '../../components/MediaGrid/MediaGrid.jsx';
import { getMediaData } from '../../data/getMediaData.js';

export default function Watching() {
  const watched = getMediaData().filter((item) => item.type === 'Movie' || item.type === 'Show');

  return (
    <>
      <div className={shared.pageHeader}>
        <p className={shared.eyebrow}>Play / Watching</p>
        <h1 className={shared.title}>Watching</h1>
        <p className={shared.desc}>Movies and shows I've watched, and whether they were worth it.</p>
      </div>

      <section className={shared.section}>
        <MediaGrid
          items={watched}
          emptyMessage={
            <>
              Nothing logged yet — run <code>npm run fetch-data</code> once your Notion Media Log has movie or show entries in it.
            </>
          }
        />
      </section>
    </>
  );
}
