// Load environment variables FIRST before any imports that use process.env
import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), ".env.local") });

// Now import modules that depend on environment variables
import connectToDatabase from "../lib/mongodb";
import { Event } from "../database";

const seedEvents = [
  {
    title: "React Summit 2026",
    description: "The biggest React conference of the year",
    overview: "Join us for three days of cutting-edge React talks, hands-on workshops, and networking opportunities with industry leaders. Learn about the latest React features, best practices, and the future of frontend development.",
    image: "/images/event1.png",
    venue: "Tech Convention Center",
    location: "San Francisco, CA",
    date: "2026-09-15",
    time: "09:00",
    mode: "hybrid",
    audience: "Frontend developers, React enthusiasts, and tech leaders",
    agenda: [
      "9:00 AM - Registration & Breakfast",
      "10:00 AM - Keynote: The Future of React",
      "11:30 AM - Workshop: Server Components Deep Dive",
      "1:00 PM - Networking Lunch",
      "2:30 PM - Panel: State Management in 2026",
      "4:00 PM - Lightning Talks",
      "5:30 PM - Closing Remarks"
    ],
    organizer: "React Community",
    tags: ["react", "javascript", "frontend", "conference"]
  },
  {
    title: "AI Hackathon 2026",
    description: "48-hour AI/ML hackathon with amazing prizes",
    overview: "Build innovative AI solutions in 48 hours! This hackathon brings together developers, data scientists, and AI enthusiasts to create cutting-edge machine learning applications. Win prizes worth $50,000 and get mentorship from leading AI researchers.",
    image: "/images/event2.png",
    venue: "Innovation Hub",
    location: "Austin, TX",
    date: "2026-08-20",
    time: "18:00",
    mode: "offline",
    audience: "Developers, Data Scientists, AI/ML Engineers, Students",
    agenda: [
      "6:00 PM - Opening Ceremony & Team Formation",
      "7:00 PM - Hacking Begins",
      "Saturday 9:00 AM - Breakfast & Mentor Sessions",
      "Saturday 2:00 PM - Lunch & Tech Talks",
      "Sunday 6:00 PM - Project Submissions",
      "Sunday 7:30 PM - Final Presentations",
      "Sunday 9:00 PM - Awards Ceremony"
    ],
    organizer: "TechStars AI",
    tags: ["ai", "hackathon", "machine-learning", "python"]
  },
  {
    title: "Next.js Developer Meetup",
    description: "Monthly meetup for Next.js developers",
    overview: "Connect with fellow Next.js developers in your area! This monthly meetup features talks about Next.js best practices, App Router patterns, performance optimization, and real-world case studies. Great food, great people, great code!",
    image: "/images/event3.png",
    venue: "WeWork Downtown",
    location: "Seattle, WA",
    date: "2026-07-25",
    time: "19:00",
    mode: "offline",
    audience: "Next.js developers, Full-stack engineers, Web developers",
    agenda: [
      "7:00 PM - Networking & Pizza",
      "7:30 PM - Talk 1: Server Actions in Production",
      "8:00 PM - Talk 2: Optimizing Next.js for Core Web Vitals",
      "8:30 PM - Q&A and Discussion",
      "9:00 PM - More Networking"
    ],
    organizer: "Seattle JS Community",
    tags: ["nextjs", "react", "web-development", "meetup"]
  },
  {
    title: "GraphQL Workshop",
    description: "Hands-on GraphQL workshop for all skill levels",
    overview: "Master GraphQL in this intensive full-day workshop! Learn to design efficient schemas, optimize queries, implement subscriptions, and integrate GraphQL with React and Next.js. Includes hands-on exercises and real-world examples.",
    image: "/images/event4.png",
    venue: "DevSpace Learning Center",
    location: "Online",
    date: "2026-08-10",
    time: "10:00",
    mode: "online",
    audience: "Backend developers, Frontend developers, API architects",
    agenda: [
      "10:00 AM - GraphQL Fundamentals",
      "11:30 AM - Schema Design Best Practices",
      "1:00 PM - Break",
      "2:00 PM - Advanced Queries & Mutations",
      "3:30 PM - Subscriptions & Real-time Data",
      "5:00 PM - Q&A and Next Steps"
    ],
    organizer: "API Academy",
    tags: ["graphql", "api", "workshop", "backend"]
  },
  {
    title: "Web3 Developer Conference",
    description: "Learn about blockchain, smart contracts, and DApps",
    overview: "Dive into the world of Web3! This conference covers blockchain fundamentals, smart contract development, DApp architecture, and the future of decentralized applications. Network with Web3 pioneers and explore career opportunities in blockchain.",
    image: "/images/event5.png",
    venue: "Blockchain Center",
    location: "Miami, FL",
    date: "2026-10-05",
    time: "09:00",
    mode: "hybrid",
    audience: "Blockchain developers, Smart contract engineers, Web3 enthusiasts",
    agenda: [
      "9:00 AM - Registration",
      "10:00 AM - Keynote: The Web3 Revolution",
      "11:00 AM - Smart Contract Security",
      "12:30 PM - Networking Lunch",
      "2:00 PM - Building DApps with React",
      "4:00 PM - Panel: Future of Decentralization",
      "6:00 PM - Networking Reception"
    ],
    organizer: "Web3 Foundation",
    tags: ["web3", "blockchain", "ethereum", "solidity"]
  }
];

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    await connectToDatabase();
    console.log("✅ Connected to database");

    // Clear existing events (optional - remove if you want to keep existing data)
    const deleteResult = await Event.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing events`);

    // Insert seed events one by one to trigger pre-save hooks (slug generation)
    const createdEvents = [];
    for (const eventData of seedEvents) {
      const event = await Event.create(eventData);
      createdEvents.push(event);
    }
    console.log(`✅ Created ${createdEvents.length} events`);

    console.log("\n📋 Created events:");
    createdEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} (slug: ${event.slug})`);
    });

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
