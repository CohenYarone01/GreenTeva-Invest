import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { FiArrowRight, FiArrowLeft, FiMenu, FiX } from 'react-icons/fi';
import { useForm, ValidationError } from '@formspree/react';

// --- VOS IMAGES ---
const ASSETS = {
  logo: "/assets/logo.jpg",
  rd: "/assets/team-rd.jpg",
  sales: "/assets/team-sales.jpg",
  legal: "/assets/team-legal.jpg",
  // Images d'ambiance pour le slider (Utilisez des images nature/tech haute qualité ici)
  hero1: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2432&auto=format&fit=crop", // Panneaux solaires sombres
  hero2: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop", // Foret mystérieuse
  hero3: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop", // Éolienne minimaliste
};

// --- COMPOSANTS UI ---

const Button = ({ children, primary = false, onClick, to, className }) => {
  const baseStyle = `px-8 py-4 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 border border-white/10 flex items-center gap-3 group relative overflow-hidden ${className}`;
  const activeStyle = primary 
    ? "bg-white text-green-950 hover:bg-gold-400 hover:text-white border-transparent" 
    : "bg-transparent text-white hover:border-gold-400 hover:text-gold-400";

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -z-0 opacity-10"></div>
    </>
  );

  if (to) return <Link to={to} className={`${baseStyle} ${activeStyle}`}>{content}</Link>;
  return <button onClick={onClick} className={`${baseStyle} ${activeStyle}`}>{content}</button>;
};

const SectionHeader = ({ subtitle, title }) => (
  <div className="mb-20">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-gold-400 text-[9px] tracking-[0.4em] uppercase block mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-serif text-white font-light leading-tight"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 100 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="h-[1px] bg-white/20 mt-8"
    />
  </div>
);

// --- HERO SLIDER (STYLE RGREEN) ---
const HeroSlider = () => {
  const slides = [
    { img: ASSETS.hero1, title: "L'énergie de demain,", subtitle: "Financée aujourd'hui." },
    { img: ASSETS.hero2, title: "Investir pour", subtitle: "La souveraineté." },
    { img: ASSETS.hero3, title: "Performance durable,", subtitle: "Impact réel." },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 6000); // Change toutes les 6s
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-green-950">
      <AnimatePresence mode='wait'>
        <motion.div 
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay sombre */}
          <img src={slides[current].img} className="w-full h-full object-cover" alt="Hero Background" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-4xl">
          <motion.div 
            key={`text-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-none mb-6">
              {slides[current].title} <br/>
              <span className="italic text-white/80">{slides[current].subtitle}</span>
            </h1>
            <div className="flex gap-6 mt-12">
              <Button primary to="/vision">Notre Philosophie</Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicateurs de slide */}
      <div className="absolute bottom-12 left-12 flex gap-4 z-20">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`h-[2px] transition-all duration-500 ${current === index ? 'w-12 bg-gold-400' : 'w-4 bg-white/30'}`} 
          />
        ))}
      </div>
    </section>
  );
};

// --- PAGES ---

const VisionPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  
  return (
    <div className="bg-green-950 min-h-screen pt-40 pb-20 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold-400 mb-12 hover:pl-2 transition-all">
          <FiArrowLeft /> Retour à l'accueil
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-16 leading-tight">
          Une approche <span className="italic text-white/70">industrielle</span><br/> 
          de l'investissement.
        </h1>

        <div className="grid md:grid-cols-2 gap-24">
          <div className="space-y-8 text-lg font-light text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white font-medium">Green Teva</strong> n'est pas un fonds traditionnel. Nous sommes le point de convergence entre l'expertise technique de l'ingénierie solaire et la puissance de frappe du capital-investissement.
            </p>
            <p>
              Notre mission est d'identifier les pépites régionales de l'énergie et de leur fournir les ressources — financières, juridiques et stratégiques — pour devenir les leaders nationaux de demain.
            </p>
          </div>

          <div className="grid gap-8">
             {/* Bento Grid Style pour les chiffres */}
             <div className="bg-white/5 border border-white/10 p-8">
                <span className="block text-4xl font-serif text-gold-400 mb-2">100%</span>
                <span className="text-[10px] tracking-widest uppercase">Énergie Verte</span>
             </div>
             <div className="bg-white/5 border border-white/10 p-8">
                <span className="block text-4xl font-serif text-white mb-2">+15 M€</span>
                <span className="text-[10px] tracking-widest uppercase">CA Industriel Consolidé</span>
             </div>
             <div className="bg-white/5 border border-white/10 p-8">
                <span className="block text-4xl font-serif text-white mb-2">France</span>
                <span className="text-[10px] tracking-widest uppercase">Zone d'intervention</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const lenis = useLenis();
  
  // --- LOGIQUE FORMSPREE ---
  // "contactForm" doit correspondre au nom dans formspree.json
  const [state, handleSubmit] = useForm("contactForm");

  // Message de succès après envoi
  if (state.succeeded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-green-950 px-6 text-center">
        <h2 className="text-4xl font-serif text-white mb-4">Message reçu.</h2>
        <p className="text-gray-400 mb-8">Nos équipes reviendront vers vous sous 24h.</p>
        <Button to="/" onClick={() => window.location.reload()}>Retour au site</Button>
      </div>
    );
  }

  return (
    <>
      <HeroSlider />
      
      {/* SECTION IDENTITÉ */}
      <section className="py-32 bg-green-950 px-6 md:px-12 border-b border-white/5">
        <div className="container mx-auto grid md:grid-cols-2 gap-20 items-end">
          <div>
            <span className="text-gold-400 text-[9px] tracking-[0.4em] uppercase mb-8 block">À Propos de nous</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Investir dans la transition n'est plus une option, c'est une <span className="italic text-white/60">responsabilité.</span>
            </h2>
          </div>
          <div className="text-gray-400 font-light leading-relaxed">
            <p className="mb-8">
              Nous accompagnons les développeurs, les industriels et les investisseurs dans la structuration de projets d'infrastructure durable. Notre double compétence technique et financière sécurise chaque étape de la chaîne de valeur.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
               <div>
                 <span className="block text-2xl font-serif text-white">Solaire</span>
                 <span className="text-[9px] uppercase tracking-widest">Expertise Cœur</span>
               </div>
               <div>
                 <span className="block text-2xl font-serif text-white">Capital</span>
                 <span className="text-[9px] uppercase tracking-widest">Accélération</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ÉQUIPE (INVERSÉE) */}
      <section className="py-32 bg-green-900/30 px-6 md:px-12">
        <div className="container mx-auto">
          <SectionHeader subtitle="Gouvernance" title="Direction Générale" />
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* 1. SALES / COMMERCIAL */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-8 relative">
                <div className="absolute inset-0 bg-green-950/20 group-hover:bg-transparent transition-all z-10 duration-700"></div>
                <img src={ASSETS.sales} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" alt="Sales" />
              </div>
              <div className="border-l border-gold-400/50 pl-6 transition-all group-hover:pl-8">
                <h3 className="text-2xl font-serif text-white">Jeremie J.</h3>
                <p className="text-[9px] tracking-[0.2em] uppercase text-gold-400 mt-2 mb-4">Conseil & Développement</p>
                <p className="text-sm text-gray-500 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700">Expert en relations institutionnelles et partenariats stratégiques.</p>
              </div>
            </div>

            {/* 2. JURIDIQUE */}
            <div className="group cursor-pointer md:mt-16">
              <div className="aspect-[3/4] overflow-hidden mb-8 relative">
                <div className="absolute inset-0 bg-green-950/20 group-hover:bg-transparent transition-all z-10 duration-700"></div>
                <img src={ASSETS.legal} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" alt="Legal" />
              </div>
              <div className="border-l border-white/20 group-hover:border-gold-400/50 pl-6 transition-all group-hover:pl-8">
                <h3 className="text-2xl font-serif text-white">David C.</h3>
                <p className="text-[9px] tracking-[0.2em] uppercase text-gold-400 mt-2 mb-4">Juridique & Compliance</p>
                <p className="text-sm text-gray-500 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700">Garant de la conformité ESG et de la structuration des fonds.</p>
              </div>
            </div>

            {/* 3. TECH / R&D */}
            <div className="group cursor-pointer md:mt-32">
              <div className="aspect-[3/4] overflow-hidden mb-8 relative">
                <div className="absolute inset-0 bg-green-950/20 group-hover:bg-transparent transition-all z-10 duration-700"></div>
                <img src={ASSETS.rd} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" alt="Tech" />
              </div>
              <div className="border-l border-white/20 group-hover:border-gold-400/50 pl-6 transition-all group-hover:pl-8">
                <h3 className="text-2xl font-serif text-white">Yarone C.</h3>
                <p className="text-[9px] tracking-[0.2em] uppercase text-gold-400 mt-2 mb-4">R&D & Technique</p>
                <p className="text-sm text-gray-500 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700">Ingénieur en systèmes énergétiques et innovation industrielle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT CONNECTÉE */}
      <section id="contact" className="py-32 bg-green-950 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-800/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-24">
          <div>
            <SectionHeader subtitle="Contact" title="Initier le dialogue" />
            <p className="text-gray-400 font-light text-lg mb-12">
              Nous étudions avec attention les opportunités d'investissement et de partenariat industriel.
            </p>
            <div className="space-y-6">
              <a href="mailto:contact@greenteva.com" className="flex items-center gap-4 text-white hover:text-gold-400 transition-colors group">
                 <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-gold-400 transition-colors">
                   <FiArrowRight />
                 </div>
                 <span className="tracking-widest uppercase text-xs">contact@greenteva-invest.com</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 mt-12 lg:mt-0">
             <div className="group">
               <label htmlFor="name" className="text-[9px] uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-gold-400 transition-colors">Nom Complet</label>
               <input id="name" type="text" name="name" required className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-gold-400 transition-all font-light text-xl" />
               <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
             </div>
             <div className="group">
               <label htmlFor="email" className="text-[9px] uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-gold-400 transition-colors">Email Professionnel</label>
               <input id="email" type="email" name="email" required className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-gold-400 transition-all font-light text-xl" />
               <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
             </div>
             <div className="group">
               <label htmlFor="message" className="text-[9px] uppercase tracking-widest text-gray-500 mb-2 block group-focus-within:text-gold-400 transition-colors">Projet d'investissement</label>
               <textarea id="message" name="message" rows="4" required className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-gold-400 transition-all font-light text-xl"></textarea>
               <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
             </div>
             <div className="pt-8">
               <Button primary className="w-full justify-center" disabled={state.submitting}>
                 {state.submitting ? "Envoi en cours..." : "Envoyer le dossier"}
               </Button>
             </div>
          </form>
        </div>
      </section>
    </>
  );
};

// --- NAVIGATION ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    if (location.pathname !== '/') {
      // Si on est sur Vision, on va à l'accueil puis scroll
      window.location.href = '/#contact';
    } else {
      lenis?.scrollTo('#contact');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-4 bg-green-950/90 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
           <img src={ASSETS.logo} className="h-10 w-10 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" alt="Logo" />
           <div className="flex flex-col">
             <span className="text-lg font-serif text-white tracking-[0.1em]">GREEN TEVA</span>
             <span className="text-[8px] text-gold-400 tracking-[0.4em] uppercase">Capital</span>
           </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-12">
          <Link to="/vision" className="text-[10px] uppercase tracking-[0.2em] text-white hover:text-gold-400 transition-colors">Notre Vision</Link>
          <button onClick={handleContactClick} className="text-[10px] uppercase tracking-[0.2em] text-white hover:text-gold-400 transition-colors">Contact</button>
          <Button primary to={null} onClick={handleContactClick}>Investir</Button>
        </div>
        
        <div className="md:hidden text-white text-2xl">
          <FiMenu />
        </div>
      </div>
    </nav>
  );
}

// --- APP WRAPPER ---
export default function App() {
  return (
    <Router>
      <ReactLenis root>
        <div className="antialiased selection:bg-gold-400 selection:text-green-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vision" element={<VisionPage />} />
          </Routes>
          <footer className="py-12 bg-[#020a07] text-center border-t border-white/5">
             <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em]">© 2024 Green Teva Capital. Paris, France.</p>
          </footer>
        </div>
      </ReactLenis>
    </Router>
  );
}