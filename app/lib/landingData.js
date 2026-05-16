// ============================================================
// DSHub · Landing Page Data Layer
// ------------------------------------------------------------
// Single source for everything the public landing page renders.
// Swap array bodies for fetch() when the backend is ready.
// Photos live in /public. A person with no `bio` renders a
// clean role-only card (no "Read more"). `linkedin` is optional
// — the icon only shows when a URL is present.
// ============================================================

export const SITE = {
  applyUrl: 'https://internship.dshub.com.ng/',
  linkedin: 'https://ng.linkedin.com/company/dshubng',
  twitter: 'https://x.com/dsoft_lab',
  email: 'mailto:hello@dshub.com.ng', // placeholder — swap when real address is provided
  siteUrl: 'https://internship.dshub.com.ng',
};

export const COHORTS = [
  { id: 'A', label: 'Cohort A', status: 'active', note: '2026 · Live' },
  { id: 'B', label: 'Cohort B', status: 'soon', note: 'Coming Soon' },
  { id: 'C', label: 'Cohort C', status: 'soon', note: 'Coming Soon' },
  { id: 'D', label: 'Cohort D', status: 'soon', note: 'Coming Soon' },
];

const INTERNS = [
  { name: 'Adaeze Okonkwo', track: 'Frontend Development', city: 'Lagos', project: 'Graduation Web Platform', initials: 'AO' },
  { name: 'Olumide Balogun', track: 'Backend Engineering', city: 'Abuja', project: 'Analytics API Layer', initials: 'OB' },
  { name: 'Ngozi Eze', track: 'Cybersecurity', city: 'Port Harcourt', project: 'OWASP Audit Toolkit', initials: 'NE' },
  { name: 'Tunde Adebayo', track: 'Product Management', city: 'Ibadan', project: 'Cohort Roadmap System', initials: 'TA' },
  { name: 'Chiamaka Nwosu', track: 'UI/UX Design', city: 'Lagos', project: 'DSHub Design System', initials: 'CN' },
  { name: 'Ibrahim Yusuf', track: 'Data Science', city: 'Kano', project: 'Engagement Predictor', initials: 'IY' },
  { name: 'Folake Adesina', track: 'Frontend Development', city: 'Lagos', project: 'Mentor Recognition Portal', initials: 'FA' },
  { name: 'Kelechi Anyanwu', track: 'Backend Engineering', city: 'Enugu', project: 'Auth & Roles Service', initials: 'KA' },
  { name: 'Aminat Lawal', track: 'Cybersecurity', city: 'Kaduna', project: 'Pentest Reporting Suite', initials: 'AL' },
  { name: 'Emeka Obi', track: 'Product Management', city: 'Lagos', project: 'Submission Performance Tracker', initials: 'EO' },
  { name: 'Halima Sani', track: 'UI/UX Design', city: 'Abuja', project: 'Intern Profile Card System', initials: 'HS' },
  { name: 'Chinedu Okeke', track: 'Data Science', city: 'Owerri', project: 'Track Performance Insights', initials: 'CO' },
];

// Real DSHub Cohort A 2026 team. Order: leadership first, then
// mentors, then coordinators. No bio = role-only card.
const MENTORS = [
  {
    name: 'Muhammed Shamsudeen, MBA',
    role: 'Leadership',
    track: 'Founder & CEO · DSHub',
    photo: '/muhammed-shamsudeen.jpg',
    initials: 'MS',
    linkedin: 'https://www.linkedin.com/in/muhammed-shamsudeen-mba-5339b1142/',
    summary: null,
    bio: null,
  },
  {
    name: 'Abdulsalam Umar',
    role: 'Mentor',
    track: 'Artificial Intelligence & Machine Learning',
    photo: '/abdulsalam-umar.jpg',
    initials: 'AU',
    linkedin: 'https://www.linkedin.com/in/abdulsalam-umar-17a601241/',
    summary: 'Software engineer and web developer working at the intersection of web applications, AI, and user-centered design.',
    bio: 'Abdulsalam Umar is a software engineer and web developer working at the intersection of web applications, artificial intelligence, and user-centered design. He builds scalable solutions that are not just functional, but impactful and intuitive. His work focuses on AI-driven systems, healthcare tools, and accessibility solutions that improve how people live and work. He will be mentoring the Artificial Intelligence and Machine Learning track for the DSHub Cohort A 2026 Internship.',
  },
  {
    name: 'Engr. Muhammad Mukhtar',
    role: 'Mentor',
    track: 'Cybersecurity & Ethical Hacking',
    photo: '/muhammad-mukhtar.jpg',
    initials: 'MM',
    linkedin: null,
    summary: 'Results-driven Network Engineer building secure, scalable, high-performance network infrastructures.',
    bio: 'Engr. Muhammad Mukhtar is a results-driven Network Engineer specializing in building secure, scalable, and high-performance network infrastructures. With expertise in Routing & Switching, MPLS, VXLAN/EVPN, Security, and Network Automation, he focuses on delivering efficient, future-ready solutions through SDN and NFV. He will be mentoring the Cybersecurity and Ethical Hacking track for the DSHub Cohort A 2026 Internship.',
  },
  {
    name: 'Abdulrahman Lawal Adewale',
    role: 'Mentor',
    track: 'Product Management & Strategy',
    photo: '/abdulrahman-adewale.jpg',
    initials: 'AA',
    linkedin: 'https://www.linkedin.com/in/lawalabdulrahman/',
    summary: 'Product Manager at DSHub, seasoned digital marketer, and dynamic public speaker who helped shape LifeGate by DSHub.',
    bio: 'Abdulrahman Lawal Adewale is a Product Manager at DSHub, a seasoned digital marketer, and a dynamic public speaker. He has played a key role in shaping LifeGate by DSHub. Mr. Adewale has also been a guiding force for previous interns, sharing his expertise to help them effectively complete their tasks. For the DSHub Internship Program 2026, he will serve as the Product Management and Strategy Mentor, bringing experience, insight, and passion to support interns in delivering their best work.',
  },
  {
    name: 'Nabihat Abdullahi',
    role: 'Mentor',
    track: 'Content Creation & Multimedia',
    photo: '/nabihat-abdullahi.jpg',
    initials: 'NA',
    linkedin: 'https://www.linkedin.com/in/abdullahi-nabihat-789608346/',
    summary: 'Accomplished digital creative, storyteller, and creative director with a body of creative and health-focused work.',
    bio: 'Nabihat Abdullahi is an accomplished digital creative who has served as a supervisor in the Content Creation and Digital Marketing track of the Otondo by DSHub Internship Program. She is a gifted storyteller and digital professional, passionate about transforming complex ideas into simple, engaging, and impactful content. She is also a writer, poet, scriptwriter, and copywriter, with a growing body of creative and health-focused work. Her expertise spans digital content creation, video editing, graphic design, and creative direction. For the DSHub Cohort A 2026 Internship, she will serve as a mentor for the Content Creation and Multimedia track.',
  },
  {
    name: 'Barr. Habiba Yerima',
    role: 'Mentor',
    track: 'Legal & Compliance',
    photo: '/habiba-yerima.jpg',
    initials: 'HY',
    linkedin: null,
    summary: 'Legal practitioner with four years of experience in contract drafting, review, negotiation, and dispute resolution.',
    bio: 'Barr. Habiba Yerima is an accomplished legal practitioner with four years of professional experience, bringing expertise in drafting, reviewing, and negotiating contracts, as well as alternative dispute resolution, helping parties reach efficient and effective outcomes. Driven by curiosity and a commitment to growth, she also completed the DSHub Cohort C 2025 internship in Data Science and Analytics, an experience that sharpened her analytical approach and complemented her legal expertise. She serves as the Legal Mentor for DSHub Cohort A 2026.',
  },
  {
    name: 'Abdulrahim Abdulrahman',
    role: 'Mentor',
    track: 'Frontend Development',
    photo: '/abdulrahim-abdulrahman.jpg',
    initials: 'AA',
    linkedin: 'https://www.linkedin.com/in/abdulrahim-abdulrahman-88a7a4263/',
    summary: null,
    bio: null,
  },
  {
    name: 'Faith Ogah',
    role: 'Asst. Coordinator',
    track: 'Content & Digital Marketing',
    photo: '/faith-ogah.jpg',
    initials: 'FO',
    linkedin: 'https://www.linkedin.com/in/faith-ogah/',
    summary: 'Content Strategist with 4+ years in content strategy, storytelling, B2B SaaS writing, and content marketing.',
    bio: 'Faith Ogah is a strategic thinker and communicator who values structure and clarity. She is a Content Strategist with over 4 years of experience in Content Strategy, Storytelling for Businesses & Brands, B2B SaaS Writing, and Content Marketing. For this cohort she serves as the Assistant Coordinator and Mentor for the Content Creation & Digital Marketing track, responsible for facilitating coordination, maintaining clear communication, and ensuring activities are carried out efficiently.',
  },
  {
    name: 'Umar Tijjani',
    role: 'Coordinator',
    track: 'Internship Coordination',
    photo: '/umar-tijjani.jpg',
    initials: 'UT',
    linkedin: 'https://www.linkedin.com/in/tijjani-umar-761ba3281/',
    summary: 'Purpose-driven robotics engineer specializing in autonomous systems, IoT, machine learning, and embedded systems.',
    bio: 'Umar Tijjani is a purpose-driven robotics engineer with expertise in autonomous systems, IoT solutions, machine learning, and embedded systems. He served as the Internship Coordinator at DSHub for the previous cohort, guiding and assessing supervisors and interns with professionalism, skill, and precision. For the DSHub Cohort A 2026 Internship Program, he continues as the Internship Coordinator, leveraging his technical knowledge and organizational skills to ensure smooth operations, effective mentorship, and successful project execution across DSHub.',
  },
];

export const FAQ = [
  { q: 'Who can apply to the DSHub Internship Program?', a: 'Anyone with foundational skills in their chosen track and the commitment to a full cohort. We accept applicants across Nigeria and remotely. No degree is required, only demonstrable ability and drive.' },
  { q: 'How long is a cohort?', a: 'Each cohort runs for nine weeks of structured learning, weekly mentor reviews, and a capstone project, ending with a public graduation showcase.' },
  { q: 'Is the program free?', a: 'Cohort A runs on standard and premium tiers. Details of fees, scholarships, and sponsor-backed seats are shared during the application process.' },
  { q: 'What tracks are available?', a: 'Frontend Development, Backend Engineering, Cybersecurity, Product Management, UI/UX Design, and Data Science. More tracks open with future cohorts.' },
  { q: 'What happens after I graduate?', a: 'Graduates join the DSHub alumni network, receive a verifiable certificate, and get continued access to community, hiring partners, and mentor connections.' },
  { q: 'When does the next cohort start?', a: 'Cohort A is live now. Cohorts B, C, and D are being scheduled. Apply or follow us to be notified when applications open.' },
];

export function getPublicInterns() { return INTERNS; }
export function getPublicMentors() { return MENTORS; }
