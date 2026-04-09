// ── Features ────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon:'🔵', title:'Bluetooth OBD-II Nativo',   desc:'Conecta desde Chrome en Android. Sin cables, sin instalaciones. Compatible con vGate, OBDLink MX+, UniCarScan y Nexas.',             tag:'Web Bluetooth API', cls:'cyan'   },
  { icon:'🧠', title:'IA Claude Integrada',        desc:'El modelo más avanzado de Anthropic analiza tus DTCs, sensores y módulos para darte un diagnóstico en español claro y accionable.',  tag:'Claude Opus',       cls:'ok'     },
  { icon:'🔧', title:'4 Módulos en Paralelo',      desc:'ECM · TCM · ABS/EPS · BCM. Lectura, diagnóstico y borrado real de DTC con verificación de readiness por módulo.',                   tag:'UDS ISO 14229',     cls:'cyan'   },
  { icon:'🗑️', title:'Borrado Real + Verificación',desc:'Borra los DTC de cada módulo con UDS 14 FF FF, verifica que la memoria quedó limpia y confirma que el sistema está en READY.',     tag:'Post-clear verified',cls:'ok'     },
  { icon:'🚛', title:'Red de Talleres y Grúas',    desc:'Si el vehículo no puede moverse, HoodAI localiza la grúa más cercana y el taller especialista en tu marca. GPS en tiempo real.',   tag:'6 Roles Ecosistema', cls:'orange' },
  { icon:'💎', title:'Planes Silver y Gold',       desc:'Voz IA con ElevenLabs en plan Gold. Valoración vehicular con búsqueda de mercado en tiempo real. PayPal integrado.',                tag:'TTS + Valoración',  cls:'purple' },
];
const TAG_STYLES = {
  cyan:   { background:'rgba(0,229,255,0.1)',   color:'var(--cyan)',   border:'1px solid rgba(0,229,255,0.2)'   },
  ok:     { background:'rgba(0,255,170,0.08)',  color:'var(--ok)',     border:'1px solid rgba(0,255,170,0.2)'   },
  orange: { background:'rgba(245,158,11,0.1)',  color:'var(--orange2)',border:'1px solid rgba(245,158,11,0.2)'  },
  purple: { background:'rgba(167,139,250,0.1)', color:'#a78bfa',      border:'1px solid rgba(167,139,250,0.2)' },
};

export function Features() {
  return (
    <section id="features" style={{position:'relative',zIndex:1,padding:'80px 40px',background:'rgba(6,8,16,0.97)'}}>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:'0.3em',color:'var(--cyan)',opacity:0.6,textTransform:'uppercase',textAlign:'center',marginBottom:12}}>Tecnología de Vanguardia</div>
      <h2 style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(24px,3.5vw,40px)',fontWeight:700,textAlign:'center',lineHeight:1.15,marginBottom:48}}>
        Todo lo que <span style={{color:'var(--cyan)'}}>HoodAI</span> hace por ti
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,maxWidth:1100,margin:'0 auto'}}>
        {FEATURES.map(f=>(
          <div key={f.title} style={{background:'rgba(0,229,255,0.05)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'24px 20px',transition:'border-color 0.25s,transform 0.25s'}}>
            <div style={{fontSize:28,marginBottom:12}}>{f.icon}</div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:16,fontWeight:700,marginBottom:6}}>{f.title}</div>
            <div style={{fontSize:12,color:'var(--dim)',lineHeight:1.6,marginBottom:10}}>{f.desc}</div>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,padding:'2px 8px',borderRadius:3,display:'inline-block',...TAG_STYLES[f.cls]}}>{f.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Módulos Scanner ──────────────────────────────────────────────────────────
const MODULES = [
  { key:'ecm', addr:'@ 7E0', color:'var(--cyan)',   icon:'⚡', name:'Motor',       sub:'ECM',
    ops:['Sensores en tiempo real','DTC activos / modo 03','Borrado OBD-II (04)','Readiness monitors','VIN del vehículo'] },
  { key:'tcm', addr:'@ 7E1', color:'#a78bfa',       icon:'⚙️', name:'Transmisión', sub:'TCM',
    ops:['T° aceite transmisión','Selector PRNDL','RPM entrada / salida','DTC UDS (19 02 FF)','Borrado + READY (F440)'] },
  { key:'abs', addr:'@ 7E2', color:'var(--orange2)', icon:'🛑', name:'Frenos / EPS', sub:'ABS',
    ops:['Velocidad 4 ruedas','Par motor EPS','Ángulo del volante','DTC UDS (19 02 FF)','Borrado + READY (F420)'] },
  { key:'bcm', addr:'@ 7E3', color:'#60a5fa',       icon:'🏠', name:'Carrocería',  sub:'BCM',
    ops:['Voltaje batería aux.','Estado puertas / luces','Temperatura exterior','DTC UDS (19 02 FF)','Borrado + READY (F450)'] },
];

export function ModulosScanner() {
  return (
    <section id="scanner" style={{position:'relative',zIndex:1,padding:'80px 40px',background:'linear-gradient(180deg,rgba(6,8,16,0.97),rgba(4,10,20,0.98))'}}>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:'0.3em',color:'var(--cyan)',opacity:0.6,textTransform:'uppercase',textAlign:'center',marginBottom:12}}>Scanner Multi-Módulo</div>
      <h2 style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(24px,3.5vw,40px)',fontWeight:700,textAlign:'center',lineHeight:1.15,marginBottom:48}}>
        Accede a <span style={{color:'var(--cyan)'}}>cada sistema</span> de tu vehículo
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,maxWidth:1100,margin:'0 auto'}}>
        {MODULES.map(m=>(
          <div key={m.key} style={{borderRadius:12,padding:'20px 16px',border:'1px solid rgba(255,255,255,0.06)',borderTop:`3px solid ${m.color}`,background:'rgba(0,0,0,0.35)',textAlign:'center',transition:'transform 0.2s'}}>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:13,fontWeight:700,color:m.color,marginBottom:6}}>{m.addr}</div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:14,fontWeight:700,marginBottom:10}}>
              {m.icon} {m.name}<br/><span style={{color:m.color,fontSize:12}}>{m.sub}</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:5}}>
              {m.ops.map(op=>(
                <div key={op} style={{fontSize:10,color:'var(--dim)',padding:'4px 6px',background:'rgba(255,255,255,0.03)',borderRadius:4,display:'flex',alignItems:'center',gap:5}}>
                  <div style={{width:5,height:5,borderRadius:'50%',background:'var(--ok)',flexShrink:0}}/>
                  {op}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Planes ───────────────────────────────────────────────────────────────────
const PLANES = [
  {
    name:'Free', price:'$0', period:'Para siempre', color:'var(--white)', featured:false,
    features:[
      {ok:true,  label:'Escaneo ECM básico'},
      {ok:true,  label:'Lectura de DTC activos'},
      {ok:true,  label:'Análisis IA (5 usos/mes)'},
      {ok:false, label:'Módulos extendidos'},
      {ok:false, label:'Voz IA'},
      {ok:false, label:'Valoración vehicular'},
    ],
    btnLabel:'Empezar Gratis', btnStyle:'ghost',
  },
  {
    name:'Silver', price:'$9.99', period:'por mes', color:'var(--cyan)', featured:true,
    features:[
      {ok:true, label:'Todo lo de Free'},
      {ok:true, label:'TCM + ABS + BCM'},
      {ok:true, label:'Borrado multi-módulo'},
      {ok:true, label:'50 usos IA por mes'},
      {ok:true, label:'Valoración vehicular'},
      {ok:false,label:'Voz IA ElevenLabs'},
    ],
    btnLabel:'Elegir Silver', btnStyle:'filled',
  },
  {
    name:'Gold', price:'$19.99', period:'por mes', color:'var(--orange2)', featured:false,
    features:[
      {ok:true, label:'Todo lo de Silver'},
      {ok:true, label:'Voz IA (ElevenLabs)'},
      {ok:true, label:'Usos ilimitados'},
      {ok:true, label:'Ticket digital a taller'},
      {ok:true, label:'Red de grúas GPS'},
      {ok:true, label:'Soporte prioritario'},
    ],
    btnLabel:'Elegir Gold', btnStyle:'ghost-orange',
  },
];

export function Planes() {
  return (
    <section id="planes" style={{position:'relative',zIndex:1,padding:'80px 40px',background:'rgba(6,8,16,0.97)'}}>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:'0.3em',color:'var(--cyan)',opacity:0.6,textTransform:'uppercase',textAlign:'center',marginBottom:12}}>Planes de Suscripción</div>
      <h2 style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(24px,3.5vw,40px)',fontWeight:700,textAlign:'center',lineHeight:1.15,marginBottom:48}}>
        Elige tu nivel de <span style={{color:'var(--cyan)'}}>diagnóstico</span>
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:20,maxWidth:900,margin:'0 auto'}}>
        {PLANES.map(p=>(
          <div key={p.name} style={{
            borderRadius:16,padding:'28px 22px',
            background: p.featured ? 'rgba(0,229,255,0.04)' : 'rgba(8,14,26,0.72)',
            border: p.featured ? '1px solid rgba(0,229,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
            position:'relative',overflow:'hidden',
          }}>
            {p.featured && (
              <div style={{position:'absolute',top:14,right:-26,fontFamily:"'Share Tech Mono',monospace",fontSize:8,letterSpacing:'0.15em',background:'var(--cyan)',color:'#060810',fontWeight:700,padding:'4px 36px',transform:'rotate(35deg)'}}>
                MÁS POPULAR
              </div>
            )}
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--dim)',marginBottom:8}}>{p.name}</div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:38,fontWeight:700,lineHeight:1,marginBottom:4,color:p.color}}>{p.price}</div>
            <div style={{fontSize:11,color:'var(--dimmer)',marginBottom:20}}>{p.period}</div>
            <ul style={{listStyle:'none',marginBottom:24}}>
              {p.features.map(f=>(
                <li key={f.label} style={{fontSize:12,color:'var(--dim)',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',display:'flex',alignItems:'center',gap:8}}>
                  <span style={{color: f.ok ? 'var(--ok)' : 'rgba(240,235,224,0.2)',fontSize:11}}>{f.ok ? '✓' : '✗'}</span>
                  {f.label}
                </li>
              ))}
            </ul>
            <button style={{
              width:'100%',padding:11,borderRadius:8,
              fontFamily:"'Rajdhani',sans-serif",fontSize:13,fontWeight:700,
              letterSpacing:'0.08em',textTransform:'uppercase',cursor:'pointer',
              transition:'all 0.2s',
              ...(p.btnStyle==='filled'
                ? {background:'var(--cyan)',border:'none',color:'#060810',boxShadow:'0 0 24px rgba(0,229,255,0.25)'}
                : p.btnStyle==='ghost-orange'
                ? {background:'transparent',border:'1px solid rgba(245,158,11,0.3)',color:'var(--orange2)'}
                : {background:'transparent',border:'1px solid rgba(255,255,255,0.15)',color:'var(--dim)'}
              ),
            }}>
              {p.btnLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { submitLead } from '../utils/api';

export function CTA() {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState(null); // null | 'loading' | 'ok' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error'); setMessage('Ingresa un email válido.'); return;
    }
    setStatus('loading');
    try {
      const res = await submitLead(email);
      if (res.ok) { setStatus('ok'); setMessage('¡Registro exitoso! Te contactaremos pronto.'); setEmail(''); }
      else         { setStatus('error'); setMessage(res.error || 'Error al registrar.'); }
    } catch { setStatus('error'); setMessage('Error de conexión. Intenta de nuevo.'); }
  };

  return (
    <section id="cta" style={{position:'relative',zIndex:1,padding:'100px 40px',textAlign:'center',background:'linear-gradient(180deg,rgba(6,8,16,0.97),rgba(2,6,14,1))'}}>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:'0.3em',color:'var(--cyan)',opacity:0.6,textTransform:'uppercase',marginBottom:12}}>Acceso Anticipado</div>
      <h2 style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(28px,4vw,52px)',fontWeight:700,lineHeight:1.1,marginBottom:16}}>
        Únete a la Revolución<br/><span style={{color:'var(--cyan)'}}>del Diagnóstico</span>
      </h2>
      <p style={{fontSize:15,color:'var(--dim)',maxWidth:560,margin:'0 auto 36px',lineHeight:1.65}}>
        Sé de los primeros en acceder a HoodAI. Diagnóstico multi-módulo, IA en español y red de talleres — todo desde tu teléfono.
      </p>
      <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',maxWidth:480,margin:'0 auto'}}>
        <input
          type="email" value={email} onChange={e=>setEmail(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
          placeholder="tu@email.com"
          style={{flex:1,minWidth:220,padding:'13px 18px',borderRadius:8,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(0,229,255,0.2)',color:'var(--white)',fontFamily:"'Exo 2',sans-serif",fontSize:13,outline:'none'}}
        />
        <button onClick={handleSubmit} disabled={status==='loading'} style={{
          padding:'13px 28px',borderRadius:8,
          fontFamily:"'Rajdhani',sans-serif",fontSize:14,fontWeight:700,
          letterSpacing:'0.1em',textTransform:'uppercase',
          background:'linear-gradient(135deg,var(--cyan),var(--cyan2))',
          color:'#060810',border:'none',cursor:'pointer',
          boxShadow:'0 0 28px rgba(0,229,255,0.3)',
          opacity: status==='loading' ? 0.7 : 1,
        }}>
          {status==='loading' ? 'Registrando...' : 'Inscribirme'}
        </button>
      </div>
      {message && (
        <div style={{marginTop:14,fontSize:13,color: status==='ok' ? 'var(--ok)' : 'var(--warn)'}}>{message}</div>
      )}
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
import ImpulsoHubLogo from './ImpulsoHubLogo';

export function Footer() {
  return (
    <footer style={{
      position:'relative',zIndex:1,
      padding:'32px 40px',
      background:'rgba(2,4,10,1)',
      borderTop:'1px solid rgba(0,229,255,0.08)',
      display:'flex',alignItems:'center',justifyContent:'space-between',
      flexWrap:'wrap',gap:16,
    }}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <ImpulsoHubLogo height={22} style={{opacity:0.55}}/>
        <span style={{fontSize:11,color:'rgba(240,235,224,0.3)'}}>
          © 2026 <a href="https://impulsohubweb.vercel.app" target="_blank" rel="noreferrer" style={{color:'var(--cyan)',textDecoration:'none',opacity:0.7}}>Impulso Hub Web Inc.</a>
          {' '}· Diseño Web que Certifica tu Marca
        </span>
      </div>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'rgba(240,235,224,0.25)',letterSpacing:'0.1em'}}>
        HOODAI.COM · UDS ISO 14229 · OBD-II ISO 15765-4
      </div>
    </footer>
  );
}
