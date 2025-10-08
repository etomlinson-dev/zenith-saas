"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is Zenith and how does it work?",
    answer:
      "Zenith is a comprehensive SaaS platform designed to streamline your business operations. It combines project management, team collaboration, analytics, and automation tools in one unified dashboard. Simply sign up, invite your team, and start organizing your workflows with our intuitive interface.",
  },
  {
    question: "Can I try Zenith before committing to a paid plan?",
    answer:
      "We offer a 14-day free trial for all our plans. No credit card required. You'll have full access to all features during the trial period, and you can upgrade or cancel anytime.",
  },
  {
    question: "How secure is my data with Zenith?",
    answer:
      "Security is our top priority. We use bank-level encryption, comply with SOC 2 Type II standards, and offer features like two-factor authentication, SSO integration, and regular security audits. Your data is stored in secure, redundant data centers with 99.9% uptime guarantee.",
  },
  {
    question: "Can I integrate Zenith with my existing tools?",
    answer:
      "Yes! Zenith integrates with over 100+ popular tools including Slack, Google Workspace, Microsoft 365, Salesforce, Zapier, and many more. Our API also allows for custom integrations to fit your specific workflow needs.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We provide comprehensive support including email support for all plans, priority support for Professional plans, and 24/7 dedicated support for Enterprise customers. We also offer extensive documentation, video tutorials, and webinar training sessions.",
  },
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated difference immediately. When you downgrade, the change will take effect at your next billing cycle, and you'll continue to have access to your current plan's features until then.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with Zenith within the first 30 days of your subscription, contact our support team for a full refund.",
  },
  {
    question: "Is there a limit on the number of projects or users?",
    answer:
      "Limits depend on your plan. Starter plans support up to 5 users and 10 projects, Professional plans support up to 25 users and unlimited projects, while Enterprise plans offer unlimited users and projects. Check our pricing page for detailed information.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything you need to know about Zenith. Can't find what you're looking for? Contact our support team.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </section>
  )
}
