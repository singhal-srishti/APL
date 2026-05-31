import React from 'react';
import { ATSScore } from '@/lib/types';
import styles from '@/styles/components.module.css';

interface ATSOptimizationProps {
  atsScore: ATSScore;
}

export const ATSOptimization: React.FC<ATSOptimizationProps> = ({
  atsScore,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className={styles.card}>
      <h3>Resume ATS Score</h3>

      <div className={styles.atsScore}>
        <div className={styles.scoreCircle}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={getScoreColor(atsScore.overallScore)}
              strokeWidth="8"
              strokeDasharray={`${(atsScore.overallScore / 100) * 314} 314`}
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="70"
              textAnchor="middle"
              fontSize="32"
              fontWeight="bold"
              fill={getScoreColor(atsScore.overallScore)}
            >
              {atsScore.overallScore}
            </text>
          </svg>
        </div>
      </div>

      <div className={styles.sections}>
        <h4>Section Scores:</h4>
        {Object.entries(atsScore.sections).map(([section, score]) => (
          <div key={section} className={styles.sectionItem}>
            <span>{section.replace(/([A-Z])/g, ' $1')}</span>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: `${score}%` }}></div>
            </div>
            <span>{Math.round(score)}%</span>
          </div>
        ))}
      </div>

      {atsScore.issues.length > 0 && (
        <div className={styles.issues}>
          <h4>Issues Found:</h4>
          <ul>
            {atsScore.issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {atsScore.suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <h4>Suggestions:</h4>
          <ul>
            {atsScore.suggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSOptimization;
