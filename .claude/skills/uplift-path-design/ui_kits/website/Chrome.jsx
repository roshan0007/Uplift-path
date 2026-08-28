const { Button, Icon, Card, BackgroundCard, Accordion, Carousel } = window.UpliftPathDesignSystem_a5cd7a;

const NAV_LINKS = ["Home", "About", "Uplift Services", "Careers", "Contact Us"];

const SERVICE_MENU = [
  [
    { icon: "add_business", title: "Business Consultation", sub: "About" },
    { icon: "business_messages", title: "AI Consultation", sub: "For Businesses" },
    { icon: "chat_info", title: "Individual Consultation", sub: "For Individuals" },
    { icon: "medical_services", title: "Advisory Services", sub: "Resources" },
    { icon: "support", title: "Resource Assistance", sub: "Compliance support for behavioral health and human services" },
  ],
  [
    { icon: "work", title: "Contact", sub: "How we work" },
    { icon: "devices", title: "Advisory services", sub: "Systems & Technology" },
    { icon: "assistant_device", title: "System & Technology", sub: "Resource Assistance" },
    { icon: "more_time", title: "Compliance Support", sub: "Systems that give your people time back" },
  ],
];

function Navbar({ page, onNavigate }) {
  const [open, setOpen] = React.useState(false);
  return (
    <section className="scheme-light navbar">
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
        <img src="../../assets/logo/logo-light.png" alt="Uplift Path logo" style={{ height: 42 }} />
      </a>
      <nav className="navbar-links">
        {NAV_LINKS.map((l) =>
          l === "Uplift Services" ? (
            <div key={l} className="nav-dd" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <p role="button" className="nav-link" onClick={() => onNavigate("business")}>
                Uplift Services
                <Icon name="keyboard_arrow_down" size={22} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-medium) var(--ease-in-out)" }} />
              </p>
              <div className="nav-panel" style={{ visibility: open ? "visible" : "hidden", opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(-25%)" }}>
                <div className="nav-panel-grid">
                  {SERVICE_MENU.map((col, ci) => (
                    <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {col.map((item) => (
                        <a key={item.title} href="#" className="nav-panel-item" onClick={(e) => { e.preventDefault(); onNavigate("business"); }}>
                          <Icon name={item.icon} size={24} />
                          <span style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontWeight: 600 }}>{item.title}</span>
                            <span style={{ fontSize: "var(--text-small)" }}>{item.sub}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <a
              key={l}
              href="#"
              className="nav-link"
              aria-current={(l === "Home" && page === "home") || (l === "Contact Us" && page === "contact") ? "page" : undefined}
              onClick={(e) => { e.preventDefault(); onNavigate(l === "Contact Us" ? "contact" : l === "Home" ? "home" : "business"); }}
            >
              {l}
            </a>
          )
        )}
        <Button size="sm" onClick={() => onNavigate("contact")}>Start</Button>
      </nav>
    </section>
  );
}

const SOCIAL = ["facebook", "instagram", "x", "linkedin", "youtube"];

function Footer({ onNavigate }) {
  return (
    <footer className="scheme-light section" style={{ paddingBlock: "5rem" }}>
      <div className="container">
        <div className="footer-top">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ justifySelf: "start" }}>
            <img src="../../assets/logo/logo-light.png" alt="Uplift Path logo" style={{ height: 42 }} />
          </a>
          <ul className="footer-nav">
            {["Home", "Services", "About", "Contact", "Get started"].map((l) => (
              <li key={l} style={{ fontWeight: 600 }}><a href="#" onClick={(e) => e.preventDefault()}>{l}</a></li>
            ))}
          </ul>
          <div className="footer-social">
            {SOCIAL.map((s) => (
              <a key={s} href="#" aria-label={s} onClick={(e) => e.preventDefault()}>
                <img className="social-glyph" alt="" src={`https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${s}.svg`} />
              </a>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: "var(--color-scheme-border)" }} />
        <div className="footer-legal">
          <p>© 2026 Uplift Path Inc. All rights reserved.</p>
          {["Accessibility", "Terms of service", "Privacy Policy", "Grievance"].map((l) => (
            <a key={l} href="#" style={{ textDecoration: "underline" }} onClick={(e) => e.preventDefault()}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, body, maxWidth = "48rem", align = "center" }) {
  return (
    <div style={{ maxWidth, margin: align === "center" ? "0 auto" : 0, textAlign: align }}>
      {eyebrow && <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>{eyebrow}</p>}
      <h2 style={{ marginBottom: "var(--heading-gap-md)" }}>{title}</h2>
      {body && <p style={{ fontSize: "var(--text-medium)" }}>{body}</p>}
    </div>
  );
}

function CtaBanner({ onNavigate }) {
  return (
    <section className="scheme-accent section">
      <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "var(--heading-gap-md)" }}>Ready to unlock Your growth plan</h2>
        <p style={{ fontSize: "var(--text-medium)" }}>Book your discovery call for personalized, actionable strategies tailored to your business goals.</p>
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
          <Button variant="dark" onClick={() => onNavigate("contact")}>Get Started</Button>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { question: "What is business consulting?", answer: "Business consulting involves providing expert advice, actionable strategies, and hands-on support to help organizations solve complex challenges, improve operations, and achieve measurable growth." },
  { question: "Which industries do you specialize in?", answer: "Our business consulting approach serves Founders and Leaders primarily in the behavioural health services sectors, from early-stage startups navigating accreditation to established agencies seeking operational transformation and growth." },
  { question: "Why should we work with a business consultant?", answer: "Business consultants offer an objective perspective, proven methodologies, and deep industry insights that accelerate problem-solving, streamline workflows, and drive innovation—resulting in sustainable business outcomes." },
  { question: "How do your consulting services create value for clients?", answer: "We help clients address complex business challenges through collaborative coaching, process optimisation, technology integration, and growth strategy—delivering disciplined improvements and actionable outcomes that directly impact your bottom line." },
];

function Faqs() {
  return (
    <section className="scheme-light section">
      <div className="container" style={{ maxWidth: "48rem" }}>
        <div style={{ marginBottom: "var(--section-heading-gap-lg)" }}>
          <SectionHeading title="Frequently Asked Questions" body="Find answers to your questions about us." />
        </div>
        <Accordion type="multiple" items={FAQ_ITEMS} />
      </div>
    </section>
  );
}

Object.assign(window, { Navbar, Footer, SectionHeading, CtaBanner, Faqs, Carousel, Card, BackgroundCard, Button, Icon, FAQ_ITEMS });
