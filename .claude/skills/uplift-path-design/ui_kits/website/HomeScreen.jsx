const { Button, Icon, Card, BackgroundCard, Input, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } = window.UpliftPathDesignSystem_930664;

const HERO_CARDS = [
  ["../../assets/images/home-hero-section-0.jpg","For businesses","Build a foundation that holds steady under pressure","You carry weight that deserves a steady hand"],
  ["../../assets/images/home-hero-section-1.jpg","For individuals","Find a clear path through the fog of uncertainty","Ambition is there but the path is unclear"]
];

const HELP_CARDS = [
  ["../../assets/images/home-who-we-help-0.jpg","Operational consulting","Discovery & Listening","Let's start with a quick conversation to understand your goals, strengths, and any barriers you face."],
  ["../../assets/images/home-who-we-help-1.jpg","Process optimization","Your Pathway Plan","A clear plan with transparent milestones and support, so you always know your path forward."],
  ["../../assets/images/home-who-we-help-2.jpg","Leadership and strategy","Measurable Progress","Ongoing support to execute, track results, and adjust the pathway for sustainable growth."]
];

const COMPARISON = [
  ["Strategic clarity and direction","Yes","No"],
  ["Operational systems that scale",true,true],
  ["Measurable milestones and tracking",true,true],
  ["Dedicated experienced guidance",true,false],
  ["Sustainable long-term impact",true,false]
];

const FAQS = [
  ["What is business consulting?","Business consulting involves providing expert advice, actionable strategies, and hands-on support to help organizations solve complex challenges, improve operations, and achieve measurable growth."],
  ["Which industries do you specialize in?","Our business consulting approach serves Founders and Leaders primarily in the behavioural health services sectors, from early-stage startups navigating accreditation to established agencies seeking operational transformation and growth."],
  ["Why should we work with a business consultant?","Business consultants offer an objective perspective, proven methodologies, and deep industry insights that accelerate problem-solving, streamline workflows, and drive innovation—resulting in sustainable business outcomes."],
  ["How do your consulting services create value for clients?","We help clients address complex business challenges through collaborative coaching, process optimisation, technology integration, and growth strategy—delivering disciplined improvements and actionable outcomes that directly impact your bottom line."]
];

const TESTIMONIALS = [
  ['"The fog lifted. For the first time in years I could see the next step and the one after that."',"Sarah Mitchell","Executive Director, Behavioral Health"],
  ['"They gave us structure we could actually keep using after the engagement ended."',"Denise Aku","Founder, Community Care Partners"]
];

function ImageCard({img, eyebrow, title, body, minHeight, hovered, onHover, showLink, index, activeIndex}) {
  const isActive = activeIndex === index;
  return (
    <BackgroundCard
      onMouseEnter={()=>onHover(index)} onMouseLeave={()=>onHover(null)}
      style={{position:"relative",flex:isActive?"1 1 70%":"1 1 0",overflow:"hidden",transition:"flex var(--duration-fast) var(--ease-standard)"}}>
      <a href="#" onClick={(e)=>e.preventDefault()} style={{display:"block",height:"100%"}}>
        <div style={{position:"absolute",inset:0}}>
          <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          <div style={{position:"absolute",inset:0,background:"var(--scrim)"}} />
        </div>
        <div style={{position:"relative",display:"flex",flexDirection:"column",justifyContent:"flex-end",minHeight,padding:"3rem"}}>
          <div style={{position:"relative",zIndex:10}}>
            <p style={{marginBottom:"0.5rem",fontWeight:600,color:"var(--color-white)"}}>{eyebrow}</p>
            <h3 style={{fontSize:"var(--text-h3)",color:"var(--color-white)"}}>{title}</h3>
            <div style={{overflow:"hidden",maxHeight:isActive?"12rem":0,opacity:isActive?1:0,transition:"all var(--duration-base) var(--ease-standard)"}}>
              <p style={{marginTop:"1.5rem",color:"var(--color-white)",maxWidth:"33rem"}}>{body}</p>
              {showLink && (
                <div style={{marginTop:"2rem"}}>
                  <Button variant="link-alt" size="link" iconRight={<Icon name="chevron_right" size={20} color="var(--color-white)" />}>Explore</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </BackgroundCard>
  );
}

function HomeScreen({onNavigate}) {
  const [heroHover,setHeroHover] = React.useState(null);
  const [helpHover,setHelpHover] = React.useState(null);
  const [slide,setSlide] = React.useState(0);
  const [email,setEmail] = React.useState("");
  const [signedUp,setSignedUp] = React.useState(false);

  return (
    <>
      <Section scheme={4}>
        <SectionHeader eyebrow="For individuals" title="Carry less alone"
          body="Whether you're seeking compassionate mental-health support or building a business that can scale, Uplift Path pairs you with experienced guidance and a clear, practical path ahead." />
        <div style={{display:"flex",gap:"2rem"}}>
          {HERO_CARDS.map(([img,eyebrow,title,body],i) => (
            <ImageCard key={i} img={img} eyebrow={eyebrow} title={title} body={body} minHeight="34rem"
              showLink index={i} activeIndex={heroHover} onHover={setHeroHover} />
          ))}
        </div>
      </Section>

      <Section scheme={5}>
        <SectionHeader eyebrow="How we help organizations thrive" title="Create Clear, Sustainable Pathways to Meaningful Growth"
          body="We turn complexity into clear, sustainable pathways co-created so every step is supported and success is measurable." />
        <div style={{display:"flex",gap:"2rem"}}>
          {HELP_CARDS.map(([img,eyebrow,title,body],i) => (
            <ImageCard key={i} img={img} eyebrow={eyebrow} title={title} body={body} minHeight="30rem"
              index={i} activeIndex={helpHover} onHover={setHelpHover} />
          ))}
        </div>
      </Section>

      <Section scheme={4}>
        <SectionHeader title="The difference is clear" body="See how structured partnership compares to going it alone" />
        <div style={{maxWidth:"var(--container-xl)",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr",borderBottom:"1px solid var(--color-scheme-border)"}}>
            <div style={{display:"flex",alignItems:"flex-end",padding:"1.5rem 1.5rem 1.5rem 0"}}>
              <h2 style={{fontSize:"var(--text-h6)",fontFamily:"var(--font-body)",fontWeight:700}}>Our approach</h2>
            </div>
            <div style={{display:"flex",justifyContent:"center",padding:"1.5rem"}}>
              <img src="../../assets/logo/logo-light.png" alt="Uplift Path logo" style={{maxHeight:"2rem"}} />
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"1.5rem",fontWeight:600,opacity:0.6}}>Going it alone</div>
          </div>
          {COMPARISON.map(([label,a,b],i) => (
            <div key={i} style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr",borderBottom:"1px solid var(--color-scheme-border)"}}>
              <p style={{padding:"1rem 1.5rem 1rem 0"}}>{label}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem 1.5rem",fontWeight:600}}>
                {a === true ? <Icon name="check" size={24} /> : a === false ? <Icon name="close" size={24} /> : <span>{a}</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem 1.5rem",fontWeight:600}}>
                {b === true ? <Icon name="check" size={24} /> : b === false ? <Icon name="close" size={24} /> : <span>{b}</span>}
              </div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"center",marginTop:"5rem"}}>
            <Button variant="secondary" onClick={()=>onNavigate("business")}>Get Started</Button>
          </div>
        </div>
      </Section>

      <Section scheme={4} style={{overflow:"hidden"}}>
        <Carousel>
          <div style={{position:"relative",padding:"0 2rem 3rem"}}>
            <CarouselContent>
              {TESTIMONIALS.map(([quote,name,role],i) => (
                <CarouselItem key={i}>
                  <div style={{margin:"0 auto",maxWidth:"48rem",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
                    <div style={{display:"flex",gap:"0.25rem",marginBottom:"2rem"}}>
                      {[0,1,2,3,4].map(s => <Icon key={s} name="star" size={24} />)}
                    </div>
                    <h5 style={{fontSize:"var(--text-h5)"}}>{quote}</h5>
                    <div style={{marginTop:"2rem",display:"flex",alignItems:"center",gap:"1.25rem",textAlign:"left"}}>
                      <div style={{width:"3.5rem",height:"3.5rem",borderRadius:"9999px",overflow:"hidden",background:"var(--color-neutral-lightest)"}}>
                        <img src="../../assets/images/how-we-work-team-section-new.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                      </div>
                      <div>
                        <p style={{fontWeight:600}}>{name}</p>
                        <p>{role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots style={{position:"absolute",left:0,right:0,bottom:0}} />
          </div>
        </Carousel>
      </Section>

      <Section scheme={4}>
        <div style={{maxWidth:"var(--container-lg)",margin:"0 auto"}}>
          <SectionHeader title="Frequently Asked Questions" body="Find answers to your questions about us." />
          <Accordion type="multiple" defaultValue={FAQS.map((_,i)=>"q"+i)}>
            {FAQS.map(([q,a],i) => (
              <AccordionItem key={i} value={"q"+i}>
                <AccordionTrigger style={{fontSize:"var(--text-medium)",padding:"1.25rem 0"}}>{q}</AccordionTrigger>
                <AccordionContent style={{paddingBottom:"1.5rem"}}>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section scheme={2} className="logo-alt">
        <Card style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"3rem"}}>
            <h2 style={{marginBottom:"1.5rem",fontSize:"var(--text-h2)"}}>Ready to unlock Your growth plan</h2>
            <p style={{fontSize:"var(--text-medium)"}}>Book your discovery call for personalized, actionable strategies tailored to your business goals.</p>
            <div style={{marginTop:"2rem",width:"100%",maxWidth:"30rem"}}>
              <form style={{display:"grid",gridTemplateColumns:"1fr max-content",gap:"1rem",marginBottom:"1rem"}}
                    onSubmit={(e)=>{e.preventDefault();setSignedUp(true);}}>
                <Input variant="secondary" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Button size="sm" type="submit" style={{padding:"0.75rem 1.5rem"}}>{signedUp ? "Thanks" : "Sign up"}</Button>
              </form>
              <p style={{fontSize:"var(--text-tiny)"}}>By clicking Sign Up you're confirming that you agree with our Terms and Conditions.</p>
            </div>
          </div>
          <div style={{display:"flex"}}>
            <img src="../../assets/images/career-take-away-new.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </Card>
      </Section>
    </>
  );
}

Object.assign(window, { HomeScreen });
