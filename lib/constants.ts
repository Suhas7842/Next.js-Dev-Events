export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  attendees: number;
  isVirtual: boolean;
  registrationUrl?: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "React Summit 2026",
    slug: "react-summit-2026",
    description:
      "The biggest React conference bringing together developers, companies, and open-source maintainers from around the world. Join us for two days of talks, workshops, and networking.",
    image: "/images/event1.png",
    date: "2026-09-15",
    time: "09:00 AM",
    location: "Amsterdam, Netherlands",
    category: "Conference",
    organizer: "GitNation",
    attendees: 2500,
    isVirtual: false,
    registrationUrl: "https://reactsummit.com",
  },
  {
    id: "2",
    title: "Global AI Hackathon",
    slug: "global-ai-hackathon",
    description:
      "48-hour hackathon focused on building innovative AI applications. Work with cutting-edge LLMs, computer vision, and machine learning tools. $50,000 in prizes.",
    image: "/images/event2.png",
    date: "2026-08-20",
    time: "06:00 PM",
    location: "San Francisco, CA",
    category: "Hackathon",
    organizer: "AI Engineers",
    attendees: 500,
    isVirtual: false,
    registrationUrl: "https://ai-hackathon.dev",
  },
  {
    id: "3",
    title: "Web3 Developer Meetup",
    slug: "web3-developer-meetup",
    description:
      "Monthly meetup for blockchain developers and crypto enthusiasts. This month: Building decentralized applications with Ethereum and Solidity. Lightning talks and networking.",
    image: "/images/event3.png",
    date: "2026-07-28",
    time: "07:00 PM",
    location: "Austin, TX",
    category: "Meetup",
    organizer: "Web3 Austin",
    attendees: 150,
    isVirtual: false,
  },
  {
    id: "4",
    title: "DevOps World Virtual Summit",
    slug: "devops-world-virtual-summit",
    description:
      "Global virtual conference covering DevOps, CI/CD, cloud infrastructure, and platform engineering. Features live sessions, Q&A with experts, and hands-on workshops.",
    image: "/images/event4.png",
    date: "2026-10-05",
    time: "10:00 AM",
    location: "Virtual",
    category: "Conference",
    organizer: "CloudNative Foundation",
    attendees: 5000,
    isVirtual: true,
    registrationUrl: "https://devopsworld.io",
  },
  {
    id: "5",
    title: "Open Source Contributor Day",
    slug: "open-source-contributor-day",
    description:
      "Contribute to your favorite open source projects alongside maintainers and fellow contributors. Beginner-friendly with mentorship available for first-time contributors.",
    image: "/images/event5.png",
    date: "2026-08-10",
    time: "10:00 AM",
    location: "Seattle, WA",
    category: "Workshop",
    organizer: "Open Source Collective",
    attendees: 200,
    isVirtual: false,
  },
  {
    id: "6",
    title: "Mobile Dev Night: Flutter & React Native",
    slug: "mobile-dev-night-flutter-react-native",
    description:
      "Evening meetup for mobile developers. Compare Flutter and React Native in production, share best practices, and discuss the future of cross-platform development.",
    image: "/images/event6.png",
    date: "2026-07-25",
    time: "06:30 PM",
    location: "New York, NY",
    category: "Meetup",
    organizer: "NYC Mobile Devs",
    attendees: 120,
    isVirtual: false,
  },
  {
    id: "7",
    title: "Kubernetes Community Days",
    slug: "kubernetes-community-days",
    description:
      "Two-day conference dedicated to Kubernetes, cloud-native technologies, and container orchestration. Hands-on labs, expert talks, and certification prep sessions.",
    image: "/images/event1.png",
    date: "2026-09-22",
    time: "09:00 AM",
    location: "Boston, MA",
    category: "Conference",
    organizer: "CNCF",
    attendees: 800,
    isVirtual: false,
    registrationUrl: "https://k8s-community-days.io",
  },
  {
    id: "8",
    title: "Startup Weekend: Build Your SaaS",
    slug: "startup-weekend-build-your-saas",
    description:
      "54-hour event where developers, designers, and entrepreneurs come together to pitch ideas, form teams, and build a working SaaS prototype. Mentorship and prizes included.",
    image: "/images/event2.png",
    date: "2026-08-15",
    time: "05:00 PM",
    location: "Los Angeles, CA",
    category: "Hackathon",
    organizer: "Techstars",
    attendees: 150,
    isVirtual: false,
  },
  {
    id: "9",
    title: "Python Data Science Workshop",
    slug: "python-data-science-workshop",
    description:
      "Full-day workshop covering data analysis with Pandas, visualization with Matplotlib, and machine learning with scikit-learn. Perfect for beginners and intermediate developers.",
    image: "/images/event3.png",
    date: "2026-07-30",
    time: "09:00 AM",
    location: "Chicago, IL",
    category: "Workshop",
    organizer: "DataCamp",
    attendees: 80,
    isVirtual: false,
  },
];

export const categories = [
  "All",
  "Conference",
  "Hackathon",
  "Meetup",
  "Workshop",
] as const;

export type Category = (typeof categories)[number];
