import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// Import models
import UserCollab from "../model/UserCollab.js";
import ProjectCollab from "../model/ProjectCollab.js";
import ApplicationCollab from "../model/ApplicationCollab.js";
import NotificationCollab from "../model/NotificationCollab.js";

// Connect to database
try {
  mongoose.connect(process.env.MONGO_URL);
} catch (err) {
  console.log(err);
}

const seedUsers = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@university.edu",
    password: "password123",
    department: "Computer Science",
    year: "3rd Year",
    bio: "Passionate about AI and mobile development. Previously built 3 mobile apps and have experience with React Native and Python.",
    skills: ["Python", "React Native", "Machine Learning", "API Design"],
    interests: ["AI/ML", "Mobile Development", "Data Science"],
    rating: 4.9,
    projectsCompleted: 8,
  },
  {
    name: "Mike Rodriguez",
    email: "mike.rodriguez@university.edu",
    password: "password123",
    department: "Electrical Engineering",
    year: "2nd Year",
    bio: "Hardware enthusiast with a passion for IoT and embedded systems.",
    skills: ["Arduino", "C++", "Circuit Design", "Sensor Integration"],
    interests: ["IoT", "Hardware", "Embedded Systems"],
    rating: 4.7,
    projectsCompleted: 5,
  },
  {
    name: "Alex Kumar",
    email: "alex.kumar@university.edu",
    password: "password123",
    department: "Information Technology",
    year: "4th Year",
    bio: "Blockchain developer and cryptocurrency enthusiast.",
    skills: ["Solidity", "Web3", "JavaScript", "Smart Contracts"],
    interests: ["Blockchain", "Cryptocurrency", "DeFi"],
    rating: 4.8,
    projectsCompleted: 6,
  },
  {
    name: "Priya Patel",
    email: "priya.patel@university.edu",
    password: "password123",
    department: "Psychology",
    year: "3rd Year",
    bio: "Interested in the intersection of psychology and technology.",
    skills: ["Research", "Data Analysis", "Content Creation", "User Research"],
    interests: ["AI/ML", "Mental Health", "User Experience"],
    rating: 4.6,
    projectsCompleted: 4,
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@university.edu",
    password: "password123",
    department: "Digital Media",
    year: "2nd Year",
    bio: "Creative developer specializing in VR/AR and game development.",
    skills: ["Unity", "3D Modeling", "VR Development", "Game Design"],
    interests: ["Game Development", "VR/AR", "Interactive Media"],
    rating: 4.9,
    projectsCompleted: 7,
  },
  {
    name: "David Kim",
    email: "david.kim@university.edu",
    password: "password123",
    department: "Environmental Engineering",
    year: "4th Year",
    bio: "Environmental engineer passionate about sustainability and data visualization.",
    skills: [
      "Data Visualization",
      "Python",
      "Environmental Analysis",
      "Sustainability",
    ],
    interests: ["Data Science", "Environmental Tech", "Sustainability"],
    rating: 4.5,
    projectsCompleted: 3,
  },
];

const seedProjects = [
  {
    title: "Smart Campus Navigation System",
    description:
      "Building an AI-powered mobile app that helps students navigate campus using AR and real-time data. The app will use machine learning to predict optimal routes based on class schedules, crowd density, and real-time events.",
    category: "AI/ML",
    skillsNeeded: [
      "Flutter",
      "Machine Learning",
      "AR Development",
      "UI/UX Design",
    ],
    skillsOffered: [
      "Python",
      "Backend Development",
      "API Design",
      "Project Management",
    ],
    teamSize: "3-4 people",
    duration: "3 months",
    location: "Hybrid",
    requirements:
      "Looking for committed teammates who can dedicate 10-15 hours per week to this project.",
    goals:
      "Create a fully functional prototype for the Tech Fair and potentially pitch to university administration.",
    timeline: [
      {
        phase: "Research & Planning",
        duration: "Week 1-2",
        description: "User research, technical planning, and UI/UX design",
      },
      {
        phase: "Core Development",
        duration: "Week 3-8",
        description: "Build core navigation features and ML models",
      },
      {
        phase: "AR Integration",
        duration: "Week 9-10",
        description: "Implement AR features and real-time data",
      },
      {
        phase: "Testing & Polish",
        duration: "Week 11-12",
        description: "User testing, bug fixes, and final preparations",
      },
    ],
    featured: true,
    status: "active",
  },
  {
    title: "IoT-Based Smart Garden Monitor",
    description:
      "Create an automated garden monitoring system with sensors, mobile app, and machine learning for plant health prediction.",
    category: "IoT",
    skillsNeeded: ["Mobile Development", "Machine Learning", "UI/UX Design"],
    skillsOffered: ["Arduino", "Sensor Integration", "Hardware Design"],
    teamSize: "2-3 people",
    duration: "4 months",
    location: "Hybrid",
    requirements:
      "Experience with mobile development or hardware is preferred.",
    goals:
      "Build a working prototype that can monitor plant health and provide recommendations.",
    timeline: [
      {
        phase: "Hardware Setup",
        duration: "Week 1-3",
        description: "Set up sensors and Arduino system",
      },
      {
        phase: "Mobile App Development",
        duration: "Week 4-8",
        description: "Build mobile app for monitoring",
      },
      {
        phase: "ML Integration",
        duration: "Week 9-12",
        description: "Implement machine learning for predictions",
      },
      {
        phase: "Testing & Deployment",
        duration: "Week 13-16",
        description: "Test system and deploy",
      },
    ],
    featured: false,
    status: "active",
  },
  {
    title: "Blockchain-Based Student Credential System",
    description:
      "Developing a secure, decentralized system for storing and verifying student academic credentials.",
    category: "Blockchain",
    skillsNeeded: ["Smart Contract Development", "Frontend Development"],
    skillsOffered: ["Blockchain Architecture", "Cryptography"],
    teamSize: "3-5 people",
    duration: "5 months",
    location: "On-campus",
    requirements: "Basic understanding of blockchain technology is helpful.",
    goals: "Create a proof-of-concept for secure credential verification.",
    timeline: [
      {
        phase: "Research & Design",
        duration: "Week 1-4",
        description: "Research blockchain solutions and design architecture",
      },
      {
        phase: "Smart Contract Development",
        duration: "Week 5-12",
        description: "Develop and test smart contracts",
      },
      {
        phase: "Frontend Development",
        duration: "Week 13-16",
        description: "Build user interface",
      },
      {
        phase: "Integration & Testing",
        duration: "Week 17-20",
        description: "Integrate components and test system",
      },
    ],
    featured: true,
    status: "active",
  },
];

const seedData = async () => {
  try {
    console.log("Starting database seeding...");

    // Clear existing data
    await UserCollab.deleteMany({});
    await ProjectCollab.deleteMany({});
    await ApplicationCollab.deleteMany({});
    await NotificationCollab.deleteMany({});

    console.log("Cleared existing data");

    // Create users
    const users = [];
    for (const userData of seedUsers) {
      const salt = await bcrypt.genSalt(12);
      userData.password = await bcrypt.hash(userData.password, salt);
      const user = await UserCollab.create(userData);
      users.push(user);
    }

    console.log(`Created ${users.length} users`);

    // Create projects
    const projects = [];
    for (let i = 0; i < seedProjects.length; i++) {
      const projectData = {
        ...seedProjects[i],
        author: users[i]._id,
      };
      const project = await ProjectCollab.create(projectData);
      projects.push(project);
    }

    console.log(`Created ${projects.length} projects`);

    // Create some applications
    const applications = [];

    // User 1 applies to project 2
    const app1 = await ApplicationCollab.create({
      project: projects[1]._id,
      applicant: users[0]._id,
      message:
        "I'm very interested in this IoT project. I have experience with mobile development and would love to contribute to the app development.",
      skills: ["React Native", "Mobile Development", "UI/UX"],
      availability: {
        hoursPerWeek: 15,
        startDate: new Date(),
        endDate: new Date(Date.now() + 4 * 30 * 24 * 60 * 60 * 1000), // 4 months
      },
    });
    applications.push(app1);

    // User 2 applies to project 1
    const app2 = await ApplicationCollab.create({
      project: projects[0]._id,
      applicant: users[1]._id,
      message:
        "This navigation system sounds amazing! I can help with the hardware integration and sensor aspects.",
      skills: ["Hardware Integration", "Sensors", "Arduino"],
      availability: {
        hoursPerWeek: 12,
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // 3 months
      },
    });
    applications.push(app2);

    // User 3 applies to project 1
    const app3 = await ApplicationCollab.create({
      project: projects[0]._id,
      applicant: users[2]._id,
      message:
        "I'd love to work on the backend and API development for this project.",
      skills: ["Backend Development", "API Design", "Database"],
      availability: {
        hoursPerWeek: 20,
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // 3 months
      },
    });
    applications.push(app3);

    console.log(`Created ${applications.length} applications`);

    // Add interested users to projects
    projects[0].interestedUsers.push(users[3]._id, users[4]._id, users[5]._id);
    projects[1].interestedUsers.push(users[2]._id, users[4]._id);
    projects[2].interestedUsers.push(
      users[0]._id,
      users[1]._id,
      users[3]._id,
      users[5]._id
    );

    // Update projects with applicants
    projects[0].applicants.push(
      { user: users[1]._id, appliedAt: new Date(), status: "pending" },
      { user: users[2]._id, appliedAt: new Date(), status: "pending" }
    );
    projects[1].applicants.push({
      user: users[0]._id,
      appliedAt: new Date(),
      status: "pending",
    });

    // Save updated projects
    for (const project of projects) {
      await project.save();
    }

    // Create some notifications
    const notifications = [
      {
        recipient: users[0]._id,
        sender: users[1]._id,
        type: "application_received",
        title: "New Application Received",
        message: `${users[1].name} applied to your project "Smart Campus Navigation System"`,
        relatedProject: projects[0]._id,
        relatedApplication: app2._id,
      },
      {
        recipient: users[0]._id,
        sender: users[2]._id,
        type: "application_received",
        title: "New Application Received",
        message: `${users[2].name} applied to your project "Smart Campus Navigation System"`,
        relatedProject: projects[0]._id,
        relatedApplication: app3._id,
      },
      {
        recipient: users[1]._id,
        sender: users[0]._id,
        type: "application_received",
        title: "New Application Received",
        message: `${users[0].name} applied to your project "IoT-Based Smart Garden Monitor"`,
        relatedProject: projects[1]._id,
        relatedApplication: app1._id,
      },
      {
        recipient: users[0]._id,
        sender: users[3]._id,
        type: "project_interest",
        title: "New Interest in Your Project",
        message: `${users[3].name} showed interest in your project "Smart Campus Navigation System"`,
        relatedProject: projects[0]._id,
      },
    ];

    await NotificationCollab.insertMany(notifications);

    console.log(`Created ${notifications.length} notifications`);

    console.log("Database seeding completed successfully!");
    console.log("\n Summary:");
    console.log(`   Users: ${users.length}`);
    console.log(`   Projects: ${projects.length}`);
    console.log(`   Applications: ${applications.length}`);
    console.log(`   Notifications: ${notifications.length}`);
    console.log("\n Test Login Credentials:");
    console.log("   Email: sarah.chen@university.edu");
    console.log("   Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run seeding
seedData();
