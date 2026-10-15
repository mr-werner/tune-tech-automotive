import { CalendarCheck, ClipboardCheck, Cog, Disc3, Droplets, Gauge, Search, Thermometer, Wrench, Zap, MoveVertical, Star } from "lucide-react";
import logo from "./assets/tune-tech-logo.png";
import napaAutoCare from "./assets/napa-autocare-center.png";
import aseCertified from "./assets/ase-certified.png";

const COMPANY = "Tune Tech Automotive";
const MAPS_QUERY = "Tune Tech Automotive, 14851 E Colfax Ave, Aurora, CO 80011";
const FOUNDED = 1978;
const YEARS = new Date().getFullYear() - FOUNDED;

export default {
  COMPANY,
  ABBR: "tta",
  NOUN: "shop",
  // Main number used everywhere on the current site except its footer (which shows (303) 364-3391). Confirm.
  PHONE: "3033279176",
  PHONE_DISPLAY: "(303) 327-9176",
  EMAIL: "",
  ADDRESS: "14851 E Colfax Ave",
  CITY: "Aurora, CO 80011",
  MAPS_QUERY,
  FOUNDED,
  YEARS,
  GOOGLE_PLACE_ID: "",
  // From our lead research (Google 4.8, 298 reviews). The current site's header says "698 reviews"; confirm.
  FALLBACK_RATING: { rating: 4.8, userRatingCount: 298 },
  END_DATE: "2026-11-20T23:59:59-07:00",

  BRAND: { name: "Tune Tech", sub: `AUTOMOTIVE · SINCE ${FOUNDED}`, icon: Gauge, logo, logoAlt: `${COMPANY} logo` },
  ANNOUNCE: `Family owned on East Colfax since ${FOUNDED} · 10% off for active duty, reserve and veterans`,

  HOURS: [
    ["Monday – Friday", "7:30 am – 5:00 pm"],
    ["Saturday & Sunday", "Closed"],
  ],
  HOURS_SHORT: "Mon–Fri 7:30 am – 5:00 pm",

  HERO: {
    eyebrow: `EAST COLFAX · AURORA, CO`,
    title: ["Quality car care", `since ${FOUNDED}.`],
    text: "A family-owned shop where owner Ken Rackley still works the floor. ASE-certified mechanics, an estimate before any work starts, and a straight answer about what can wait.",
    cta: "Request an appointment",
    // Their own shop front, from the NAPA section of the current site (darkening removed).
    photo: { src: "/photos/shop-front.webp", alt: "Tune Tech Automotive shop front with three service bays and the NAPA AutoCare Center sign on East Colfax Avenue" },
  },

  // Every badge shown on the current site, plus the anniversary banner (with the year count fixed).
  AWARDS: {
    eyebrow: "CREDENTIALS",
    items: [
      { img: napaAutoCare, title: "NAPA AutoCare Center", text: "Part of NAPA's network of independent shops" },
      { img: aseCertified, title: "ASE-certified mechanics", text: "Certifications kept current" },
    ],
  },

  OFFERS: {
    eyebrow: "SPECIALS",
    title: "Clip it, show it, save.",
    note: "Present the coupon or show it on your phone in advance. Offers can't be combined.",
    items: [
      { big: "$30", unit: "off", title: "Up to $30 off any repair or service", lines: ["$10 off $100 or more", "$20 off $200 or more", "$30 off $300 or more"], fine: "Excludes batteries." },
      { big: "$25", unit: "off", title: "Any complete brake service", lines: ["Pads, rotors and hydraulics", "Mention the offer when you book"], fine: "Cannot be combined with any other offer." },
      { big: "10%", unit: "off", title: "Military discount", lines: ["Active duty, reserve and veterans", "Thank you for your service"], fine: "" },
    ],
  },

  SERVICES: {
    eyebrow: "WHAT WE FIX",
    title: ["Tune-ups are in the name.", "We fix the whole car."],
    text: "Every job is done in our Aurora shop. Not sure which one you need? Call and describe what the car is doing.",
    cta: "Book",
    items: [
      { title: "Check Engine & Diagnostics", desc: "Warning lights, no-starts and the testing behind the code.", icon: Search },
      { title: "Brake Repair", desc: "Pads, rotors, calipers, brake fluid and warning signs.", icon: Disc3 },
      { title: "Oil Change", desc: "The right oil and filter for your vehicle, plus a look around the engine.", icon: Droplets },
      { title: "Engine Repair", desc: "Rough idle, misfires, oil leaks, overheating and loss of power.", icon: Cog },
      { title: "Auto Electrical", desc: "Batteries, alternators, starters, wiring and fuses.", icon: Zap },
      { title: "A/C & Heating", desc: "Warm air in summer, no heat in winter, defrosters that won't clear.", icon: Thermometer },
      { title: "Suspension & Steering", desc: "Clunks, vibration, uneven tire wear and loose steering.", icon: MoveVertical },
      { title: "Tune-Ups", desc: "Plugs, coils and filters for hesitation and lost mileage.", icon: Gauge },
      { title: "Factory Maintenance", desc: "30K, 60K, 90K and 100K service by your owner's manual, not a menu.", icon: CalendarCheck },
      { title: "Vehicle Inspection", desc: "Pre-purchase, pre-trip and repair-related inspections.", icon: ClipboardCheck },
      { title: "General Auto Repair", desc: "Not sure which system it is? Start here.", icon: Wrench },
    ],
    // Images from the blog on the current site (generic shop photography, not Tune Tech's own bays).
    photos: [
      { src: "/photos/brakes.webp", label: "Brakes", alt: "Mechanic in gloves inspecting a brake caliper and rotor" },
      { src: "/photos/electrical.webp", label: "Electrical", alt: "Technician testing a car battery with a multimeter" },
      { src: "/photos/tune-up.webp", label: "Tune-ups", alt: "Gloved hands holding new spark plugs next to an engine" },
      { src: "/photos/maintenance.webp", label: "Maintenance", alt: "Mechanic working under the hood of a sedan" },
    ],
    makes: {
      title: "All makes, domestic and import",
      items: ["Honda", "Toyota", "Subaru", "Ford", "Chevrolet", "Jeep", "Hyundai", "Nissan"],
      note: "and every other make we service.",
    },
  },

  PROCESS: {
    eyebrow: "HOW A VISIT WORKS",
    title: ["Three steps.", "No surprises."],
    steps: [
      ["Call and describe the problem.", "We set a time to bring the car in and tell you what to expect."],
      ["We inspect and test.", "Then we explain what we found and what it will cost, before any work starts."],
      ["You approve the work.", "We do the repair and walk you through the invoice, including anything that can wait."],
    ],
  },

  ABOUT: {
    nav: "About",
    eyebrow: `FAMILY OWNED SINCE ${FOUNDED}`,
    title: ["The owner is", "in the shop."],
    text: [
      "Tune Tech Automotive is a family-owned repair shop on East Colfax Avenue in Aurora. Owner Ken Rackley works directly in the shop, so the person explaining your repair is the person responsible for it.",
      "You get a plain explanation of what your car needs, an estimate before work starts, and a straight answer about what can wait so you can plan the cost.",
    ],
    photo: { src: "/photos/colfax-sign.webp", alt: "The Tune Tech Automotive sign on East Colfax Avenue listing electrical, brakes, air conditioning, steering and suspension" },
    caption: "Look for the Tune Tech sign at 14851 East Colfax Avenue.",
    credentials: [
      { title: `Since ${FOUNDED}`, desc: "Family owned and still in Aurora, with the owner on site." },
      { title: "ASE-certified", desc: "Mechanics who keep their certifications current." },
      { title: "NAPA AutoCare", desc: "Qualifying repairs carry the NAPA nationwide warranty." },
      { title: "Military discount", desc: "10% off for active duty, reserve and veterans." },
    ],
  },

  WARRANTY: {
    eyebrow: "NAPA AUTOCARE PEACE OF MIND WARRANTY",
    big: ["24", "months"],
    big2: ["24,000", "miles"],
    text: "Covers parts and labor on qualifying repairs and services, nationwide. If something goes wrong on a road trip, any NAPA AutoCare Center can take care of it.",
  },

  REVIEWS: {
    title: ["What Aurora drivers", "say about Ken's shop."],
    text: "Real words from customers, as they appear on the current Tune Tech website.",
    quoteSource: "Customer review, from the current website",
    // Verbatim from the current site (homepage slider and reviews page).
    quotes: [
      ["As always, Ken and his crew are thorough with their diagnosis and recommendations. No surprises. What Ken quotes he honors. Never had an issue with their work.", "Rick D."],
      ["High integrity mechanic with excellent communication and a fair price. Does not recommend unnecessary fixes and gives an honest assessment of the car's condition. For those looking for a mechanic that isn't going to hose you or recommend replacements or services that aren't required, Tune Tech is the place to go. Will go back for any material issue I have with my truck.", "William O'Neill"],
      ["Ken was very professional and straight to the point on what was going with my daughters car. As a woman I never felt like I was being taken advantage of Ken took the time to explained everything in detail of what was going on and answered all of my questions. Thank you Ken I will be a lifetime customer and I will be recommending your shop to all of my friends and family.", "Jeanette C."],
      ["Excellent and straight forward service for my 100k mile tune up. Great communication from Ken, and glad I found his shop as I just moved to Colorado.", "Landon H."],
      ["Thank you Ken for not only working on my car but for taking the time to talk with me about what was going on with it. Its such a huge weight off my shoulders to have someone that I can trust working on my vehicle!", "Aimee Cazares"],
      ["Great service! I've been using Tune Tech Automotive for a few years now and I'm always impressed by their service. Would recommend.", "Christopher W."],
    ],
  },

  FAQ: {
    eyebrow: "QUICK ANSWERS",
    items: [
      ["What makes Tune Tech different from other Aurora mechanics?", `The owner is in the shop. Ken Rackley works directly in the business, so the person explaining your repair is the person responsible for it. We've served Aurora since ${FOUNDED}, explain what we find in plain terms, and tell you what can wait so you can plan the cost.`],
      ["Do you work on all makes and models?", "Yes. Our ASE-certified mechanics service domestic and import vehicles, from Honda, Toyota and Subaru to Ford, Chevrolet and Jeep."],
      ["Where are you, and what areas do you serve?", "14851 East Colfax Avenue, Aurora, CO 80011. Drivers come to us from across Aurora, from Denver neighborhoods like Green Valley Ranch and Montbello, and from Centennial, Glendale and Commerce City."],
      ["What are your hours?", "Monday through Friday, 7:30 am to 5:00 pm. Call before you come so we can plan the visit around your schedule."],
    ],
  },

  BOOK: {
    nav: "Book a Visit",
    eyebrow: "BOOK A VISIT",
    title: ["Tell us what", "the car is doing."],
    text: "The fastest way is still a phone call: describe the problem and we'll set a time. Prefer to write it down? Send it here and we'll call you back to confirm.",
    points: ["Estimate before any work starts", "NAPA 24-month / 24,000-mile warranty", "10% military discount"],
    submit: "Send my request",
    note: "We'll call to confirm your time. Need it sooner? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model, mileage" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / diagnosis", "Check Engine & Diagnostics", "Brake Repair", "Oil Change", "Engine Repair", "Auto Electrical", "A/C & Heating", "Suspension & Steering", "Tune-Ups", "Factory Maintenance", "Vehicle Inspection", "General Auto Repair"] }, { name: "date", label: "Preferred day", type: "date" }],
      { name: "notes", label: "What's the car doing?", type: "textarea", placeholder: "Noises, warning lights, when it happens, coupon or military discount…" },
    ],
  },

  VISIT: {
    nav: "Visit",
    eyebrow: "VISIT THE SHOP",
    title: ["Find us on", "East Colfax."],
    areas: "Serving Aurora, Green Valley Ranch, Montbello, Centennial, Glendale and Commerce City.",
  },

  FOOTER_BLURB: `Family-owned auto repair on East Colfax Avenue in Aurora since ${FOUNDED}. A NAPA AutoCare Center.`,
  SOCIAL_LINKS: [
    { name: "Google", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`, icon: Star },
  ],
};
