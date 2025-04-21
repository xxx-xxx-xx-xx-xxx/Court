// src/components/Hero.js
import { FiArrowRight } from 'react-icons/fi'
import styles from '../styles/hero.module.css'

export default function Hero() {
  const letters = ['c','o','u','r','t']
  return (
    <section className={styles.hero}>
      <div className={styles.bgPattern} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          {letters.map((ltr, i) => (
            <span key={i} className={styles.wave}>{ltr}</span>
          ))}
          <span className={styles.pop}>.gay</span>
        </h1>

        <a href="/faq" className={styles.cta}>
          view our documentation
          <FiArrowRight className={styles.icon} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
