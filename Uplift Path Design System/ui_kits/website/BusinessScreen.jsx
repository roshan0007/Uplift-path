const { Button, Icon, Card, Accordion, AccordionItem, AccordionTrigger, AccordionContent } = window.UpliftPathDesignSystem_930664;

// layout-237 — "Business Consultation That Fuels Your Growth"
const SERVICES = [
  ["handshake","Expert Advice","Gain expert advice and proven strategies tailored to business objectives."],
  ["bar_chart","Process To Improve","Streamline processes to improve efficiency and productivity."],
  ["category_search","Access Tools","Access specialized tools, industry trends, and benchmarking resources."]
];

// layout-237_1 — "Our Simple 3-Step Consultation Process"
const STEPS = [
  ["refresh","Submit Request","The client completes a short form on the website or through their organization to get started."],
  ["communication","Discovery Call","The team reviews info and contacts the client to discuss needs."],
  ["person","Expert Guidance","The client meets with a consultation expert who offers tailored business strategies and solutions."]
];

// layout-419 — "Empowering Success Across Industries"
const INDUSTRIES = [
  ["../../assets/images/home-who-we-help-0.jpg","Behavioral Health Consulting","Strategic consultation for behavioral health organizations to improve care quality, operational efficiency, and compliance. We help practices develop sustainable business models, optimize team processes, and navigate industry changes."],
  ["../../assets/images/home-who-we-help-1.jpg","Educational Institutions","Strategic advisory for education leaders to enhance operational performance, boost faculty engagement, and achieve academic excellence."],
  ["../../assets/images/home-who-we-help-2.jpg","Startups & Entrepreneurs","Startup coaching to address business model challenges, tailor solutions for market positioning, and connect Founders with relevant networks to accelerate growth."],
  ["../../assets/images/how-we-work-team-section-new.jpg","Nonprofit Organizations","Expert guidance to help nonprofits clarify their mission, develop sustainable funding models, and maximize their community impact through targeted advisory."]
];

// layout-613 — "Our Business Consulting Services"
const CONSULTING = [
  ["../../assets/images/for-business-page-feature-section-0.jpg","Program Development Consulting","Design and refine evidence-based programs that align with your mission, meet community needs, and drive measurable impact to business."],
  ["../../assets/images/advisory-services-about-section-new.jpg","Business Structuring Consulting","Build a robust operational foundation with workflows, standard operating procedures, and compliance frameworks for your business needs."],
  ["../../assets/images/ai-consultation-about-section.jpg","Accreditation Consulting Service","Get expert guidance to prepare and navigate accreditation processes, ensuring your organization meets high industry standards."],
  ["../../assets/images/resource-assistance-feature-section.jpg","Business Growth Consultation","Identify opportunities, optimize operations, and implement strategies to sustainably scale your services and expand your reach."]
];

// faq-01 (shared across pages)
const FAQS = [
  ["What is business consulting?","Business consulting involves providing expert advice, actionable strategies, and hands-on support to help organizations solve complex challenges, improve operations, and achieve measurable growth."],
  ["Which industries do you specialize in?","Our business consulting approach serves Founders and Leaders primarily in the behavioural health services sectors, from early-stage startups navigating accreditation to established agencies seeking operational transformation and growth."],
  ["Why should we work with a business consultant?","Business consultants offer an objective perspective, proven methodologies, and deep industry insights that accelerate problem-solving, streamline workflows, and drive innovation—resulting in sustainable business outcomes."],
  ["How do your consulting services create value for clients?","We help clients address complex business challenges through collaborative coaching, process optimisation, technology integration, and growth strategy—delivering disciplined improvements and actionable outcomes that directly impact your bottom line."]
];

function IconThreeUp({items}) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"3rem"}}>
      {items.map(([icon,title,body]) => (
        <div key={title} style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
          <div style={{marginBottom:"1.5rem"}}><Icon name={icon} size={48} /></div>
          <h3 style={{fontSize:"var(--text-h4)",marginBottom:"1.5rem"}}>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

function BusinessScreen({onNavigate}) {
  return (
    <>
      {/* layout-134 — scheme 8 hero */}
      <section className="scheme-8 logo-alt" style={{padding:"7rem 5%"}}>
        <div style={{maxWidth:"var(--container-xxl)",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
          <div>
            <p style={{fontSize:"var(--text-small)",marginBottom:"1.5rem",opacity:0.85}}>Home › For Businesses</p>
            <p style={{marginBottom:"1rem",fontWeight:600}}>Uplift Solutions · For Businesses</p>
            <h1 style={{fontSize:"var(--text-h2)",marginBottom:"1.5rem"}}>Consulting that turns plans into progress</h1>
            <p style={{fontSize:"var(--text-medium)"}}>Expert guidance for founders and leaders Transform challenges into opportunities with focused business consulting.</p>
            <div style={{marginTop:"2rem"}}>
              <Button variant="secondary" onClick={()=>onNavigate("contact")}>Book a discovery call</Button>
            </div>
          </div>
          <img src="../../assets/images/for-business-page-feature-section-0.jpg" alt="" style={{width:"100%",height:"26rem",objectFit:"cover",borderRadius:"var(--radius-image)"}} />
        </div>
      </section>

      {/* layout-237 */}
      <Section scheme={5}>
        <SectionHeader eyebrow="Operations" title="Business Consultation That Fuels Your Growth"
          body="We help businesses to set clear goals, streamline workflows, and stay compliant so your practice can grow while staying true to its mission." />
        <IconThreeUp items={SERVICES} />
      </Section>

      {/* layout-237_1 */}
      <Section scheme={4}>
        <SectionHeader title="Our Simple 3-Step Consultation Process" body="Get started in just three simple steps" />
        <IconThreeUp items={STEPS} />
      </Section>

      {/* layout-419 — sticky two-column: heading left, stacked industry panels right */}
      <section className="scheme-4">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          <div>
            <div style={{position:"sticky",top:"4.5rem",display:"flex",height:"calc(100vh - 4.5rem)",flexDirection:"column",alignItems:"flex-end",justifyContent:"center"}}>
              <div style={{maxWidth:"35rem",marginLeft:"5vw",marginRight:"5rem"}}>
                <h2 style={{fontSize:"var(--text-h2)",marginBottom:"1.5rem"}}>Empowering Success Across Industries</h2>
                <p style={{fontSize:"var(--text-medium)"}}>We co-create clear, sustainable pathways so progress is understandable, supported, and measurable across Industries.</p>
              </div>
            </div>
          </div>
          <div>
            {INDUSTRIES.map(([img,title,body]) => (
              <div key={title} style={{position:"sticky",top:"4.5rem",display:"flex",height:"calc(100vh - 4.5rem)",flexDirection:"column",justifyContent:"center",borderTop:"1px solid var(--color-scheme-border)",background:"var(--color-scheme-foreground)",padding:"2.5rem"}}>
                <div style={{maxWidth:"35rem"}}>
                  <div style={{marginBottom:"2rem"}}>
                    <img src={img} alt="" style={{width:"100%",height:"14rem",objectFit:"cover",borderRadius:"var(--radius-image)"}} />
                  </div>
                  <h3 style={{fontSize:"var(--text-h5)",marginBottom:"1rem"}}>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* layout-613 */}
      <Section scheme={4}>
        <div style={{maxWidth:"48rem",marginBottom:"5rem"}}>
          <p style={{marginBottom:"1rem",fontWeight:600}}>Align</p>
          <h2 style={{fontSize:"var(--text-h2)",marginBottom:"1.5rem"}}>Our Business Consulting Services</h2>
          <p style={{fontSize:"var(--text-medium)"}}>Helping you build, structure, and grow your business.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",borderTop:"1px solid var(--color-scheme-border)",padding:"3rem 0"}}>
          {CONSULTING.slice(0,2).map(([img,title,body]) => (
            <div key={title} style={{display:"flex",gap:"2rem",alignItems:"flex-start"}}>
              <img src={img} alt="" style={{flex:"1 0 25%",aspectRatio:"1",objectFit:"cover",borderRadius:"var(--radius-image)"}} />
              <div>
                <h3 style={{fontSize:"var(--text-h4)",marginBottom:"1rem"}}>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",borderTop:"1px solid var(--color-scheme-border)",padding:"3rem 0"}}>
          {CONSULTING.slice(2).map(([img,title,body]) => (
            <div key={title} style={{display:"flex",gap:"2rem",alignItems:"flex-start"}}>
              <img src={img} alt="" style={{flex:"1 0 25%",aspectRatio:"1",objectFit:"cover",borderRadius:"var(--radius-image)"}} />
              <div>
                <h3 style={{fontSize:"var(--text-h4)",marginBottom:"1rem"}}>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* faq-01 */}
      <Section scheme={4}>
        <div style={{maxWidth:"var(--container-lg)",margin:"0 auto"}}>
          <SectionHeader title="Frequently Asked Questions" body="Find answers to your questions about us." />
          <Accordion type="multiple" defaultValue={["q0"]}>
            {FAQS.map(([q,a],i) => (
              <AccordionItem key={i} value={"q"+i}>
                <AccordionTrigger style={{fontSize:"var(--text-medium)",padding:"1.25rem 0"}}>{q}</AccordionTrigger>
                <AccordionContent style={{paddingBottom:"1.5rem"}}>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* cta-40 variant — sitemap: "Let's Build More Effective Systems Together" */}
      <Section scheme={2} className="logo-alt">
        <Card style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"5rem 3rem",gap:"1.5rem"}}>
          <h2 style={{fontSize:"var(--text-h2)",maxWidth:"40rem"}}>Let's Build More Effective Systems Together</h2>
          <Button variant="alternate" onClick={()=>onNavigate("contact")}>Schedule a Consultation</Button>
        </Card>
      </Section>
    </>
  );
}

Object.assign(window, { BusinessScreen });
