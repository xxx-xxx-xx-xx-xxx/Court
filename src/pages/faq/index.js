// src/pages/faq.js
import { useState, useMemo } from 'react'
import {
  FiChevronDown,
  FiChevronUp,
  FiLink,
  FiGrid,
  FiMail,
  FiImage,
  FiStar,
  FiHelpCircle,
  FiUserPlus,
  FiLock,
  FiCreditCard,
  FiPhone
} from 'react-icons/fi'
import Head from 'next/head'
import styles from '@/styles/faq.module.css'

const faqData = [
  // — General Questions
  {
    category: 'General',
    icon: FiHelpCircle,
    question: 'What is court.gay?',
    answer: `court.gay is your personalized bio‑link hub and URL shortener.  
It lets you claim a memorable address like \`court.gay/@username\`, build a mini landing page of all your links, host media, get custom email, and more—powered by a sleek, privacy‑focused platform.`
  },
  {
    category: 'General',
    icon: FiUserPlus,
    question: 'How do I sign up?',
    answer: `We’re currently in private beta—drop your email on the homepage to request an invite.  
Once approved, you’ll receive a magic link to set your password and pick your custom slug.`
  },
  {
    category: 'General',
    icon: FiCreditCard,
    question: 'Is court.gay free?',
    answer: `Yes! Core features (custom URL, biolink, media hosting) are 100% free.  
We’ll offer optional premium add‑ons—like custom domains and advanced analytics—later this year.`
  },
  {
    category: 'General',
    icon: FiLock,
    question: 'How secure is my data?',
    answer: `We store metadata in encrypted PostgreSQL and files in private S3 buckets.  
All pages and uploads are served over HTTPS with strict TLS, and we never sell or share your info.`
  },
  {
    category: 'General',
    icon: FiPhone,
    question: 'How can I contact support?',
    answer: `Shoot us an email at support@court.gay or join our Discord community (link in your dashboard).  
We’re happy to help with anything at all!`
  },

  // — Feature‑Specific FAQs
  {
    category: 'Features',
    icon: FiLink,
    question: 'Claim Your Custom URL Slug',
    answer: `Claim a memorable address like \`court.gay/@username\`.  
Fully customize your slug to match your personal or brand identity—sharing has never been easier.`
  },
  {
    category: 'Features',
    icon: FiGrid,
    question: 'All‑in‑One BioLink Hub',
    answer: `Showcase every link, social profile, and portfolio on a single elegant landing page.  
Pick from multiple themes and layouts to match your style.`
  },
  {
    category: 'Features',
    icon: FiMail,
    question: 'Premium Mail Hosting',
    answer: `Use your own \`@court.gay\` address with secure SMTP/IMAP.  
We include enterprise‑grade spam filtering and a polished webmail UI.`
  },
  {
    category: 'Features',
    icon: FiImage,
    question: 'Robust Media Hosting',
    answer: `Upload and serve images, GIFs, and videos with unlimited bandwidth.  
Generate shareable links or embed directly on your biolink page.`
  },
  {
    category: 'Features',
    icon: FiStar,
    question: 'Exclusive Private Beta',
    answer: `Join our invite‑only beta to get free upgrades, early‑access features, and connect with a community of creators before general launch.`
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [search, setSearch] = useState('')

  // live filter
  const filtered = useMemo(
    () =>
      faqData.filter(
        ({ question, answer }) =>
          question.toLowerCase().includes(search.toLowerCase()) ||
          answer.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  // group by category
  const grouped = useMemo(() => {
    return filtered.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {})
  }, [filtered])

  return (
    <>
      <Head>
        <title>FAQ &amp; About – court.gay</title>
        <meta
          name="description"
          content="Learn about court.gay, claim your custom slug, host media, get mail & more."
        />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.heading}>About &amp; FAQ</h1>
          <p className={styles.subheading}>
            Everything you need to know about court.gay—from signing up to pro features.
          </p>
          <input
            type="text"
            className={styles.search}
            placeholder="Search questions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {Object.entries(grouped).map(([category, faqs]) => (
          <section key={category} className={styles.section}>
            <h2 className={styles.category}>
              {category === 'General' ? 'General Questions' : 'Key Features'}
            </h2>
            <ul className={styles.accordion}>
              {faqs.map((faq) => {
                const idx = faqData.indexOf(faq)
                const isOpen = idx === openIndex
                const Icon = faq.icon

                return (
                  <li key={idx} className={styles.item}>
                    <button
                      className={styles.toggle}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                    >
                      <div className={styles.toggleContent}>
                        <Icon className={styles.featureIcon} />
                        <span className={styles.questionText}>{faq.question}</span>
                      </div>
                      {isOpen ? (
                        <FiChevronUp className={styles.chevron} />
                      ) : (
                        <FiChevronDown className={styles.chevron} />
                      )}
                    </button>
                    <div className={`${styles.answer} ${isOpen ? styles.open : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </main>
    </>
  )
}
