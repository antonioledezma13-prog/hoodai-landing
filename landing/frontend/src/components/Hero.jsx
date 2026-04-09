import HoodAILogo from './HoodAILogo';

export default function Hero() {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <section id="hero" style={{
      position:'relative', zIndex:1,
      minHeight:'100vh',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'80px 24px 60px',
      textAlign:'center',
    }}>
      <div style={{
        fontFamily:"'Share Tech Mono',monospace",
        fontSize:11, letterSpacing:'0.3em',
        color:'var(--cyan)', opacity:0.7,
        textTransform:'uppercase', marginBottom:24,
        animation:'fadeUp 0.8s ease both',
      }}>
        Diagnóstico Automotriz · Inteligencia Artificial · Tiempo Real
      </div>

      {/* Logo pulsante */}
      <div style={{ marginBottom:32, animation:'fadeUp 0.9s ease 0.1s both' }}>
        <HoodAILogo height={90} style={{
          filter:'drop-shadow(0 0 32px rgba(0,229,255,0.6)) drop-shadow(0 0 80px rgba(0,229,255,0.2))',
          animation:'logoPulse 3s ease-in-out infinite',
        }}/>
      </div>

      <h1 style={{
        fontFamily:"'Rajdhani',sans-serif",
        fontSize:'clamp(36px,6vw,72px)',
        fontWeight:700, lineHeight:1.0,
        marginBottom:10,
        animation:'fadeUp 1s ease 0.15s both',
      }}>
        Tu vehículo habla.<br/>
        <span style={{color:'var(--cyan)'}}>HoodAI</span>{' '}
        lo <span style={{color:'var(--orange2)'}}>entiende.</span>
      </h1>

      <p style={{
        fontFamily:"'Exo 2',sans-serif",
        fontSize:'clamp(14px,1.8vw,20px)',
        fontWeight:300, color:'var(--dim)',
        maxWidth:640, lineHeight:1.65,
        marginBottom:44,
        animation:'fadeUp 1s ease 0.25s both',
      }}>
        Conecta, escanea y recibe un diagnóstico completo —{' '}
        <span style={{color:'var(--cyan)',fontWeight:600}}>ECM, TCM, ABS y carrocería</span>{' '}
        — en segundos. La revolución del diagnóstico automotriz para el mercado latinoamericano.
      </p>

      <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', animation:'fadeUp 1s ease 0.35s both' }}>
        <button onClick={()=>scroll('cta')} style={{
          fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700,
          letterSpacing:'0.1em', textTransform:'uppercase',
          padding:'14px 36px', borderRadius:8,
          background:'linear-gradient(135deg,var(--cyan),var(--cyan2))',
          color:'#060810', cursor:'pointer', border:'none',
          boxShadow:'0 0 32px rgba(0,229,255,0.3)',
          transition:'all 0.25s',
        }}>
          Únete a la Revolución
        </button>
        <button onClick={()=>scroll('comparativa')} style={{
          fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700,
          letterSpacing:'0.1em', textTransform:'uppercase',
          padding:'14px 36px', borderRadius:8,
          background:'transparent',
          border:'1px solid rgba(0,229,255,0.35)',
          color:'var(--cyan)', cursor:'pointer',
          transition:'all 0.25s',
        }}>
          Ver Cómo Funciona
        </button>
      </div>

      {/* Scroll hint */}
      <div style={{
        position:'absolute', bottom:32,
        display:'flex', flexDirection:'column', alignItems:'center', gap:8,
        fontFamily:"'Share Tech Mono',monospace", fontSize:9,
        letterSpacing:'0.2em', color:'rgba(240,235,224,0.3)',
        animation:'fadeIn 2s ease 1.5s both',
      }}>
        <div style={{
          width:1, height:32,
          background:'linear-gradient(var(--cyan),transparent)',
          animation:'scrollPulse 1.8s ease-in-out infinite',
        }}/>
        SCROLL
      </div>
    </section>
  );
}
