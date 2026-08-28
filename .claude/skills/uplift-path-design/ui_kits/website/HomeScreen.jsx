const PATHWAY_CARDS = [
  { img: "home-who-we-help-0.png", eyebrow: "Operational consulting", title: "Discovery & Listening", body: "Let's start with a quick conversation to understand your goals, strengths, and any barriers you face." },
  { img: "home-who-we-help-1.jpg", eyebrow: "Process optimization", title: "Your Pathway Plan", body: "A clear plan with transparent milestones and support, so you always know your path forward." },
  { img: "home-who-we-help-2.jpg", eyebrow: "Leadership and strategy", title: "Measurable Progress", body: "Ongoing support to execute, track results, and adjust the pathway for sustainable growth." },
];

const OUTCOMES = [
  { icon: "step", title: "Uplift Strategy", body: "Co-design a clear Pathway Plan with goals, milestones, and support for sustainable growth." },
  { icon: "settings", title: "Uplift Systems", body: "Build coordinated policies, training, and data to make pathways simple and improvable." },
  { icon: "progress_activity", title: "Uplift Growth", body: "To impact 100K lives by uplifting the individuals, businesses, and communities we serve by 2036." },
];

const INDUSTRIES_LEFT = [
  { icon: "psychology_alt", title: "Behavioral Health Consulting", body: "Strategic consulting for behavioral health: improving care, efficiency, and compliance. We build sustainable models, optimize teams, and navigate change." },
  { icon: "work", title: "Startups & Entrepreneurs", body: "Startup coaching to tackle business model challenges, refine market positioning, and connect Founders with key networks for growth." },
];
const INDUSTRIES_RIGHT = [
  { icon: "edit", title: "Educational Institutions", body: "Strategic advisory for education leaders to enhance operational performance, boost faculty engagement, and achieve academic excellence." },
  { icon: "partner_reports", title: "Nonprofit Organizations", body: "Expert guidance to help nonprofits clarify their mission, develop sustainable funding models, and maximize their community impact through targeted advisory." },
];

function IconFeature({ item, titleSize = "var(--text-h5)" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <Icon name={item.icon} size={48} style={{ marginBottom: "1.5rem" }} />
      <h3 style={{ fontSize: titleSize, marginBottom: "1rem" }}>{item.title}</h3>
      <p>{item.body}</p>
    </div>
  );
}

function PathwayCard({ card, expanded, onEnter, onLeave }) {
  return (
    <BackgroundCard
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ position: "relative", flex: expanded ? "1.4 1 0" : "1 1 0", transition: "flex var(--duration-fast) var(--ease-in-out)", minWidth: 0 }}
    >
      <img src={`../../assets/images/${card.img}`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim-image)" }} />
      <div style={{ position: "relative", minHeight: "34rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", color: "var(--color-white)" }}>
        <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{card.eyebrow}</p>
        <h3 style={{ color: "var(--color-white)", fontSize: "var(--text-h4)" }}>{card.title}</h3>
        <div style={{ display: "grid", gridTemplateRows: expanded ? "1fr" : "0fr", overflow: "hidden", transition: "grid-template-rows var(--duration-medium) var(--ease-in-out)" }}>
          <div style={{ minHeight: 0 }}>
            <p style={{ marginTop: "1.5rem" }}>{card.body}</p>
            <div style={{ marginTop: "2rem" }}>
              <Button variant="link-alt" size="link" iconRight={<Icon name="chevron_right" size={20} invert />}>Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </BackgroundCard>
  );
}

const QUOTES = [
  { quote: '"The fog lifted. For the first time in years I could see the next step and the one after that."', name: "Sarah Mitchell", role: "Executive Director, Behavioral Health" },
  { quote: '"We finally have systems our team actually uses — and numbers our board trusts."', name: "Daniel Okafor", role: "Founder, Community Services" },
];

function Testimonials() {
  return (
    <section className="scheme-light section" style={{ overflow: "hidden" }}>
      <div className="container">
        <div style={{ position: "relative", paddingInline: "4rem" }}>
          <Carousel
            slides={QUOTES.map((q) => (
            <div key={q.name} style={{ maxWidth: "48rem", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "2rem" }}>
                {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star-fill" size={24} />)}
              </div>
              <h5 style={{ fontSize: "var(--text-h5)" }}>{q.quote}</h5>
              <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "1.25rem", textAlign: "left" }}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "var(--radius-full)", background: "var(--surface-sunken)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="person" size={28} style={{ color: "var(--text-muted)" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600 }}>{q.name}</p>
                  <p>{q.role}</p>
                </div>
              </div>
            </div>
            ))}
          />
        </div>
      </div>
    </section>
  );
}

function HomeScreen({ onNavigate }) {
  const [hovered, setHovered] = React.useState(null);
  return (
    <>
      <section className="scheme-light section" style={{ position: "relative" }}>
        <div className="container" style={{ maxWidth: "64rem", textAlign: "center" }}>
          <h1 className="hero-title" style={{ marginBottom: "1.5rem" }}>Uplift<br />One Path. Two Ways Forward.</h1>
          <p style={{ fontSize: "var(--text-medium)", maxWidth: "34rem", margin: "0 auto" }}>Unlock progress and meaningful growth through clarity, collaboration and trusted guidance every step.</p>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Button onClick={() => onNavigate("business")}>Business</Button>
            <Button variant="secondary" onClick={() => onNavigate("business")}>Individual</Button>
          </div>
        </div>
      </section>

      <section className="scheme-light section">
        <div className="container">
          <div style={{ marginBottom: "var(--section-heading-gap-lg)" }}>
            <SectionHeading title="Create Clear, Sustainable Pathways to Meaningful Growth" body="We turn complexity into clear, sustainable pathways co-created so every step is supported and success is measurable." />
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {PATHWAY_CARDS.map((c, i) => (
              <PathwayCard key={c.title} card={c} expanded={hovered === i} onEnter={() => setHovered(i)} onLeave={() => setHovered(null)} />
            ))}
          </div>
        </div>
      </section>

      <section className="scheme-light section">
        <div className="container">
          <div style={{ marginBottom: "var(--section-heading-gap-lg)" }}>
            <SectionHeading title="Uplift Outcomes Across Your Organization" body="We co-create clear, sustainable pathways, so every program, process, and person moves forward with support and measurable progress." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3rem", alignItems: "start" }}>
            {OUTCOMES.map((o) => <IconFeature key={o.title} item={o} titleSize="var(--text-h4)" />)}
          </div>
        </div>
      </section>

      <section className="scheme-light section">
        <div className="container">
          <div style={{ marginBottom: "var(--section-heading-gap-lg)" }}>
            <SectionHeading title="Empowering Success Across Industries" body="We co-create clear, sustainable pathways so progress is understandable, supported, and measurable across Industries." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div style={{ display: "grid", gap: "4rem" }}>{INDUSTRIES_LEFT.map((i) => <IconFeature key={i.title} item={i} />)}</div>
            <img src="../../assets/images/home-benefits-section.png" alt="" style={{ width: "100%", borderRadius: "var(--radius-image)" }} />
            <div style={{ display: "grid", gap: "4rem" }}>{INDUSTRIES_RIGHT.map((i) => <IconFeature key={i.title} item={i} />)}</div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Faqs />
      <CtaBanner onNavigate={onNavigate} />
    </>
  );
}

Object.assign(window, { HomeScreen, IconFeature, Testimonials });
