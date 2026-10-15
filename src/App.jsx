import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2, Clock, MapPin, Menu, Minus, Phone, Plus, X } from "lucide-react";
import SITE from "./site.js";

// -----------------------------------------------------------------------------
// All business content lives in src/site.js. This file only lays it out.
// -----------------------------------------------------------------------------

const { COMPANY, PHONE, PHONE_DISPLAY, EMAIL, ADDRESS, CITY, MAPS_QUERY, FOUNDED, FALLBACK_RATING } = SITE;
const GOOGLE_REVIEWS_URL = SITE.GOOGLE_PLACE_ID
  ? `https://search.google.com/local/reviews?placeid=${SITE.GOOGLE_PLACE_ID}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const GOOGLE_WRITE_REVIEW_URL = SITE.GOOGLE_PLACE_ID ? `https://search.google.com/local/writereview?placeid=${SITE.GOOGLE_PLACE_ID}` : null;

// Public contact details for the studio — edit here, no environment variables required.
const STUDIO_PHONE = "+17205156647";
const STUDIO_EMAIL = "hello@blueprintwebstudio.com";
const STUDIO_WEBSITE = "https://blueprintwebstudio.com";
const STUDIO_SOURCE = `${SITE.ABBR}.blueprintwebstudio.com`;

const END_DATE = import.meta.env.VITE_CONCEPT_END_DATE || SITE.END_DATE;

function Title({ parts }) {
  const [plain, em] = parts;
  return <>{plain}{em && <em>{em}</em>}</>;
}

// -----------------------------------------------------------------------------
// CONCEPT COUNTDOWN + INTEREST FORM (Blueprint WebStudio)
// -----------------------------------------------------------------------------

function getRemaining() {
  const ms = Math.max(0, new Date(END_DATE).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    expired: ms === 0,
  };
}

function ConceptInterestModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement;
    modalRef.current?.focus();
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (form.website) { setStatus("sent"); return; }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/demo-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect: COMPANY,
          source: STUDIO_SOURCE,
          page: window.location.href,
          action: "Partner Program Interest",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Please try again.");
    }
  }

  return (
    <div className="interest-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="interest-modal" role="dialog" aria-modal="true" aria-labelledby="interest-title" ref={modalRef} tabIndex={-1}>
        <button type="button" className="interest-close" onClick={onClose} aria-label="Close interest form"><X size={24} /></button>
        <span className="interest-kicker">BLUEPRINT WEBSTUDIO PARTNER PROGRAM</span>
        {status === "sent" ? (
          <div className="interest-success">
            <CheckCircle2 size={44} />
            <h2 id="interest-title">Thank you for your interest.</h2>
            <p>Your message has been sent to Blueprint WebStudio. We'll follow up using the contact information you provided.</p>
            <button type="button" className="interest-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="interest-title">Interested in this redesign?</h2>
            <p className="interest-intro">Send a quick note and Blueprint WebStudio will follow up about launching, customizing, or taking over the site.</p>
            <form onSubmit={submit} className="interest-form">
              <label>Name <span>*</span><input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
              <label>Email <span>*</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={254} autoComplete="email" /></label>
              <label>Phone<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} autoComplete="tel" /></label>
              <label>Budget <span>*</span>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} required>
                  <option value="">Select a range...</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$2,500">$1,000–$2,500</option>
                  <option value="$2,500–$5,000">$2,500–$5,000</option>
                  <option value="$5,000–$10,000">$5,000–$10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <label>Message <small>(optional)</small><textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={3000} rows={4} placeholder="Questions, ideas, or anything you'd like us to know..." /></label>
              <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="interest-submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send My Interest"}</button>
              <p className="interest-privacy">Your inquiry goes directly to Blueprint WebStudio, not {COMPANY}.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function ConceptWidget() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [collapsed, setCollapsed] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  const [showForm, setShowForm] = useState(false);
  const closeForm = useCallback(() => setShowForm(false), []);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className={`concept-widget${collapsed ? " is-collapsed" : ""}`} aria-label="Independent website concept preview">
        <div className="concept-widget-head">
          <span>CONCEPT REVIEW · NOT FOR OFFICIAL USE</span>
          <button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand concept preview" : "Collapse concept preview"} aria-expanded={!collapsed}>
            {collapsed ? <Plus size={20} /> : <Minus size={20} />}
          </button>
        </div>
        {!collapsed && (
          <div className="concept-widget-body">
            <h2>Private Client Preview</h2>
            <span className="concept-widget-label">PARTNER PROGRAM ELIGIBILITY</span>
            <p>Reserved for review</p>
            <div className="concept-widget-timer" aria-label="Time remaining for concept review">
              {remaining.expired ? <strong>Review window ended</strong> : (
                [[remaining.days, "Days"], [remaining.hours, "Hours"], [remaining.minutes, "Minutes"]].map(([value, unit]) => (
                  <span key={unit}><strong>{String(value).padStart(2, "0")}</strong> {unit}</span>
                ))
              )}
            </div>
            <button type="button" className="concept-widget-cta" onClick={() => setShowForm(true)}>I'm Interested <ArrowUpRight size={18} /></button>
            <div className="concept-widget-links">
              {STUDIO_PHONE && <a href={`tel:${STUDIO_PHONE}`}>Call</a>}
              <a href={`mailto:${STUDIO_EMAIL}`}>Email</a>
              <a href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        )}
        <div className="concept-widget-footer">
          <a className="concept-widget-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Visit Blueprint WebStudio"><span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" /><span>Blueprint WebStudio</span></a>
          <span>Independent concept</span>
        </div>
      </aside>
      {showForm && <ConceptInterestModal onClose={closeForm} />}
    </>
  );
}

// -----------------------------------------------------------------------------
// SIGNATURE MOTIFS: the red / orange / yellow fascia stripe from the shop
// building, and the tachometer from the Tune Tech logo.
// -----------------------------------------------------------------------------

function Fascia({ className = "" }) {
  return <div className={`fascia ${className}`} aria-hidden="true"><span /><span /><span /><span /></div>;
}

function Tach({ value, label, sub }) {
  // A 240° gauge sweeping from 7 to 5 o'clock, ticks every 10 years up to 60.
  const max = 60;
  const start = -210;
  const sweep = 240;
  const angle = start + (Math.min(value, max) / max) * sweep;
  const cx = 120, cy = 120, r = 96;
  const pt = (deg, rad) => [cx + rad * Math.cos((deg * Math.PI) / 180), cy + rad * Math.sin((deg * Math.PI) / 180)];
  const arc = (from, to, rad) => {
    const [x1, y1] = pt(from, rad);
    const [x2, y2] = pt(to, rad);
    return `M ${x1} ${y1} A ${rad} ${rad} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  const zones = [["var(--yellow)", 0, 0.5], ["var(--orange)", 0.5, 0.78], ["var(--red)", 0.78, 1]];
  const ticks = Array.from({ length: max / 2 + 1 }, (_, i) => i * 2);
  const [nx, ny] = pt(angle, r - 22);
  return (
    <figure className="tach" aria-label={`${value} years serving Aurora`}>
      <svg viewBox="0 0 240 240" role="img" aria-hidden="true">
        <circle cx={cx} cy={cy} r="116" className="tach-face" />
        {zones.map(([color, a, b]) => <path key={color} d={arc(start + a * sweep + 1, start + b * sweep - 1, r + 6)} stroke={color} strokeWidth="9" fill="none" />)}
        {ticks.map((t) => {
          const deg = start + (t / max) * sweep;
          const major = t % 10 === 0;
          const [x1, y1] = pt(deg, r - 4);
          const [x2, y2] = pt(deg, r - (major ? 16 : 9));
          const [lx, ly] = pt(deg, r - 28);
          return (
            <g key={t}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className={major ? "tick major" : "tick"} />
              {major && <text x={lx} y={ly + 4} className="tick-label">{t}</text>}
            </g>
          );
        })}
        <line x1={cx} y1={cy} x2={nx} y2={ny} className="needle" />
        <circle cx={cx} cy={cy} r="9" className="hub" />
      </svg>
      <figcaption>
        <strong>{value}</strong>
        <span>{label}</span>
        {sub && <small>{sub}</small>}
      </figcaption>
    </figure>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

function Brand({ onClick }) {
  return (
    <a className="brand brand-logo" href="#home" onClick={onClick} aria-label={`${COMPANY} home`}>
      <img src={SITE.BRAND.logo} alt={SITE.BRAND.logoAlt || COMPANY} width="370" height="56" />
    </a>
  );
}

function navItems() {
  return [
    ["#services", "Services"],
    ["#specials", "Specials"],
    ["#about", SITE.ABOUT.nav || "About"],
    ["#reviews", "Reviews"],
    ["#visit", SITE.VISIT.nav || "Visit"],
  ];
}

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky-header">
      <div className="announce">
        <div className="container announce-inner">
          <span>{SITE.ANNOUNCE}</span>
          <span className="announce-hours"><Clock size={13} /> {SITE.HOURS_SHORT}</span>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Brand onClick={closeMenu} />
          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            {navItems().map(([href, label]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="links-cta" href="#book" onClick={closeMenu}>{SITE.BOOK.nav}</a>
          </nav>
          <a className="nav-phone" href={`tel:${PHONE}`}><Phone size={16} /> {PHONE_DISPLAY}</a>
          <a className="nav-cta" href="#book">{SITE.BOOK.nav}</a>
          <button className="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu((current) => !current)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        <Fascia />
      </header>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE SECTIONS
// -----------------------------------------------------------------------------

function Hero({ rating }) {
  const { HERO } = SITE;
  return (
    <section className="hero">
      <div className="hero-plate" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow light">{HERO.eyebrow}</span>
          <h1><span>{HERO.title[0]}</span> <em>{HERO.title[1]}</em></h1>
          <p>{HERO.text}</p>
          <div className="hero-actions">
            <a className="btn primary" href={`tel:${PHONE}`}><Phone size={18} /> Call {PHONE_DISPLAY}</a>
            <a className="btn ghost" href="#book">{HERO.cta} <ArrowUpRight size={18} /></a>
          </div>
        </div>
        <Tach value={SITE.YEARS} label="Years on Colfax" />
      </div>
      <figure className="hero-photo">
        <img src={HERO.photo.src} alt={HERO.photo.alt} width="1600" height="402" fetchPriority="high" />
      </figure>
      <div className="dash">
        <div className="container dash-inner">
          <div><Clock size={18} /><span><small>OPEN</small>Mon–Fri · 7:30–5:00</span></div>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`} target="_blank" rel="noopener noreferrer"><MapPin size={18} /><span><small>FIND US</small>{ADDRESS}, Aurora</span></a>
          {rating && (
            <a href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"><span className="dash-stars" aria-hidden="true">★</span><span><small>GOOGLE</small>{rating.rating.toFixed(1)} · {rating.userRatingCount.toLocaleString()} reviews</span></a>
          )}
          <div><BadgeCheck size={18} /><span><small>WARRANTY</small>24 mo / 24,000 mi</span></div>
        </div>
      </div>
    </section>
  );
}

function Awards({ rating }) {
  const { AWARDS } = SITE;
  return (
    <section className="awards" aria-label="Certifications and recognition">
      <div className="container awards-inner">
        <span className="eyebrow">{AWARDS.eyebrow}</span>
        <ul className="awards-list">
          {AWARDS.items.map(({ img, title, text }) => (
            <li key={title}><img src={img} alt={title} /><span><b>{title}</b>{text}</span></li>
          ))}
          <li className="award-anniv">
            <span className="anniv-badge" aria-hidden="true"><strong>{SITE.YEARS}</strong><small>years</small></span>
            <span><b>Celebrating {SITE.YEARS} years</b>Serving our community since {FOUNDED}</span>
          </li>
          {rating && (
            <li>
              <span className="google-badge" aria-hidden="true"><strong>{rating.rating.toFixed(1)}</strong><span>★★★★★</span></span>
              <span><b>Rated on Google</b>{rating.userRatingCount.toLocaleString()} reviews</span>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

function Specials() {
  const { OFFERS } = SITE;
  return (
    <section className="section specials" id="specials">
      <div className="container">
        <div className="specials-head">
          <span className="eyebrow">{OFFERS.eyebrow}</span>
          <h2>{OFFERS.title}</h2>
        </div>
        <div className="coupons">
          {OFFERS.items.map(({ big, unit, title, lines, fine }) => (
            <article className="coupon" key={title}>
              <div className="coupon-value"><strong>{big}</strong><span>{unit}</span></div>
              <div className="coupon-body">
                <h3>{title}</h3>
                <ul>{lines.map((line) => <li key={line}>{line}</li>)}</ul>
                {fine && <small>{fine}</small>}
              </div>
            </article>
          ))}
        </div>
        <p className="specials-note">{OFFERS.note}</p>
      </div>
    </section>
  );
}

function Services() {
  const { SERVICES } = SITE;
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow light">{SERVICES.eyebrow}</span>
            <h2><span>{SERVICES.title[0]}</span> <em>{SERVICES.title[1]}</em></h2>
          </div>
          <p>{SERVICES.text}</p>
        </div>
        <div className="service-photos">
          {SERVICES.photos.map(({ src, label, alt }) => (
            <figure key={src}><img src={src} alt={alt} loading="lazy" width="800" height="800" /><figcaption>{label}</figcaption></figure>
          ))}
        </div>
        <div className="services-list">
          {SERVICES.items.map(({ title, desc, icon: Icon }) => (
            <a className="service-row" key={title} href="#book" data-service={title}>
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              <span><strong>{title}</strong>{desc}</span>
              <ArrowRight size={18} className="service-go" aria-hidden="true" />
            </a>
          ))}
          <a className="service-row service-call" href={`tel:${PHONE}`}>
            <Phone size={22} strokeWidth={1.9} aria-hidden="true" />
            <span><strong>Not sure what it is?</strong>Call {PHONE_DISPLAY} and describe what the car is doing.</span>
            <ArrowRight size={18} className="service-go" aria-hidden="true" />
          </a>
        </div>
        <div className="makes">
          <h3>{SERVICES.makes.title}</h3>
          <div className="chips">{SERVICES.makes.items.map((item) => <span key={item}>{item}</span>)}<em>{SERVICES.makes.note}</em></div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { PROCESS } = SITE;
  return (
    <section className="process">
      <div className="container process-inner">
        <div>
          <span className="eyebrow light">{PROCESS.eyebrow}</span>
          <h2><span>{PROCESS.title[0]}</span> <em>{PROCESS.title[1]}</em></h2>
        </div>
        <ol className="process-steps">
          {PROCESS.steps.map(([title, description], index) => (
            <li key={title}>
              <span className="gear">{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  const { ABOUT, WARRANTY } = SITE;
  return (
    <section className="section about" id="about">
      <div className="container about-inner">
        <figure className="about-photo">
          <img src={ABOUT.photo.src} alt={ABOUT.photo.alt} loading="lazy" width="360" height="481" />
          <figcaption>{ABOUT.caption}</figcaption>
        </figure>
        <div className="about-copy">
          <span className="eyebrow">{ABOUT.eyebrow}</span>
          <h2><span>{ABOUT.title[0]}</span> <em>{ABOUT.title[1]}</em></h2>
          {ABOUT.text.map((paragraph) => <p className="about-lead" key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          <div className="credentials">
            {ABOUT.credentials.map(({ title, desc }) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="warranty">
          <div className="warranty-figs">
            <span><strong>{WARRANTY.big[0]}</strong>{WARRANTY.big[1]}</span>
            <i aria-hidden="true">/</i>
            <span><strong>{WARRANTY.big2[0]}</strong>{WARRANTY.big2[1]}</span>
          </div>
          <div>
            <span className="eyebrow">{WARRANTY.eyebrow}</span>
            <p>{WARRANTY.text}</p>
          </div>
          <img src={SITE.AWARDS.items[0].img} alt="NAPA AutoCare Center" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Reviews({ data, rating }) {
  const reviews = data?.reviews?.filter((review) => review.text?.text || review.originalText?.text) || [];
  const { REVIEWS } = SITE;
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="reviews-top">
          <div>
            <span className="eyebrow">CUSTOMER REVIEWS</span>
            <h2><span>{REVIEWS.title[0]}</span> <em>{REVIEWS.title[1]}</em></h2>
          </div>
          <div className="reviews-summary">
            {rating ? (
              <>
                <strong>{rating.rating.toFixed(1)}</strong>
                <span><span className="stars" aria-hidden="true">★★★★★</span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
              </>
            ) : <span>See what customers say on Google.</span>}
            <a className="btn dark" href={rating?.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Read reviews on Google <ArrowUpRight size={17} /></a>
          </div>
        </div>
        {reviews.length > 0 ? (
          <>
            <div className="quotes-grid">
              {reviews.slice(0, 6).map((review, i) => (
                <article className="quote-card" key={`${review.publishTime || i}-${i}`}>
                  <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating || 0))))}</div>
                  <blockquote>{review.text?.text || review.originalText?.text}</blockquote>
                  <footer>{review.authorAttribution?.displayName || "Google reviewer"}<small>Google review · {review.relativePublishTimeDescription}</small></footer>
                </article>
              ))}
            </div>
            <p className="reviews-attribution">Reviews provided by Google. A limited selection is displayed.</p>
          </>
        ) : (
          <div className="quotes-grid">
            {REVIEWS.quotes.map(([text, name]) => (
              <article className="quote-card" key={name}>
                <div className="stars" aria-hidden="true">★★★★★</div>
                <blockquote>{text}</blockquote>
                <footer>{name}<small>{REVIEWS.quoteSource}</small></footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Faq() {
  const { FAQ } = SITE;
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="container faq-inner">
        <div>
          <span className="eyebrow">{FAQ.eyebrow}</span>
          <h2 id="faq-title">Good <em>questions.</em></h2>
        </div>
        <div className="faq-list">
          {FAQ.items.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}<Plus size={20} aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RequestForm() {
  const { BOOK } = SITE;
  const blank = Object.fromEntries([...BOOK.fields.flat().map((field) => [field.name, ""]), ["website", ""]]);
  const [form, setForm] = useState(blank);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pick = (event) => {
      const link = event.target.closest?.("a[data-service]");
      if (link) setForm((prev) => ({ ...prev, service: link.dataset.service }));
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Something went wrong.");
      setStatus(result.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="book-form book-done">
        <CheckCircle2 size={44} />
        <h3>{status === "demo" ? `This is where ${SITE.BRAND.name} gets your request.` : "Request received."}</h3>
        <p>
          {status === "demo"
            ? `In this concept preview, requests aren't sent anywhere. On the live site they'd land in the ${SITE.NOUN} inbox with everything ${SITE.BRAND.name} needs to call back.`
            : `Thanks, ${form.name.split(" ")[0]}. We'll be in touch to confirm.`}
        </p>
        <button type="button" className="btn dark" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  const renderField = (field) => {
    const common = { value: form[field.name], onChange: (e) => update(field.name, e.target.value), required: field.required };
    let control;
    if (field.type === "select") {
      control = (
        <select {...common}>
          <option value="">{field.placeholder || "Choose…"}</option>
          {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    } else if (field.type === "textarea") {
      control = <textarea rows={4} maxLength={3000} placeholder={field.placeholder} {...common} />;
    } else {
      control = <input type={field.type || "text"} maxLength={field.type === "email" ? 254 : 160} placeholder={field.placeholder} autoComplete={field.autoComplete} {...common} />;
    }
    return <label key={field.name}>{field.label}{field.required ? " *" : ""}{control}</label>;
  };

  return (
    <form className="book-form" onSubmit={submit}>
      {BOOK.fields.map((row, index) => (Array.isArray(row) ? <div className="book-row" key={index}>{row.map(renderField)}</div> : renderField(row)))}
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn primary full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : BOOK.submit} <ArrowUpRight size={18} /></button>
      <p className="form-note">{BOOK.note} <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}

function Book() {
  const { BOOK } = SITE;
  return (
    <section className="section book" id="book">
      <div className="container book-inner">
        <div>
          <span className="eyebrow light">{BOOK.eyebrow}</span>
          <h2><span>{BOOK.title[0]}</span> <em>{BOOK.title[1]}</em></h2>
          <p>{BOOK.text}</p>
          <a className="book-call" href={`tel:${PHONE}`}><Phone size={26} /><span><small>CALL AND DESCRIBE THE PROBLEM</small>{PHONE_DISPLAY}</span></a>
          <ul className="book-points">
            {BOOK.points.map((point) => <li key={point}><CheckCircle2 size={18} /> {point}</li>)}
          </ul>
        </div>
        <RequestForm />
      </div>
    </section>
  );
}

function Visit() {
  const { VISIT, HOURS } = SITE;
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="section visit" id="visit">
      <div className="container visit-inner">
        <div className="visit-info">
          <span className="eyebrow">{VISIT.eyebrow}</span>
          <h2><span>{VISIT.title[0]}</span> <em>{VISIT.title[1]}</em></h2>
          <div className="visit-blocks">
            <div>
              <MapPin size={20} />
              <span><small>ADDRESS</small>{ADDRESS}<br />{CITY}</span>
            </div>
            <div>
              <Phone size={20} />
              <span><small>PHONE</small><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>{EMAIL && <><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></>}</span>
            </div>
            <div>
              <Clock size={20} />
              <span><small>HOURS</small>
                {HOURS.map(([day, hours]) => <span className="hours-row" key={day}><b>{day}</b>{hours}</span>)}
              </span>
            </div>
          </div>
          <a className="btn dark" href={directions} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={17} /></a>
          <p className="areas">{VISIT.areas}</p>
        </div>
        <div className="visit-map">
          <iframe title={`Map to ${COMPANY}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Fascia />
      <div className="container footer-main">
        <div>
          <Brand />
          <p>{SITE.FOOTER_BLURB}</p>
          <div className="footer-badges">
            {SITE.AWARDS.items.map(({ img, title }) => <img key={title} src={img} alt={title} loading="lazy" />)}
          </div>
        </div>
        <div>
          <b>Services</b>
          {SITE.SERVICES.items.slice(0, 6).map(({ title }) => <a key={title} href="#services">{title}</a>)}
        </div>
        <div>
          <b>Shop</b>
          {navItems().slice(1).map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a href="#book">{SITE.BOOK.nav}</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          <span>{ADDRESS}</span>
          <span>{CITY}</span>
          <span>{SITE.HOURS_SHORT}</span>
          {SITE.SOCIAL_LINKS.map(({ name, url }) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name} reviews <ArrowUpRight size={13} /></a>)}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {COMPANY}. Independent design concept, not an official company website.</span>
        <a className="footer-studio-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Website concept by Blueprint WebStudio">
          <span>Concept redesign by</span>
          <span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" />
          <strong>Blueprint WebStudio</strong>
        </a>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// APP — PAGE ORDER
// -----------------------------------------------------------------------------

export default function App() {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => { if (data) setReviewData(data); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const live = typeof reviewData?.rating === "number" && typeof reviewData?.userRatingCount === "number";
  const rating = live
    ? { rating: reviewData.rating, userRatingCount: reviewData.userRatingCount, googleMapsUri: reviewData.googleMapsUri || null }
    : FALLBACK_RATING
      ? { rating: FALLBACK_RATING.rating, userRatingCount: FALLBACK_RATING.userRatingCount, googleMapsUri: null }
      : null;

  return (
    <>
      <ConceptWidget />
      <SiteHeader />
      <main id="home">
        <Hero rating={rating} />
        <Awards rating={rating} />
        <Services />
        <Specials />
        <Process />
        <About />
        <Reviews data={reviewData} rating={rating} />
        <Faq />
        <Book />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
