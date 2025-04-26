

"use client"

import { useState } from "react"
import {
  Brain,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Award,
  HelpCircle,
  FileText,
  Shield,
  Users,
} from "lucide-react"

import auroraBrain from "../../assets/auroraLogo.jpg"

const Footer = ({ customClass = "" }) => {
  const [email, setEmail] = useState("")
  const [language, setLanguage] = useState("English")
  const [showLanguages, setShowLanguages] = useState(false)

  const languages = ["English", "Español", "Français", "Deutsch", "中文", "日本語"]
  const [accordionOpen, setAccordionOpen] = useState({ 
    acerca: false,
    recursos: false,
    legal: false,
    subscribe: false,
  })

  const toggleAccordion = (section) => { 
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email");
      return;
    }
    console.log("Subscribed with:", email);
    setEmail("");
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setShowLanguages(false)
  }

  return (
    <footer className={`bg-gray-900 text-white font-sans text-base px-10 ${customClass}`}>
      {/* Main footer content with responsive padding */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-8">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b border-gray-700 pb-12 px-4">
        
        {/* Column: About Aurora */}
        <div>
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default" 
              onClick={() => toggleAccordion("acerca")}
            >
              About Aurora
            </h3>
            <ul className={`${accordionOpen.acerca ? "block" : "hidden"} md:block mt-2 space-y-2`}> {/* 🍊 Lista plegable en móvil */}
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  About US
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Contact
                </a>
              </li>
            </ul>
        </div>

        {/* Column: Resources */}
        <div>
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default" 
              onClick={() => toggleAccordion("recursos")}
            >
              Resources
            </h3>
            <ul className={`${accordionOpen.recursos ? "block" : "hidden"} md:block mt-2 space-y-2`}>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Support
                </a>
              </li>
            </ul>
        </div>

        {/* Column: Legal */}
        <div>
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default"
              onClick={() => toggleAccordion("legal")}
            >
              Legal
            </h3>
            <ul className={`${accordionOpen.legal ? "block" : "hidden"} md:block mt-2 space-y-2`}>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white no-underline text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
        </div>

        {/* Column: Subscribe */}
         <div>
            <h3
              className="text-lg font-semibold cursor-pointer md:cursor-default" 
              onClick={() => toggleAccordion("subscribe")}
            >
              Subscribe
            </h3>
            <form
              onSubmit={handleSubscribe}
              className={`${accordionOpen.subscribe ? "block" : "hidden"} md:block mt-2`}
            >
              <h6 className="text-gray-400 text-xs py-2">Stay update with our latest news and offers</h6>
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-2 py-2 rounded-md text-gray-800 text-sm bg-gray-800/60"
                  required
                />
                
                <button
                  type="submit"
                  className="bg-blue-400 hover:bg-gray-600 px-2 py-2 rounded-md flex items-center text-sm">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white no-underline">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white no-underline">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white no-underline">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white no-underline">
              <Linkedin className="w-5 h-5" />
            </a>
            </div>
          </div>
         </div> 
        {/* Column: Final Subscribe */}

       
        </div>

        {/* Lower section: logo and copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mt-4 md:mt-0">
            <div className="bg-white p-1">
            <img src={auroraBrain} alt="Aurora Logo" className="w-10 h-10" />
            </div>
            {/* <span className="ml-2 font-bold text-xl">AURORA</span> */}
          </div>
          <p className="mt-4 md:mt-0 text-sm text-gray-400">
            © {new Date().getFullYear()} AURORA Language Assistant. All rights reserved.
          </p>
        </div>

        </div>
    </footer>
  )
}

export default Footer