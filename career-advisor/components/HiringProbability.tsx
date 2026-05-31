import React from 'react';
import { HiringProbability } from '@/lib/types';
import styles from '@/styles/components.module.css';

interface HiringProbabilityProps {
  probability: HiringProbability;
}

export const HiringProbabilityComponent: React.FC<HiringProbabilityProps> = ({
  probability,
}) => {
  const getColorClass = (prob: number) => {
    if (prob >= 70) return styles.excellent;
    if (prob >= 50) return styles.good;
    return styles.challenging;
  };

  return (
    <div className={`${styles.card} ${getColorClass(probability.probability)}`}>
      <h3>Hiring Probability</h3>
      <div className={styles.probabilityScore}>
        <div className={styles.score}>{probability.probability}%</div>
      </div>

      <div className={styles.factors}>
        <h4>Score Breakdown:</h4>
        <div className={styles.factor}>
          <span>Skill Match</span>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{
                width: `${probability.factors.skillMatch}%`,
              }}
            ></div>
          </div>
          <span>{Math.round(probability.factors.skillMatch)}%</span>
        </div>
        <div className={styles.factor}>
          <span>Experience Match</span>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{
                width: `${probability.factors.experienceMatch}%`,
              }}
            ></div>
          </div>
          <span>{Math.round(probability.factors.experienceMatch)}%</span>
        </div>
        <div className={styles.factor}>
          <span>Education Match</span>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{
                width: `${probability.factors.educationMatch}%`,
              }}
            ></div>
          </div>
          <span>{Math.round(probability.factors.educationMatch)}%</span>
        </div>
        <div className={styles.factor}>
          <span>Location Match</span>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{
                width: `${probability.factors.locationMatch}%`,
              }}
            ></div>
          </div>
          <span>{Math.round(probability.factors.locationMatch)}%</span>
        </div>
      </div>

      <p className={styles.explanation}>{probability.explanation}</p>
    </div>
  );
};

export default HiringProbabilityComponent;
