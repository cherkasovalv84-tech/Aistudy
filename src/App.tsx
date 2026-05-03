import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sparkles, MessageSquare, ArrowRight, Zap, 
  Bot, Brain, Briefcase, ChevronDown, CheckCircle2,
  Settings, Layout, Code2, Rocket, ShoppingCart, 
  LineChart, Database, Smartphone, Globe, Layers,
  Send, Instagram, Youtube, Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { trackEvent } from './lib/analytics';
import { CURRICULUM, FAQ, FEATURES, PROJECTS, USER_TARGETS } from './data';

// --- UI Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick,
  eventName,
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'; 
  className?: string;
  onClick?: () => void;
  eventName?: string;
  [key: string]: any;
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40',
    secondary: 'bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20',
    ghost: 'text-slate-400 hover:text-white transition-colors',
    outline: 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'
  };

  const handleClick = () => {
    if (eventName) trackEvent(eventName);
    if (onClick) onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={cn(
        'px-6 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) => (
  <div className="text-center mb-16 px-6">
    {badge && (
      <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-4">{title}</h2>
    {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Для кого', href: '#audience' },
    { name: 'Проекты', href: '#projects' },
    { name: 'Программа', href: '#curriculum' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'py-3 bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center neon-glow-cyan">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl uppercase tracking-tighter">Вайбкодинг</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">{link.name}</a>
          ))}
          <Button variant="ghost" className="px-1 py-0 text-xs uppercase tracking-widest">Войти</Button>
          <Button className="px-6 py-2.5 rounded-full text-xs uppercase" eventName="navbar_booking_click">Забронировать место</Button>
        </nav>

        <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950 border-b border-white/10 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold">{link.name}</a>
              ))}
              <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                <Button className="w-full">Забронировать место</Button>
                <Button variant="outline" className="w-full">Войти</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const HeroSection = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
    <div className="mesh-gradient-1" />
    <div className="mesh-gradient-2" />
    
    <div className="max-w-7xl mx-auto px-6 text-center lg:text-left">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-8">
            <Zap className="w-3.5 h-3.5" />
            AI-курс для всех
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.95] mb-8">
            Научись создавать<br />
            <span className="text-gradient">через ИИ</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Пошаговый курс по вайбкодингу: от первого сайта и Telegram-бота до CRM, автоматизаций и первых денег на цифровых продуктах.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button className="w-full sm:w-auto px-10 py-5 text-lg" eventName="hero_booking_click">Забронировать место</Button>
            <Button variant="secondary" className="w-full sm:w-auto px-10 py-5 text-lg">Смотреть программу</Button>
          </div>
          <p className="mt-6 text-slate-500 text-sm italic">
            Задайте вопрос <span className="text-cyan-400 font-bold cursor-pointer underline underline-offset-4">ИИ-ассистенту</span>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="glass-card rounded-[40px] p-1 shadow-2xl relative group">
            <div className="bg-slate-950/50 rounded-[38px] p-8 overflow-hidden">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-4 text-[10px] text-slate-500 uppercase tracking-widest font-mono">vibe_terminal v1.0</span>
              </div>
              <div className="space-y-4 font-mono text-xs md:text-sm">
                <div className="flex gap-3">
                  <span className="text-purple-400">User:</span>
                  <span className="text-slate-300">Сделай лендинг для онлайн-школы с формой заявки</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-400">Assistant:</span>
                  <span className="text-slate-400">Создаю структуру: Hero, Программа, Кейсы...</span>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-400 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Проект опубликован на Vercel</span>
                  </div>
                  <div className="text-[10px] text-slate-600">Заняло: 2.4 сек</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AudienceSection = () => (
  <section id="audience" className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader 
        badge="Для кого"
        title="Кому подойдет курс?" 
        subtitle="Мы спроектировали программу так, чтобы результат получил каждый, вне зависимости от опыта."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {USER_TARGETS.map((target, idx) => (
          <motion.div 
            key={target.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 rounded-3xl hover:border-cyan-500/30 group transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              {idx === 0 ? <Zap /> : idx === 1 ? <Briefcase /> : idx === 2 ? <Layout /> : <Rocket />}
            </div>
            <h4 className="text-xl font-bold mb-4">{target.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{target.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="py-24 bg-slate-900/20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader 
        badge="Практика"
        title="Проекты, которые вы создадите"
        subtitle="Никакой сухой теории. С первого дня вы собираете реальные продукты."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card overflow-hidden rounded-[32px] hover:shadow-cyan-500/10 transition-all border-white/5"
          >
            <div className="h-48 bg-slate-800/50 relative overflow-hidden flex items-center justify-center">
              {idx % 3 === 0 ? <Globe className="w-20 h-20 text-cyan-500/20" /> : idx % 3 === 1 ? <Bot className="w-20 h-20 text-purple-500/20" /> : <Settings className="w-20 h-20 text-blue-500/20" />}
              <div className="absolute top-4 left-4 flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-md text-[10px] uppercase font-bold text-slate-400 border border-white/10">{tag}</span>
                ))}
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-bold mb-2">{project.title}</h4>
              <p className="text-slate-400 text-sm mb-6">{project.description}</p>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-500">Результат Модуля 0{idx % 3 + 1}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CurriculumSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="curriculum" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader 
          badge="План"
          title="Программа курса"
          subtitle="Структурированный путь от основ до монетизации."
        />
        <div className="space-y-4">
          {CURRICULUM.map((module, idx) => (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl overflow-hidden border-white/5"
            >
              <button 
                onClick={() => setActiveTab(activeTab === idx ? -1 : idx)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display font-black text-3xl text-white/20">0{idx}</span>
                  <h4 className="text-xl font-bold">{module.title}</h4>
                </div>
                <ChevronDown className={cn("w-6 h-6 text-slate-500 transition-transform", activeTab === idx ? "rotate-180" : "")} />
              </button>
              <AnimatePresence>
                {activeTab === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-8"
                  >
                    <div className="space-y-6 pt-4 border-t border-white/5">
                      <p className="text-slate-300">{module.description}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {module.points.map(point => (
                          <li key={point} className="flex items-center gap-3 text-sm text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                        <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">Финальный результат:</span>
                        <p className="text-sm font-medium">{module.result}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <Button className="px-12 py-6 text-xl rounded-[2rem]" eventName="curriculum_booking_click">Забронировать место</Button>
        </div>
      </div>
    </section>
  );
};

const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (presetText?: string) => {
    const textToSearch = presetText || message;
    if (!textToSearch.trim()) return;

    setChat(prev => [...prev, { role: 'user', content: textToSearch }]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSearch, history: chat })
      });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (e) {
      setChat(prev => [...prev, { role: 'assistant', content: 'Ошибка связи с ИИ. Попробуйте позже.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="pointer-events-auto glass-card w-[350px] md:w-[420px] h-[550px] md:h-[620px] rounded-[32px] flex flex-col overflow-hidden shadow-2xl border-cyan-500/20"
            >
              <div className="p-6 bg-gradient-to-r from-cyan-600 to-blue-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Bot className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Вайб-Ассистент</h3>
                    <p className="text-[10px] text-white/70">Отвечает по программе курса</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {chat.length === 0 && (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-slate-400 text-sm">Привет! Я ИИ-ассистент курса. Могу рассказать о программе, проектах и инструментах. С чего начнем?</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['Подойдет ли новичку?', 'Какие проекты соберу?', 'Что такое viber coding?'].map(q => (
                        <button 
                          key={q} 
                          onClick={() => sendMessage(q)}
                          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-300 hover:bg-cyan-500/20 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {chat.map((m, i) => (
                  <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                      m.role === 'user' ? "bg-cyan-600 text-white" : "bg-white/5 text-slate-300 border border-white/10"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && <div className="text-cyan-400 animate-pulse text-xs">Ассистент думает...</div>}
              </div>

              <div className="p-6 border-t border-white/10 bg-slate-950/50">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Задайте вопрос по курсу..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <button onClick={() => sendMessage()} className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all group relative"
        >
          {isOpen ? <X className="text-white w-8 h-8" /> : <MessageSquare className="text-white w-8 h-8" />}
          {!isOpen && <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-slate-950">?</div>}
          <div className="absolute right-20 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Спросить AI-ассистента
          </div>
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex p-4 gap-4 bg-[#020617]/80 backdrop-blur-xl border-t border-white/10">
        <Button variant="outline" className="flex-1" onClick={() => setIsOpen(true)}>Спросить AI</Button>
        <Button className="flex-[1.5]">Забронировать место</Button>
      </div>
    </>
  );
};

const FAQSection = () => (
  <section id="faq" className="py-24 bg-slate-950">
    <div className="max-w-3xl mx-auto px-6">
      <SectionHeader title="Частые вопросы" badge="FAQ" />
      <div className="space-y-4">
        {FAQ.map((item, idx) => (
          <details key={idx} className="glass-card rounded-2xl group transition-all" open={idx === 0}>
            <summary className="p-6 cursor-pointer flex items-center justify-between font-bold text-lg list-none">
              {item.question}
              <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-white/5 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-3">
        <Sparkles className="text-cyan-400 w-6 h-6" />
        <span className="font-display font-black uppercase text-xl">Вайбкодинг</span>
      </div>
      <div className="flex gap-8">
        {[
          { icon: <Instagram />, href: '#' },
          { icon: <Youtube />, href: '#' },
          { icon: <Github />, href: '#' },
          { icon: <Send />, href: '#' }
        ].map((s, i) => (
          <a key={i} href={s.href} className="text-slate-500 hover:text-cyan-400 transition-colors">{s.icon}</a>
        ))}
      </div>
      <p className="text-slate-600 text-xs font-mono tracking-widest">© 2026 VIBE CODING SYSTEM</p>
    </div>
  </footer>
);

const LearningFlowSection = () => (
  <section className="py-24 relative overflow-hidden bg-slate-950/40">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <SectionHeader 
        badge="Процесс"
        title="Как проходит обучение" 
        subtitle="Вы двигаетесь по шагам: от теории к практике и готовому продукту."
      />
      <div className="flex flex-wrap justify-center gap-4">
        {[
          'Смотрите короткий практический урок',
          'Повторяете действия в инструментах',
          'Собираете реальный проект',
          'Публикуете результат в сеть',
          'Улучшаете дизайн и логику',
          'Используете в портфолио или бизнесе'
        ].map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              {i + 1}
            </div>
            <span className="text-slate-300 font-medium text-sm">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const MonetizationSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="mesh-gradient-3 opacity-30" />
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader 
        badge="Результат"
        title="Монетизация навыка"
        subtitle="Мы учим не просто кодить, а создавать востребованные продукты и зарабатывать на них."
      />
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Свой стартап', desc: 'Запуск собственного MVP или сервиса без затрат на команду разработки.' },
          { title: 'Фриланс 2.0', desc: 'Продажа сложных AI-решений (боты, CRM) за чеки в 3-5 раз выше обычных лендингов.' },
          { title: 'Рост в найме', desc: 'Станьте незаменимым сотрудником, автоматизируя процессы компании с помощью ИИ.' }
        ].map((item, i) => (
          <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <LineChart className="w-20 h-20" />
            </div>
            <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AudienceSection />
      <ProjectsSection />
      <LearningFlowSection />
      <CurriculumSection />
      <MonetizationSection />
      <FAQSection />
      <section className="py-24 text-center px-6">
        <div className="max-w-4xl mx-auto glass-card p-12 md:p-24 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px]" />
          <h2 className="text-4xl md:text-7xl font-display font-black mb-8 leading-[1.1]">Готов <span className="text-gradient">начать творить</span> с помощью ИИ?</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Стань одним из первых, кто освоит вайбкодинг и начнет запускать проекты в 10 раз быстрее.</p>
          <Button className="px-16 py-6 rounded-[2rem] text-xl w-full md:w-auto" eventName="final_booking_click">Забронировать место сейчас</Button>
        </div>
      </section>
      <Footer />
      <AssistantWidget />
    </div>
  );
}
