import React from 'react';
import { RoleRecommendation } from '@/lib/types';
import styles from '@/styles/components.module.css';

interface RoleRecommendationsProps {
  recommendations: RoleRecommendation[];
  onSelectJob: (jobId: string) => void;
}

export const RoleRecommendations: React.FC<RoleRecommendationsProps> = ({
  recommendations,
  onSelectJob,
}) => {
  return (
    <div className={styles.container}>
      <h2>Recommended Roles</h2>
      <div className={styles.recommendationsList}>
        {recommendations.map((rec) => (
          <div key={rec.job.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{rec.job.title}</h3>
              <span className={styles.matchScore}>{rec.matchScore}% match</span>
            </div>
            <p className={styles.company}>{rec.job.company}</p>
            <p className={styles.location}>{rec.job.location}</p>
            <div className={styles.salary}>
              ${rec.job.salary.min.toLocaleString()} - ${rec.job.salary.max.toLocaleString()}
            </div>
            <p className={styles.reasoning}>{rec.reasoning}</p>
            <div className={styles.skillGaps}>
              <h4>Top Skill Gaps:</h4>
              {rec.skillGaps.slice(0, 3).map((gap) => (
                <span key={gap.skill} className={styles.gap}>
                  {gap.skill} ({Math.round(gap.gap)}%)
                </span>
              ))}
            </div>
            <button
              onClick={() => onSelectJob(rec.job.id)}
              className={styles.button}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleRecommendations;
