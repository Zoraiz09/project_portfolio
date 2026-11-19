/**
 * All site copy lives here. Edit this file to change text without touching components.
 */

export const site = {
  name: "Rays",
  tagline: "Creative web development softwares",
  email: "info@raysglobals.com",
  phone: "+971 55 553 4457",
  address: "PO Box 21408, Business Bay, Dubai, UAE",
  calendly: "", // e.g. "https://cal.com/yourstudio/intro" — when empty, "Book a call" scrolls to the contact form
  location: "Dubai, UAE · Working worldwide",
  timezone: "GMT+4",
  description:
    "We build websites, apps and smart AI assistants that save businesses time and money, from first idea to launch.",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#studio" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  badge: "Available for new projects",
  titleBefore: "We build",
  titleItalic: "smart",
  titleAfter: "software that works.",
  rotating: ["AI assistants", "websites", "mobile-friendly apps", "online platforms", "business tools"],
  sub: "We help businesses use AI to save time and serve customers better. Tell us what you need; we design it, build it and launch it for you.",
};

// Industries shown in the hero row.
export const experience = ["Farming", "Finance", "Energy", "Media"];

export type Service = {
  id: string;
  title: string;
  body: string;
  points: string[];
  size: "lg" | "md" | "sm";
  visual: "agent" | "rag" | "saas" | "backend" | "ui" | "pipeline";
  /** Plain-English explanation shown when a visitor clicks the service. */
  details: {
    simple: string;
    examples: string[];
    youGet: string[];
    goodFit: string;
  };
};

export const services: Service[] = [
  {
    id: "agents",
    title: "AI Assistants That Do the Work",
    body: "An AI assistant built into your software. Your team or customers simply type what they want, and the assistant does the steps for them.",
    points: ["Works inside your software", "Does tasks for you", "Just type a request", "Saves hours every week"],
    size: "lg",
    details: {
      simple:
        "Think of it as hiring a smart digital assistant that can actually use your software. Instead of clicking through menus, your team or customers just type what they want in everyday words, and the assistant does the steps for them.",
      examples: [
        "\"Make a report of last month's sales and email it to the team\" — done in one message.",
        "A customer types \"cancel my order and refund me\" and it's handled without waiting for support.",
        "A video editor where you say \"cut the intro and add subtitles\" instead of doing it by hand.",
      ],
      youGet: [
        "An assistant connected safely to your existing system",
        "Clear limits on what it can and can't do",
        "A simple chat box your users already know how to use",
      ],
      goodFit: "Businesses whose software has lots of buttons and steps, and who want users to get things done faster.",
    },
    visual: "agent",
  },
  {
    id: "rag",
    title: "Ask-Your-Documents Assistant",
    body: "A private assistant that has read your company files and answers questions instantly, showing where each answer came from.",
    points: ["Instant answers", "Shows its sources", "Private & secure"],
    size: "md",
    details: {
      simple:
        "A private \"ask me anything\" assistant that has read all of your company's documents. Ask it a question in plain words and it gives you the answer, plus shows exactly which document and page it came from, so you can trust it.",
      examples: [
        "Staff ask \"What's our leave policy for new joiners?\" and get the answer in seconds.",
        "Sales teams find the right product spec without digging through folders.",
        "Customers get accurate answers from your help guides, 24/7.",
      ],
      youGet: [
        "A chat assistant trained on your own files",
        "Answers with links back to the original source",
        "Your documents kept private and secure",
      ],
      goodFit: "Teams that waste time searching through manuals, policies, contracts or old emails.",
    },
    visual: "rag",
  },
  {
    id: "saas",
    title: "New Apps & Online Products",
    body: "Got an idea for an app or online service? We turn it into a real product people can sign up to and pay for.",
    points: ["From idea to launch", "Sign-up & payments", "Easy dashboards"],
    size: "md",
    details: {
      simple:
        "You have an idea for an app or online product. We turn it into a real, working product people can sign up to, log in to and pay for — with smart AI features included from the start.",
      examples: [
        "A booking platform that suggests the best time slots automatically.",
        "A dashboard that writes a plain-English summary of your numbers each week.",
        "A first version you can show investors or early customers.",
      ],
      youGet: [
        "A launched website or web app, not just designs",
        "Sign-up, login and online payments set up",
        "Easy-to-read dashboards for you and your users",
      ],
      goodFit: "Founders and businesses with an idea who want a real product quickly, without building a tech team first.",
    },
    visual: "saas",
  },
  {
    id: "backend",
    title: "Fast, Reliable Systems",
    body: "The behind-the-scenes engine that keeps your app quick, safe and running, even on your busiest day.",
    points: ["Always online", "Data kept safe", "Handles growth"],
    size: "sm",
    details: {
      simple:
        "This is the engine room behind your app — the part users never see. We build it so your app stays fast, keeps data safe, and doesn't crash when lots of people use it at once.",
      examples: [
        "Your app keeps working smoothly during a big sale or launch day.",
        "Different systems (shop, accounts, stock) talk to each other automatically.",
        "Data is backed up and protected if something goes wrong.",
      ],
      youGet: [
        "Reliable servers and a well-organised database",
        "Connections between your existing tools",
        "Monitoring so problems are caught early",
      ],
      goodFit: "Businesses whose app is slow, breaks under pressure, or is getting ready to grow.",
    },
    visual: "backend",
  },
  {
    id: "pipeline",
    title: "Putting Your Data to Work",
    body: "We gather and tidy up your business information so AI can use it to give accurate, up-to-date answers.",
    points: ["Collects your data", "Cleans it up", "Keeps AI up to date"],
    size: "sm",
    details: {
      simple:
        "AI is only as good as the information it's given. We collect your messy data from different places, tidy it up, and feed it to the AI automatically, so its answers stay accurate and up to date.",
      examples: [
        "New sales figures flow into your AI reports every morning without anyone copying them.",
        "Thousands of scanned documents are cleaned and made searchable.",
        "An AI model you've tested is put live so customers can actually use it.",
      ],
      youGet: [
        "Automatic data collection and clean-up",
        "AI that always works with the latest information",
        "A tested AI model running live, not stuck on a laptop",
      ],
      goodFit: "Companies sitting on lots of data (spreadsheets, files, systems) that they want AI to make use of.",
    },
    visual: "pipeline",
  },
  {
    id: "ui",
    title: "Website & App Design",
    body: "Beautiful, easy-to-use screens that look great and work smoothly on phones, tablets and computers.",
    points: ["Modern design", "Works on any device", "Easy to use"],
    size: "sm",
    details: {
      simple:
        "This is everything your users see and click. We design and build screens that look great, are easy to understand, load quickly and work well on phones, tablets and computers.",
      examples: [
        "A confusing old website redesigned so customers find what they need.",
        "A mobile-friendly app that feels smooth and modern.",
        "Your designer's mockups turned into a real, working website.",
      ],
      youGet: [
        "Clean, modern design that matches your brand",
        "Works on every screen size",
        "Accessible for all users, including people with disabilities",
      ],
      goodFit: "Anyone whose website or app feels outdated, slow or hard to use.",
    },
    visual: "ui",
  },
];

export type CaseStudy = {
  id: string;
  tag: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  visual: { type: "image"; src: string; alt: string } | { type: "mcp" } | { type: "rag" };
};

export const work: CaseStudy[] = [
  {
    id: "mcp-editor",
    tag: "AI Assistant",
    title: "A video editor you can talk to",
    client: "Media platform",
    problem: "Editing videos meant learning lots of tools and doing every step by hand.",
    solution:
      "We added an AI assistant to the editor. Users simply type what they want, such as \"cut the intro and add subtitles\", and the assistant does every step for them.",
    highlights: [
      "Edits done from one simple sentence",
      "No need to learn complicated editing tools",
      "Works inside the platform people already use",
    ],
    stack: ["AI assistant", "Video editing"],
    visual: { type: "mcp" },
  },
  {
    id: "codesage",
    tag: "AI for software teams",
    title: "CodeSage: an AI that checks code for mistakes",
    client: "Our own product",
    problem: "Software teams want AI to check their work, but don't want to send their private code to outside companies.",
    solution:
      "A tool that runs on the team's own computers. It spots mistakes and security risks, writes explanations, and answers questions about the project, pointing to the exact place it found each answer.",
    highlights: [
      "Answers questions about the project with exact references",
      "Flags security risks such as leaked passwords",
      "Private: the code never leaves the company",
    ],
    stack: ["AI", "Security checks"],
    visual: { type: "image", src: "/work/codesage.webp", alt: "CodeSage dashboard" },
  },
  {
    id: "enterprise-rag",
    tag: "Business AI",
    title: "An \"ask me anything\" assistant for an energy company",
    client: "Oil & gas company",
    problem: "Staff wasted hours digging through piles of internal documents to find answers.",
    solution:
      "A private assistant that has read the company's documents. Staff ask a question in plain words and get a clear answer, along with the document and page it came from.",
    highlights: [
      "Answers in seconds instead of hours",
      "Every answer shows its source, so it can be trusted",
      "Company documents stay private and secure",
    ],
    stack: ["AI assistant", "Document search"],
    visual: { type: "rag" },
  },
  {
    id: "systemforge",
    tag: "AI planning tool",
    title: "SystemForge: an AI that plans software projects",
    client: "Our own product",
    problem: "Planning a new software project properly usually needs expensive senior experts.",
    solution:
      "Type a one-line idea and it draws a clear, clickable plan of the whole system. A team of AI \"advisers\" then reviews costs, risks and growth, and agrees on a final recommendation.",
    highlights: [
      "Turns a one-line idea into a visual plan",
      "AI advisers review cost, risk and growth",
      "Download the full report as a PDF",
    ],
    stack: ["AI advisers", "Visual planning"],
    visual: { type: "image", src: "/work/systemforge.webp", alt: "SystemForge home page" },
  },
  {
    id: "cashdash",
    tag: "Finance software",
    title: "A complete system for a currency exchange business",
    client: "Money-exchange business",
    problem: "Exchange rates, cash in the safe and who owed what were all tracked by hand in notebooks.",
    solution:
      "One simple system for buying and selling currency, tracking cash in the safe, and keeping a record of who owes money and who is owed.",
    highlights: [
      "Instant price calculation and printable receipts",
      "Clear record of money owed, per currency",
      "Cash in the system always matches cash in the safe",
    ],
    stack: ["Web app", "Accounting"],
    visual: { type: "image", src: "/work/cashdash.webp", alt: "Currency exchange dashboard" },
  },
];

export const moreWork = [
  {
    title: "Project IRIS",
    body: "Smart farming software: live readings from the field and AI advice on when and how much to water crops.",
    tag: "Farming · AI",
    img: "/work/iris.webp",
  },
  {
    title: "Dewy",
    body: "A beautiful mobile app built exactly to the designer's vision, with a smooth, modern look.",
    tag: "App design",
    img: "/work/dewy.webp",
  },
];

export const aiPipeline = {
  steps: [
    { k: "Your information", d: "Your documents, spreadsheets and systems" },
    { k: "Organise", d: "We sort and tidy it so it's easy to search" },
    { k: "The right AI", d: "We pick the AI that gives the best results for the price" },
    { k: "Connect", d: "We link the AI to the tools you already use" },
    { k: "Ready to use", d: "A reliable feature your customers can trust" },
  ],
  principles: [
    { t: "Your data stays yours", d: "Your information stays private and is only shared where it's truly needed." },
    { t: "Answers you can check", d: "The AI shows where every answer came from, so nothing is guessed." },
    { t: "No surprise bills", d: "We design it to keep monthly running costs low and predictable." },
    { t: "Tested before launch", d: "We test everything thoroughly before your customers ever see it." },
  ],
};

export const process = [
  { t: "Free first call", d: "We listen to your goals and give honest advice, even if that means telling you not to build.", time: "Day 1" },
  { t: "Clear plan & price", d: "You get a simple written plan, timeline and a fixed price to approve.", time: "Week 1" },
  { t: "Quick trial version", d: "For AI projects, we build a small working version with your own information, so you see it work before committing.", time: "Weeks 1–2" },
  { t: "Building, step by step", d: "We show you progress every week, with a link you can click and try yourself.", time: "Ongoing" },
  { t: "Launch & support", d: "We put it live, keep an eye on it, and stay on to help it improve.", time: "After launch" },
];

export const studio = {
  mission: "We help businesses turn AI from a buzzword into something that actually saves them time and money.",
  values: [
    { t: "Experienced people on every project", d: "The people you speak to on day one are the people building your product." },
    { t: "See progress every week", d: "No waiting in the dark. Every week you see and try what we've built." },
    { t: "Built to grow with you", d: "Works just as well with your first hundred customers as with your first hundred thousand." },
  ],
  stats: [
    { n: 8, suffix: "+", l: "Products & systems launched" },
    { n: 5, suffix: "", l: "Industries served" },
    { n: 100, suffix: "%", l: "Ownership of everything we build is yours" },
    { n: 24, suffix: "h", l: "Reply time, wherever you are" },
  ],
  industries: ["Farming", "Finance", "Energy", "Media", "Software"],
};

export const stack = [
  { group: "Smart AI", items: ["ChatGPT-style AI", "AI assistants", "Document search", "Automation"] },
  { group: "What users see", items: ["Websites", "Web apps", "Mobile-friendly design", "Dashboards"] },
  { group: "Behind the scenes", items: ["Secure databases", "Payments", "User accounts", "Connections to your tools"] },
  { group: "Hosting & care", items: ["Reliable hosting", "Automatic backups", "Monitoring", "Ongoing updates"] },
];

export const engagement = [
  {
    name: "Trial Version",
    for: "Test an AI idea quickly",
    points: ["A small working version using your information", "Honest report on cost and what's possible", "Clear next steps"],
    cta: "Start with a trial",
    featured: false,
  },
  {
    name: "Full Project",
    for: "New apps, websites & AI features",
    points: ["Agreed plan, timeline & price", "Progress shown every week", "Launch, guides & handover", "30 days of free support after launch"],
    cta: "Plan a project",
    featured: true,
  },
  {
    name: "Monthly Support",
    for: "Ongoing help & improvements",
    points: ["A set number of hours each month", "Your requests handled first", "Constant improvements"],
    cta: "Discuss monthly support",
    featured: false,
  },
];

// Add real quotes only — the section hides itself while this is empty.
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const faq = [
  { q: "Can you add AI to software we already have?", a: "Yes, that's most of what we do. We connect an AI assistant to your existing software so people can simply type what they need, without you having to rebuild anything." },
  { q: "Is our information safe?", a: "Yes. We only give the AI access to what it truly needs, can keep everything on private servers, and are happy to sign a confidentiality agreement before we even start talking." },
  { q: "Which AI do you use?", a: "Whichever suits your project best. We work with all the major AI providers (like the ones behind ChatGPT) and pick based on quality, speed, cost and privacy needs." },
  { q: "How much will the AI cost to run each month?", a: "We give you an estimate during the trial version and design the system to keep costs low and predictable, so there are no surprise bills." },
  { q: "Do I need to be technical to work with you?", a: "Not at all. We explain everything in plain language, handle all the technical work, and show you progress you can click and try every week." },
  { q: "How do we work across time zones?", a: "We're based in Dubai, UAE (GMT+4) and overlap working hours with Europe, the Middle East, Asia and the US East Coast, with written updates every day and a video call each week." },
  { q: "Who owns what you build?", a: "You do. Everything we create belongs to you once it's paid for, and you have full access from day one." },
];
