/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ArrowDown } from 'lucide-react';

type Language = 'it' | 'en' | 'es' | 'th';

const LANG_INFO: Record<Language, { code: string; flag: string; alt: string; nextLabel: string }> = {
  it: {
    code: 'IT',
    flag: 'https://flagcdn.com/w40/it.png',
    alt: 'Italiano',
    nextLabel: 'Switch to English',
  },
  en: {
    code: 'EN',
    flag: 'https://flagcdn.com/w40/gb.png',
    alt: 'English',
    nextLabel: 'Cambiar a Español',
  },
  es: {
    code: 'ES',
    flag: 'https://flagcdn.com/w40/es.png',
    alt: 'Español',
    nextLabel: 'เปลี่ยนเป็นภาษาไทย (Switch to Thai)',
  },
  th: {
    code: 'TH',
    flag: 'https://flagcdn.com/w40/th.png',
    alt: 'ไทย',
    nextLabel: 'Passa a Italiano',
  },
};

const TRANSLATIONS: Record<
  Language,
  {
    nav: {
      movement: string;
      soul: string;
      echo: string;
    };
    hero: {
      imgAlt: string;
      titleMain: string;
      titleSub: string;
      scroll: string;
    };
    portfolio: {
      headingLine1: string;
      headingLine2: string;
      imgAlt: string;
      capturePrefix: string;
      captions: string[];
    };
    about: {
      verticalLabel: string;
      quoteLine1: string;
      quoteLine2Prefix: string;
      quoteHighlight: string;
      quoteLine3: string;
      manifesto: string;
      trainingLabel: string;
      trainingValue: string;
      focusLabel: string;
      focusValue: string;
      awardsLabel: string;
      awardsValue: string;
      currentLabel: string;
      currentValue: string;
    };
    contact: {
      heading: string;
      subtitle: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      transmit: string;
      footerRight: string;
    };
  }
> = {
  it: {
    nav: {
      movement: 'Il Movimento',
      soul: "L'Anima",
      echo: "L'Eco",
    },
    hero: {
      imgAlt: 'Ballerina in movimento',
      titleMain: 'Fluidità',
      titleSub: 'Deformata',
      scroll: 'Scorri',
    },
    portfolio: {
      headingLine1: 'Il',
      headingLine2: 'Movimento',
      imgAlt: 'Fotografia di danza',
      capturePrefix: 'Scatto_0',
      captions: [
        'Atto I — Vertigine Silenziosa',
        'Atto II — Geometria Spezzata',
        'Atto III — Sospensione Notturna',
        'Atto IV — Oltre la Gravità',
      ],
    },
    about: {
      verticalLabel: 'Filosofia del Movimento',
      quoteLine1: "L'anima",
      quoteLine2Prefix: 'è una ',
      quoteHighlight: 'vibrazione',
      quoteLine3: 'nello spazio.',
      manifesto:
        'Non danzo per essere vista. Danzo per scomparire. Il mio movimento è un dialogo tra il peso della terra e il vuoto del cielo. Nella deformazione della linea classica, trovo la verità della condizione umana.',
      trainingLabel: 'Formazione',
      trainingValue: "Scuola di Ballo dell'Opéra di Parigi",
      focusLabel: 'Ricerca',
      focusValue: 'Surrealismo Contemporaneo',
      awardsLabel: 'Premi',
      awardsValue: "Prix de Lausanne '21",
      currentLabel: 'Attuale',
      currentValue: 'Freelance / Avanguardia',
    },
    contact: {
      heading: "L'Eco",
      subtitle: 'Lascia una vibrazione nel vuoto',
      namePlaceholder: 'Identità',
      emailPlaceholder: 'Frequenza (Email)',
      messagePlaceholder: 'Il Messaggio',
      transmit: 'Trasmetti',
      footerRight: 'Creato per il Vuoto',
    },
  },
  en: {
    nav: {
      movement: 'The Movement',
      soul: 'The Soul',
      echo: 'The Echo',
    },
    hero: {
      imgAlt: 'Ballerina in motion',
      titleMain: 'Fluidity',
      titleSub: 'Deformed',
      scroll: 'Scroll',
    },
    portfolio: {
      headingLine1: 'The',
      headingLine2: 'Movement',
      imgAlt: 'Dance photography',
      capturePrefix: 'Capture_0',
      captions: [
        'Act I — Silent Vertigo',
        'Act II — Fractured Geometry',
        'Act III — Nocturnal Suspension',
        'Act IV — Beyond Gravity',
      ],
    },
    about: {
      verticalLabel: 'Philosophy of Motion',
      quoteLine1: 'The soul',
      quoteLine2Prefix: 'is a ',
      quoteHighlight: 'vibration',
      quoteLine3: 'in space.',
      manifesto:
        "I don't dance to be seen. I dance to disappear. My movement is a dialogue between the weight of the earth and the void of the sky. In the deformation of the classical line, I find the truth of the human condition.",
      trainingLabel: 'Training',
      trainingValue: 'Paris Opera Ballet School',
      focusLabel: 'Focus',
      focusValue: 'Contemporary Surrealism',
      awardsLabel: 'Awards',
      awardsValue: "Prix de Lausanne '21",
      currentLabel: 'Current',
      currentValue: 'Freelance / Avant-Garde',
    },
    contact: {
      heading: 'The Echo',
      subtitle: 'Leave a vibration in the void',
      namePlaceholder: 'Identity',
      emailPlaceholder: 'Frequency (Email)',
      messagePlaceholder: 'The Message',
      transmit: 'Transmit',
      footerRight: 'Built for the Void',
    },
  },
  es: {
    nav: {
      movement: 'Movimiento',
      soul: 'Alma',
      echo: 'Eco',
    },
    hero: {
      imgAlt: 'Bailarina clásica en movimiento',
      titleMain: 'Gravedad',
      titleSub: 'en Suspenso',
      scroll: 'Desplázate para descubrir',
    },
    portfolio: {
      headingLine1: 'Actos del',
      headingLine2: 'Cuerpo',
      imgAlt: 'Fotografía de danza contemporánea',
      cards: [
        {
          act: 'Acto I',
          title: 'El Vuelo Inmóvil',
          desc: 'Exploración del silencio y la tensión muscular antes del salto.',
        },
        {
          act: 'Acto II',
          title: 'Sombras y Líneas',
          desc: 'La geometría de la luz esculpida por el movimiento escénico.',
        },
        {
          act: 'Acto III',
          title: 'Vértigo Puro',
          desc: 'Velocidad, suspensión y el límite entre el equilibrio y la caída.',
        },
      ],
    },
    manifesto: {
      badge: 'Manifiesto',
      quote:
        'La danza no es solo ocupar un espacio, sino alterar la propia naturaleza del tiempo.',
      role: 'Elena Rostova — Primera Bailarina',
    },
    contact: {
      title: 'Hablemos de Arte',
      desc: 'Para colaboraciones, residencias artísticas o proyectos escénicos.',
      send: 'Enviar Consulta',
      success: 'Mensaje enviado con éxito',
      rights: 'Todos los derechos reservados.',
    },
  },
  th: {
    nav: {
      movement: 'การเคลื่อนไหว',
      soul: 'จิตวิญญาณ',
      echo: 'เสียงสะท้อน',
    },
    hero: {
      imgAlt: 'นักบัลเลต์ในท่วงท่าการเคลื่อนไหว',
      titleMain: 'ความพลิ้วไหว',
      titleSub: 'ที่บิดพลิ้ว',
      scroll: 'เลื่อนลง',
    },
    portfolio: {
      headingLine1: 'การ',
      headingLine2: 'เคลื่อนไหว',
      imgAlt: 'ภาพถ่ายศิลปะการเต้น',
      capturePrefix: 'ภาพบันทึก_0',
      captions: [
        'องก์ที่ 1 — ความเวิ้งว้างอันเงียบงัน',
        'องก์ที่ 2 — เรขาคณิตที่แตกสลาย',
        'องก์ที่ 3 — การล่องลอยในยามราตรี',
        'องก์ที่ 4 — เหนือพันธนาการแห่งแรงโน้มถ่วง',
      ],
    },
    about: {
      verticalLabel: 'ปรัชญาแห่งการเคลื่อนไหว',
      quoteLine1: 'จิตวิญญาณ',
      quoteLine2Prefix: 'คือ ',
      quoteHighlight: 'แรงสั่นสะเทือน',
      quoteLine3: 'ในห้วงอวกาศ',
      manifesto:
        'ฉันไม่ได้เต้นเพื่อถูกมองเห็น แต่เต้นเพื่อเลือนหายไป การเคลื่อนไหวของฉันคือบทสนทนาระหว่างน้ำหนักของผืนดินและความว่างเปล่าของผืนฟ้า ในการบิดรูปของเส้นสายคลาสสิก ฉันได้ค้นพบความจริงของความเป็นมนุษย์',
      trainingLabel: 'การฝึกฝน',
      trainingValue: 'โรงเรียนบัลเลต์ปารีสโอเปร่า',
      focusLabel: 'แนวทางศิลปะ',
      focusValue: 'เซอร์เรียลลิสม์ร่วมสมัย',
      awardsLabel: 'รางวัลเกียรติยศ',
      awardsValue: "Prix de Lausanne '21",
      currentLabel: 'ปัจจุบัน',
      currentValue: 'ศิลปินอิสระ / อาวองการ์ด',
    },
    contact: {
      heading: 'เสียงสะท้อน',
      subtitle: 'ฝากแรงสั่นสะเทือนไว้ในความว่างเปล่า',
      namePlaceholder: 'ตัวตน (ชื่อของคุณ)',
      emailPlaceholder: 'คลื่นความถี่ (อีเมล)',
      messagePlaceholder: 'ข้อความของคุณ',
      transmit: 'ส่งสัญญาณ',
      footerRight: 'สร้างสรรค์เพื่อห้วงอนันต์',
    },
  },
};

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang')?.toLowerCase();
    if (urlLang === 'it' || urlLang === 'en' || urlLang === 'th') {
      return urlLang;
    }
    const saved = localStorage.getItem('etheree_lang')?.toLowerCase();
    if (saved === 'it' || saved === 'en' || saved === 'th') {
      return saved;
    }
  }
  return 'en';
}

// --- Components ---

const Navbar = ({
  lang,
  onToggleLang,
}: {
  lang: Language;
  onToggleLang: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const currentLang = LANG_INFO[lang];

  const navItems = [
    { label: t.nav.movement, href: '#the-movement' },
    { label: t.nav.soul, href: '#the-soul' },
    { label: t.nav.echo, href: '#the-echo' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-serif text-2xl tracking-tighter italic mix-blend-difference"
      >
        Éthérée
      </motion.div>

      <div className="flex items-center gap-4 z-50">
        <button
          onClick={onToggleLang}
          title={currentLang.nextLabel}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink/80 backdrop-blur-md border border-chalk/20 hover:border-accent text-chalk transition-all shadow-lg cursor-pointer"
        >
          <img
            src={currentLang.flag}
            alt={currentLang.alt}
            className="w-5 h-auto rounded-[2px]"
          />
          <span className="font-mono text-xs font-bold tracking-wider">
            {currentLang.code}
          </span>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-chalk hover:text-accent transition-colors mix-blend-difference cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 bg-ink flex flex-col items-center justify-center space-y-8 text-4xl font-serif italic z-40"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, x: 10 }}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0 grainy-gradient opacity-30" />

      <motion.div
        style={{ y, scale }}
        className="relative z-10 w-[80vw] h-[60vh] md:w-[50vw] md:h-[70vh] overflow-hidden mask-organic-1 bg-neutral-900"
      >
        <img
          src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop"
          alt={t.imgAlt}
          className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="text-[13vw] md:text-[15vw] font-serif italic text-chalk mix-blend-difference leading-none text-center"
        >
          {t.titleMain}
          <br />
          <span className="font-mono text-[2.5vw] md:text-[2vw] not-italic tracking-[0.6em] md:tracking-[1em] opacity-50 uppercase">
            {t.titleSub}
          </span>
        </motion.h1>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          {t.scroll}
        </span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

const Portfolio = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang].portfolio;

  const items = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1887&auto=format&fit=crop',
      size: 'w-64 h-96',
      top: '10%',
      left: '15%',
      speed: 0.1,
      caption: t.captions[0],
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1935&auto=format&fit=crop',
      size: 'w-80 h-80',
      top: '40%',
      left: '60%',
      speed: 0.2,
      caption: t.captions[1],
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1508700915892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop',
      size: 'w-96 h-64',
      top: '70%',
      left: '20%',
      speed: 0.15,
      caption: t.captions[2],
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop',
      size: 'w-72 h-72',
      top: '20%',
      left: '75%',
      speed: 0.25,
      caption: t.captions[3],
    },
  ];

  return (
    <section id="the-movement" className="relative min-h-[200vh] py-32 bg-ink">
      <div className="sticky top-20 left-10 z-10">
        <h2 className="text-7xl md:text-8xl font-serif italic opacity-10 leading-none">
          {t.headingLine1}
          <br />
          {t.headingLine2}
        </h2>
      </div>

      {items.map((item) => (
        <ParallaxItem
          key={item.id}
          {...item}
          imgAlt={t.imgAlt}
          capturePrefix={t.capturePrefix}
        />
      ))}
    </section>
  );
};

const ParallaxItem = ({
  id,
  src,
  size,
  top,
  left,
  speed,
  caption,
  imgAlt,
  capturePrefix,
}: any) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -1000 * speed]);
  const rotate = useTransform(scrollY, [0, 3000], [0, speed * 45]);

  return (
    <motion.div
      style={{ top, left, y, rotate }}
      className={`absolute ${size} group cursor-pointer`}
    >
      <motion.div
        whileHover={{ scale: 1.05, filter: 'brightness(1.2) contrast(1.1)' }}
        className="w-full h-full overflow-hidden bg-neutral-800 shadow-2xl"
      >
        <img
          src={src}
          alt={imgAlt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        <div>
          {capturePrefix}
          {id}
        </div>
        <div className="text-chalk/60 mt-1">{caption}</div>
      </div>
    </motion.div>
  );
};

const About = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang].about;

  return (
    <section
      id="the-soul"
      className="relative min-h-screen py-32 flex flex-col md:flex-row items-center justify-center gap-20 px-8 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full grainy-gradient opacity-10 -z-10" />

      <div className="relative w-full md:w-1/2 flex justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="text-vertical absolute -left-12 top-0 text-accent font-mono text-xs tracking-[0.5em] uppercase">
            {t.verticalLabel}
          </div>
          <h3 className="text-6xl md:text-8xl font-serif italic leading-tight">
            {t.quoteLine1} <br />
            {t.quoteLine2Prefix}
            <span className="text-accent underline decoration-1 underline-offset-8">
              {t.quoteHighlight}
            </span>{' '}
            <br />
            {t.quoteLine3}
          </h3>
        </motion.div>
      </div>

      <div className="w-full md:w-1/3 space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-lg leading-relaxed font-light opacity-70"
        >
          {t.manifesto}
        </motion.p>

        <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-tighter">
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">{t.trainingLabel}</span>
            {t.trainingValue}
          </div>
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">{t.focusLabel}</span>
            {t.focusValue}
          </div>
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">{t.awardsLabel}</span>
            {t.awardsValue}
          </div>
          <div className="border-l border-chalk/20 pl-4 py-2">
            <span className="block opacity-40 mb-1">{t.currentLabel}</span>
            {t.currentValue}
          </div>
        </div>
      </div>

      {/* Abstract sketch element */}
      <motion.div
        animate={{
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 border border-chalk/5 rounded-full pointer-events-none"
      />
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang].contact;

  return (
    <section
      id="the-echo"
      className="relative min-h-screen py-32 flex flex-col items-center justify-center bg-ink"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-20"
      >
        <h2 className="text-7xl font-serif italic mb-4">{t.heading}</h2>
        <p className="font-mono text-xs tracking-widest uppercase opacity-40">
          {t.subtitle}
        </p>
      </motion.div>

      <form
        className="w-full max-w-xl px-8 space-y-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative group">
          <input
            type="text"
            placeholder={t.namePlaceholder}
            className="w-full bg-transparent border-b border-chalk/20 py-4 font-serif italic text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-focus-within:w-full transition-all duration-500" />
        </div>

        <div className="relative group">
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            className="w-full bg-transparent border-b border-chalk/20 py-4 font-serif italic text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-focus-within:w-full transition-all duration-500" />
        </div>

        <div className="relative group">
          <textarea
            placeholder={t.messagePlaceholder}
            rows={4}
            className="w-full bg-transparent border-b border-chalk/20 py-4 font-serif italic text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20 resize-none"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-focus-within:w-full transition-all duration-500" />
        </div>

        <motion.button
          type="submit"
          whileHover={{ x: 10 }}
          className="flex items-center gap-4 text-accent font-mono uppercase tracking-[0.3em] text-sm group cursor-pointer"
        >
          {t.transmit}{' '}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-2 transition-transform"
          />
        </motion.button>
      </form>

      <footer className="mt-40 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 font-mono text-[10px] uppercase tracking-widest">
        <div>© 2026 Éthérée Studio</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Vimeo
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Behance
          </a>
        </div>
        <div>{t.footerRight}</div>
      </footer>
    </section>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => {
      const order: Language[] = ['it', 'en', 'es', 'th'];
      const next = order[(order.indexOf(prev) + 1) % order.length];
      try {
        localStorage.setItem('etheree_lang', next);
      } catch {}
      return next;
    });
  };

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
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-serif italic text-4xl"
            >
              Éthérée
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar lang={lang} onToggleLang={toggleLanguage} />

      <main>
        <Hero lang={lang} />
        <Portfolio lang={lang} />
        <About lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] grainy-gradient" />
    </div>
  );
}
