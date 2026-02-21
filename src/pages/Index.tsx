import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/77e7ac22-0114-45f3-ab8b-aba4f5a21fdc/files/120cf306-5072-4f62-b7d9-ea05454ae36d.jpg";

const SERVICES = [
  { icon: "Droplets", title: "Экспресс-мойка", desc: "Быстрая мойка кузова и дисков за 20 минут", price: "от 500 ₽" },
  { icon: "Sparkles", title: "Комплексная мойка", desc: "Полная обработка снаружи и внутри с химчисткой", price: "от 1 500 ₽" },
  { icon: "Shield", title: "Полировка", desc: "Восстановительная полировка кузова с защитным покрытием", price: "от 3 000 ₽" },
  { icon: "Leaf", title: "Эко-уход", desc: "Биоразлагаемые средства и минимальный расход воды", price: "от 800 ₽" },
  { icon: "Wind", title: "Озонирование", desc: "Устранение запахов и дезинфекция салона", price: "от 1 200 ₽" },
  { icon: "Star", title: "Детейлинг", desc: "Профессиональный уход премиум-класса для вашего авто", price: "от 8 000 ₽" },
];

const PRICES = [
  {
    title: "Стандарт",
    price: "500",
    color: "from-slate-800 to-slate-700",
    border: "border-slate-600",
    features: ["Мойка кузова", "Мойка дисков", "Протирка стёкол", "Ароматизация"],
    popular: false,
  },
  {
    title: "Комфорт",
    price: "1 500",
    color: "from-blue-900 to-cyan-900",
    border: "border-cyan-400",
    features: ["Всё из Стандарт", "Химчистка салона", "Полировка стёкол", "Чернение резины", "Уборка багажника"],
    popular: true,
  },
  {
    title: "Премиум",
    price: "8 000",
    color: "from-slate-900 to-blue-950",
    border: "border-blue-500",
    features: ["Всё из Комфорт", "Детейлинг кузова", "Нанокерамика", "Озонирование", "Полировка фар", "VIP-зона ожидания"],
    popular: false,
  },
];

const REVIEWS = [
  { name: "Алексей М.", car: "BMW X5", text: "Отличный результат! Машина блестит как новая. Очень внимательный персонал.", rating: 5, avatar: "А" },
  { name: "Мария К.", car: "Toyota Camry", text: "Сделали всё быстро и качественно. Экологичные средства — это важно для меня.", rating: 5, avatar: "М" },
  { name: "Сергей Л.", car: "Porsche Cayenne", text: "Давно ищу достойный детейлинг. Нашёл! Профессиональный подход и внимание к деталям.", rating: 5, avatar: "С" },
  { name: "Анна В.", car: "Kia Sportage", text: "Цены адекватные, качество отличное. Буду постоянным клиентом!", rating: 5, avatar: "А" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const navItems = [
    { id: "services", label: "Услуги" },
    { id: "gallery", label: "Галерея" },
    { id: "prices", label: "Цены" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="font-montserrat bg-[#05080f] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#05080f]/95 backdrop-blur-md shadow-lg shadow-cyan-500/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Icon name="Droplets" size={20} className="text-white" />
            </div>
            <span className="font-oswald text-xl font-bold tracking-wider text-white">CARWASH<span className="text-cyan-400">124</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-cyan-400 ${activeNav === item.id ? "text-cyan-400" : "text-gray-300"}`}>
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contacts")}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30">
              Записаться
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#05080f]/98 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-4">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-gray-200 font-semibold py-2 border-b border-white/5 hover:text-cyan-400 transition-colors">
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contacts")}
              className="mt-2 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold">
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="АкваПро автомойка" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05080f]/60 via-[#05080f]/30 to-[#05080f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/80 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-cyan-400/20 blur-sm animate-float"
              style={{ width: `${20 + i * 15}px`, height: `${20 + i * 15}px`, left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 20}%`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6">
              <Icon name="Leaf" size={14} />
              Экологичные средства нового поколения
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-tight mb-6">
              БЛЕСК ВАШЕГО<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                АВТОМОБИЛЯ —
              </span><br />
              НАША РАБОТА
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
              Профессиональная автомойка с современным оборудованием и экологичными средствами. Доверьте заботу о вашем авто профессионалам.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("contacts")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-cyan-500/40">
                Записаться сейчас
              </button>
              <button onClick={() => scrollTo("services")}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all backdrop-blur-sm">
                Наши услуги
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-14">
              {[["1 200+", "Довольных клиентов"], ["8 лет", "На рынке"], ["100%", "Эко-средства"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-oswald text-3xl font-bold text-cyan-400">{num}</div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <button onClick={() => scrollTo("services")} className="text-cyan-400/60 hover:text-cyan-400 transition-colors">
            <Icon name="ChevronDown" size={32} />
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Section className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-4">Что мы делаем</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">НАШИ <span className="text-cyan-400">УСЛУГИ</span></h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Профессиональный уход за автомобилем с использованием современного оборудования</p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Section key={s.title}>
                <div className="group relative p-6 rounded-2xl border border-white/8 bg-gradient-to-br from-white/5 to-white/2 hover:border-cyan-500/40 hover:from-cyan-500/10 hover:to-blue-900/20 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl group-hover:bg-cyan-400/15 transition-all" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name={s.icon} size={22} className="text-cyan-400" />
                    </div>
                    <h3 className="font-oswald text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="text-cyan-400 font-bold text-lg">{s.price}</div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Section className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-4">Результат работы</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">НАША <span className="text-cyan-400">ГАЛЕРЕЯ</span></h2>
            <p className="text-gray-400 text-lg">Видите разницу? Вот что мы делаем каждый день</p>
          </Section>

          <Section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border border-white/10">
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-bold">До</div>
                <div className="text-center">
                  <Icon name="Car" size={64} className="text-white/30 mx-auto mb-3" />
                  <p className="text-white/60 text-sm">Запылённый автомобиль</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center border border-cyan-500/30">
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-bold">После</div>
                <div className="text-center">
                  <Icon name="Car" size={64} className="text-white/60 mx-auto mb-3" />
                  <p className="text-white/80 text-sm">Сияющий результат</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "Zap", label: "Экспресс за 20 мин" },
                { icon: "Droplets", label: "Экономия воды 70%" },
                { icon: "Leaf", label: "Эко-сертификат" },
                { icon: "Award", label: "Лучшая мойка 2024" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/8 bg-white/3 hover:border-cyan-400/30 transition-all">
                  <Icon name={item.icon} size={24} className="text-cyan-400" />
                  <span className="text-xs text-gray-400 text-center font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Section className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-4">Прозрачные цены</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">ТАРИФЫ И <span className="text-cyan-400">ЦЕНЫ</span></h2>
            <p className="text-gray-400 text-lg">Выбери подходящий пакет услуг для вашего автомобиля</p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {PRICES.map((plan) => (
              <Section key={plan.title}>
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${plan.color} border ${plan.border} ${plan.popular ? "md:scale-105 shadow-2xl shadow-cyan-500/20" : ""} transition-all hover:scale-[1.02] duration-300`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold tracking-wider whitespace-nowrap">
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <h3 className="font-oswald text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="font-oswald text-5xl font-bold text-cyan-400">{plan.price}</span>
                    <span className="text-gray-400 mb-2">₽</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <Icon name="Check" size={16} className="text-cyan-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo("contacts")}
                    className={`w-full py-3 rounded-full font-bold text-sm transition-all hover:scale-105 ${plan.popular ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30" : "border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400"}`}>
                    Выбрать
                  </button>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Section className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-4">Мнения клиентов</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">ОТЗЫВЫ <span className="text-cyan-400">КЛИЕНТОВ</span></h2>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <Section key={r.name}>
                <div className="p-6 rounded-2xl border border-white/8 bg-gradient-to-br from-white/5 to-white/2 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{r.name}</div>
                      <div className="text-gray-400 text-sm flex items-center gap-1">
                        <Icon name="Car" size={12} />
                        {r.car}
                      </div>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(r.rating)].map((_, j) => (
                        <Icon key={j} name="Star" size={14} className="text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">"{r.text}"</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Section className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-4">Записаться</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4">СВЯЖИТЕСЬ <span className="text-cyan-400">С НАМИ</span></h2>
            <p className="text-gray-400 text-lg">Оставьте заявку и мы перезвоним в течение 5 минут</p>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Section>
              <div className="space-y-4">
                {[
                  { icon: "MapPin", label: "Адрес", value: "ул. Автомобильная, 15, Москва" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                  { icon: "Clock", label: "Режим работы", value: "Ежедневно с 8:00 до 22:00" },
                  { icon: "Mail", label: "Email", value: "info@aquapro.ru" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 hover:border-cyan-400/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-medium">{item.label}</div>
                      <div className="text-white font-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-900/20 border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Leaf" size={20} className="text-cyan-400" />
                    <h3 className="font-oswald font-bold text-lg">Наш экопринцип</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">Мы используем только биоразлагаемые средства и современные технологии экономии воды. Чистое авто — чистая планета.</p>
                </div>
              </div>
            </Section>

            <Section>
              {sent ? (
                <div className="p-10 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-center">
                  <Icon name="CheckCircle" size={56} className="text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-oswald text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-400">Мы перезвоним вам в течение 5 минут</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent space-y-4">
                  <h3 className="font-oswald text-2xl font-bold mb-6">Оставить заявку</h3>
                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1 block">Ваше имя</label>
                    <input type="text" required placeholder="Иван Иванов"
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1 block">Телефон</label>
                    <input type="tel" required placeholder="+7 (999) 000-00-00"
                      value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1 block">Услуга</label>
                    <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0d1117] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors">
                      <option value="">Выберите услугу</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <button type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-[1.02] transition-all shadow-lg shadow-cyan-500/30">
                    Отправить заявку
                  </button>
                </form>
              )}
            </Section>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Icon name="Droplets" size={14} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-white">CARWASH<span className="text-cyan-400">124</span></span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 CARWASH124. Все права защищены.</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Icon name="Leaf" size={14} className="text-cyan-400" />
            Экологичные технологии
          </div>
        </div>
      </footer>
    </div>
  );
}