

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

const Footer = ({ customClass = "" }) => {
  const [email, setEmail] = useState("")
  const [language, setLanguage] = useState("English")
  const [showLanguages, setShowLanguages] = useState(false)

  const languages = ["English", "Español", "Français", "Deutsch", "中文", "日本語"]

  const handleSubscribe = (e) => {
    e.preventDefault()
    console.log("Subscribed with:", email)
    setEmail("")
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setShowLanguages(false)
  }

  return (
    <footer className={`bg-gray-900 text-white mt-auto ${customClass}`}>
      {/* Main footer content with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 lg:py-12 border-b border-gray-700">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg">
                <Brain className="w-7 h-7 text-gray-900" />
              </div>
              <div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-gray-300 mr-2" />
                  <span className="text-white font-bold text-xl">LearnHub</span>
                </div>
                <p className="text-gray-300 text-sm">Learn. Grow. Succeed.</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-md">
              Leading educational platform offering interactive courses, learning resources, and tools for students of all levels.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                { icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Subscribe to our newsletter</h3>
            <p className="text-gray-300">
              Receive updates on new courses, resources, and learning tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-800 placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-r-md transition-colors duration-200 flex items-center"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>

            {/* I removed the language selection by Ayomide */}
            {/* <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>{language}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showLanguages && (
                <div className="absolute bottom-full mb-2 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                        language === lang ? "bg-gray-200 font-medium" : ""
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div> */}
          </div>
        </div>

        {/* Middle Section with Links - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8 lg:py-12 border-b border-gray-700">
          {[
            {
              title: "Learning",
              links: [
                "All Courses",
                "Learning Paths",
                "Certifications",
                "Tutoring",
                "Practical Exercises",
                "Assessments",
              ],
            },
            {
              title: "Resources",
              links: ["Library", "Articles", "Podcasts", "Webinars", "Glossary", "Tools"],
            },
            {
              title: "Community",
              links: ["Forums", "Events", "Study Groups", "Mentors", "Success Stories", "Blog"],
            },
            {
              title: "Company",
              links: ["About Us", "Team", "Careers", "Partners", "Affiliates", "Contact"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 lg:py-12">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-3">
              {[
                {
                  icon: <Mail className="w-4 h-4 text-gray-300" />,
                  content: "info@learnhub.com",
                  href: "mailto:info@learnhub.com",
                },
                {
                  icon: <Phone className="w-4 h-4 text-gray-300" />,
                  content: "+1 (234) 567-890",
                  href: "tel:+123456789",
                },
                {
                  icon: <MapPin className="w-4 h-4 text-gray-300" />,
                  content: "123 Education Street, Knowledge City, 12345",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                      {item.content}
                    </a>
                  ) : (
                    <span className="text-gray-300">{item.content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Recognition</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Award className="w-4 h-4 text-yellow-300" />, text: "Best Educational Platform 2024" },
                { icon: <Users className="w-4 h-4 text-gray-300" />, text: "+1M Students" },
                { icon: <Shield className="w-4 h-4 text-gray-300" />, text: "ISO 27001 Certified" },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-md">
                  {badge.icon}
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-3">
              {[
                { icon: <FileText className="w-4 h-4" />, text: "Terms and Conditions" },
                { icon: <Shield className="w-4 h-4" />, text: "Privacy Policy" },
                { icon: <HelpCircle className="w-4 h-4" />, text: "Help Center" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright - Responsive Flex */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-gray-700">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Sitemap", "Accessibility", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-400 hover:text-white transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer