const { Button, Icon, Input, Textarea, Select, Checkbox, RadioGroup, RadioGroupItem, Label } = window.UpliftPathDesignSystem_930664;

const TOPICS = [
  {value:"first-choice",label:"First Choice"},
  {value:"second-choice",label:"Second Choice"},
  {value:"third-choice",label:"Third Choice"}
];
const ROLES = ["Business owner","Individual","Startup founder","Student","Consultant","Other"];

function ContactScreen() {
  const [started,setStarted] = React.useState(false);
  const [submitted,setSubmitted] = React.useState(false);
  return (
    <>
      {/* contact-09 — image left, short form right */}
      <Section scheme={4}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"start"}}>
          <img src="../../assets/images/contact-us-header-section.jpg" alt="" style={{width:"100%",height:"100%",minHeight:"32rem",objectFit:"cover",borderRadius:"var(--radius-image)"}} />
          <div>
            <div style={{marginBottom:"2rem"}}>
              <p style={{marginBottom:"1rem",fontWeight:600}}>Contact</p>
              <h1 style={{fontSize:"var(--text-h2)",marginBottom:"1.5rem"}}>Start here</h1>
              <p style={{fontSize:"var(--text-medium)"}}>Connect with a business advisor Who's ready to help you scale, simplify and succeed.</p>
            </div>
            <form style={{display:"grid",gap:"1.5rem"}} onSubmit={(e)=>{e.preventDefault();setStarted(true);}}>
              <div style={{display:"grid"}}><Label htmlFor="c9name" style={{marginBottom:"0.5rem"}}>Name</Label><Input id="c9name" /></div>
              <div style={{display:"grid"}}><Label htmlFor="c9email" style={{marginBottom:"0.5rem"}}>Email</Label><Input type="email" id="c9email" /></div>
              <div style={{display:"grid"}}><Label htmlFor="c9message" style={{marginBottom:"0.5rem"}}>Message</Label><Textarea id="c9message" placeholder="Tell us everything" style={{minHeight:"11.25rem"}} /></div>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"var(--text-small)"}}>
                <Checkbox id="c9terms" /><Label htmlFor="c9terms">I accept the terms</Label>
              </div>
              <div><Button type="submit">{started ? "Sent" : "Get Started"}</Button></div>
            </form>
          </div>
        </div>
      </Section>

      {/* contact-06 — full form on scheme 2 */}
      <section className="scheme-2 logo-alt" style={{padding:"7rem 5%"}}>
        <div style={{maxWidth:"var(--container-xxl)",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"start"}}>
          <div>
            <p style={{marginBottom:"1rem",fontWeight:600}}>Contact</p>
            <h2 style={{fontSize:"var(--text-h2)",marginBottom:"1.5rem"}}>Send us a note</h2>
            <p style={{fontSize:"var(--text-medium)",marginBottom:"2rem"}}>Fill out the form below and we'll be in touch</p>
            <div style={{display:"grid",gap:"1rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"1rem"}}><Icon name="mail" size={24} /><p>hello@demositedesign.com</p></div>
              <div style={{display:"flex",alignItems:"center",gap:"1rem"}}><Icon name="call" size={24} /><p>+1 (555) 000-0000</p></div>
              <div style={{display:"flex",alignItems:"center",gap:"1rem"}}><Icon name="location_on" size={24} /><p>123 Sample St, Sydney NSW 2000 AU</p></div>
            </div>
          </div>
          <form style={{display:"grid",maxWidth:"48rem",gap:"1.5rem"}} onSubmit={(e)=>{e.preventDefault();setSubmitted(true);}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
              <div style={{display:"grid"}}><Label htmlFor="firstName" style={{marginBottom:"0.5rem"}}>First name</Label><Input variant="secondary" id="firstName" /></div>
              <div style={{display:"grid"}}><Label htmlFor="lastName" style={{marginBottom:"0.5rem"}}>Last name</Label><Input variant="secondary" id="lastName" /></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
              <div style={{display:"grid"}}><Label htmlFor="email" style={{marginBottom:"0.5rem"}}>Email</Label><Input variant="secondary" type="email" id="email" /></div>
              <div style={{display:"grid"}}><Label htmlFor="phone" style={{marginBottom:"0.5rem"}}>Phone number</Label><Input variant="secondary" id="phone" /></div>
            </div>
            <div style={{display:"grid"}}>
              <Label style={{marginBottom:"0.5rem"}}>Choose a topic</Label>
              <Select variant="secondary" options={TOPICS} />
            </div>
            <div style={{display:"grid",padding:"1rem 0"}}>
              <Label style={{marginBottom:"1rem"}}>Which best describes you?</Label>
              <RadioGroup variant="alternate" defaultValue={ROLES[0]} style={{gridTemplateColumns:"1fr 1fr",gap:"0.875rem 1.5rem"}}>
                {ROLES.map(r => <Label key={r} htmlFor={r}><RadioGroupItem value={r} id={r} />{r}</Label>)}
              </RadioGroup>
            </div>
            <div style={{display:"grid"}}>
              <Label htmlFor="message" style={{marginBottom:"0.5rem"}}>Message</Label>
              <Textarea variant="secondary" id="message" placeholder="Type your message..." style={{minHeight:"11.25rem"}} />
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"var(--text-small)"}}>
              <Checkbox id="terms" variant="alternate" />
              <Label htmlFor="terms">I accept the terms</Label>
            </div>
            <div><Button type="submit">{submitted ? "Sent" : "Submit"}</Button></div>
          </form>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ContactScreen });
