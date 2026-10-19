"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  getOfficeById,
  publicContact,
  type Office,
} from "@insurance-websites/domain";
import { trackMarketingEvent } from "@/components/marketing-events";
import "./TracysHome.css";
const sanMarino = getOfficeById("san-marino");
const laPalma = getOfficeById("la-palma");
export function TracysHome() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const header = node.querySelector(".header");
    const onScroll = () =>
      header?.classList.toggle("scrolled", window.scrollY > 12);
    const onKey = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        menuButton.current?.getAttribute("aria-expanded") === "true"
      ) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 601px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    onScroll();
    let observer: IntersectionObserver | undefined;
    if (
      "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }),
        { threshold: 0.06 },
      );
      node.classList.add("motion-ready");
      node
        .querySelectorAll(".reveal")
        .forEach((section) => observer?.observe(section));
    }
    return () => {
      observer?.disconnect();
      node.classList.remove("motion-ready");
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, []);
  function trackContact(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>(
      "a[href]",
    );
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    const protocol = href.split(":")[0];
    const eventName =
      protocol === "tel"
        ? "phone_click"
        : protocol === "sms"
          ? "sms_click"
          : protocol === "mailto"
            ? "email_click"
            : null;
    if (!eventName) return;
    const office = anchor.closest("article")?.id ?? "san-marino";
    trackMarketingEvent(eventName, {
      source: "tracys_homepage",
      office,
      destination: href,
    });
  }
  return (
    <div className="tracys-home" ref={root} onClick={trackContact}>
      <header className="header" id="top">
        <a className="wordmark" href="#top" aria-label="Tracy’s Insurance home">
          <span>
            Tracy’s<span className="wordmark-small"> Insurance</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#coverage">What we cover</a>
          <a href="#team">Our team</a>
          <a href="#offices">Our offices</a>
          <Link href="/zh" hrefLang="zh-Hans">
            中文
          </Link>
        </nav>
        <a className="nav-call" href={`tel:${sanMarino.phoneE164}`}>
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <span></span>
          <span></span>
        </button>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
        >
          <a href="#coverage">
            What we cover <span>↗</span>
          </a>
          <a href="#team">
            Our team <span>↗</span>
          </a>
          <a href="#offices">
            Our offices <span>↗</span>
          </a>
          <a href="#contact">
            Get in touch <span>↗</span>
          </a>
          <Link href="/zh" hrefLang="zh-Hans">
            中文 <span>↗</span>
          </Link>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-enter">
              TRACY ZHANG & TEAM · SOUTHERN CALIFORNIA
            </p>
            <h1 className="hero-enter" id="hero-title">
              For the life
              <br />
              you’re <span>building.</span>
            </h1>
            <p className="hero-description hero-enter">
              Your first car. Your family’s home. Whatever comes next.
              <br className="desktop-break" /> Let’s find a way forward,
              together.
            </p>
            <div className="hero-actions hero-enter">
              <a className="button primary" href={`tel:${sanMarino.phoneE164}`}>
                <svg aria-hidden="true">
                  <use href="#icon-phone" />
                </svg>
                Call our team <span>↗</span>
              </a>
              <a className="text-link" href={`sms:${sanMarino.smsE164}`}>
                Text us <span>↗</span>
              </a>
              <a className="text-link" href={`mailto:${publicContact.email}`}>
                Email us <span>↗</span>
              </a>
            </div>
            <div className="hero-location hero-enter">
              <span className="location-mark" aria-hidden="true"></span>
              <p>
                Rooted in <a href="#san-marino">Los Angeles</a> &{" "}
                <a href="#la-palma">Orange County</a>.<br />
                <span>Here for you across California.</span>
              </p>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src="/homepage-assets/san-marino.jpg"
              width="1200"
              height="800"
              alt="Green trees and a lakeside pavilion at The Huntington’s Chinese Garden in San Marino"
              priority
            />
            <div className="image-caption">
              <span>OUR CORNER OF CALIFORNIA</span>
              <span>
                San Marino, CA <span aria-hidden="true">↗</span>
              </span>
            </div>
            <div className="image-label" aria-hidden="true">
              A little closer
              <br />
              to home.
            </div>
          </div>
          <a
            className="hero-scroll"
            href="#coverage"
            aria-label="Explore what we cover"
          >
            <span>GOOD GUIDANCE STARTS HERE</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>
        <section
          className="intro section-pad"
          id="coverage"
          aria-labelledby="coverage-title"
        >
          <div className="section-heading reveal">
            <p className="eyebrow">
              COVERAGE FOR YOUR EVERYDAY. AND YOUR NEXT CHAPTER.
            </p>
            <div className="heading-row">
              <h2 id="coverage-title">
                Life changes.
                <br />
                Let’s keep you covered.
              </h2>
              <p>
                A new driver, a move, a renewal that looks different.
                <br />
                Start with what’s on your mind. We’ll help you
                <br className="desktop-break" /> understand your options and
                your next step.
              </p>
            </div>
          </div>
          <div className="coverage-list reveal">
            <details className="coverage-item" open>
              <summary>
                <span className="coverage-number">01</span>
                <span className="coverage-name">
                  <svg aria-hidden="true">
                    <use href="#icon-car" />
                  </svg>
                  On the road
                </span>
                <span className="coverage-tags">Auto · Motorcycle · Boat</span>
                <span className="expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="coverage-content">
                <p>
                  A new car, a teen driver or a policy coming up for renewal.
                  Talk through limits, deductibles and what fits the way you
                  drive.
                </p>
                <Link href="/auto-insurance" className="text-link">
                  Explore auto insurance <span>↗</span>
                </Link>
              </div>
            </details>
            <details className="coverage-item">
              <summary>
                <span className="coverage-number">02</span>
                <span className="coverage-name">
                  <svg aria-hidden="true">
                    <use href="#icon-home" />
                  </svg>
                  At home
                </span>
                <span className="coverage-tags">Home · Condo · Renters</span>
                <span className="expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="coverage-content">
                <p>
                  Buying, renting or reviewing a changing renewal? Get help
                  understanding property coverage and the questions worth asking
                  about your home.
                </p>
                <Link href="/home-insurance" className="text-link">
                  Explore home insurance <span>↗</span>
                </Link>
              </div>
            </details>
            <details className="coverage-item">
              <summary>
                <span className="coverage-number">03</span>
                <span className="coverage-name">
                  <svg aria-hidden="true">
                    <use href="#icon-family" />
                  </svg>
                  For your people
                </span>
                <span className="coverage-tags">Life · Umbrella</span>
                <span className="expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="coverage-content">
                <p>
                  New responsibilities can bring new questions. Let’s talk about
                  protecting the people who depend on you and reviewing your
                  liability coverage.
                </p>
                <Link href="/life-insurance" className="text-link">
                  Explore life insurance <span>↗</span>
                </Link>
              </div>
            </details>
            <details className="coverage-item">
              <summary>
                <span className="coverage-number">04</span>
                <span className="coverage-name">
                  <svg aria-hidden="true">
                    <use href="#icon-business" />
                  </svg>
                  For your business
                </span>
                <span className="coverage-tags">
                  Property · Liability · Commercial auto
                </span>
                <span className="expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="coverage-content">
                <p>
                  From a certificate request to a new location, get help
                  reviewing the coverage questions behind your next business
                  decision.
                </p>
                <Link href="/business-insurance" className="text-link">
                  Explore business insurance <span>↗</span>
                </Link>
              </div>
            </details>
          </div>
        </section>
        <section
          className="team section-pad"
          id="team"
          aria-labelledby="team-title"
        >
          <div className="team-portrait reveal">
            <div className="portrait-mat">
              <Image
                src="/homepage-assets/tracy.jpg"
                width="350"
                height="360"
                alt="Tracy Zhang, the advisor behind Tracy’s Insurance"
                loading="lazy"
              />
            </div>
            <div className="portrait-caption">
              <span>Tracy Zhang</span>
              <span>Your local insurance advisor</span>
            </div>
          </div>
          <div className="team-copy reveal">
            <p className="eyebrow">A NAME. A FACE. A LOCAL TEAM.</p>
            <h2 id="team-title">
              Real people.
              <br />
              Right here.
            </h2>
            <p className="team-lead">
              Insurance feels a little simpler when you know who to call.
            </p>
            <p>
              We’re Tracy Zhang and team. With offices in San Marino and La
              Palma, we help our neighbors talk through coverage, make sense of
              changes and take the next step.
            </p>
            <p>
              Ask your questions. Tell us what matters. We’ll meet you there.
            </p>
            <a className="text-link" href="https://www.tracyzhang.com/">
              Get to know Tracy <span>↗</span>
            </a>
          </div>
        </section>
        <section
          className="language section-pad"
          aria-labelledby="language-title"
        >
          <div className="reveal">
            <p className="eyebrow">LET’S SPEAK YOUR LANGUAGE</p>
            <h2 id="language-title">
              A good conversation
              <br />
              starts with understanding.
            </h2>
          </div>
          <div className="language-copy reveal">
            <p>
              Tell us the language you’re most comfortable with.
              <br />
              We’ll connect you with the right person on our team.
            </p>
            <ul aria-label="Languages available across our offices">
              <li>English</li>
              <li>
                普通话 <span>Mandarin</span>
              </li>
              <li>
                廣東話 <span>Cantonese</span>
              </li>
              <li>
                台語 <span>Taiwanese</span>
              </li>
              <li>
                Español <span>Spanish</span>
              </li>
              <li>
                Tiếng Việt <span>Vietnamese</span>
              </li>
            </ul>
            <p className="fine">
              Language availability varies by office. See office details below.
            </p>
          </div>
        </section>
        <section
          className="offices section-pad"
          id="offices"
          aria-labelledby="offices-title"
        >
          <div className="section-heading reveal">
            <p className="eyebrow">LOS ANGELES & ORANGE COUNTY</p>
            <div className="heading-row">
              <h2 id="offices-title">
                Around the corner.
                <br />
                On your side.
              </h2>
              <p>
                Come by, give us a call or send a message.
                <br />
                Choose the office that’s closest to you.
              </p>
            </div>
          </div>
          <div className="office-grid">
            <OfficePanel
              office={sanMarino}
              region="Los Angeles"
              image="san-marino.jpg"
              photo="The Huntington’s Chinese Garden, San Marino"
            />
            <OfficePanel
              office={laPalma}
              region="Orange County"
              image="orange-county-beach.jpg"
              photo="Huntington Beach Pier, Orange County"
            />
          </div>
        </section>
        <section
          className="contact section-pad"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-top reveal">
            <p className="eyebrow">YOUR NEXT STEP IS A CONVERSATION</p>
            <span aria-hidden="true" className="contact-arrow">
              ↗
            </span>
          </div>
          <h2 className="reveal" id="contact-title">
            Let’s talk about
            <br />
            what matters <span>to you.</span>
          </h2>
          <div className="contact-bottom reveal">
            <p>
              A question, a change, a new chapter.
              <br />
              We’re here to talk it through.
            </p>
            <div className="contact-actions">
              <a className="button light" href={`tel:${sanMarino.phoneE164}`}>
                <svg aria-hidden="true">
                  <use href="#icon-phone" />
                </svg>
                Call {sanMarino.phoneDisplay} <span>↗</span>
              </a>
              <a href={`sms:${sanMarino.smsE164}`} className="text-link">
                Text us <span>↗</span>
              </a>
              <a href={`mailto:${publicContact.email}`} className="text-link">
                Email us <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer section-pad">
        <div className="footer-top">
          <a className="wordmark" href="#top">
            Tracy’s Insurance
          </a>
          <p>Local roots. California life.</p>
          <a href={`mailto:${publicContact.email}`}>
            {publicContact.email} <span>↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Tracy’s Insurance · Tracy Zhang & Team</p>
          <nav aria-label="Site and legal links">
            <Link href="/products">Coverage</Link>
            <Link href="/stories">Guidance</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/zh" hrefLang="zh-Hans">
              中文
            </Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/sms-terms">SMS terms</Link>
          </nav>
        </div>
        <p className="legal-copy">
          Coverage availability, eligibility and terms vary by carrier, product,
          underwriting and location. Contacting our team does not bind or change
          coverage. Tracy’s Insurance is the agency’s marketing identity;
          carrier and policy details are provided during your coverage review.
        </p>
        <details className="credits">
          <summary>Photography credits</summary>
          <p>
            San Marino: Hickorypine,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Huntington_Library_Chinese_Garden.jpg">
              The Huntington Chinese Garden
            </a>
            ,{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              CC BY-SA 4.0
            </a>
            . Orange County: TeKappa,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Huntington_Beach_Pier_at_sunset.jpg">
              Huntington Beach Pier at sunset
            </a>
            ,{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              CC BY-SA 4.0
            </a>
            ; resized for this page. Images are displayed with responsive
            cropping. Tracy Zhang portrait: existing official agency profile
            photograph.
          </p>
        </details>
      </footer>
      <nav className="mobile-contact" aria-label="Quick contact">
        <a href={`tel:${sanMarino.phoneE164}`}>
          <svg aria-hidden="true">
            <use href="#icon-phone" />
          </svg>
          Call
        </a>
        <a href={`sms:${sanMarino.smsE164}`}>
          <svg aria-hidden="true">
            <use href="#icon-message" />
          </svg>
          Text
        </a>
        <a href={`mailto:${publicContact.email}`}>
          <svg aria-hidden="true">
            <use href="#icon-mail" />
          </svg>
          Email
        </a>
      </nav>
      <svg className="icon-library" aria-hidden="true">
        <defs>
          <symbol id="icon-phone" viewBox="0 0 24 24">
            <path d="m5 3 4 1 1 5-2 2a15 15 0 0 0 5 5l2-2 5 1 1 4c-1 3-4 3-7 2A22 22 0 0 1 3 10C2 7 2 4 5 3Z" />
          </symbol>
          <symbol id="icon-mail" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 6 9 7 9-7" />
          </symbol>
          <symbol id="icon-message" viewBox="0 0 24 24">
            <path d="M21 11a8 8 0 0 1-8 8H7l-4 3V5a2 2 0 0 1 2-2h8a8 8 0 0 1 8 8Z" />
            <path d="M7 8h9M7 12h6" />
          </symbol>
          <symbol id="icon-car" viewBox="0 0 32 32">
            <path d="m6 12 3-7h14l3 7M4 12h24v12H4zM4 20h24M8 24v4M24 24v4M8 16h3M21 16h3" />
          </symbol>
          <symbol id="icon-home" viewBox="0 0 32 32">
            <path d="m3 15 13-11 13 11M7 12v16h18V12M13 28V18h6v10" />
          </symbol>
          <symbol id="icon-family" viewBox="0 0 32 32">
            <circle cx="12" cy="9" r="4" />
            <circle cx="23" cy="12" r="3" />
            <path d="M4 28v-5a8 8 0 0 1 16 0v5M21 20a6 6 0 0 1 8 5v3" />
          </symbol>
          <symbol id="icon-business" viewBox="0 0 32 32">
            <rect x="4" y="9" width="24" height="19" rx="2" />
            <path d="M11 9V4h10v5M4 17h24M13 15v5h6v-5" />
          </symbol>
        </defs>
      </svg>
    </div>
  );
}
function OfficePanel({
  office,
  region,
  image,
  photo,
}: {
  office: Office;
  region: string;
  image: string;
  photo: string;
}) {
  return (
    <article className="office reveal" id={office.id}>
      <div className="office-photo">
        <Image
          src={"/homepage-assets/" + image}
          width={1500}
          height={998}
          alt={photo}
          loading="lazy"
        />
        <span>{region.toUpperCase()}</span>
      </div>
      <div className="office-title">
        <div>
          <h3>{region}</h3>
          <p className="office-location">{office.label} office</p>
        </div>
        <a
          className="map-link"
          href={office.links.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={office.label + " office directions, opens in a new tab"}
        >
          ↗
        </a>
      </div>
      <address>
        {office.address.streetAddress}
        <br />
        {office.address.addressLocality}, {office.address.addressRegion}{" "}
        {office.address.postalCode}
      </address>
      <p className="office-hours">
        {office.hours.mondayFriday}
        <br />
        Weekends by appointment
      </p>
      <p className="office-languages">{office.languages.join(" · ")}</p>
      <div className="office-actions">
        <a href={"tel:" + office.phoneE164}>
          {office.phoneDisplay} <span>↗</span>
        </a>
        <a href={"sms:" + office.smsE164}>
          Text <span>↗</span>
        </a>
        <a
          href={
            "mailto:" +
            publicContact.email +
            "?subject=" +
            encodeURIComponent(office.label + " insurance inquiry")
          }
        >
          Email <span>↗</span>
        </a>
      </div>
      <p className="photo-note">
        {photo}. Office in {office.label}.
      </p>
    </article>
  );
}
