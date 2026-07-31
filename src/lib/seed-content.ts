import type {
  BlogPost,
  Certification,
  Experience,
  Gallery,
  Project,
  ResearchItem,
  ResumeFile,
  SiteSettings,
  Skill,
  SocialLink,
} from "./types";

export const siteSettingsSeed: SiteSettings = {
  id: "primary",
  heroEyebrow: "Mechanical engineering · robotics · digital industry",
  heroTitle: "Designing machines that think, move, and make.",
  heroSummary:
    "Mechanical engineer focused on CAD, simulation, robotics, and autonomous systems. Siemens technical lead and student mentor with 10+ years of hands-on design experience.",
  availability:
    "Open to engineering collaborations, research, and ambitious build teams.",
  contactEmail: "jmwhite407@gmail.com",
  portraitUrl: "/portrait/jacob-white-headshot.jpg",
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
    coverImageUrl: "/portfolio/frc-robot-cad-clean.png",
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
    coverImageUrl: "/portfolio/competition-robot-cad-clean.png",
    sourceUrl: "https://210robotics.com/team",
    externalUrl: "https://210robotics.com/",
    featured: true,
    sortOrder: 20,
  },
  {
    id: "project-siemens-cia",
    slug: "siemens-competitive-intelligence-app",
    title: "Competitive Intelligence App (CIA)",
    summary:
      "An internal competitive-intelligence application that organizes market signals and makes technical business research easier to navigate and act on.",
    body: `## Applied software inside an engineering organization

During his Siemens Digital Industries Software internship, Jacob contributed to a competitive-intelligence application built around stakeholder discovery, data organization, and clear analytical workflows.

The work combines Mendix development, software analysis, interface design, and technical business research. Specific internal data, users, and implementation details are intentionally omitted.`,
    category: "Industrial software",
    year: "2025–Present",
    role: "Technical engineering intern lead",
    technologies: ["Mendix", "Data analysis", "Workflow design", "Competitive intelligence"],
    coverImageUrl: null,
    sourceUrl: null,
    externalUrl: null,
    featured: true,
    sortOrder: 30,
  },
  {
    id: "project-workforce-management",
    slug: "siemens-workforce-management",
    title: "Workforce Management",
    summary:
      "A Mendix application designed to improve visibility into workforce workflows and reduce friction in internal operational planning.",
    body: `## Turning a process into a usable product

Jacob developed a workforce-management application during his Siemens internship, translating internal process needs into structured views, interactions, and operational workflows.

The project required stakeholder communication, low-code software development, iterative testing, and careful handling of internal information. Portfolio content stays intentionally high level while still showing the product-development approach.`,
    category: "Industrial software",
    year: "2025–Present",
    role: "Application developer · technical lead",
    technologies: ["Mendix", "Workflow design", "Requirements", "Software testing"],
    coverImageUrl: null,
    sourceUrl: null,
    externalUrl: null,
    featured: true,
    sortOrder: 35,
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
    coverImageUrl: "/portfolio/mechanism-cad-clean.png",
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
    coverImageUrl: "/portfolio/skillsusa-cad-clean.png",
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
    coverImageUrl: "/portfolio/frc-robot-cad-clean.png",
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
    id: "project-iterative-propeller",
    slug: "iterative-propeller-design",
    title: "Iterative Propeller Design",
    summary:
      "A simulation-led propeller project exploring how blade geometry, operating conditions, and repeated design loops influence performance.",
    body: `## Geometry, evidence, revision

This ongoing project uses an iterative engineering loop: define the operating objective, build a parametric blade concept, evaluate performance, compare tradeoffs, and revise the geometry.

The portfolio entry is structured to document design intent, CAD revisions, simulation assumptions, mesh and boundary-condition choices, performance plots, and lessons from each iteration. Results will be added only when they are ready to be supported by model evidence.`,
    category: "Simulation & CAD",
    year: "In development",
    role: "Designer · simulation engineer",
    technologies: ["CAD", "CFD", "STAR-CCM+", "FLOEFD", "Design iteration"],
    coverImageUrl: "/portfolio/mechanism-cad-clean.png",
    sourceUrl: null,
    externalUrl: null,
    featured: true,
    sortOrder: 85,
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
    featured: true,
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
    body: `## Research direction

The central question is how an autonomous machine stays useful when the environment is imperfect: lighting changes, geometry varies, sensors drift, and the mechanical system behaves differently from the model.

Current interests include vision-guided alignment, failure detection, fleet behavior, robust control, and the interaction between mechanical design and autonomy performance. RoboRowdy and the autonomous RC car provide practical platforms for exploring these questions.

## Evidence to build

Future work should compare localization approaches, quantify repeatability, document failure modes, and connect perception confidence to safe task-level decisions.`,
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
    body: `## Research direction

Digital twins are most valuable when they change a decision. This area connects Simcenter-style system modeling, mechanism simulation, CFD, virtual commissioning, and technical visualization to real engineering questions.

The sucker rod pump model is one example: surface motion, rod-string behavior, and downhole response must be understood as a coupled system. Future studies can compare model fidelity, sensitivity, and validation strategies.`,
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
    body: `## Research direction

RoboRowdy anchors this interest in additive-manufacturing automation: increasing machine utilization without creating a fragile, unserviceable cell.

Future work can expand into process monitoring, industrial robotics, production analytics, maintainability, sustainable production, and human-in-the-loop systems. The goal is automation that improves the complete workflow—not just a single robot cycle.`,
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
    body: `## Research direction

The focus is engineering resilience rather than unsupported cybersecurity claims: trustworthy sensing, safe failure modes, clear access boundaries, and systems that remain understandable under abnormal conditions.

Connected industrial machines create interfaces between mechanical safety, software authorization, network behavior, and operational recovery. Research here would examine how those interfaces can fail safely and communicate state clearly.`,
    status: "Exploratory",
    topics: ["OT security", "Resilience", "Industrial systems"],
    sortOrder: 40,
  },
  {
    id: "research-fluid-design",
    slug: "simulation-led-fluid-machinery",
    title: "Simulation-led fluid machinery",
    summary:
      "Using iterative CAD and CFD to understand how geometry changes affect propellers, pumps, cooling paths, and other fluid-driven systems.",
    body: `## Research direction

The iterative propeller project is a foundation for studying geometry-performance relationships. Blade angle, chord distribution, tip behavior, operating point, and manufacturing constraints all influence the result.

The work will emphasize transparent assumptions, mesh independence, sensitivity studies, and visualization that makes the result easier to challenge. The same approach can extend to pump behavior, thermal-fluid systems, and design optimization.`,
    status: "In development",
    topics: ["CFD", "Propellers", "Pumps", "Design optimization"],
    sortOrder: 50,
  },
  {
    id: "research-ai-vision",
    slug: "ai-vision-for-physical-systems",
    title: "AI vision for physical systems",
    summary:
      "Computer vision that is evaluated as part of a complete robot—camera placement, lighting, latency, uncertainty, and mechanical consequences included.",
    body: `## Research direction

Vision models are only one part of a perception system. Camera placement, optics, lighting, compute latency, calibration, and the robot's mechanical repeatability determine whether a detection is useful.

Potential studies include object detection for manufacturing tasks, AprilTag alignment, failure classification, dataset quality, and confidence-aware behaviors that keep a robot safe when perception is uncertain.`,
    status: "Active interest",
    topics: ["Computer vision", "AI", "Robotics", "Perception"],
    sortOrder: 60,
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
    coverImageUrl: "/portfolio/frc-robot-cad-clean.png",
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
    coverImageUrl: "/portfolio/mechanism-cad-clean.png",
    published: true,
    publishedAt: "2026-06-18T12:00:00.000Z",
    sortOrder: 20,
  },
  {
    id: "post-project-notebook",
    slug: "what-i-am-building-next",
    title: "What I am building next",
    excerpt:
      "A working notebook for the iterative propeller, autonomous RC car, sucker rod pump model, and the next RoboRowdy validation cycle.",
    body: `A portfolio should show finished work, but engineering is mostly the space between versions.

Right now, my project queue spans four different kinds of evidence. The iterative propeller needs a disciplined CAD-and-CFD loop. The autonomous RC car needs repeatable perception and control tests. The sucker rod pump model needs assumptions and parameter studies that are easy to inspect. RoboRowdy needs stronger validation around alignment, failure handling, and the complete printer-service workflow.

I will use this blog to publish those decisions as they happen: what changed, what failed, what the data says, and what the next test needs to answer. The goal is not a perfect build log. It is a useful record of engineering judgment.`,
    tags: ["Project notebook", "CFD", "Autonomy", "Simulation"],
    coverImageUrl: "/portrait/jacob-white-headshot.jpg",
    published: true,
    publishedAt: "2026-07-30T12:00:00.000Z",
    sortOrder: 5,
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
        url: "/portfolio/frc-robot-cad-clean.png",
        alt: "Detailed CAD assembly of an FRC competition robot",
        caption: "Full competition robot assembly",
        width: 1105,
        height: 1430,
        sortOrder: 10,
      },
      {
        id: "image-mechanism",
        galleryId: "gallery-cad",
        url: "/portfolio/mechanism-cad-clean.png",
        alt: "CAD rendering of a linked robotic mechanism",
        caption: "Mechanism and linkage study",
        width: 1105,
        height: 1430,
        sortOrder: 20,
      },
      {
        id: "image-skillsusa",
        galleryId: "gallery-cad",
        url: "/portfolio/skillsusa-cad-clean.png",
        alt: "CAD assembly of a SkillsUSA mobile robotics platform",
        caption: "SkillsUSA mobile robotics platform",
        width: 1105,
        height: 1430,
        sortOrder: 30,
      },
      {
        id: "image-red-robot",
        galleryId: "gallery-cad",
        url: "/portfolio/competition-robot-cad-clean.png",
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
  {
    id: "gallery-people",
    slug: "people-and-programs",
    name: "People & programs",
    description:
      "Portraits, leadership moments, events, team milestones, and the people behind the engineering work.",
    sortOrder: 30,
    images: [
      {
        id: "image-jacob-headshot",
        galleryId: "gallery-people",
        url: "/portrait/jacob-white-headshot.jpg",
        alt: "Professional headshot of Jacob White",
        caption: "Jacob White · Mechanical engineering and robotics",
        width: 1342,
        height: 2048,
        sortOrder: 10,
      },
    ],
  },
];

export const resumeFilesSeed: ResumeFile[] = [
  {
    id: "resume-fall-2026",
    filename: "JacobWhite_Resume_2026-Fall.pdf",
    url: "https://1dpl4cyqk69v98zj.public.blob.vercel-storage.com/portfolio/resume/JacobWhite_Resume_2026-Fall.pdf",
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

export const skillsSeed: Skill[] = [
  {
    id: "skill-cad",
    name: "Mechanical CAD",
    category: "CAD & product design",
    proficiency: 95,
    description:
      "Assembly architecture, parametric part design, mechanism layout, drawings, design reviews, packaging, and design for manufacturing.",
    learnedFrom:
      "10+ years of personal CAD work, four FRC seasons, SkillsUSA, 210 Robotics, and Siemens digital-engineering projects.",
    evidence: ["FRC 624 robot systems", "4-axis robotic arm", "RoboRowdy", "Competition CAD portfolio"],
    sortOrder: 10,
  },
  {
    id: "skill-nx",
    name: "Siemens NX / Designcenter X",
    category: "CAD & product design",
    proficiency: 85,
    description:
      "Mechanical modeling and collaborative product-development workflows inside the Siemens Xcelerator ecosystem.",
    learnedFrom:
      "Siemens internship work, Siemens Immersive Design Challenge mentoring, and Designcenter NX Associate preparation.",
    evidence: ["Designcenter NX Associate", "RoboRowdy", "Siemens DISW"],
    sortOrder: 20,
  },
  {
    id: "skill-solidworks",
    name: "SolidWorks",
    category: "CAD & product design",
    proficiency: 90,
    description: "Parametric modeling, assemblies, drawings, and mechanical design communication.",
    learnedFrom: "Long-term CAD practice, robotics design, and CSWA certification work.",
    evidence: ["Certified SolidWorks Associate", "Robotic arm CAD", "Competition robotics"],
    sortOrder: 30,
  },
  {
    id: "skill-autodesk-cad",
    name: "Inventor & Fusion 360",
    category: "CAD & product design",
    proficiency: 90,
    description: "Mechanical CAD, assembly development, CAM-aware design, rendering, and rapid project iteration.",
    learnedFrom: "Autodesk certification work, independent projects, and Miller Career & Technology Center training.",
    evidence: ["Autodesk certifications", "CAD portfolio", "CAM workflows"],
    sortOrder: 40,
  },
  {
    id: "skill-multi-cad",
    name: "Creo, Onshape, CATIA, AutoCAD & Revit",
    category: "CAD & product design",
    proficiency: 76,
    description: "Cross-platform modeling fluency and the ability to transfer design intent between CAD environments.",
    learnedFrom: "Independent CAD practice, robotics programs, coursework, and certification preparation.",
    evidence: ["Onshape credential", "FRC collaboration", "Multi-CAD project work"],
    sortOrder: 50,
  },
  {
    id: "skill-cae",
    name: "CAE / simulation",
    category: "Simulation & digital engineering",
    proficiency: 82,
    description: "Simulation-driven design using structural, thermal, motion, CFD, and system-level models to support engineering decisions.",
    learnedFrom: "Siemens technical work, independent studies, and project-based simulation using multiple CAE platforms.",
    evidence: ["Sucker rod pump model", "Iterative propeller", "Digital-twin research"],
    sortOrder: 60,
  },
  {
    id: "skill-simcenter",
    name: "Simcenter 3D & Amesim",
    category: "Simulation & digital engineering",
    proficiency: 80,
    description: "Mechanical and system simulation for connected physical behavior, design analysis, and digital-twin workflows.",
    learnedFrom: "Siemens DISW experience and system-modeling project work.",
    evidence: ["Sucker rod pump simulation", "Siemens engineering workflows"],
    sortOrder: 70,
  },
  {
    id: "skill-cfd",
    name: "STAR-CCM+, M-Star & FLOEFD",
    category: "Simulation & digital engineering",
    proficiency: 74,
    description: "CFD setup, geometry preparation, boundary-condition reasoning, visualization, and iterative fluid-design studies.",
    learnedFrom: "Independent simulation development and current propeller and manufacturing-flow research interests.",
    evidence: ["Iterative propeller project", "CFD research map"],
    sortOrder: 80,
  },
  {
    id: "skill-altair",
    name: "Altair Inspire & HyperWorks",
    category: "Simulation & digital engineering",
    proficiency: 74,
    description: "Simulation-supported design exploration, structural thinking, and geometry optimization workflows.",
    learnedFrom: "Siemens internship analysis work and independent CAE practice.",
    evidence: ["Siemens technical projects", "Design analysis"],
    sortOrder: 90,
  },
  {
    id: "skill-robotics",
    name: "Robotics system integration",
    category: "Robotics & automation",
    proficiency: 90,
    description: "Mechanical, electrical, controls, perception, and manufacturing integration for complete competition and autonomous robots.",
    learnedFrom: "FRC Team 624, SkillsUSA, 210 Robotics, RoboRowdy, and robotics mentoring.",
    evidence: ["4x FRC world qualifier", "RoboRowdy", "SkillsUSA district champion"],
    sortOrder: 100,
  },
  {
    id: "skill-autonomy",
    name: "Autonomy & AI vision",
    category: "Robotics & automation",
    proficiency: 78,
    description: "Vision-guided alignment, object detection concepts, path planning, sensing, and confidence-aware robot behaviors.",
    learnedFrom: "RoboRowdy, autonomous RC car development, and active research into physical AI systems.",
    evidence: ["RoboRowdy", "Autonomous RC car", "AI-vision research"],
    sortOrder: 110,
  },
  {
    id: "skill-controls",
    name: "Controls, pneumatics & hydraulics",
    category: "Robotics & automation",
    proficiency: 84,
    description: "PID motion, IMU calibration, actuator integration, relay logic, fluid-power systems, and troubleshooting.",
    learnedFrom: "SkillsUSA robotics, FRC, Miller CTC mechatronics, and SACA certification work.",
    evidence: ["SkillsUSA VEX Mamba", "SACA Pneumatics Silver", "FRC mechanisms"],
    sortOrder: 120,
  },
  {
    id: "skill-manufacturing",
    name: "CNC & digital manufacturing",
    category: "Manufacturing",
    proficiency: 86,
    description: "CNC mill/router workflows, CAM-aware design, laser cutting, plasma cutting, additive manufacturing, and shop integration.",
    learnedFrom: "FRC build leadership, Miller CTC, SkillsUSA, and independent fabrication projects.",
    evidence: ["FRC CNC manufacturing", "HAAS/FANUC training", "Additive manufacturing"],
    sortOrder: 130,
  },
  {
    id: "skill-dfm",
    name: "DFM, metrology & technical drawings",
    category: "Manufacturing",
    proficiency: 84,
    description: "Designing parts for practical production, inspection, assembly, service, and clear shop-floor communication.",
    learnedFrom: "Hands-on fabrication, precision measurement, robotics build cycles, and industrial training.",
    evidence: ["Calipers and micrometers", "Robot fabrication", "Drawing interpretation"],
    sortOrder: 140,
  },
  {
    id: "skill-cpp",
    name: "C++",
    category: "Software",
    proficiency: 82,
    description: "Robot control, autonomous routines, sensor integration, and competition-focused embedded development.",
    learnedFrom: "SkillsUSA Mobile Robotics and independent software projects.",
    evidence: ["SkillsUSA VEX Mamba", "PID and IMU control", "Stock-analysis experiments"],
    sortOrder: 150,
  },
  {
    id: "skill-python",
    name: "Python",
    category: "Software",
    proficiency: 80,
    description: "Data analysis, automation, simulation support, APIs, Flask applications, and engineering visualization.",
    learnedFrom: "TSA software development, Crypto Comparer, and engineering-analysis projects.",
    evidence: ["Crypto Comparer", "Simulation visualization", "API integration"],
    sortOrder: 160,
  },
  {
    id: "skill-web",
    name: "JavaScript & TypeScript",
    category: "Software",
    proficiency: 78,
    description: "Interactive web interfaces, typed application development, data presentation, and modern frontend workflows.",
    learnedFrom: "Personal website projects, Siemens application work, and portfolio development.",
    evidence: ["Personal website", "Portfolio CMS", "Internal application workflows"],
    sortOrder: 170,
  },
  {
    id: "skill-java-csharp",
    name: "Java, C# & LabVIEW",
    category: "Software",
    proficiency: 68,
    description: "Command-based robot software, object-oriented application development, and instrumentation-oriented programming.",
    learnedFrom: "FRC robot code, coursework, and engineering software exploration.",
    evidence: ["FRC/WPILib", "2017 Nautilus code", "LabVIEW experience"],
    sortOrder: 180,
  },
  {
    id: "skill-mendix",
    name: "Mendix",
    category: "Software",
    proficiency: 86,
    description: "Low-code product development, domain models, workflows, interface design, deployment, and iterative stakeholder feedback.",
    learnedFrom: "Siemens Digital Industries Software internship and Mendix developer certifications.",
    evidence: ["Workforce Management", "Competitive Intelligence App", "Rapid & Intermediate Developer"],
    sortOrder: 190,
  },
  {
    id: "skill-leadership",
    name: "Technical leadership",
    category: "Leadership & communication",
    proficiency: 92,
    description: "Project direction, mentoring, technical reviews, multidisciplinary coordination, and turning ambiguous goals into owned work.",
    learnedFrom: "Siemens intern leadership, founding 210 Robotics, RoboRowdy mentoring, FRC leadership, and student mentoring.",
    evidence: ["Founder & president", "Technical intern lead", "Global IDC winner mentor"],
    sortOrder: 200,
  },
  {
    id: "skill-media",
    name: "Technical media & visual communication",
    category: "Leadership & communication",
    proficiency: 86,
    description: "Photography, video, design, presentations, and technical storytelling for teams, events, and engineering programs.",
    learnedFrom: "Adobe Creative Suite work, UT San Antonio marketing, and presidency of FRC 624 visual media.",
    evidence: ["Premiere Pro", "After Effects", "Photoshop", "Lightroom", "Illustrator"],
    sortOrder: 210,
  },
];

export const certificationsSeed: Certification[] = [
  {
    id: "cert-nx",
    name: "Designcenter NX Associate",
    issuer: "Siemens",
    issued: "Completed",
    description:
      "Validates foundational capability with Siemens NX / Designcenter workflows for mechanical product design.",
    skills: ["Siemens NX", "Mechanical CAD", "Digital engineering"],
    credentialUrl: null,
    sortOrder: 10,
  },
  {
    id: "cert-cswa",
    name: "Certified SOLIDWORKS Associate (CSWA)",
    issuer: "Dassault Systèmes",
    issued: "Completed",
    description:
      "Demonstrates core competency in parametric part modeling, assemblies, mass properties, and engineering drawings.",
    skills: ["SolidWorks", "Mechanical CAD", "Assemblies"],
    credentialUrl: null,
    sortOrder: 20,
  },
  {
    id: "cert-autodesk",
    name: "Autodesk Inventor & Fusion 360",
    issuer: "Autodesk",
    issued: "Completed",
    description:
      "Recognizes practical CAD capability across mechanical modeling, assemblies, and design-to-manufacturing workflows.",
    skills: ["Inventor", "Fusion 360", "CAD/CAM"],
    credentialUrl: null,
    sortOrder: 30,
  },
  {
    id: "cert-onshape",
    name: "Onshape Certification",
    issuer: "Onshape / PTC",
    issued: "Completed",
    description:
      "Validates cloud-native parametric CAD, collaborative modeling, assemblies, and version-aware design work.",
    skills: ["Onshape", "Collaborative CAD", "Robotics design"],
    credentialUrl: null,
    sortOrder: 40,
  },
  {
    id: "cert-saca-i40",
    name: "SACA Industry 4.0 - Gold",
    issuer: "Smart Automation Certification Alliance",
    issued: "Completed",
    description:
      "Recognizes integrated industrial-technology knowledge spanning automation, controls, manufacturing, and connected systems.",
    skills: ["Industry 4.0", "Automation", "Industrial systems"],
    credentialUrl: null,
    sortOrder: 50,
  },
  {
    id: "cert-saca-pneumatics",
    name: "SACA Pneumatics - Silver",
    issuer: "Smart Automation Certification Alliance",
    issued: "Completed",
    description:
      "Covers pneumatic components, circuit behavior, system operation, safety, and troubleshooting fundamentals.",
    skills: ["Pneumatics", "Fluid power", "Troubleshooting"],
    credentialUrl: null,
    sortOrder: 60,
  },
  {
    id: "cert-mendix-rapid",
    name: "Mendix Rapid Developer",
    issuer: "Mendix",
    issued: "Completed",
    description:
      "Validates foundational low-code application development, domain models, logic, pages, and deployment concepts.",
    skills: ["Mendix", "Low-code", "Application development"],
    credentialUrl: null,
    sortOrder: 70,
  },
  {
    id: "cert-mendix-intermediate",
    name: "Mendix Intermediate Developer",
    issuer: "Mendix",
    issued: "Completed",
    description:
      "Recognizes deeper application architecture, reusable logic, data modeling, integrations, and production-oriented Mendix development.",
    skills: ["Mendix", "Workflow design", "Software architecture"],
    credentialUrl: null,
    sortOrder: 80,
  },
];
