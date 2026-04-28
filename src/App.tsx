import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  Droplets,
  Home,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  WalletCards,
  X,
} from "lucide-react";
import logo from "./assets/images/fantastic-finish-logo.png";
import areasImage from "./assets/generated/section-areas.jpg";
import ownerImage from "./assets/generated/section-owner.jpg";
import processImage from "./assets/generated/section-process.jpg";
import reviewsImage from "./assets/generated/section-reviews.jpg";
import servicesImage from "./assets/generated/section-services.jpg";
import whyImage from "./assets/generated/section-why.jpg";

const phoneDisplay = "07469 876122";
const phoneHref = "tel:07469876122";
const whatsappHref = "https://wa.me/447469876122";
const email = "windowcleaning@fantasticfinish.co.uk";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "How it works", href: "#process" },
  { label: "Areas", href: "#areas" },
  { label: "FAQs", href: "#faqs" },
];

const services = [
  {
    title: "Window Cleaning",
    text: "Regular 4 or 8-weekly window cleaning for homes across Fareham and the surrounding areas — frames, sills and glass.",
    hint: "From £15 per visit",
    icon: Sparkles,
    feature: true,
  },
  {
    title: "Gutter Clearing",
    text: "Blocked gutters cleared properly so rainwater moves safely away from your home — before damp becomes a bigger job.",
    hint: "Vacuum or hand-cleared",
    icon: Droplets,
    feature: true,
  },
  {
    title: "Soffit & Fascia",
    text: "Roofline cleaning that lifts the whole property from street level.",
    icon: Home,
  },
  {
    title: "Conservatory",
    text: "Conservatory roof and frame cleaning for brighter glass.",
    icon: BadgeCheck,
  },
  {
    title: "Soft Washing",
    text: "A careful exterior clean for surfaces that need a gentler approach.",
    icon: ShieldCheck,
  },
];

const googleReviewsHref =
  "https://www.google.com/search?q=fantastic+finish+fareham#lrd=0x48746f8a23b8453b:0x88a781e8e537a9f4,1,,,,";

const process = [
  {
    title: "Tell us what needs cleaning",
    text: "Send the form, call, or message on WhatsApp with your property details.",
  },
  {
    title: "Get a clear quote",
    text: "We keep the quote simple and confirm what's included before any work starts.",
  },
  {
    title: "Choose your slot",
    text: "Pick a suitable time, with reminders the day before so you know when to expect us.",
  },
  {
    title: "Enjoy the finish",
    text: "Windows, gutters, roofline or conservatory cleaned with care and a tidy follow-up.",
  },
];

// Real Google reviews from fantasticfinish.co.uk — verbatim
const testimonials = [
  {
    name: "Sam Mills",
    quote:
      "Chris and the team clean the windows every month and keep me informed the day before that they are coming. This month I had the gutters cleared and soffits cleaned and they did a brilliant job!",
    meta: "Window cleaning, gutters & soffits",
  },
  {
    name: "Tim Weeden",
    quote:
      "Had Chris round for the first time today to clean windows, gutters and solar panels, all of which were well overdue for some attention. Absolutely delighted with the result, and at a very reasonable price.",
    meta: "Windows, gutters & solar panels",
  },
  {
    name: "Charlotte Long",
    quote:
      "Chris came to clean my windows, fascias and gutters today and I am very happy with the result. Booking and communication was swift and easy and I will certainly be using him again!",
    meta: "Windows, fascias & gutters",
  },
  {
    name: "Rebecca Cooper",
    quote:
      "I messaged about cleaning my gutters and soffits as I'd recently moved house. Chris was very responsive and prompt on the day.",
    meta: "Gutters & soffits",
  },
  {
    name: "Mike Ford",
    quote:
      "Recently had Chris round for a window & gutter clean at our property. From the initial booking request through to completion on the day the service was both efficient & professional.",
    meta: "Windows & gutters",
  },
  {
    name: "Kelly Marie Wilkinson",
    quote:
      "For more than a year now, Chris has been diligently cleaning my windows and conservatory on a monthly basis. Always polite, always thorough.",
    meta: "Monthly windows & conservatory",
  },
  {
    name: "Fiona Jacques-Stevens",
    quote:
      "I can thoroughly recommend Fantastic Finish. I had my gutters cleared and all fascias and conservatory cleaned. Excellent job and very reasonable price.",
    meta: "Gutters, fascias & conservatory",
  },
  {
    name: "Tracy Layton",
    quote:
      "Chris is reliable, friendly and always does a great job. Wouldn't go anywhere else for our window cleaning.",
    meta: "Regular window cleaning",
  },
];

const areasPrimary = ["Fareham", "Gosport", "Lee-on-the-Solent", "Stubbington", "Portchester"];
const areasSecondary = [
  "Whitley",
  "Paulsgrove",
  "Portsmouth",
  "Havant",
  "Leigh Park",
  "Waterlooville",
];

const faqs = [
  {
    q: "Do you offer regular window cleaning?",
    a: "Yes. Choose 4 or 8-weekly visits so your windows stay bright without needing to rebook each time. You'll get a text reminder the day before each visit.",
  },
  {
    q: "Can I get an instant quote?",
    a: "Yes. Use the form in the hero section and we'll come back with the right price for your home and service — usually within a few hours, and always within 24.",
  },
  {
    q: "What areas do you serve?",
    a: "Our main service area covers Fareham, Gosport, Lee-on-the-Solent, Stubbington, Portchester, Portsmouth, Havant, Waterlooville and surrounding villages. Not sure about your address? Just ask.",
  },
  {
    q: "Do you clean more than windows?",
    a: "Yes. Services include gutter clearing, soffit and fascia cleaning, conservatory cleaning, solar panels and soft washing for exterior surfaces.",
  },
  {
    q: "Do I need a long contract?",
    a: "No. There are no contracts and you can cancel anytime — though most of our customers stay with us for years.",
  },
  {
    q: "How can I contact you?",
    a: `Call ${phoneDisplay}, message on WhatsApp, or email ${email}. We reply within 24 hours.`,
  },
];

function GoogleStars({ size = 13 }: { size?: number }) {
  return (
    <span className="google-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={size} fill="currentColor" />
      ))}
    </span>
  );
}

function GoogleMark() {
  return (
    <span className="google-mark" aria-hidden="true">
      G
    </span>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bedrooms, setBedrooms] = useState("3");
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();

  const quoteRange = useMemo(() => {
    const base = Number(bedrooms) || 3;
    return `from £${Math.max(15, base * 5 + 5)}`;
  }, [bedrooms]);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>(".hero-section");
      const footer = document.querySelector<HTMLElement>(".footer");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      const footerTop = footer ? footer.offsetTop : Number.POSITIVE_INFINITY;
      const pastHero = window.scrollY > heroBottom - 120;
      const beforeFooter = window.scrollY + window.innerHeight < footerTop + 32;

      setScrolled(window.scrollY > 24);
      setShowSticky(pastHero && beforeFooter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const fadeUp = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0 },
  };
  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };
  const revealViewport = { once: true, amount: 0.2 };

  const featureServices = services.filter((s) => s.feature);
  const compactServices = services.filter((s) => !s.feature);

  return (
    <div className="min-h-screen text-ink">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="top-strip">
          <span className="inline-flex items-center gap-2">
            <Star aria-hidden="true" size={13} fill="currentColor" className="top-strip__star" />{" "}
            Rated 5.0 by 350+ local customers
          </span>
          <span className="hidden sm:inline">No contracts · Reply within 24 hours</span>
          <a className="top-strip__link" href={phoneHref}>
            <Phone aria-hidden="true" size={13} /> {phoneDisplay}
          </a>
        </div>

        <nav className="nav-shell" aria-label="Main navigation">
          <a className="logo-link" href="#top" aria-label="Fantastic Finish homepage">
            <img src={logo} alt="Fantastic Finish Ltd" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              className="icon-button"
              href={whatsappHref}
              aria-label="Message Fantastic Finish on WhatsApp"
            >
              <MessageCircle aria-hidden="true" size={20} />
            </a>
            <a className="button button--green" href="#quote">
              Get a quote <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>

          <a className="mobile-nav-cta" href="#quote">
            Quote
          </a>

          <button
            className="menu-button lg:hidden"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>

        <div className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="button button--green w-full justify-center"
            href="#quote"
            onClick={() => setMenuOpen(false)}
          >
            Get a quote <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO ─────────────────────────────────────────── */}
        <section id="top" className="hero-section">
          <video
            className="hero-video"
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={`${import.meta.env.BASE_URL}cleaning-hero.mp4`} type="video/mp4" />
          </video>

          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="show"
              transition={{ duration: 0.55, ease: "easeOut" }}
              variants={stagger}
            >
              <motion.p className="eyebrow" variants={fadeUp}>
                Professional exterior cleaning · Fareham
              </motion.p>
              <motion.h1 variants={fadeUp}>
                A <em>Fantastic Finish</em> for every home in Fareham
              </motion.h1>
              <motion.p className="hero-lede" variants={fadeUp}>
                Reliable window cleaning, gutters, soffits, fascias, conservatories and soft
                washing — booked in 30 seconds, with a clear quote and no contracts.
              </motion.p>

              <motion.div className="hero-actions" variants={fadeUp}>
                <a className="button button--green" href="#quote">
                  Get an instant quote <ArrowRight aria-hidden="true" size={16} />
                </a>
                <a className="button button--ghost" href={phoneHref}>
                  <Phone aria-hidden="true" size={16} /> {phoneDisplay}
                </a>
              </motion.div>

              <motion.div className="hero-trust" variants={fadeUp}>
                <a
                  className="hero-trust__google"
                  href={googleReviewsHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="See Google reviews"
                >
                  <GoogleMark />
                  <GoogleStars />
                  <span className="hero-trust__rating">5.0</span>
                </a>
                <span className="hero-trust__divider" aria-hidden="true" />
                <span className="hero-trust__item">
                  <ShieldCheck aria-hidden="true" size={16} />
                  Fully insured
                </span>
                <span className="hero-trust__divider" aria-hidden="true" />
                <span className="hero-trust__item">
                  <MessageCircle aria-hidden="true" size={16} />
                  Text reminders
                </span>
                <span className="hero-trust__divider" aria-hidden="true" />
                <span className="hero-trust__item">
                  <WalletCards aria-hidden="true" size={16} />
                  Secure payment
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-aside"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.1, ease: "easeOut" }}
            >
              <motion.form
                id="quote"
                className="quote-form"
                onSubmit={handleSubmit}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
                variants={stagger}
              >
                <motion.div className="quote-form__head" variants={fadeUp}>
                  <p className="form-kicker">Instant quote</p>
                  <h2>Tell us about your home</h2>
                  <p>Fast answer · no contract · simple follow-up.</p>
                </motion.div>

                <motion.div className="form-grid" variants={fadeUp}>
                  <label>
                    Full name
                    <input name="name" autoComplete="name" required placeholder="Your name" />
                  </label>
                  <label>
                    Phone
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="07XXX XXXXXX"
                    />
                  </label>
                  <label>
                    Bedrooms
                    <select
                      name="bedrooms"
                      value={bedrooms}
                      onChange={(event) => setBedrooms(event.target.value)}
                    >
                      <option value="2">2 bedroom</option>
                      <option value="3">3 bedroom</option>
                      <option value="4">4 bedroom</option>
                      <option value="5">5 bedroom</option>
                      <option value="6">6+ bedroom</option>
                    </select>
                  </label>
                  <label>
                    Service
                    <select name="service" defaultValue="Window Cleaning">
                      {services.map((service) => (
                        <option key={service.title}>{service.title}</option>
                      ))}
                      <option>Other exterior cleaning</option>
                    </select>
                  </label>
                  <label className="form-grid__wide">
                    How can we help?
                    <textarea name="message" rows={3} placeholder="Tell us what needs cleaning" />
                  </label>
                </motion.div>

                <motion.div className="quote-estimate" aria-live="polite" variants={fadeUp}>
                  <span>Estimated price</span>
                  <strong>{quoteRange}</strong>
                </motion.div>

                <motion.button
                  className="button button--green w-full justify-center"
                  type="submit"
                  variants={fadeUp}
                >
                  {submitted ? "Thanks — we'll be in touch within 24h" : "Send quote request"}
                  <ArrowRight aria-hidden="true" size={16} />
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </section>

        {/* TRUST BAND ────────────────────────────────────── */}
        <motion.section
          className="trust-band"
          aria-label="Customer reassurance"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <a
            className="trust-band__google"
            href={googleReviewsHref}
            target="_blank"
            rel="noreferrer"
          >
            <GoogleMark />
            <div className="trust-band__google-copy">
              <strong>5.0 on Google</strong>
              <span>by 350+ local customers</span>
            </div>
          </a>
          <div>
            <strong>350+</strong>
            <span>happy households</span>
          </div>
          <div>
            <strong>Fully insured</strong>
            <span>reliable exterior cleaning</span>
          </div>
          <a
            className="trust-band__link"
            href={googleReviewsHref}
            target="_blank"
            rel="noreferrer"
          >
            Read more reviews <ArrowRight aria-hidden="true" size={15} />
          </a>
        </motion.section>

        {/* SERVICES ──────────────────────────────────────── */}
        <motion.section
          id="services"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div className="section__inner">
            <div className="section-intro-grid">
              <div className="section-heading section-heading--compact">
                <p className="eyebrow">Services</p>
                <h2>Exterior cleaning that keeps the whole home looking cared for</h2>
                <p>
                  From regular visits to one-off jobs, every service comes with the same standard
                  — clean results, tidy work, clear communication.
                </p>
              </div>

              <motion.div className="padded-image-card section-intro-image" variants={fadeUp}>
                <img
                  src={servicesImage}
                  alt="Professional window cleaning beside a conservatory and coastal home"
                />
              </motion.div>
            </div>

            <div className="services-grid">
              {featureServices.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    className="service-card service-card--feature"
                    key={service.title}
                    variants={fadeUp}
                  >
                    <span className="service-card__icon">
                      <Icon aria-hidden="true" size={26} />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    {service.hint ? (
                      <span className="service-card__hint">
                        <Check aria-hidden="true" size={14} /> {service.hint}
                      </span>
                    ) : null}
                  </motion.article>
                );
              })}
              {compactServices.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    className="service-card service-card--compact"
                    key={service.title}
                    variants={fadeUp}
                  >
                    <span className="service-card__icon">
                      <Icon aria-hidden="true" size={22} />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* WHY US / SPLIT ────────────────────────────────── */}
        <motion.section
          id="why"
          className="section section--soft"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div className="section__inner split-section">
            <div className="split-copy">
              <p className="eyebrow">Why customers choose us</p>
              <h2>A simple service built around clean results and easy contact</h2>
              <p>
                Most of our work comes from word-of-mouth in Fareham and Gosport. That only
                happens if the cleaning is good and we stay easy to deal with.
              </p>

              <div className="benefit-list">
                <div>
                  <span className="benefit-list__icon">
                    <CalendarClock aria-hidden="true" size={16} />
                  </span>
                  <div>
                    <strong>4 or 8-weekly service options</strong>
                    <span>Pick the rhythm that suits your home — no contract, cancel anytime.</span>
                  </div>
                </div>
                <div>
                  <span className="benefit-list__icon">
                    <MessageCircle aria-hidden="true" size={16} />
                  </span>
                  <div>
                    <strong>Text reminders before every visit</strong>
                    <span>You'll know the day before, so you can leave gates and access ready.</span>
                  </div>
                </div>
                <div>
                  <span className="benefit-list__icon">
                    <ShieldCheck aria-hidden="true" size={16} />
                  </span>
                  <div>
                    <strong>Fully insured and reliable</strong>
                    <span>Public liability cover and a record of showing up when we said we would.</span>
                  </div>
                </div>
                <div>
                  <span className="benefit-list__icon">
                    <Clock aria-hidden="true" size={16} />
                  </span>
                  <div>
                    <strong>Reply within 24 hours</strong>
                    <span>Quotes and questions answered the same day, most of the time.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="padded-image-card image-panel">
              <img
                src={whyImage}
                alt="Professional exterior cleaner preparing tidy tools outside a home"
              />
            </div>
          </div>
        </motion.section>

        {/* PROCESS ───────────────────────────────────────── */}
        <motion.section
          id="process"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div className="section__inner">
            <div className="section-heading">
              <p className="eyebrow">How it works</p>
              <h2>From quote to clean finish in four clear steps</h2>
            </div>

            <div className="process-layout">
              <div className="process-stepper">
                {process.map((step, index) => (
                  <motion.div className="process-step" key={step.title} variants={fadeUp}>
                    <span className="process-step__num">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div className="padded-image-card process-image" variants={fadeUp}>
                <img
                  src={processImage}
                  alt="Simple booking process shown with a phone, calendar, cleaning cloth and payment card"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* TESTIMONIALS ──────────────────────────────────── */}
        <motion.section
          id="reviews"
          className="section section--soft"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div className="section__inner">
            <div className="testimonials-heading">
              <p className="eyebrow">Real reviews · 5.0 on Google</p>
              <h2>Trusted by 350+ households across Fareham and Gosport</h2>
              <p>
                Every quote on this page is from a real Google review. No filters, no edits — read
                them all on Google.
              </p>
            </div>

            <div className="reviews-layout">
              <div className="testimonials-grid">
                {testimonials.map((t) => (
                  <motion.figure className="testimonial" key={t.name} variants={fadeUp}>
                    <div className="testimonial__head">
                      <GoogleStars size={15} />
                      <a
                        className="testimonial__google"
                        href={googleReviewsHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GoogleMark /> Verified
                      </a>
                    </div>
                    <blockquote>"{t.quote}"</blockquote>
                    <figcaption className="testimonial__author">
                      <span className="testimonial__avatar">{getInitials(t.name)}</span>
                      <div>
                        <div className="testimonial__name">{t.name}</div>
                        <div className="testimonial__meta">{t.meta}</div>
                      </div>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>

              <motion.div className="padded-image-card reviews-image" variants={fadeUp}>
                <img
                  src={reviewsImage}
                  alt="Freshly cleaned windows with a five star customer review moment"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* MEET KIERON ───────────────────────────────────── */}
        <motion.section
          className="section owner-section"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div className="section__inner owner-grid">
            <div className="owner-copy">
              <p className="eyebrow">Meet the team</p>
              <h2>A small Fareham business that picks up the phone</h2>
              <p className="owner-quote">
                "I started Fantastic Finish to give Fareham homes a cleaning service that just
                shows up, does it properly, and stays in touch. We're not a faceless contractor —
                most of our work comes from neighbours recommending us to neighbours."
              </p>
              <div className="owner-sign">
                <div>
                  <div className="owner-sign__name">Kieron Jack</div>
                  <div className="owner-sign__role">Founder, Fantastic Finish Ltd</div>
                </div>
              </div>
              <div className="owner-actions">
                <a className="button button--dark" href={phoneHref}>
                  <Phone aria-hidden="true" size={16} /> Call {phoneDisplay}
                </a>
                <a className="button button--ghost" href={whatsappHref}>
                  <MessageCircle aria-hidden="true" size={16} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="padded-image-card owner-media">
              <img
                src={ownerImage}
                alt="Friendly local Fantastic Finish exterior cleaning professional outside a home"
              />
              <div className="owner-media__plate">
                <BadgeCheck aria-hidden="true" size={14} /> Fareham · Hampshire
              </div>
            </div>
          </div>
        </motion.section>

        {/* AREAS ─────────────────────────────────────────── */}
        <motion.section
          id="areas"
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div className="section__inner areas-section">
            <div className="areas-copy">
              <p className="eyebrow">Areas we serve</p>
              <h2>Local exterior cleaning across Fareham and the surrounding towns</h2>
              <p>
                Not sure if your address is in our patch? Send a quick message — we'll let you
                know straight away.
              </p>
              <a className="button button--ghost" href={whatsappHref}>
                <MessageCircle aria-hidden="true" size={16} /> Check on WhatsApp
              </a>
            </div>

            <div className="areas-visual-stack">
              <div className="padded-image-card areas-image">
                <img
                  src={areasImage}
                  alt="Clean homes and gardens across a coastal Hampshire residential area"
                />
              </div>

              <div className="areas-list">
                <div className="areas-list__group">
                  <h3>Primary service area</h3>
                  <div className="area-tags">
                    {areasPrimary.map((area) => (
                      <span key={area}>
                        <MapPin aria-hidden="true" size={14} />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="areas-list__group areas-list__group--secondary">
                  <h3>Also serving</h3>
                  <div className="area-tags">
                    {areasSecondary.map((area) => (
                      <span key={area}>
                        <MapPin aria-hidden="true" size={14} />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQs ──────────────────────────────────────────── */}
        <motion.section
          id="faqs"
          className="section section--soft"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div className="section__inner">
            <div className="section-heading">
              <p className="eyebrow">Frequently asked</p>
              <h2>Questions before you book</h2>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div className="faq-item" key={faq.q}>
                  <button
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      style={{
                        transform: openFaq === index ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  <div className={openFaq === index ? "faq-answer faq-answer--open" : "faq-answer"}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FINAL CTA ─────────────────────────────────────── */}
        <motion.section
          className="final-cta"
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ duration: 0.5 }}
          variants={fadeUp}
        >
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2>Get a quote for your Fantastic Finish</h2>
            <p>Reach out via the form above or call {phoneDisplay}. Reply within 24 hours.</p>
          </div>
          <div className="final-cta__actions">
            <a className="button button--green" href="#quote">
              Instant quote <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a className="button button--light" href={whatsappHref}>
              <MessageCircle aria-hidden="true" size={16} /> WhatsApp
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer__brand">
          <img src={logo} alt="Fantastic Finish Ltd" />
          <p>
            Window cleaning, gutters, soffits and fascias, conservatories and soft washing across
            Fareham, Gosport and the surrounding areas.
          </p>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={phoneHref}>
            <Phone aria-hidden="true" size={15} /> {phoneDisplay}
          </a>
          <a href={`mailto:${email}`}>
            <Mail aria-hidden="true" size={15} /> {email}
          </a>
          <a href={whatsappHref}>
            <MessageCircle aria-hidden="true" size={15} /> WhatsApp
          </a>
        </div>
        <div>
          <h2>Services</h2>
          {services.map((service) => (
            <a key={service.title} href="#services">
              {service.title}
            </a>
          ))}
        </div>
        <div>
          <h2>Hours</h2>
          <span className="footer__line">
            <Clock aria-hidden="true" size={15} /> Mon–Sat, 8am–6pm
          </span>
          <span className="footer__line">
            <MessageCircle aria-hidden="true" size={15} /> Replies within 24 hours
          </span>
          <span className="footer__line">
            <ShieldCheck aria-hidden="true" size={15} /> Fully insured
          </span>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Fantastic Finish Ltd · Fareham, Hampshire</span>
          <span>Built with care for local homes.</span>
        </div>
      </footer>

      <div
        className={`sticky-cta ${showSticky ? "sticky-cta--show" : ""}`}
        aria-hidden={!showSticky}
      >
        <div>
          <strong>Ready for a Fantastic Finish?</strong>
          <span>Fast quotes for Fareham and nearby.</span>
        </div>
        <a className="button button--green" href="#quote">
          Quote <ArrowRight aria-hidden="true" size={16} />
        </a>
        <a className="icon-button icon-button--dark" href={phoneHref} aria-label="Call Fantastic Finish">
          <Phone aria-hidden="true" size={18} />
        </a>
      </div>
    </div>
  );
}

export default App;
