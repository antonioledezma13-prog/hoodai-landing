const HOODAI_STEPS = [
  { n:'01', title:'Luz de Check Engine / Falla de Transmisión', desc:'Detectada automáticamente al conectar el adaptador vía Bluetooth.', result:'Conexión automática al módulo' },
  { n:'02', title:'Conexión y Escaneo Multi-Módulo', desc:'ECM, TCM, ABS/EPS y BCM escaneados en paralelo. Headers 7E0–7E3 en UDS-CAN.', result:'P0720 detectado — Módulo TCM @ 7E1' },
  { n:'03', title:'Interpretación IA Instantánea', desc:'Claude analiza los datos y te explica la falla en lenguaje cotidiano, sin tecnicismos.', result:'"Sensor de velocidad de salida defectuoso..."' },
  { n:'04', title:'Sugerencia de Repuesto + Costo Estimado', desc:'Búsqueda de mercado en tiempo real. Foto del repuesto, precio y disponibilidad local.', result:'Transmisión Speed Sensor · $45–65 USD' },
  { n:'05', title:'Ticket de Servicio Digital', desc:'Generado automáticamente y enviado al mecánico especialista más cercano vía WhatsApp.', result:'Enviado a Taller Toyota Agency ✓' },
];

const RIVAL_STEPS = [
  { n:'01', title:'Luz de Check Engine / Falla de Transmisión', desc:'El usuario debe conectar manualmente el adaptador y abrir la app.', result:'Conexión OBD-II genérica solo ECM' },
  { n:'02', title:'Lectura de Código (PIDs detectados)', desc:'Solo accede al ECM. TCM, ABS y BCM quedan fuera. Muestra hex sin traducción.', result:'P0700 — sin contexto adicional' },
  { n:'03', title:'Búsqueda Manual en Google', desc:'El usuario copia el código y busca en foros. Resultados inconsistentes o en inglés.', result:'15–30 min de investigación' },
  { n:'04', title:'Traducción e Interpretación', desc:'"Fallo de Módulo Z, ¿qué cambio?" — Dependencia total de foros y mecánicos.', result:'Confusión y resultado incierto' },
  { n:'05', title:'Ir al Mecánico sin Información', desc:'Dependencia total del taller. Temor por costos elevados sin poder validar el diagnóstico.', result:'Sin poder de negociación' },
];

function Step({ n, title, desc, result, cyan }) {
  return (
    <div style={{
      display:'flex', alignItems:'flex-start', gap:14,
      marginBottom:14, padding:'12px 14px',
      background:'rgba(0,0,0,0.2)',
      borderRadius:10,
      border:`1px solid ${cyan ? 'rgba(0,229,255,0.08)' : 'rgba(245,158,11,0.06)'}`,
      transition:'border-color 0.2s',
    }}>
      <div style={{
        fontFamily:"'Share Tech Mono',monospace",
        fontSize:18, fontWeight:700, minWidth:28,
        color: cyan ? 'var(--cyan)' : 'var(--orange2)',
        lineHeight:1, marginTop:2,
      }}>{n}</div>
      <div>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:14,fontWeight:700,marginBottom:3}}>{title}</div>
        <div style={{fontSize:11,color:'var(--dim)',lineHeight:1.5,marginBottom:6}}>{desc}</div>
        <span style={{
          fontSize:10, padding:'4px 10px', borderRadius:4,
          display:'inline-block',
          fontFamily:"'Share Tech Mono',monospace",
          background: cyan ? 'rgba(0,255,170,0.08)' : 'rgba(255,255,255,0.06)',
          color:       cyan ? 'var(--ok)'            : 'rgba(240,235,224,0.4)',
        }}>{result}</span>
      </div>
    </div>
  );
}

export default function Comparativa() {
  return (
    <section id="comparativa" style={{
      position:'relative', zIndex:1,
      padding:'80px 40px',
      background:'linear-gradient(180deg,transparent,rgba(6,8,16,0.97) 8%,rgba(6,8,16,0.97) 92%,transparent)',
    }}>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:'0.3em',color:'var(--cyan)',opacity:0.6,textTransform:'uppercase',textAlign:'center',marginBottom:12}}>
        HoodAI vs La Competencia Global
      </div>
      <h2 style={{fontFamily:"'Rajdhani',sans-serif",fontSize:'clamp(24px,3.5vw,40px)',fontWeight:700,textAlign:'center',lineHeight:1.15,marginBottom:52}}>
        La Revolución del Diagnóstico:<br/>
        <span style={{color:'var(--cyan)'}}>Automatizado vs. Manual</span>
      </h2>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,maxWidth:1100,margin:'0 auto'}}>
        {/* HoodAI */}
        <div style={{background:'rgba(8,14,26,0.72)',backdropFilter:'blur(20px)',border:'1px solid rgba(0,229,255,0.25)',borderTop:'3px solid var(--cyan)',borderRadius:16,padding:'28px 24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24,paddingBottom:16,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:15,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--cyan)'}}>HoodAI</div>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,padding:'3px 8px',borderRadius:3,background:'rgba(0,229,255,0.12)',color:'var(--cyan)'}}>IA-POWERED</span>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,padding:'3px 8px',borderRadius:3,background:'rgba(0,229,255,0.12)',color:'var(--cyan)'}}>FLUJO AUTOMATIZADO</span>
          </div>
          {HOODAI_STEPS.map(s=><Step key={s.n} {...s} cyan/>)}
        </div>

        {/* Rival */}
        <div style={{background:'rgba(8,14,26,0.72)',backdropFilter:'blur(20px)',border:'1px solid rgba(245,158,11,0.2)',borderTop:'3px solid var(--orange2)',borderRadius:16,padding:'28px 24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24,paddingBottom:16,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:15,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--orange2)'}}>Torque Pro / OBD Apps</div>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,padding:'3px 8px',borderRadius:3,background:'rgba(245,158,11,0.12)',color:'var(--orange2)'}}>DIY</span>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:9,padding:'3px 8px',borderRadius:3,background:'rgba(245,158,11,0.12)',color:'var(--orange2)'}}>FLUJO MANUAL</span>
          </div>
          {RIVAL_STEPS.map(s=><Step key={s.n} {...s} cyan={false}/>)}
        </div>
      </div>
    </section>
  );
}
