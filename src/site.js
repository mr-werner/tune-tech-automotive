import { CalendarCheck, Car, ClipboardCheck, Clock, Cog, Disc3, Droplets, Flag, Gauge, MapPin, Search, ShieldCheck, Star, Thermometer, Wrench, Zap, Medal } from "lucide-react";

const COMPANY = "Tune Tech Automotive";
const MAPS_QUERY = "Tune Tech Automotive, 14851 E Colfax Ave, Aurora, CO 80011";
const FOUNDED = 1978;
const YEARS = new Date().getFullYear() - FOUNDED;

export default {
  COMPANY,
  ABBR: "tta",
  NOUN: "shop",
  PHONE: "3033279176",
  PHONE_DISPLAY: "(303) 327-9176",
  EMAIL: "",
  ADDRESS: "14851 E Colfax Ave",
  CITY: "Aurora, CO 80011",
  MAPS_QUERY,
  FOUNDED,
  GOOGLE_PLACE_ID: "",
  // Shown until live Google data loads. Count as linked on the current site; confirm before launch.
  FALLBACK_RATING: { rating: 4.8, userRatingCount: 698 },
  END_DATE: "2026-11-20T23:59:59-07:00",

  BRAND: { name: "Tune Tech", sub: `AUTOMOTIVE · SINCE ${FOUNDED}`, icon: Gauge },
  ANNOUNCE: `Family owned on East Colfax since ${FOUNDED} · 10% off for active duty, reserve and veterans`,

  HOURS: [
    ["Monday – Friday", "7:30 am – 5:00 pm"],
    ["Saturday", "Closed"],
    ["Sunday", "Closed"],
  ],
  HOURS_SHORT: "Mon–Fri 7:30 am – 5:00 pm",

  HERO: {
    eyebrow: `EAST COLFAX, AURORA · SINCE ${FOUNDED}`,
    title: [`${YEARS} years of `, "no-surprise auto repair."],
    text: "A family-owned shop where the owner, Ken Rackley, still works on the floor. ASE-certified mechanics, NAPA-backed repairs and an estimate you approve before anything starts.",
    cta: "Request an Appointment",
    card: [
      { icon: Clock, title: "Hours", text: "Mon–Fri, 7:30 am – 5:00 pm" },
      { icon: MapPin, title: "14851 E Colfax Ave", text: "Aurora, CO 80011" },
      { icon: ShieldCheck, title: "24 mo / 24,000 mi", text: "NAPA AutoCare nationwide warranty" },
    ],
  },

  STATS: (rating) => [
    [String(FOUNDED), "Family owned since"],
    [rating ? `${rating.rating.toFixed(1)} ★` : "5 ★", "Google rating"],
    ["24/24", "NAPA warranty, months / miles"],
    ["10%", "Military discount"],
  ],

  OFFERS: [
    ["Up to $30 off", "$10 off $100+, $20 off $200+ or $30 off $300+ on any repair or service. Excludes batteries."],
    ["$25 off brakes", "Any complete brake service. Can't be combined with other offers."],
    ["10% military", "For active duty, reserve and veterans. Thank you for your service."],
  ],

  SERVICES: {
    eyebrow: "WHAT WE DO",
    title: ["Everything from tune-ups ", "to engine repair."],
    text: "The name says tune-ups, but we handle complete auto repair for Aurora and east Denver drivers.",
    cta: "Book this service",
    items: [
      { title: "Check Engine & Diagnostics", desc: "We test before we replace, so you only pay for what's actually wrong.", icon: Search },
      { title: "Brake Repair", desc: "Pads, rotors and hydraulics. Stay safe, maintain your brakes.", icon: Disc3 },
      { title: "Tune-Ups", desc: "Plugs, filters and ignition service that bring back power and mileage.", icon: Gauge },
      { title: "Factory Maintenance", desc: "30K, 60K, 90K and 100K services done to manufacturer spec.", icon: CalendarCheck },
      { title: "Engine Repair", desc: "Leaks, overheating and internal engine repairs.", icon: Cog },
      { title: "Auto Electrical", desc: "Starting, charging and wiring problems tracked down.", icon: Zap },
      { title: "A/C & Heating", desc: "Cold A/C in summer, working heat and defrost in winter.", icon: Thermometer },
      { title: "Inspections", desc: "Pre-purchase, pre-trip and repair inspections with a clear report.", icon: ClipboardCheck },
    ],
    chips: {
      title: "Makes we service",
      note: "Plus suspension and steering, oil changes and general repair on most makes.",
      items: ["Honda", "Toyota", "Subaru", "Ford", "Chevrolet", "Jeep", "Hyundai", "Nissan", "and more"],
    },
  },

  FEATURE: {
    id: "maintenance",
    nav: "Maintenance Guide",
    eyebrow: "FACTORY SCHEDULED MAINTENANCE",
    title: ["Keep your warranty. ", "Skip the dealer."],
    text: "Your owner's manual has the exact list for your car. Here's what the big milestones usually include.",
    cards: [
      { name: "30K", icon: Droplets, lead: "The first big check.", items: ["Oil and filter", "Engine and cabin air filters", "Brake and tire inspection"] },
      { name: "60K", icon: Wrench, lead: "Fluids and wear items.", items: ["Brake fluid and coolant", "Spark plugs (many models)", "Belts and hoses"] },
      { name: "90K", icon: Cog, lead: "Deeper service.", items: ["Transmission fluid", "Timing belt (if equipped)", "Full suspension check"] },
      { name: "100K", icon: Flag, lead: "Set up the next 100,000.", items: ["Plugs and ignition", "Cooling system service", "Complete multi-point inspection"] },
    ],
  },

  PROCESS: {
    eyebrow: "HOW IT WORKS",
    title: ["No surprises. ", "What we quote, we honor."],
    text: "Ken and the team explain everything and answer every question before work starts.",
    steps: [
      ["Call or request", "Tell us what's going on and when works for you."],
      ["Inspect and test", "We find the cause, not just the symptom."],
      ["Estimate and approval", "A clear estimate. Nothing starts until you approve it."],
      ["Repair and walkthrough", "We go over the invoice and the work with you at pickup."],
    ],
  },

  ABOUT: {
    nav: "About",
    eyebrow: "FAMILY OWNED SINCE 1978",
    title: ["The owner ", "still turns the wrenches."],
    text: [
      "Tune Tech Automotive is a family-owned repair shop on East Colfax Avenue in Aurora. Owner Ken Rackley works directly in the shop, so the person who quotes your repair is the person who stands behind it.",
    ],
    badge: [String(FOUNDED), "Family owned since"],
    tiles: [
      { label: "Diagnostics", icon: Search },
      { label: "Brakes", icon: Disc3 },
      { label: "Maintenance", icon: CalendarCheck },
      { label: "Military thanks", icon: Medal },
    ],
    credentials: [
      { title: "NAPA AutoCare Center", desc: "Part of NAPA's network of independent repair shops." },
      { title: "24 / 24 nationwide warranty", desc: "Parts and labor on qualifying repairs for 24 months or 24,000 miles." },
      { title: "ASE-certified mechanics", desc: "Trained, certified technicians." },
      { title: "Military discount", desc: "10% off for active duty, reserve and veterans." },
    ],
  },

  REVIEWS: {
    title: ["What Aurora drivers ", "say about us."],
    text: "Read what customers say about the shop on Google.",
    quoteSource: "Customer review shown on the current website",
    quotes: [
      ["No surprises. What Ken quotes he honors.", "Rick D."],
      ["Great service! Attention to detail.", "Kshitiz K."],
    ],
  },

  BOOK: {
    nav: "Book a Visit",
    eyebrow: "BOOK A VISIT",
    title: ["Describe the problem ", "once. Online."],
    text: "Tell us about your car and when you'd like to come in. We'll call to confirm.",
    points: ["Estimate before any work", "NAPA 24-month / 24,000-mile warranty", "10% military discount"],
    submit: "Request Appointment",
    note: "We'll call to confirm your time. Need it sooner? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model, mileage" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / diagnosis", "Check Engine & Diagnostics", "Brake Repair", "Tune-Ups", "Factory Maintenance", "Engine Repair", "Auto Electrical", "A/C & Heating", "Inspections", "Oil change", "Suspension & steering"] }, { name: "date", label: "Preferred day", type: "date" }],
      { name: "notes", label: "What's going on?", type: "textarea", placeholder: "Symptoms, warning lights, military discount…" },
    ],
  },

  VISIT: {
    nav: "Visit",
    eyebrow: "VISIT THE SHOP",
    title: ["Find us on ", "East Colfax."],
    areas: "Serving Aurora, Green Valley Ranch, Montbello, Centennial, Glendale and Commerce City.",
  },

  FOOTER_BLURB: `Family-owned auto repair on East Colfax Avenue in Aurora since ${FOUNDED}.`,
  SOCIAL_LINKS: [
    { name: "Google", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`, icon: Star },
  ],
};
