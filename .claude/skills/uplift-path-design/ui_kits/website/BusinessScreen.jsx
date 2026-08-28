const SERVICES = [
  { icon: "add_business", title: "Operational Consulting", body: "Tighten day-to-day operations so delivery is predictable and repeatable." },
  { icon: "medical_services", title: "Advisory Services", body: "Strategic guidance tailored for behavioral health, nonprofit and education leaders." },
  { icon: "devices", title: "Systems & Technology", body: "Build scalable systems, streamline operations and improve organizational efficiency." },
  { icon: "more_time", title: "Compliance Support", body: "Support operational readiness and compliance processes." },
  { icon: "verified", title: "Credentialing", body: "Prepare for and navigate credentialing with documentation that holds up." },
  { icon: "support", title: "Resource Assistance", body: "Access tools, systems and operational support resources." },
];

const WHY = [
  { img: "for-business-page-benefits-section-0.png", title: "Strategic Alignment", body: "Goals, owners and timelines that everyone in the organization can see." },
  { img: "for-business-page-benefits-section-1.png", title: "Adaptive Execution", body: "Plans that survive contact with reality, adjusted as conditions change." },
  { img: "for-business-page-benefits-section-2.png", title: "Growth Performance", body: "Measurable progress against the outcomes your board and funders care about." },
];

function ServiceCard({ item }) {
  return (
    <Card style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <Icon name={item.icon} size={48} style={{ marginBottom: "1.5rem" }} />
        <h3 style={{ fontSize: "var(--text-h5)", marginBottom: "1rem" }}>{item.title}</h3>
        <p style={{ flex: 1 }}>{item.body}</p>
        <div style={{ marginTop: "1.5rem" }}>
          <Button variant="link" size="link" iconRight={<Icon name="chevron_right" size={20} />}>Learn more</Button>
        </div>
      </div>
    </Card>
  );
}

function BusinessScreen({ onNavigate }) {
  return (
    <>
      <section className="scheme-light section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "var(--text-small)", marginBottom: "1.5rem" }}>Home › For Businesses</p>
            <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Uplift Solutions · For Businesses</p>
            <h1 style={{ fontSize: "var(--text-h2)", marginBottom: "var(--heading-gap-md)" }}>Consulting that turns plans into progress</h1>
            <p style={{ fontSize: "var(--text-medium)" }}>We help leaders in behavioral health, nonprofits and education build the systems, plans and habits that carry a strategy through to delivery.</p>
            <div style={{ marginTop: "2rem" }}>
              <Button onClick={() => onNavigate("contact")}>Book a discovery call</Button>
            </div>
          </div>
          <img src="../../assets/images/for-business-page-benefits-section-3.jpg" alt="" style={{ width: "100%", height: "30rem", objectFit: "cover", borderRadius: "var(--radius-image)" }} />
        </div>
      </section>

      <section className="scheme-light section">
        <div className="container">
          <div style={{ marginBottom: "var(--section-heading-gap-lg)" }}>
            <SectionHeading title="Everything under one roof" body="Six practices, one team. Start where the pressure is greatest and expand as the organization steadies." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
            {SERVICES.map((s) => <ServiceCard key={s.title} item={s} />)}
          </div>
        </div>
      </section>

      <section className="scheme-mint section">
        <div className="container">
          <div style={{ marginBottom: "var(--section-heading-gap-lg)" }}>
            <SectionHeading title="Why founders choose us" body="What changes inside an organization after working with Uplift Path." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
            {WHY.map((w) => (
              <div key={w.title}>
                <img src={`../../assets/images/${w.img}`} alt="" style={{ width: "100%", height: "16rem", objectFit: "cover", borderRadius: "var(--radius-image)", marginBottom: "1.5rem" }} />
                <h3 style={{ fontSize: "var(--text-h5)", marginBottom: "1rem" }}>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scheme-navy section alternate">
        <div className="container">
          <div style={{ marginBottom: "var(--section-heading-gap-lg)" }}>
            <SectionHeading title="Our Business Consulting Services" body="Helping you build, structure, and grow your business." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
              ["Program Development Consulting", "Design and refine evidence-based programs that align with your mission, meet community needs, and drive measurable impact."],
              ["Business Structuring Consulting", "Build a robust operational foundation with workflows, standard operating procedures, and compliance frameworks for your business."],
              ["Accreditation Consulting Service", "Get expert guidance to prepare for and navigate accreditation processes, ensuring your organisation meets high industry standards."],
              ["Business Growth Consultation", "Identify opportunities, optimise operations, and implement strategies to sustainably scale your services and expand your reach."],
            ].map(([t, b]) => (
              <Card key={t} variant="transparent" style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "var(--text-h5)", color: "var(--color-white)", marginBottom: "1rem" }}>{t}</h3>
                <p>{b}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Faqs />
      <CtaBanner onNavigate={onNavigate} />
    </>
  );
}

Object.assign(window, { BusinessScreen, ServiceCard });
