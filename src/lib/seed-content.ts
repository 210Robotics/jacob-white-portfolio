import type {
  BlogPost,
  Experience,
  Gallery,
  Project,
  ResearchItem,
  ResumeFile,
  SiteSettings,
  SocialLink,
} from "./types";

export const siteSettingsSeed: SiteSettings = {
  id: "primary",
  heroEyebrow: "Mechanical engineering · robotics · digital industry",
  heroTitle: "Building intelligent machines from first sketch to field test.",
  heroSummary:
    "Jacob White is a UT San Antonio Honors mechanical engineering student, Siemens technical engineering intern lead, and founder-president of 210 Robotics. He brings 10+ years of CAD experience to robotics, manufacturing, simulation, software, and autonomous systems.",
  availability:
    "Open to engineering collaborations, research, and ambitious build teams.",
  contactEmail: "jmwhite407@gmail.com",
};

export const projectsSeed: Project[] = [
  {
    id: "project-roborowdy",
    slug: "roborowdy",
    title: "RoboRowdy",
    summary:
      "An autonomous print-farm assistant that removes completed parts, cleans build plates and nozzles, detects failures, and restarts jobs to reduce printer downtime.",
    body: `## The challenge

Industrial print farms still depend on people to remove parts, reset machines, and catch failed jobs. That manual handoff leaves printers idle and makes scaling difficult.

## The system

RoboRowdy was developed by Team 210 Robotics at UT San Antonio for the Siemens Immersive Design Challenge. The mobile robot is designed to receive a completed-print signal, navigate to the correct printer, align using visual references, service the build area, and begin the next job.

## Outcome

The multidisciplinary first-year team advanced from a field of more than 1,900 participants and won the 2026 global Siemens Immersive Design Challenge. Jacob served as student ambassador and mentor, bringing the opportunity to the team and supporting technical strategy and Siemens-tool adoption.`,
    category: "Autonomous systems",
    year: "2025–2026",
    role: "Student ambassador · technical mentor",
    technologies: [
      "Siemens NX",
      "Immersive engineering",
      "AI vision",
      "AprilTags",
      "Mobile robotics",
      "Additive manufacturing",
    ],
    coverImageUrl: "/portfolio/frc-robot-cad.png",
    sourceUrl:
      "https://news.utsa.edu/2026/07/ut-san-antonio-robotics-team-wins-global-engineering-competition/",
    externalUrl: "https://210robotics.com/",
    featured: true,
    sortOrder: 10,
  },
  {
    id: "project-210-robotics",
    slug: "210-robotics",
    title: "210 Robotics",
    summary:
      "A student-led UT San Antonio engineering organization built to give ambitious students a place to design robots, develop autonomy, fabricate hardware, and lead real programs.",
    body: `## Built by students

Jacob founded and serves as president of 210 Robotics, setting organization strategy, developing partnerships, and helping teams move from idea to validated system.

The organization now spans competitive robotics, the Siemens Immersive Design Challenge, and RoboRowdy autonomous-systems development. Its working culture centers on design reviews, failure analysis, manufacturing, software releases, and shared technical ownership.`,
    category: "Leadership",
    year: "2025–Present",
    role: "Founder · president",
    technologies: [
      "Engineering leadership",
      "Program strategy",
      "Partnerships",
      "VEX U",
      "Manufacturing",
    ],
    coverImageUrl: "/portfolio/competition-robot-cad.png",
    sourceUrl: "https://210robotics.com/team",
    externalUrl: "https://210robotics.com/",
    featured: true,
    sortOrder: 20,
  },
  {
    id: "project-siemens-apps",
    slug: "siemens-intelligence-workforce-apps",
    title: "Siemens Intelligence & Workforce Apps",
    summary:
      "Internal Mendix applications and analytical workflows designed to make operational information easier to use and act on.",
    body: `## Applied software inside an engineering organization

During his Siemens Digital Industries Software internship, Jacob developed and deployed Mendix applications supporting internal workflows, including workforce-management and competitive-intelligence use cases.

The work combined low-code application development, stakeholder discovery, software analysis, and exposure to industrial digitalization tools. Specific internal data and implementation details are intentionally omitted.`,
    category: "Industrial software",
    year: "2025–Present",
    role: "Technical intern",
    technologies: ["Mendix", "Data analysis", "Workflow design", "TypeScript"],
    coverImageUrl: null,
    sourceUrl: null,
    externalUrl: null,
    featured: true,
    sortOrder: 30,
  },
  {
    id: "project-four-axis-arm",
    slug: "four-axis-robotic-arm",
    title: "4-Axis Robotic Arm",
    summary:
      "A CAD-centered robotic-arm project exploring joint architecture, reach, packaging, actuation, and manufacturable mechanical design.",
    body: `## Mechanical architecture

This ongoing CAD project develops a four-axis robotic arm from mechanism layout through assembly-level integration. The design work focuses on useful reach, joint clearances, load paths, serviceable construction, and an end-effector interface.

The project is part of Jacob's broader robotics portfolio and will continue to be updated with design revisions, calculations, fabrication notes, and test results.`,
    category: "CAD & robotics",
    year: "In development",
    role: "Mechanical designer",
    technologies: ["Onshape", "Fusion 360", "SolidWorks", "Mechanism design"],
    coverImageUrl: "/portfolio/mechanism-cad.png",
    sourceUrl: null,
    externalUrl: null,
    featured: true,
    sortOrder: 40,
  },
  {
    id: "project-autonomous-rc-car",
    slug: "autonomous-rc-car",
    title: "Autonomous RC Car",
    summary:
      "A compact autonomy platform for integrating vehicle mechanics, sensing, embedded control, computer vision, and path-planning experiments.",
    body: `## A small platform for complete autonomy

The autonomous RC car is an integration project spanning chassis behavior, steering and drive control, sensor placement, perception, and navigation software.

Its purpose is to make autonomy development tangible: every software decision has a physical consequence in traction, latency, field of view, and control stability. Build notes and validation results can be added through the portfolio dashboard as the system develops.`,
    category: "Autonomous systems",
    year: "In development",
    role: "Designer · developer",
    technologies: [
      "Computer vision",
      "Embedded systems",
      "Path planning",
      "Control systems",
    ],
    coverImageUrl: null,
    sourceUrl: null,
    externalUrl: null,
    featured: true,
    sortOrder: 50,
  },
  {
    id: "project-skillsusa",
    slug: "skillsusa-vex-mamba",
    title: "SkillsUSA VEX Mamba",
    summary:
      "Competition robot design and C++ control software with calibrated IMU sensing, PID motion, autonomous selection, pneumatic mechanisms, and operator controls.",
    body: `## Robot and software as one system

Jacob built and programmed the mobile-robotics competition platform for SkillsUSA. The public codebase uses PROS and EZ-Template to coordinate a multi-motor drivetrain, inertial sensing, PID motion, pneumatic wings, a catapult, field calibration, and programming-skills routines.

The project reflects an iterative workflow: build the mechanism, tune the controls against the real field, and revise both until the behavior is repeatable.`,
    category: "Competition robotics",
    year: "2023–2025",
    role: "Builder · programmer",
    technologies: ["C++", "PROS", "PID control", "IMU", "Pneumatics", "VEX"],
    coverImageUrl: "/portfolio/skillsusa-cad.png",
    sourceUrl: "https://github.com/JacobW0410/SkillsUSA-VEX-Mamba",
    externalUrl: null,
    featured: false,
    sortOrder: 60,
  },
  {
    id: "project-frc",
    slug: "frc-624-nautilus",
    title: "FRC 624 Robot Systems",
    summary:
      "CAD, manufacturing, scouting, media leadership, and Java/WPILib subsystem code for CRyptonite Robotics competition machines.",
    body: `## Four seasons of high-pressure engineering

With FRC Team 624, Jacob served in visual-media leadership, mechanical design, and build roles. His work included full-robot CAD, CNC manufacturing, strategic scouting, and competition documentation.

The public Nautilus codebase organizes drivetrain, shooter, intake, indexer, LED, and pneumatic behavior with WPILib's command-based architecture. Jacob's time with the team included four World Championship qualifications and a 2024 division-finalist finish.`,
    category: "Competition robotics",
    year: "2021–2025",
    role: "Design lead · build lead · visual media president",
    technologies: ["Java", "WPILib", "Onshape", "CNC", "Pneumatics", "Scouting"],
    coverImageUrl: "/portfolio/frc-robot-cad.png",
    sourceUrl: "https://github.com/JacobW0410/2017-Nautilus",
    externalUrl: null,
    featured: false,
    sortOrder: 70,
  },
  {
    id: "project-packbot",
    slug: "packbot-cpg-robotics",
    title: "PackBot / CPG Robotics Study",
    summary:
      "A robotics study connecting mechanical locomotion with central-pattern-generator control concepts for adaptable movement.",
    body: `## Locomotion as a coupled system

This study explores how repeated motion patterns can coordinate a mobile robot's mechanical degrees of freedom. The project connects PackBot-style mobility, mechanical configuration, and central pattern generator concepts to examine robust locomotion across changing conditions.

The portfolio entry is structured for Jacob to add models, simulations, controls experiments, and test evidence as the work develops.`,
    category: "Robotics research",
    year: "Study",
    role: "Researcher · designer",
    technologies: ["CPG control", "Robotics", "Simulation", "Mechanism design"],
    coverImageUrl: null,
    sourceUrl: null,
    externalUrl: null,
    featured: false,
    sortOrder: 80,
  },
  {
    id: "project-sucker-rod",
    slug: "sucker-rod-pump-simulation",
    title: "Sucker Rod Pump Simulation",
    summary:
      "A system-modeling and visualization project for understanding the coupled mechanical behavior of a rod-pumped production system.",
    body: `## From mechanism to model

The project frames a sucker rod pump as a connected physical system: surface motion, rod-string response, downhole pump behavior, and operating conditions all influence one another.

Simulation and visualization make those relationships easier to inspect, communicate, and refine. The entry is ready for Jacob to publish plots, model assumptions, parameter studies, and validation notes.`,
    category: "Simulation",
    year: "Study",
    role: "Modeler · developer",
    technologies: ["Simcenter Amesim", "System modeling", "Visualization", "Python"],
    coverImageUrl: null,
    sourceUrl: null,
    externalUrl: null,
    featured: false,
    sortOrder: 90,
  },
  {
    id: "project-crypto",
    slug: "crypto-comparer",
    title: "Crypto Comparer",
    summary:
      "A Flask application that compares historical cryptocurrency prices and visualizes trends using CoinGecko data.",
    body: `## Early full-stack experimentation

Built for a Technical Student Association software-development competition, Crypto Comparer combines a Python/Flask backend with market-history data and browser visualizations.

The project demonstrates Jacob's early interest in turning external data into an interactive decision-support interface.`,
    category: "Software",
    year: "2023–2024",
    role: "Developer",
    technologies: ["Python", "Flask", "CoinGecko API", "Chart.js", "HTML/CSS"],
    coverImageUrl: null,
    sourceUrl: "https://github.com/JacobW0410/Crypto-Comparer",
    externalUrl: "https://crypto-comparer.vercel.app",
    featured: false,
    sortOrder: 100,
  },
];

export const experiencesSeed: Experience[] = [
  {
    id: "experience-siemens",
    organization: "Siemens Digital Industries Software",
    title: "Technical Engineering Intern Lead",
    period: "June 2025–Present",
    location: "Texas",
    summary:
      "Developing internal applications and technical analyses at the intersection of industrial software, simulation, and digital engineering.",
    highlights: [
      "Leads technical engineering projects and software-development initiatives across intern teams.",
      "Mentors interns through planning, technical execution, design reviews, and implementation.",
      "Developed and deployed Mendix applications for internal business workflows.",
      "Created a workforce-management application and supported competitive-intelligence use cases.",
      "Applied NX, Altair Inspire, and Simcenter Amesim in design and system-modeling work.",
      "Represents Siemens as a campus ambassador and shares industrial digitalization tools with students.",
    ],
    sortOrder: 10,
  },
  {
    id: "experience-210",
    organization: "210 Robotics · UT San Antonio",
    title: "Founder & President",
    period: "2025–Present",
    location: "San Antonio, Texas",
    summary:
      "Leading a student engineering organization across competition robotics, autonomous systems, partnerships, and technical team development.",
    highlights: [
      "Sets organization strategy, partner development, and program direction.",
      "Helped turn RoboRowdy from a class-scale concept into a global-winning engineering program.",
      "Builds repeatable systems for design reviews, fabrication, software, and student leadership.",
    ],
    sortOrder: 20,
  },
  {
    id: "experience-idc",
    organization: "Siemens Immersive Design Challenge",
    title: "Student Ambassador & Technical Mentor",
    period: "October 2025–July 2026",
    location: "UT San Antonio",
    summary:
      "Brought the challenge to the UT San Antonio team, taught Siemens tools, and supported technical strategy for the global-winning RoboRowdy program.",
    highlights: [
      "Supported a multidisciplinary first-year team through three global competition rounds.",
      "Helped translate industrial software capabilities into an autonomous print-farm workflow.",
      "Team became the first U.S. university finalist and the 2026 global champion.",
    ],
    sortOrder: 30,
  },
  {
    id: "experience-utsa-marketing",
    organization: "The University of Texas at San Antonio",
    title: "Marketing Assistant",
    period: "August 2025–Present",
    location: "San Antonio, Texas",
    summary:
      "Creates and schedules campaign assets, coordinates campus promotion, and supports event visibility across university teams.",
    highlights: [
      "Designed flyers, posters, and promotional materials.",
      "Managed scheduled social content and cross-department campaign coordination.",
    ],
    sortOrder: 40,
  },
  {
    id: "experience-frc624",
    organization: "FIRST Robotics Team 624 · CRyptonite",
    title: "Design Lead · Build Lead · President of Visual Media",
    period: "August 2021–July 2025",
    location: "Katy, Texas",
    summary:
      "Combined robot design and manufacturing with scouting, team media, and competition storytelling across four FRC seasons.",
    highlights: [
      "Led CAD modeling, CNC manufacturing, and strategic scouting work.",
      "Contributed to four World Championship qualifications and a 2024 division-finalist finish.",
      "Captured and edited technical and competition media for the team.",
    ],
    sortOrder: 50,
  },
  {
    id: "experience-mentor",
    organization: "VEX & FIRST Robotics",
    title: "Robotics Mentor",
    period: "July 2025–Present",
    location: "Texas",
    summary:
      "Guides high-school teams through design, build, programming, integration, and competition preparation.",
    highlights: [
      "Mentors mechanical design, controls, fabrication, and system-integration work.",
      "Emphasizes test evidence, design communication, and student ownership.",
    ],
    sortOrder: 60,
  },
  {
    id: "experience-miller",
    organization: "Miller Career & Technology Center",
    title: "Mechatronics & Manufacturing Student",
    period: "August 2023–May 2025",
    location: "Katy, Texas",
    summary:
      "Intensive hands-on preparation in industrial mechanical, electrical, manufacturing, and control systems.",
    highlights: [
      "Worked with pneumatics, hydraulics, AC/DC controls, metrology, and mechanical fabrication.",
      "Used FANUC robotic arms, HAAS/FANUC CNC equipment, and Festo mechatronics systems.",
      "Practiced Lean, Kaizen, technical-drawing interpretation, and precision measurement.",
    ],
    sortOrder: 70,
  },
];

export const researchSeed: ResearchItem[] = [
  {
    id: "research-autonomy",
    slug: "adaptive-autonomous-systems",
    title: "Adaptive autonomous systems",
    summary:
      "How mobile robots can combine perception, controls, and task-level planning to operate reliably around real manufacturing equipment.",
    body:
      "Current interests include vision-guided alignment, failure detection, fleet behavior, robust control, and the interaction between mechanical design and autonomy performance.",
    status: "Active interest",
    topics: ["Autonomy", "AI vision", "Controls", "Mobile robotics"],
    sortOrder: 10,
  },
  {
    id: "research-digital-twins",
    slug: "digital-twins-industrial-simulation",
    title: "Digital twins & industrial simulation",
    summary:
      "Using connected system models to test operating decisions before they reach expensive physical equipment.",
    body:
      "This area includes Simcenter-style system modeling, mechanism simulation, CFD, virtual commissioning, and clear technical visualization for decision-making.",
    status: "Developing",
    topics: ["Digital twins", "CFD", "CAE", "System simulation"],
    sortOrder: 20,
  },
  {
    id: "research-manufacturing",
    slug: "intelligent-manufacturing",
    title: "Intelligent manufacturing",
    summary:
      "Automation that increases machine utilization while respecting maintainability, energy use, human workflows, and production constraints.",
    body:
      "RoboRowdy anchors this interest in additive-manufacturing automation. Future work can expand into process monitoring, industrial robotics, production analytics, and human-in-the-loop systems.",
    status: "Active",
    topics: ["Manufacturing", "Industrial automation", "Sustainability"],
    sortOrder: 30,
  },
  {
    id: "research-industrial-security",
    slug: "resilient-industrial-systems",
    title: "Resilient industrial systems",
    summary:
      "Cybersecurity-adjacent design questions for connected machines, industrial networks, and autonomous production systems.",
    body:
      "The focus is engineering resilience rather than security claims: trustworthy sensing, safe failure modes, access boundaries, and systems that remain understandable under abnormal conditions.",
    status: "Exploratory",
    topics: ["OT security", "Resilience", "Industrial systems"],
    sortOrder: 40,
  },
];

export const blogPostsSeed: BlogPost[] = [
  {
    id: "post-roborowdy",
    slug: "from-student-team-to-global-winner",
    title: "From student team to global winner",
    excerpt:
      "RoboRowdy started with a stubborn manufacturing problem and grew into a nine-month lesson in multidisciplinary engineering.",
    body: `A printer that finishes a part is not necessarily a productive printer. Someone still has to remove the part, clean the build area, confirm the machine is ready, and start the next job.

That gap became the core of RoboRowdy: a mobile system designed to service multiple printers instead of automating only one station.

The engineering mattered, but so did the team structure around it. Mechanical, software, systems, business, and presentation work had to converge on one credible workflow. Advancing from more than 1,900 participants to three finalists—and ultimately winning the 2026 Siemens Immersive Design Challenge—showed what can happen when first-year students are trusted with a real problem and serious tools.

The next chapter is making the system more measurable: better perception, stronger validation, clearer reliability data, and deeper integration with the print workflow.`,
    tags: ["RoboRowdy", "Teamwork", "Autonomy"],
    coverImageUrl: "/portfolio/frc-robot-cad.png",
    published: true,
    publishedAt: "2026-07-12T12:00:00.000Z",
    sortOrder: 10,
  },
  {
    id: "post-cad",
    slug: "cad-is-a-conversation",
    title: "CAD is a conversation with the machine",
    excerpt:
      "A model becomes useful when it exposes decisions about manufacturing, assembly, controls, and service—not when it merely looks complete.",
    body: `The best CAD reviews are not beauty contests. They are conversations about where load travels, how a tool reaches a fastener, what happens when a belt stretches, and whether the electrical team can route a cable without disassembling half the robot.

Working across Onshape, Fusion 360, SolidWorks, PTC Creo, Siemens NX, and manufacturing equipment has reinforced one principle: the model is a shared engineering language.

That is especially true in robotics. Mechanical packaging changes the camera view. A different gear reduction changes control behavior. A tighter frame can make the robot impossible to repair between matches. Good design keeps those downstream effects visible early.`,
    tags: ["CAD", "Manufacturing", "Robotics"],
    coverImageUrl: "/portfolio/mechanism-cad.png",
    published: true,
    publishedAt: "2026-06-18T12:00:00.000Z",
    sortOrder: 20,
  },
];

export const galleriesSeed: Gallery[] = [
  {
    id: "gallery-cad",
    slug: "robot-cad",
    name: "Robot CAD",
    description:
      "Selected mechanism and full-assembly views from Jacob's competition robotics portfolio.",
    sortOrder: 10,
    images: [
      {
        id: "image-frc-front",
        galleryId: "gallery-cad",
        url: "/portfolio/frc-robot-cad.png",
        alt: "Detailed CAD assembly of an FRC competition robot",
        caption: "Full competition robot assembly",
        width: 1105,
        height: 1430,
        sortOrder: 10,
      },
      {
        id: "image-mechanism",
        galleryId: "gallery-cad",
        url: "/portfolio/mechanism-cad.png",
        alt: "CAD rendering of a linked robotic mechanism",
        caption: "Mechanism and linkage study",
        width: 1105,
        height: 1430,
        sortOrder: 20,
      },
      {
        id: "image-skillsusa",
        galleryId: "gallery-cad",
        url: "/portfolio/skillsusa-cad.png",
        alt: "CAD assembly of a SkillsUSA mobile robotics platform",
        caption: "SkillsUSA mobile robotics platform",
        width: 1105,
        height: 1430,
        sortOrder: 30,
      },
      {
        id: "image-red-robot",
        galleryId: "gallery-cad",
        url: "/portfolio/competition-robot-cad.png",
        alt: "Red and silver competition robot CAD assembly",
        caption: "Competition robot assembly study",
        width: 1105,
        height: 1430,
        sortOrder: 40,
      },
    ],
  },
  {
    id: "gallery-roborowdy",
    slug: "roborowdy-2026",
    name: "RoboRowdy · SIDC 2026",
    description:
      "A ready-to-update gallery for the build process, Realize LIVE, and the global final.",
    sortOrder: 20,
    images: [],
  },
];

export const resumeFilesSeed: ResumeFile[] = [
  {
    id: "resume-fall-2026",
    filename: "JacobWhite_Resume_2026-Fall.pdf",
    url: "/resume/JacobWhite_Resume_2026-Fall.pdf",
    version: "Fall 2026",
    uploadedAt: "2026-04-20T19:58:47.000Z",
    active: true,
    sortOrder: 10,
  },
];

export const socialLinksSeed: SocialLink[] = [
  {
    id: "social-linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/jacob-white-471760183",
    kind: "linkedin",
    sortOrder: 10,
  },
  {
    id: "social-github",
    label: "GitHub",
    url: "https://github.com/JacobW0410",
    kind: "github",
    sortOrder: 20,
  },
  {
    id: "social-210",
    label: "210 Robotics",
    url: "https://210robotics.com/",
    kind: "website",
    sortOrder: 30,
  },
  {
    id: "social-youtube",
    label: "CRyptonite Robotics YouTube",
    url: "https://www.youtube.com/@CRyptoniteRobotics",
    kind: "youtube",
    sortOrder: 40,
  },
  {
    id: "social-instagram",
    label: "FRC Team 624 Instagram",
    url: "https://www.instagram.com/frcteam624/",
    kind: "instagram",
    sortOrder: 50,
  },
];
