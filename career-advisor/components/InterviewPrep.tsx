import React from 'react';
import { InterviewPrepPlan } from '@/lib/types';
import styles from '@/styles/components.module.css';

interface InterviewPrepProps {
  prepPlan: InterviewPrepPlan;
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ prepPlan }) => {
  const [expandedTopic, setExpandedTopic] = React.useState<string | null>(null);

  return (
    <div className={styles.card}>
      <h3>Interview Preparation Plan</h3>

      <div className={styles.prepTime}>
        <strong>Estimated Prep Time:</strong> {prepPlan.estimatedPrep} hours
      </div>

      <div className={styles.section}>
        <h4>Technical Topics</h4>
        {prepPlan.technicalTopics.map((topic, i) => (
          <div key={i} className={styles.topic}>
            <div
              className={styles.topicHeader}
              onClick={() =>
                setExpandedTopic(expandedTopic === `tech-${i}` ? null : `tech-${i}`)
              }
            >
              <span>
                {topic.topic}{' '}
                <span className={styles.importance}>{topic.importance}</span>
              </span>
              <span className={styles.arrow}>
                {expandedTopic === `tech-${i}` ? '▼' : '▶'}
              </span>
            </div>
            {expandedTopic === `tech-${i}` && (
              <ul className={styles.resources}>
                {topic.resources.map((resource, j) => (
                  <li key={j}>{resource}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h4>Behavioral Questions</h4>
        {prepPlan.behavioralQuestions.map((question, i) => (
          <div key={i} className={styles.question}>
            <strong>Q{i + 1}:</strong> {question}
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h4>Company Culture Insights</h4>
        <ul>
          {prepPlan.companyCultureFacts.map((fact, i) => (
            <li key={i}>{fact}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h4>Mock Interview Script</h4>
        <pre className={styles.mockScript}>{prepPlan.mockInterviewScript}</pre>
      </div>
    </div>
  );
};

export default InterviewPrep;
