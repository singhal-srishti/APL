import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import RoleRecommendations from '@/components/RoleRecommendations';
import HiringProbability from '@/components/HiringProbability';
import ATSOptimization from '@/components/ATSOptimization';
import InterviewPrep from '@/components/InterviewPrep';
import MarketTrends from '@/components/MarketTrends';
import LearningPlanComponent from '@/components/LearningPlan';
import { RoleRecommendation, HiringProbability as HPType, ATSScore, InterviewPrepPlan, LearningPlan } from '@/lib/types';
import styles from '@/styles/dashboard.module.css';

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState<RoleRecommendation[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [hiringProb, setHiringProb] = useState<HPType | null>(null);
  const [atsScore, setAtsScore] = useState<{ atsScore: ATSScore; salaryBenchmark: any } | null>(null);
  const [prepPlan, setPrepPlan] = useState<InterviewPrepPlan | null>(null);
  const [learningPlan, setLearningPlan] = useState<LearningPlan | null>(null);
  const [trends, setTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recRes, trendsRes] = await Promise.all([
          fetch('/api/recommendations'),
          fetch('/api/market-trends'),
        ]);

        const recData = await recRes.json();
        setRecommendations(recData.recommendations);
        if (recData.recommendations.length > 0) {
          setSelectedJobId(recData.recommendations[0].job.id);
        }

        const trendsData = await trendsRes.json();
        setTrends(trendsData);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchJobData = async () => {
      if (!selectedJobId) return;

      try {
        const [probRes, atsRes, prepRes, learningRes] = await Promise.all([
          fetch(`/api/hiring-probability?jobId=${selectedJobId}`),
          fetch(`/api/ats-score?jobId=${selectedJobId}`),
          fetch(`/api/interview-prep?jobId=${selectedJobId}`),
          fetch(`/api/learning-plan?jobId=${selectedJobId}`),
        ]);

        const probData = await probRes.json();
        setHiringProb(probData);

        const atsData = await atsRes.json();
        setAtsScore(atsData);

        const prepData = await prepRes.json();
        setPrepPlan(prepData);

        const learningData = await learningRes.json();
        setLearningPlan(learningData);
      } catch (error) {
        console.error('Failed to fetch job data:', error);
      }
    };

    fetchJobData();
  }, [selectedJobId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your career intelligence...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Career Advisor - Beyond the Resume</title>
        <meta
          name="description"
          content="AI Career Intelligence Platform"
        />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1>🎯 Career Advisor</h1>
          <p>Don't just search jobs — engineer your career</p>
        </header>

        <nav className={styles.nav}>
          <a href="#recommendations">Recommendations</a>
          <a href="#market">Market Trends</a>
          <a href="#details">Job Details</a>
          <a href="#learning">Learning Plan</a>
        </nav>

        <main className={styles.main}>
          <section id="recommendations" className={styles.section}>
            {recommendations.length > 0 && (
              <RoleRecommendations
                recommendations={recommendations}
                onSelectJob={setSelectedJobId}
              />
            )}
          </section>

          <section id="market" className={styles.section}>
            {trends && <MarketTrends trends={trends} />}
          </section>

          {selectedJobId && (
            <section id="details" className={styles.section}>
              <h2>Selected Job Analysis</h2>
              <div className={styles.detailsGrid}>
                {hiringProb && (
                  <HiringProbability probability={hiringProb} />
                )}
                {atsScore && (
                  <ATSOptimization atsScore={atsScore.atsScore} />
                )}
              </div>

              {atsScore && (
                <div className={styles.salaryBenchmark}>
                  <h3>Salary Benchmark</h3>
                  <div className={styles.benchmarkInfo}>
                    <div>
                      <strong>Market Median:</strong> ${atsScore.salaryBenchmark.median.toLocaleString()}
                    </div>
                    <div>
                      <strong>Range:</strong> ${atsScore.salaryBenchmark.range.min.toLocaleString()} - ${atsScore.salaryBenchmark.range.max.toLocaleString()}
                    </div>
                    <div>
                      <strong>Status:</strong> {atsScore.salaryBenchmark.marketComparison}
                    </div>
                  </div>
                </div>
              )}

              {prepPlan && (
                <InterviewPrep prepPlan={prepPlan} />
              )}

              {learningPlan && (
                <section id="learning" className={styles.section}>
                  <LearningPlanComponent learningPlan={learningPlan} />
                </section>
              )}
            </section>
          )}
        </main>

        <footer className={styles.footer}>
          <p>Career Advisor © 2025 | Engineering Your Future</p>
        </footer>
      </div>
    </>
  );
}
