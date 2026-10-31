import { useLanguage } from "../../LanguageContext";
import { useEffect, useId, useRef, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';

export default function ProjectDemo({ project, expanded = false }) {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const captionId = useId();
  const [inView, setInView] = useState(false);
  const [autoAllowed, setAutoAllowed] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    const update = () => {
      const allowed = !preference.matches && !connection?.saveData;
      setAutoAllowed(allowed);
      if (!allowed) setManualPlay(false);
    };
    update();
    preference.addEventListener('change', update);
    connection?.addEventListener?.('change', update);
    return () => {
      preference.removeEventListener('change', update);
      connection?.removeEventListener?.('change', update);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (inView && (manualPlay || (autoAllowed && !userPaused))) {
      if (!loaded) { setLoaded(true); return; }
      video.play().catch(() => setPlaying(false));
    } else video.pause();
  }, [autoAllowed, failed, inView, loaded, manualPlay, userPaused]);

  function handlePlay() {
    setPlaying(true);
    if (expanded) { setManualPlay(true); setUserPaused(false); }
  }

  function handlePause() {
    setPlaying(false);
    if (expanded && inView) { setManualPlay(false); setUserPaused(true); }
  }

  function togglePlayback() {
    if (playing) {
      setManualPlay(false);
      setUserPaused(true);
      videoRef.current?.pause();
    } else {
      setUserPaused(false);
      setManualPlay(true);
      setLoaded(true);
      if (loaded) videoRef.current?.play().catch(() => setPlaying(false));
    }
  }

  return (
    <figure className="project-demo">
      {failed ? <img className="demo-poster" src={project.imageURL} alt={project.imageAlt} width="1280" height="900" /> : (
        <video ref={videoRef} className="project-demo-video" src={loaded ? project.videoURL : undefined} poster={project.imageURL} muted loop playsInline controls={expanded} preload="none" width="1280" height="900" aria-label={t('Portal navigation demo')} aria-describedby={captionId} onPlay={handlePlay} onPause={handlePause} onError={() => setFailed(true)} />
      )}
      <div className="demo-controls">
        {!failed && <button className="text-link demo-toggle" type="button" onClick={togglePlayback} aria-label={t(playing ? 'Pause Portal demo' : 'Play Portal demo')}>{playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}{t(playing ? 'Pause demo' : 'Play demo')}</button>}
      </div>
      <figcaption id={captionId}>{t(failed ? 'Video unavailable. A still preview is shown.' : 'Recorded navigation · Original French interface')}</figcaption>
    </figure>
  );
}
