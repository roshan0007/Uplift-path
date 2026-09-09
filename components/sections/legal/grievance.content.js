export const TITLE = "Grievance Form";
export const UPDATED = null;

export const CONTENT = [
  {
    type: "p",
    text: "Uplift Path, Inc. is committed to ensuring our clients, families, and stakeholders have a positive experience. We value your feedback as it helps us improve the quality of care we provide.",
  },
  {
    type: "p",
    text: "Our commitment to quality includes upholding your right to voice concerns. All grievances are handled with fairness and confidentiality. In accordance with state and federal guidelines, filing a grievance will not negatively affect your services, benefits, or relationship with Uplift Path, Inc.",
  },
  {
    type: "h",
    text: "Need assistance?",
  },
  {
    // The live site's wording is "If you need help completing this form or have
    // questions about the grievance process, please contact us:" and that is
    // what shipped here until 2026-09-10, when the Zoho embed was pulled off
    // this page (see the route's docblock). With no form on the page, "help
    // completing this form" points at nothing and the three contact details
    // below it read as a footnote to something absent rather than as the way
    // to actually file.
    //
    // So the clause is dropped and the rest is the source's, word for word.
    // **Restore the sentence above verbatim when the form goes back.** This is
    // the only line on any of the four legal pages that is not the live copy
    // exactly, and it is temporary.
    type: "p",
    text: "To file a grievance, or if you have questions about the grievance process, please contact us:",
  },
  {
    type: "ul",
    items: [
      "Phone: (513) 299-4553",
      "Email: grievances@upliftpathinc.com",
      "Hours: Monday-Friday, 8:00 AM - 5:00 PM EST",
    ],
  },
];
