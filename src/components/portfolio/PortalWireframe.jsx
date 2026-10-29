import { useEffect, useRef } from 'react';
import { FiActivity, FiBox, FiGrid, FiLayers, FiShield } from 'react-icons/fi';

const Rows = ({ count = 3 }) => <div className="pw-rows">{Array.from({ length: count }, (_, i) => <span key={i}><i /><b /><em /></span>)}</div>;

export default function PortalWireframe() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      ref.current?.style.setProperty('--wireframe-play-state', entry.isIntersecting ? 'running' : 'paused');
    }, { threshold: 0.2 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className="portal-wireframe" role="img" aria-label="Animated wireframe of Portal’s overview, Kubernetes cluster and reliability pages">
      <div className="pw-canvas" aria-hidden="true">
        <div className="pw-top"><span className="pw-brand"><FiGrid /> Portal</span><div className="pw-tabs"><span>Overview</span><span>Cluster</span><span>Reliability</span></div><span className="pw-menu">···</span></div>
        <div className="pw-readouts"><span /><span /><span /><span /></div>
        <div className="pw-stage">
          <div className="pw-view pw-overview">
            <aside className="pw-side"><div className="pw-panel"><h4><FiActivity /> Activity</h4><Rows /></div><div className="pw-panel"><h4>Incidents</h4><Rows count={2} /></div></aside>
            <div className="pw-main"><div className="pw-panel pw-map"><h4>Lab map</h4><div className="pw-map-flow"><span>Gateway</span><i /><span>Kubernetes</span><i /><span>Apps</span></div><div className="pw-map-branches"><span /><span /><span /></div></div><div className="pw-panel pw-metrics"><span>Resources</span><svg viewBox="0 0 200 30"><path d="M0 25 15 20 28 24 42 10 55 16 70 8 82 12 100 6 115 18 130 13 145 18 165 8 180 14 200 5" /></svg></div></div>
          </div>
          <div className="pw-view pw-cluster"><aside className="pw-panel"><h4><FiLayers /> Nodes</h4><Rows count={4} /></aside><div className="pw-panel"><h4><FiBox /> Workloads</h4><div className="pw-bars"><i /><i /><i /></div><Rows count={4} /></div></div>
          <div className="pw-view pw-reliability"><div className="pw-panel"><h4><FiShield /> Alerts</h4><Rows count={4} /></div><div className="pw-panel"><h4>Backups</h4><Rows count={4} /></div><div className="pw-panel"><h4>Certificates</h4><Rows count={4} /></div></div>
        </div>
      </div>
      <figcaption>Interface wireframe</figcaption>
    </figure>
  );
}
