import { useState, useEffect } from 'react';
import HoodAILogo from './HoodAILogo';
import ImpulsoHubLogo from './ImpulsoHubLogo';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero','comparativa','features','scanner','planes','cta'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id:'hero',        label:'Home'           },
    { id:'comparativa', label:'Características' },
    { id:'scanner',     label:'Comparativa'     },
    { id:'planes',      label:'Nosotros'        },
    { id:'cta',         label:'Soporte'         },
  ];

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  };

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'0 40px',height:'64px',
      background: scrolled ? 'rgba(6,8,16,0.95)' : 'rgba(6,8,16,0.75)',
      backdropFilter:'blur(16px)',
      borderBottom:'1px solid rgba(0,229,255,0.1)',
      transition:'background 0.3s',
    }}>
      {/* Logo */}
      <button onClick={()=>scroll('hero')}
        style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:10}}>
        <HoodAILogo height={30}/>
      </button>

      {/* Links */}
      <div style={{display:'flex',gap:32,alignItems:'center'}}>
        {links.map(l=>(
          <button key={l.id} onClick={()=>scroll(l.id)}
            style={{
              background:'none',border:'none',cursor:'pointer',
              fontFamily:"'Rajdhani',sans-serif",fontSize:13,fontWeight:600,
              letterSpacing:'0.12em',textTransform:'uppercase',
              color: active===l.id ? 'var(--cyan)' : 'rgba(240,235,224,0.55)',
              borderBottom: active===l.id ? '1px solid var(--cyan)' : '1px solid transparent',
              paddingBottom:2,transition:'color 0.2s',
            }}>
            {l.label}
          </button>
        ))}
      </div>

      {/* Right */}
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <ImpulsoHubLogo height={22} style={{opacity:0.65}}/>
        <button onClick={()=>scroll('cta')} style={{
          fontFamily:"'Rajdhani',sans-serif",fontSize:12,fontWeight:700,
          letterSpacing:'0.1em',textTransform:'uppercase',
          padding:'8px 20px',borderRadius:6,
          background:'rgba(0,229,255,0.1)',
          border:'1px solid rgba(0,229,255,0.3)',
          color:'var(--cyan)',cursor:'pointer',
          transition:'all 0.2s',
        }}>
          Acceso Anticipado
        </button>
      </div>
    </nav>
  );
}
