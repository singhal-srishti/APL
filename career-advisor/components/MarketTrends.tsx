import React from 'react';
import styles from '@/styles/components.module.css';

interface MarketTrendsProps {
  trends: {
    topSkills: any[];
    averageSalaries: any;
    hiringMarket: any;
  };
}

export const MarketTrends: React.FC<MarketTrendsProps> = ({ trends }) => {
  return (
    <div className={styles.card}>
      <h3>Labor Market Trends</h3>

      <div className={styles.section}>
        <h4>Top In-Demand Skills</h4>
        <div className={styles.skillsList}>
          {trends.topSkills.map((skill, i) => (
            <div key={i} className={styles.skillItem}>
              <span>{skill.skill}</span>
              <div className={styles.bar}>
                <div
                  className={`${styles.fill} ${
                    skill.trend === 'up' ? styles.trending : ''
                  }`}
                  style={{ width: `${skill.demand}%` }}
                ></div>
              </div>
              <span>{skill.demand}% demand</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4>Market Salary Data</h4>
        <div className={styles.salaryTable}>
          {Object.entries(trends.averageSalaries).map(([role, data]: [string, any]) => (
            <div key={role} className={styles.salaryRow}>
              <span>{role}</span>
              <span className={styles.salaryRange}>
                ${data.median.toLocaleString()} (median)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4>Hiring Market Difficulty</h4>
        <div className={styles.marketDifficulty}>
          {Object.entries(trends.hiringMarket).map(([location, data]: [string, any]) => (
            <div key={location} className={styles.difficultyItem}>
              <span>{location}</span>
              <span className={styles.difficulty}>{data.difficulty}</span>
              <span className={styles.timeToHire}>
                ~{data.avgTimeToHire} days to hire
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;
