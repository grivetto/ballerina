/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Mail, ArrowDown } from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-serif text-2xl tracking-tighter italic"
      >
        Éthérée
      </motion.div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-chalk hover:text-accent transition-colors"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 bg-ink flex flex-col items-center justify-center space-y-8 text-4xl font-serif italic"
          >
            {['The Movement', 'The Soul', 'The Echo'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, x: 10 }}
                className="hover:text-accent transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0 grainy-gradient opacity-30" />
      
      <motion.div 
        style={{ y, scale }}
        className="relative z-10 w-[80vw] h-[60vh] md:w-[50vw] md:h-[70vh] overflow-hidden mask-organic-1 bg-neutral-900"
      >
        <img 
          src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop" 
          alt="Ballerina in motion"
          className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[15vw] font-serif italic text-chalk mix-blend-difference leading-none text-center"
        >
          Fluidity<br/>
          <span className="font-mono text-[2vw] not-italic tracking-[1em] opacity-50 uppercase">Deformed</span>
        </motion.h1>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

const Portfolio = () => {
  const items = [
    { id: 1, src: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1887&auto=format&fit=crop", size: "w-64 h-96", top: "10%", left: "15%", speed: 0.1 },
    { id: 2, src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1935&auto=format&fit=crop", size: "w-80 h-80", top: "40%", left: "60%", speed: 0.2 },
    { id: 3, src: "https://images.unsplash.com/photo-1508700915892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop", size: "w-96 h-64", top: "70%", left: "20%", speed: 0.15 },
    { id: 4, src: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop", size: "w-72 h-72", top: "20%", left: "75%", speed: 0.25 },
  ];

  return (
    <section id="the-movement" className="relative min-h-[200vh] py-32 bg-ink">
      <div className="sticky top-20 left-10 z-10">
        <h2 className="text-8xl font-serif italic opacity-10 leading-none">The<br/>Movement</h2>
      </div>

      {items.map((item) => (
        <ParallaxItem key={item.id} {...item} />
      ))}
    </section>
  );
};

const ParallaxItem = ({ src, size, top, left, speed }: any) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -1000 * speed]);
  const rotate = useTransform(scrollY, [0, 3000], [0, speed * 45]);

  return (
    <motion.div 
      style={{ top, left, y, rotate }}
      className={`absolute ${size} group cursor-pointer`}
    >
      <motion.div 
        whileHover={{ scale: 1.05, filter: "brightness(1.2) contrast(1.1)" }}
        className="w-full h-full overflow-hidden bg-neutral-800 shadow-2xl"
      >
        <img 
          src={src} 
          alt="Dance photography" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Capture_0{Math.floor(Math.random() * 9)}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="the-soul" className="relative min-h-screen py-32 flex flex-col md:flex-row items-center justify-center gap-20 px-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full grainy-gradient opacity-10 -z-10" />
      
      <div className="relative w-full md:w-1/2 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="text-vertical absolute -left-12 top-0 text-accent font-mono text-xs tracking-[0.5em] uppercase">
            Philosophy of Motion
          </div>
          <h3 className="text-6xl md:text-8xl font-serif italic leading-tight">
            The soul <br/>
            is a <span className="text-accent underline decoration-1 underline-offset-8">vibration</span> <br/>
            in space.
          </h3>
        </motion.div>
      </div>

      <div className="w-full md:w-1/3 space-y-8">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-lg leading-relaxed font-light opacity-70"
        >
          I don't dance to be seen. I dance to disappear. My movement is a dialogue between the weight of the earth and the void of the sky. In the deformation of the classical line, I find the truth of the human condition.
        </motion.p>
        
        <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-tighter">
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">Training</span>
            Paris Opera Ballet School
          </div>
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">Focus</span>
            Contemporary Surrealism
          </div>
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">Awards</span>
            Prix de Lausanne '21
          </div>
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">Current</span>
            Freelance / Avant-Garde
          </div>
        </div>
      </div>

      {/* Abstract sketch element */}
      <motion.div 
        animate={{ 
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 border border-chalk/5 rounded-full pointer-events-none"
      />
    </section>
  );
};

const Contact = () => {
  return (
    <section id="the-echo" className="relative min-h-screen py-32 flex flex-col items-center justify-center bg-ink">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-20"
      >
        <h2 className="text-7xl font-serif italic mb-4">The Echo</h2>
        <p className="font-mono text-xs tracking-widest uppercase opacity-40">Leave a vibration in the void</p>
      </motion.div>

      <form className="w-full max-w-xl px-8 space-y-12">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Identity" 
            className="w-full bg-transparent border-b border-chalk/20 py-4 font-serif italic text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-focus-within:w-full transition-all duration-500" />
        </div>

        <div className="relative group">
          <input 
            type="email" 
            placeholder="Frequency (Email)" 
            className="w-full bg-transparent border-b border-chalk/20 py-4 font-serif italic text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-focus-within:w-full transition-all duration-500" />
        </div>

        <div className="relative group">
          <textarea 
            placeholder="The Message" 
            rows={4}
            className="w-full bg-transparent border-b border-chalk/20 py-4 font-serif italic text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20 resize-none"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-focus-within:w-full transition-all duration-500" />
        </div>

        <motion.button 
          whileHover={{ x: 10 }}
          className="flex items-center gap-4 text-accent font-mono uppercase tracking-[0.3em] text-sm group"
        >
          Transmit <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </form>

      <footer className="mt-40 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 font-mono text-[10px] uppercase tracking-widest">
        <div>© 2026 Éthérée Studio</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Vimeo</a>
          <a href="#" className="hover:text-accent transition-colors">Behance</a>
        </div>
        <div>Built for the Void</div>
      </footer>
    </section>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-serif italic text-4xl"
            >
              Éthérée
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Contact />
      </main>

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] grainy-gradient" />
    </div>
  );
}
