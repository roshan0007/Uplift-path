const { Button, Icon, Card, Input } = window.UpliftPathDesignSystem_930664;

const NAV = [
  {label:"About us"},
  {label:"Uplift Solutions", menu:"solutions"},
  {label:"Resources", menu:"resources"},
  {label:"How we work"}
];

const SOLUTIONS = [
  ["work","Business Consulatation","Improve workflows, operational clarity, and long-term organizational growth."],
  ["star_shine","Ai Consultation","Assisting organizations in obtaining tools, systems, and operational support resources."],
  ["stars","Advisory Services","Strategic guidance tailored for behavioral health, nonprofit, education, and growing organizations."],
  ["computer","Systems & Technology","Build scalable systems, streamline operations, and improve organizational efficiency."],
  ["support_agent","Compliance Support","Support operational readiness and compliance processes."],
  ["science","Resource Assistance","Sustain operational readiness and compliance procedures."]
];

const RESOURCES = [
  ["enterprise","Overview","Solutions for your enterprise"],
  ["design_services","Consultation","Business consultation services"],
  ["api","AI","AI consultation and integration"],
  ["strategy","Advisory","Expert advisory services"],
  ["computer","Systems","Systems and technology support"],
  ["support","Compliance","Compliance support and guidance"]
];

const INDUSTRIES = [
  ["../../assets/images/home-who-we-help-0.jpg","Behavioral Health Consulting","Helping behavioral health organizations improve operations, care coordination, and sustainable growth."],
  ["../../assets/images/home-who-we-help-1.jpg","Educational Institutions","Supporting educational organizations with stronger systems, communication, and operational structure."],
  ["../../assets/images/home-who-we-help-2.jpg","Startups & Entrepreneurs","Strategic guidance and scalable systems designed to help growing businesses move forward confidently."],
  ["../../assets/images/how-we-work-team-section-new.jpg","Nonprofit Organizations","Helping mission-driven organizations strengthen operations, collaboration, and long-term impact."]
];

function MegaColumn({title, items, onNavigate}) {
  return (
    <div style={{display:"grid",gap:"1rem",alignContent:"start"}}>
      <h4 style={{fontFamily:"var(--font-body)",fontSize:"var(--text-small)",fontWeight:600,lineHeight:1.3}}>{title}</h4>
      {items.map(([icon,name,desc]) => (
        <a key={name} href="#" onClick={(e)=>{e.preventDefault();onNavigate&&onNavigate();}}
           style={{display:"grid",gridTemplateColumns:"max-content 1fr",columnGap:"0.75rem",alignItems:"start",padding:"0.5rem 0"}}>
          <div style={{display:"flex",width:"1.5rem",height:"1.5rem",alignItems:"center",justifyContent:"center"}}><Icon name={icon} size={24} /></div>
          <div>
            <p style={{fontWeight:600}}>{name}</p>
            <p style={{fontSize:"var(--text-small)"}}>{desc}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

function MegaFeature({title, items}) {
  return (
    <div style={{position:"relative",flex:1,maxWidth:"28rem",padding:"2rem 0 2rem 2rem",background:"var(--color-scheme-foreground)"}}>
      <div style={{display:"grid",gap:"1rem"}}>
        <h4 style={{fontFamily:"var(--font-body)",fontSize:"var(--text-small)",fontWeight:600,lineHeight:1.3}}>{title}</h4>
        <div style={{display:"grid",gap:"0.5rem"}}>
          {items.map(([img,name,desc]) => (
            <a key={name} href="#" onClick={(e)=>e.preventDefault()} style={{display:"grid",gridTemplateColumns:"0.6fr 1fr",columnGap:"1.5rem",padding:"0.5rem 0"}}>
              <div style={{position:"relative",width:"100%",paddingTop:"66.66%"}}>
                <img src={img} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",borderRadius:"var(--radius-image)"}} />
              </div>
              <div>
                <p style={{marginBottom:"0.25rem",fontWeight:600}}>{name}</p>
                <p style={{fontSize:"var(--text-small)"}}>{desc}</p>
                <div style={{marginTop:"0.375rem"}}>
                  <Button variant="link" size="link" style={{fontSize:"var(--text-small)",textDecoration:"underline"}}>About</Button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar({page, onNavigate}) {
  const [open,setOpen] = React.useState(null);
  return (
    <section className="scheme-4" style={{position:"sticky",top:0,zIndex:999,display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between",minHeight:"4.5rem",padding:"0 5%"}}
      onMouseLeave={()=>setOpen(null)}>
      <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center"}}>
          <a href="#" onClick={(e)=>{e.preventDefault();onNavigate("home");}} style={{display:"flex",alignItems:"center"}}>
            <img src="../../assets/logo/logo-light.png" alt="Uplift Path logo" style={{height:"2.25rem"}} />
          </a>
          <div style={{display:"flex",alignItems:"center",marginLeft:"1.5rem"}}>
            {NAV.map(item => item.menu ? (
              <div key={item.label} onMouseEnter={()=>setOpen(item.menu)}>
                <p role="button" style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"1.5rem 1rem",fontSize:"1rem"}}>
                  {item.label}
                  <Icon name="keyboard_arrow_down" size={20} style={{transform:open===item.menu?"rotate(180deg)":"none",transition:"transform var(--duration-base)"}} />
                </p>
              </div>
            ) : (
              <a key={item.label} href="#" onClick={(e)=>{e.preventDefault();onNavigate("home");}}
                 onMouseEnter={()=>setOpen(null)} style={{display:"block",padding:"1.5rem 1rem",fontSize:"1rem"}}>{item.label}</a>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:"1rem"}}>
          <Button size="sm" onClick={()=>onNavigate("contact")}>Contact</Button>
        </div>
      </div>
      {open && (
        <div className="scheme-4" style={{position:"absolute",top:"100%",left:0,width:"100%",borderBottom:"1px solid var(--color-scheme-border)",padding:"0 5%",overflow:"hidden"}}>
          <div style={{display:"flex",width:"100%",margin:"0 auto"}}>
            <div style={{display:"grid",flex:1,gridTemplateColumns:"1fr 1fr",columnGap:"2rem",rowGap:"1.5rem",padding:"2rem 2rem 2rem 0"}}>
              {open === "solutions" ? (
                <>
                  <MegaColumn title="For Businesses" items={SOLUTIONS} onNavigate={()=>{setOpen(null);onNavigate("business");}} />
                  <MegaColumn title="For Individuals" items={[["support","Peer Coaching Support (Telehealth)","Help navigating difficulties of life."]]} onNavigate={()=>setOpen(null)} />
                </>
              ) : (
                <>
                  <MegaColumn title="For businesses" items={RESOURCES} onNavigate={()=>setOpen(null)} />
                  <MegaColumn title="For individuals" items={[["overview","Overview","Personal solutions and support"]]} onNavigate={()=>setOpen(null)} />
                </>
              )}
            </div>
            <MegaFeature title={open === "solutions" ? "Industries we Support" : "From the blog"} items={INDUSTRIES.slice(0, open === "solutions" ? 4 : 2)} />
          </div>
        </div>
      )}
    </section>
  );
}

const FOOTER_COLS = [
  ["About us",["Home","Services","Industries","Contact"]],
  ["Quick links",["Home","About","Services","Contact","Industries"]]
];
const SOCIALS = [["facebook","Facebook"],["instagram","Instagram"],["x","Twitter"],["linkedin","Linkedin"]];

function Footer({onNavigate}) {
  const [email,setEmail] = React.useState("");
  const [sent,setSent] = React.useState(false);
  return (
    <footer className="scheme-4" style={{padding:"5rem 5%"}}>
      <div style={{maxWidth:"var(--container-xxl)",margin:"0 auto"}}>
        <Card style={{display:"grid",gridTemplateColumns:"0.75fr 1fr",columnGap:"8vw",rowGap:"1rem",padding:"3rem"}}>
          <div style={{display:"flex",flexDirection:"column"}}>
            <a href="#" onClick={(e)=>{e.preventDefault();onNavigate("home");}} style={{marginBottom:"1.5rem"}}>
              <img src="../../assets/logo/logo-light.png" alt="Uplift Path logo" style={{height:"2.25rem"}} />
            </a>
            <p style={{marginBottom:"1.5rem"}}>Unlock growth with expert advice and clear strategies tailored to your business goals. Partner with experienced consultants dedicated to your strategic success.</p>
            <div style={{maxWidth:"35rem"}}>
              <form style={{display:"grid",gridTemplateColumns:"1fr max-content",gap:"1rem",marginBottom:"0.75rem"}}
                    onSubmit={(e)=>{e.preventDefault();setSent(true);}}>
                <Input type="email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Button variant="secondary" size="sm" type="submit">{sent ? "Subscribed" : "Subscribe"}</Button>
              </form>
              <p style={{fontSize:"var(--text-tiny)"}}>We respect your privacy and only send valuable content to help your organization thrive.</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",columnGap:"2rem",rowGap:"1rem",alignItems:"start"}}>
            {FOOTER_COLS.map(([title,links]) => (
              <div key={title} style={{display:"flex",flexDirection:"column"}}>
                <h2 style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,marginBottom:"1rem"}}>{title}</h2>
                <ul style={{listStyle:"none",margin:0,padding:0}}>
                  {links.map((l,i) => <li key={i} style={{fontSize:"var(--text-small)",padding:"0.5rem 0"}}><a href="#" onClick={(e)=>e.preventDefault()}>{l}</a></li>)}
                </ul>
              </div>
            ))}
            <div style={{display:"flex",flexDirection:"column"}}>
              <h2 style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,marginBottom:"1rem"}}>Connect</h2>
              <ul style={{listStyle:"none",margin:0,padding:0}}>
                {SOCIALS.map(([icon,label]) => (
                  <li key={label} style={{fontSize:"var(--text-small)",padding:"0.5rem 0"}}>
                    <a href="#" onClick={(e)=>e.preventDefault()} style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                      <Icon name={icon === "x" ? "close" : "public"} size={24} />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"2rem",fontSize:"var(--text-small)"}}>
          <p>© 2026 Uplift Path Inc. All rights reserved.</p>
          <ul style={{listStyle:"none",display:"flex",gap:"1.5rem",margin:0,padding:0}}>
            {["Accessibility","Privacy policy","Terms of service","Grievance"].map(l =>
              <li key={l} style={{textDecoration:"underline"}}><a href="#" onClick={(e)=>e.preventDefault()}>{l}</a></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({eyebrow, title, body, align="center", maxWidth="48rem"}) {
  return (
    <div style={{maxWidth,margin:align==="center"?"0 auto 5rem":"0 0 5rem",textAlign:align,width:"100%"}}>
      {eyebrow && <p style={{marginBottom:"1rem",fontWeight:600}}>{eyebrow}</p>}
      <h2 style={{marginBottom:"1.5rem",fontSize:"var(--text-h2)"}}>{title}</h2>
      {body && <p style={{fontSize:"var(--text-medium)"}}>{body}</p>}
    </div>
  );
}

function Section({scheme=4, children, style, className=""}) {
  return (
    <section className={"scheme-" + scheme + " " + className} style={{padding:"7rem 5%",...style}}>
      <div style={{maxWidth:"var(--container-xxl)",margin:"0 auto"}}>{children}</div>
    </section>
  );
}

Object.assign(window, { Navbar, Footer, SectionHeader, Section });
