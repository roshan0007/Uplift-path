"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export function Layout507() {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-20 scheme-1 badge-alt">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-12 lg:mb-12">
          <h1 className="mb-5 text-h2 font-bold md:mb-6">Board of Advisory</h1>
          <p className="text-medium">
            Our advisors bring decades of cross-industry expertise to guide our
            strategic approach.
          </p>
        </div>
        <Card className="relative grid auto-cols-fr grid-cols-1 gap-x-12 lg:gap-x-0">
          <Tabs defaultValue="tab-2">
            <TabsList className="flex-col group-data-[slot=card-flat]:border-0 md:flex-row">
              <TabsTrigger
                value="tab-2"
                className="w-full items-start justify-start gap-4 rounded-none border-0 border-b p-6 text-h6 font-bold whitespace-normal group-data-[slot=card-flat]:border-0 data-[state=active]:bg-scheme-foreground data-[state=inactive]:border-scheme-border data-[state=inactive]:bg-scheme-background md:items-center md:justify-center md:border-t-0 md:border-r md:px-8 md:py-6 md:data-[state=active]:border-b-transparent"
              >
                Regina Wooten
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                className="w-full items-start justify-start gap-4 rounded-none border-0 border-b p-6 text-h6 font-bold whitespace-normal group-data-[slot=card-flat]:border-0 data-[state=active]:bg-scheme-foreground data-[state=inactive]:border-scheme-border data-[state=inactive]:bg-scheme-background md:items-center md:justify-center md:border-t-0 md:border-r md:px-8 md:py-6 md:data-[state=active]:border-b-transparent"
              >
                Tasha Coppett
              </TabsTrigger>
              <TabsTrigger
                value="tab-4"
                className="w-full items-start justify-start gap-4 rounded-none border-0 border-b p-6 text-h6 font-bold whitespace-normal group-data-[slot=card-flat]:border-0 data-[state=active]:bg-scheme-foreground data-[state=inactive]:border-scheme-border data-[state=inactive]:bg-scheme-background md:items-center md:justify-center md:border-t-0 md:border-r md:px-8 md:py-6 md:data-[state=active]:border-b-transparent"
              >
                Teresa Guerin
              </TabsTrigger>
              <TabsTrigger
                value="tab-5"
                className="w-full items-start justify-start gap-4 rounded-none border-0 border-b p-6 text-h6 font-bold whitespace-normal group-data-[slot=card-flat]:border-0 data-[state=active]:bg-scheme-foreground data-[state=inactive]:border-scheme-border data-[state=inactive]:bg-scheme-background md:items-center md:justify-center md:border-t-0 md:border-r md:px-8 md:py-6 md:data-[state=active]:border-b-transparent"
              >
                Tia Glaspie
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="tab-2"
              className="data-[state=active]:animate-tabs"
            >
              <div className="grid grid-cols-1 gap-y-12 p-6 md:grid-cols-2 md:items-center md:gap-x-12 md:p-8 lg:gap-x-20 lg:p-10">
                <div>
                  <p className="mb-3 font-semibold md:mb-4">
                    Educational Leader & Administrator
                  </p>
                  <h2 className="mb-5 text-h3 font-bold md:mb-6">
                    Regina Wooten builds bridges that last
                  </h2>
                  <p>
                    Regina Wooten is a distinguished education leader with over
                    30 years of experience shaping school environments as a
                    teacher, administrator, and principal. Known for her
                    collaborative leadership, she champions equity and
                    meaningful learning experiences for both students and staff.
                    Key Expertise: School Improvement: Served as Principal and
                    School Improvement Chair, driving impactful initiatives and
                    strengthening community engagement. Program Leadership:
                    Extensive background leading dropout prevention programs and
                    serving on Accreditation Teams. Education: Holds a B.A. from
                    UNC–Chapel Hill and an M.A. in School Administration from
                    UNC Wilmington.
                  </p>
                </div>
                <div className="aspect-[4/3] w-full">
                  <img
                    src="/images/about-us-feature-section-new-0.jpg"
                    className="size-full rounded-image object-cover"
                    alt="Relume placeholder image"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="tab-3"
              className="data-[state=active]:animate-tabs"
            >
              <div className="grid grid-cols-1 gap-y-12 p-6 md:grid-cols-2 md:items-center md:gap-x-12 md:p-8 lg:gap-x-20 lg:p-10">
                <div>
                  <p className="mb-3 font-semibold md:mb-4">
                    Associate Dean of Residential Life - MIT
                  </p>
                  <h2 className="mb-5 text-h3 font-bold md:mb-6">
                    Tasha Coppett sees the whole picture
                  </h2>
                  <p>
                    Tasha N. Coppett is a higher education executive with 20
                    years of experience in student services, operations, and
                    admissions. She currently serves at the Massachusetts
                    Institute of Technology (MIT) as Associate Dean of
                    Residential Life and Director of Strategic Initiatives. Key
                    Expertise: Strategic Operations: Leads residential strategy,
                    housing, and orientation processes for large university
                    communities. Global Experience: Previously held leadership
                    roles at Brown University, Georgia State University, and
                    King’s College London. Credentials: Holds an MBA in Global
                    Management and is completing a Master of Legal Studies at
                    Cornell University.
                  </p>
                </div>
                <div className="aspect-[4/3] w-full">
                  <img
                    src="/images/about-us-feature-section-new-1.jpg"
                    className="size-full rounded-image object-cover"
                    alt="Relume placeholder image"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="tab-4"
              className="data-[state=active]:animate-tabs"
            >
              <div className="grid grid-cols-1 gap-y-12 p-6 md:grid-cols-2 md:items-center md:gap-x-12 md:p-8 lg:gap-x-20 lg:p-10">
                <div>
                  <p className="mb-3 font-semibold md:mb-4">
                    Education Consultant
                  </p>
                  <h2 className="mb-5 text-h3 font-bold md:mb-6">
                    Teresa Guerin champions the person first
                  </h2>
                  <p>
                    Teresa Guerin is a national and international trainer with
                    over 40 years of experience in educational leadership,
                    ranging from classroom instruction to serving as a secondary
                    principal. She delivers dynamic, hands-on training across
                    the U.S. and the Bahamas. Key Expertise: Excellence in
                    Education: Led schools to achieve "Blue Ribbon School of
                    Excellence" and "New American High School" designations.
                    Proven Outcomes: Delivered three consecutive years of 100%
                    passing rates on state Algebra exams. Specialization: Expert
                    in research-based instructional strategies, literacy
                    facilitation, and school improvement.
                  </p>
                </div>
                <div className="aspect-[4/3] w-full">
                  <img
                    src="/images/about-us-feature-section-new-2.png"
                    className="size-full rounded-image object-cover"
                    alt="Relume placeholder image"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="tab-5"
              className="data-[state=active]:animate-tabs"
            >
              <div className="grid grid-cols-1 gap-y-12 p-6 md:grid-cols-2 md:items-center md:gap-x-12 md:p-8 lg:gap-x-20 lg:p-10">
                <div>
                  <p className="mb-3 font-semibold md:mb-4">
                    Licensed Clinical Social Worker
                  </p>
                  <h2 className="mb-5 text-h3 font-bold md:mb-6">
                    Tia Glaspie turns vision into action
                  </h2>
                  <p>
                    Tia Glaspie is a Licensed Clinical Social Worker (LCSW) and
                    Psychotherapist at LifeStance Health. She specializes in
                    providing trauma-focused and solution-focused therapy to
                    clients navigating anxiety, depression, and life
                    transitions. Key Expertise: Clinical Focus: Expert in CBT,
                    trauma-informed care, and multidisciplinary collaboration.
                    Background: extensive experience in High Fidelity Wraparound
                    facilitation and foster care support. Credentials: Holds a
                    Doctor of Social Work (University of Kentucky, 2025) and a
                    Master of Social Work (Johnson C. Smith University).
                  </p>
                </div>
                <div className="aspect-[4/3] w-full">
                  <img
                    src="/images/about-us-feature-section-new-3.jpg"
                    className="size-full rounded-image object-cover"
                    alt="Relume placeholder image"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
