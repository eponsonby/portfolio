import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Work from './pages/Work/Work.jsx';
import BlogList from './pages/BlogList/BlogList.jsx';
import BlogPost from './pages/BlogPost/BlogPost.jsx';
import Play from './pages/Play/Play.jsx';
import Knitting from './pages/Knitting/Knitting.jsx';
import Running from './pages/Running/Running.jsx';
import NycBlocks from './pages/NycBlocks/NycBlocks.jsx';
import Reading from './pages/Reading/Reading.jsx';
import Watching from './pages/Watching/Watching.jsx';
import About from './pages/About/About.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route path="work" element={<Work />} />
          <Route path="work/blog" element={<BlogList />} />
          <Route path="work/blog/:slug" element={<BlogPost />} />

          <Route path="play" element={<Play />} />
          <Route path="play/knitting" element={<Knitting />} />
          <Route path="play/running" element={<Running />} />
          <Route path="play/nyc-blocks" element={<NycBlocks />} />
          <Route path="play/reading" element={<Reading />} />
          <Route path="play/watching" element={<Watching />} />

          <Route path="about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
