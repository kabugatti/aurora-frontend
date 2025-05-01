import {
  Bookmark,
  BookOpen,
  Brain,
  CirclePlay,
  Globe,
  GraduationCap,
  MessageCircle,
  Users,
} from "lucide-react";

export const skillContent = [
  {
    icons: <BookOpen className="text-[#00B8D4] h-[40px] w-[40px]" />,
    tag: "Reading",
    content: "Improve your reading skills with interactive texts",
  },

  {
    icons: <MessageCircle className="text-[#00B8D4] h-[40px] w-[40px]" />,
    tag: "Speaking",
    content: "Practice conversations with our AI assistant",
  },
  {
    icons: <CirclePlay className="text-[#00B8D4] h-[40px] w-[40px]" />,
    tag: "Listening",
    content: "Enhance your listening skills with audio lessons",
  },
  {
    icons: <Bookmark className="text-[#00B8D4] h-[40px] w-[40px]" />,
    tag: "Writing",
    content: "Get feedback on your writing from our AI",
  },
];

export const courses = {
  Beginner: [
    {
      icons: <Brain className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Basic Conversation",
      content: "Learn everyday phrases and expressions",
    },
    {
      icons: <GraduationCap className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Grammar Foundations",
      content: "Master the basics of English grammar",
    },
    {
      icons: <Globe className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Cultural Insights",
      content: "Learn about cultures while learning language",
    },
  ],
  Intermediate: [
    {
      icons: <MessageCircle className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Fluent Conversation",
      content: "Improve your speaking fluency",
    },
    {
      icons: <BookOpen className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Reading Comprehension",
      content: "Enhance your reading skill",
    },
    {
      icons: <Bookmark className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Writing Workshop",
      content: "Develope your writing skills",
    },
  ],
  Advanced: [
    {
      icons: <Brain className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Advanced Grammar",
      content: "Master complex grammatic structures",
    },
    {
      icons: <Globe className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Idiomatic Expression",
      content: "Learn native-like expression",
    },
    {
      icons: <GraduationCap className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Academic English",
      content: "Prepare for academic environments",
    },
  ],
  Business: [
    {
      icons: <Users className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Business Communication",
      content: "Professional email and meeting skill",
    },
    {
      icons: <MessageCircle className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Negotiation Skill",
      content: "Learn to negotiate Effectively",
    },
    {
      icons: <BookOpen className="text-[#00B8D4] h-[32px] w-[32px]" />,
      tag: "Presentation Mastery",
      content: "Deliver impactful presentations",
    },
  ],
};

export const whyChooseAuruora = {
  title: "Why Choose",
  subtitle: "AURORA?",
  content:
    "Our AI-powered platform offers unique advantages for language learners",
  cards: [
    {
      icons: <Brain className="w-full h-full" />,
      tag: "AI-Powered Learning",
      content:
        "Our AI technology personalizes your language learning journey for maximum efficiency and results.",
    },
    {
      icons: <Globe className="w-full h-full" />,
      tag: "Web3 Integration",
      content:
        "Earn rewards and certificates on blockchain as you progress through your language learning journey.",
    },
    {
      icons: <Users className="w-full h-full" />,
      tag: "Community Learning",
      content:
        "Connect with other learners and native speakers to practice and improve your language skills.",
    },
    {
      icons: <GraduationCap className="w-full h-full" />,
      tag: "Certified Progress",
      content:
        "Track your advancement with recognized certifications that validate your language proficiency.",
    },
    {
      icons: <MessageCircle className="w-full h-full" />,
      tag: "Interactive Conversations",
      content:
        "Practice real-world conversation scenarios with our advanced AI chatbot technology.",
    },
    {
      icons: <BookOpen className="w-full h-full" />,
      tag: "Comprehensive Resources",
      content:
        "Access a vast library of learning materials, exercises, and tools to enhance your language skills.",
    },
  ],
};

export const whatOurUsersSay = [
  {
    name: "Sarah K.",
    tag: "Business Professional",
    content:
      '"AURORA has transformed my business English skills. The AI feedback helped me improve my presentations and emails dramatically."',
  },
  {
    name: "Miguel R.",
    tag: "Student",
    content:
      '"I love how the platform adapts to my learning style. The interactive conversations with the AI feel so natural and have helped me gain confidence."',
  },
  {
    name: "Aisha T.",
    tag: "Language Enthusiast",
    content:
      '"The Web3 integration is brilliant! I love earning certificates that are verifiable on the blockchain as I complete my courses."',
  },
];
