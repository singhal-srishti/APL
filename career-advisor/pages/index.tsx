import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Career Advisor - Beyond the Resume</title>
        <meta
          name="description"
          content="AI Career Intelligence Platform - Get role recommendations, skill-gap analysis, hiring probability scores, and more"
        />
      </Head>

      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>🎯 Career Advisor</h1>
            <p className={styles.tagline}>
              Don't just search jobs — engineer your career
            </p>
            <p className={styles.description}>
              Transform your job search with AI-powered career intelligence. Get personalized
              role recommendations, skill-gap analysis, hiring probability scores, and more.
            </p>
            <Link href="/dashboard" className={styles.cta}>
              Start Your Analysis
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <h2>Six Features to Propel Your Career</h2>
          <div className={styles.grid}>
            <div className={styles.feature}>
              <div className={styles.icon}>🎯</div>
              <h3>Role Recommendations</h3>
              <p>Get personalized job matches based on your skills and experience.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>📊</div>
              <h3>Skill-Gap Analysis</h3>
              <p>Identify exactly what you need to learn to land your dream role.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>📈</div>
              <h3>Hiring Probability</h3>
              <p>Get data-driven probability scores for each opportunity.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>💰</div>
              <h3>Salary Benchmarks</h3>
              <p>Understand market rates and negotiate with confidence.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>✅</div>
              <h3>Resume/ATS Optimization</h3>
              <p>Ensure your resume passes ATS systems and gets noticed.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>🎤</div>
              <h3>Interview Prep Plans</h3>
              <p>Get customized preparation plans with mock questions and scripts.</p>
            </div>
          </div>
        </section>

        <section className={styles.process}>
          <h2>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Upload Your Profile</h3>
              <p>Share your resume and career goals</p>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Get Recommendations</h3>
              <p>Receive role matches with match scores</p>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Analyze & Improve</h3>
              <p>Identify gaps and get actionable guidance</p>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h3>Prepare & Apply</h3>
              <p>Use interview prep and optimize your application</p>
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.number}>5000+</div>
            <p>Job Postings Analyzed</p>
          </div>
          <div className={styles.stat}>
            <div className={styles.number}>6</div>
            <p>Intelligence Features</p>
          </div>
          <div className={styles.stat}>
            <div className={styles.number}>89%</div>
            <p>Average Match Accuracy</p>
          </div>
        </section>

        <section className={styles.cta_section}>
          <h2>Ready to Engineer Your Career?</h2>
          <Link href="/dashboard" className={styles.ctaButton}>
            Get Started Now
          </Link>
        </section>

        <footer className={styles.footer}>
          <p>© 2025 Career Advisor. Engineering better careers.</p>
        </footer>
      </div>
    </>
  );
}
