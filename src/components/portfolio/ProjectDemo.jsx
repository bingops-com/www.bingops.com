import { useEffect, useId, useRef, useState } from 'react';
import { FiDownload, FiPause, FiPlay } from 'react-icons/fi';

export default function ProjectDemo({ project }) {
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
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (inView && (manualPlay || (autoAllowed && !userPaused))) {
      if (!loaded) { setLoaded(true); return; }
      video.play().catch(() => setPlaying(false));
    } else video.pause();
  }, [autoAllowed, failed, inView, loaded, manualPlay, userPaused]);

  function togglePlayback() {
    if (playing) {
      setManualPlay(false);
      setUserPaused(true);
      videoRef.current?.pause();
    } else {
      setUserPaused(false);
      setManualPlay(true);
      setLoaded(true);
    }
  }

  return (
    <figure className="project-demo">
      {failed ? <img className="demo-poster" src={project.imageURL} alt={project.imageAlt} width="1440" height="1000" /> : (
        <video ref={videoRef} className="project-demo-video" src={loaded ? project.videoURL : undefined} poster={project.imageURL} muted loop playsInline preload="none" width="1440" height="1000" aria-label="Portal navigation demo" aria-describedby={captionId} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
      )}
      <div className="demo-controls">
        {!failed && <button className="text-link demo-toggle" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause Portal demo' : 'Play Portal demo'}>{playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}{playing ? 'Pause demo' : 'Play demo'}</button>}
        <a className="text-link" href={project.gifURL} download><FiDownload aria-hidden="true" /> Download GIF</a>
      </div>
      <figcaption id={captionId}>{failed ? 'Video unavailable. The GIF is available to download.' : 'Recorded navigation · Original French interface'}</figcaption>
    </figure>
  );
}
