const { Input, Textarea, Label, Select, Checkbox, RadioGroup } = window.UpliftPathDesignSystem_a5cd7a;

function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [topic, setTopic] = React.useState("");
  const [who, setWho] = React.useState("");
  const [terms, setTerms] = React.useState(false);

  return (
    <>
      <section className="scheme-light section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>Contact</p>
            <h1 style={{ fontSize: "var(--text-h2)", marginBottom: "var(--heading-gap-md)" }}>Get in touch</h1>
            <p style={{ fontSize: "var(--text-medium)" }}>Tell us what you're working on. We'll come back within two business days with next steps.</p>
          </div>
          <img src="../../assets/images/contact-us-header-section.png" alt="" style={{ width: "100%", height: "24rem", objectFit: "cover", borderRadius: "var(--radius-image)" }} />
        </div>
      </section>

      <section className="scheme-navy section alternate">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <p style={{ fontWeight: 600, marginBottom: "1rem" }}>Contact</p>
            <h2 style={{ color: "var(--color-white)", marginBottom: "var(--heading-gap-md)" }}>Send us a note</h2>
            <p style={{ fontSize: "var(--text-medium)" }}>Fill out the form below and we'll be in touch</p>
            <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
              {[["mail", "hello@upliftpath.com"], ["call", "+1 (555) 000-0000"], ["location_on", "123 Sample St, Columbus OH 43215"]].map(([i, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Icon name={i} size={24} />
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {sent ? (
            <Card variant="transparent" style={{ padding: "2rem" }}>
              <h3 style={{ fontSize: "var(--text-h5)", color: "var(--color-white)", marginBottom: "1rem" }}>Thanks — we've got it.</h3>
              <p style={{ marginBottom: "2rem" }}>A member of the team will reply within two business days.</p>
              <Button variant="secondary-alt" onClick={() => setSent(false)}>Send another</Button>
            </Card>
          ) : (
            <form style={{ display: "grid", gap: "1.5rem", maxWidth: "48rem" }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={{ display: "grid" }}>
                  <Label htmlFor="firstName" style={{ marginBottom: "0.5rem" }}>First name</Label>
                  <Input variant="secondary" id="firstName" />
                </div>
                <div style={{ display: "grid" }}>
                  <Label htmlFor="lastName" style={{ marginBottom: "0.5rem" }}>Last name</Label>
                  <Input variant="secondary" id="lastName" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={{ display: "grid" }}>
                  <Label htmlFor="email" style={{ marginBottom: "0.5rem" }}>Email</Label>
                  <Input variant="secondary" id="email" type="email" />
                </div>
                <div style={{ display: "grid" }}>
                  <Label htmlFor="phone" style={{ marginBottom: "0.5rem" }}>Phone number</Label>
                  <Input variant="secondary" id="phone" />
                </div>
              </div>
              <div style={{ display: "grid" }}>
                <Label style={{ marginBottom: "0.5rem" }}>Choose a topic</Label>
                <Select
                  variant="secondary"
                  value={topic}
                  onValueChange={setTopic}
                  options={[
                    { value: "business", label: "Business consultation" },
                    { value: "individual", label: "Individual consultation" },
                    { value: "compliance", label: "Compliance support" },
                  ]}
                />
              </div>
              <div style={{ display: "grid", paddingBlock: "1rem" }}>
                <Label style={{ marginBottom: "1rem" }}>Which best describes you?</Label>
                <RadioGroup
                  value={who}
                  onValueChange={setWho}
                  options={[
                    { value: "owner", label: "Business owner" },
                    { value: "individual", label: "Individual" },
                    { value: "founder", label: "Startup founder" },
                    { value: "student", label: "Student" },
                    { value: "consultant", label: "Consultant" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>
              <div style={{ display: "grid" }}>
                <Label htmlFor="message" style={{ marginBottom: "0.5rem" }}>Message</Label>
                <Textarea variant="secondary" id="message" placeholder="Type your message..." style={{ minHeight: "11.25rem" }} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-small)", cursor: "pointer" }}>
                <Checkbox checked={terms} onCheckedChange={setTerms} />
                I accept the terms
              </label>
              <div><Button type="submit">Submit</Button></div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ContactScreen });
