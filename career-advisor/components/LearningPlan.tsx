import React from 'react';
import { LearningPlan } from '@/lib/types';
import styles from '@/styles/components.module.css';

interface LearningPlanProps {
  learningPlan: LearningPlan;
}

export const LearningPlanComponent: React.FC<LearningPlanProps> = ({ learningPlan }) => {
  return (
    <div className={styles.card}>
      <h3>Personalized Learning Plan</h3>
      <p className={styles.learningSummary}>{learningPlan.learningSummary}</p>
      <p className={styles.overallFocus}>{learningPlan.overallFocus}</p>

      <div className={styles.lessonGrid}>
        {learningPlan.actionItems.map((item) => (
          <div key={item.skill} className={styles.learningItem}>
            <div className={styles.learningHeader}>
              <span className={styles.learningSkill}>{item.skill}</span>
              <span className={styles.learningBadge}>{item.importance}</span>
            </div>
            <p className={styles.learningDetail}>Gap: {item.gapPercent}%</p>
            <p className={styles.learningDetail}>Suggested timeline: {item.timelineWeeks} weeks</p>
            <ul className={styles.courseList}>
              {item.suggestedCourses.map((course, index) => (
                <li key={index} className={styles.courseItem}>
                  <a href={course.url} target="_blank" rel="noreferrer">
                    {course.title}
                  </a>
                  <span className={styles.courseProvider}>{course.provider}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPlanComponent;
