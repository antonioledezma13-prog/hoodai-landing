import CityCanvas   from './components/CityCanvas';
import Nav          from './components/Nav';
import Hero         from './components/Hero';
import Comparativa  from './components/Comparativa';
import { Features, ModulosScanner, Planes, CTA, Footer } from './components/Sections';

export default function App() {
  return (
    <>
      <CityCanvas />
      <Nav />
      <Hero />
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.18),transparent)'}}/>
      <Comparativa />
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.18),transparent)'}}/>
      <Features />
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.18),transparent)'}}/>
      <ModulosScanner />
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.18),transparent)'}}/>
      <Planes />
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.18),transparent)'}}/>
      <CTA />
      <Footer />
    </>
  );
}
