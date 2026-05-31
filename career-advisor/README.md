# 🎯 Career Advisor - AI Career Intelligence Platform

> **Don't just search jobs — engineer your career**

A comprehensive AI-powered career intelligence platform that fuses job postings, candidate profiles, and labor-market trends into personalized, actionable guidance.

## 🚀 Features

### 1. **Role Recommendations**
- Personalized job matches based on skills and experience
- Match scores indicating compatibility percentage
- Reasoning behind each recommendation

### 2. **Skill-Gap Analysis**
- Identifies critical, high, medium, and low-priority skill gaps
- Shows proficiency levels needed for each skill
- Helps prioritize learning efforts

### 3. **Hiring Probability Scores**
- Data-driven probability of getting hired for each role
- Breakdown by skill match, experience, education, and location
- Factors in competition and market trends

### 4. **Salary Benchmarks**
- Market rate analysis for your target roles
- Salary comparison vs. job posting
- Regional salary variations

### 5. **Resume/ATS Optimization**
- ATS (Applicant Tracking System) score (0-100)
- Section-by-section scoring (contact info, skills, experience, etc.)
- Specific issues and actionable suggestions
- Optimized resume generation

### 6. **Interview Preparation Plans**
- Customized technical topic preparation
- Behavioral interview questions
- Company culture insights
- Mock interview scripts
- Estimated prep time

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: Next.js API Routes
- **Styling**: CSS Modules
- **Data**: Mock data with scalable architecture for real APIs

## 📁 Project Structure

```
career-advisor/
├── pages/
│   ├── api/
│   │   ├── recommendations.ts       # Role recommendations endpoint
│   │   ├── hiring-probability.ts    # Hiring probability calculation
│   │   ├── ats-score.ts            # ATS optimization analysis
│   │   ├── interview-prep.ts       # Interview preparation plans
│   │   └── market-trends.ts        # Labor market trends
│   ├── dashboard.tsx                # Main dashboard page
│   ├── index.tsx                    # Home page
│   ├── _app.tsx                     # App wrapper
│   └── _document.tsx                # HTML document
├── components/
│   ├── RoleRecommendations.tsx      # Role recommendations display
│   ├── HiringProbability.tsx        # Hiring probability component
│   ├── ATSOptimization.tsx          # ATS score display
│   ├── InterviewPrep.tsx            # Interview prep component
│   └── MarketTrends.tsx             # Market trends display
├── lib/
│   ├── types.ts                     # TypeScript interfaces
│   ├── roleRecommendations.ts       # Role matching algorithm
│   ├── hiringProbability.ts         # Probability calculation
│   ├── atsOptimization.ts           # ATS analysis & optimization
│   └── interviewPrep.ts             # Interview prep generation
├── data/
│   └── mockData.ts                  # Sample data
├── styles/
│   ├── globals.css                  # Global styles
│   ├── components.module.css        # Component styles
│   ├── dashboard.module.css         # Dashboard styles
│   └── home.module.css              # Home page styles
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Navigate to the project**:
```bash
cd career-advisor
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
```
http://localhost:3000
```

## 📊 How It Works

### The Intelligence Engine

1. **Candidate Profile Analysis**
   - Parses skills and experience level
   - Calculates skill proficiency scores

2. **Job Matching**
   - Compares candidate skills with job requirements
   - Weights by importance (critical, high, medium, low)
   - Factors in experience level and location

3. **Probability Calculation**
   - Skill match (40% weight)
   - Experience match (30% weight)
   - Education match (15% weight)
   - Location match (15% weight)
   - Adjusts based on competition and market hiring rate

4. **ATS Optimization**
   - Scans resume for key sections
   - Validates formatting and structure
   - Suggests keyword improvements
   - Generates optimized version

5. **Interview Prep**
   - Maps skills to technical topics
   - Generates role-specific behavioral questions
   - Creates mock interview scripts
   - Estimates preparation time

## 📈 Scoring Formulas

### Role Match Score
```
match_score = (
  skill_match * 0.6 +
  experience_match * 0.2 +
  location_match * 0.1 +
  salary_alignment * 0.1
)
```

### Hiring Probability
```
probability = base_score * competition_factor * hiring_rate_factor
```

## 🔄 API Endpoints

- `GET /api/recommendations` - Get role recommendations
- `GET /api/hiring-probability?jobId=xxx` - Get hiring probability for a job
- `GET /api/ats-score?jobId=xxx` - Get ATS score for a job
- `GET /api/interview-prep?jobId=xxx` - Get interview prep plan
- `GET /api/market-trends` - Get labor market trends

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode Ready**: CSS variables for easy theming
- **Accessibility**: Semantic HTML and ARIA labels
- **Interactive Components**: Collapsible sections, progress bars, charts

## 📊 Sample Data

The platform comes with sample data including:
- 5 job postings across different roles and levels
- 1 sample candidate profile
- Labor market trends and salary benchmarks
- Hiring difficulty by location

## 🚀 Future Enhancements

- [ ] Real job API integrations (Indeed, LinkedIn, Glassdoor)
- [ ] User authentication and profiles
- [ ] Resume upload and parsing
- [ ] Real-time AI recommendations
- [ ] Interview video recording and playback
- [ ] Networking suggestions
- [ ] Salary negotiation guide
- [ ] Career path visualization
- [ ] Skill learning recommendations with course links

## 📝 Development Guide

### Adding a New Feature

1. Create types in `lib/types.ts`
2. Implement algorithm in `lib/featureName.ts`
3. Create API endpoint in `pages/api/featureName.ts`
4. Create React component in `components/FeatureName.tsx`
5. Add styling in `styles/components.module.css`
6. Integrate into dashboard

### Testing

Mock data can be easily swapped with real APIs by modifying:
- `data/mockData.ts` → Connect to real job APIs
- `lib/` algorithms → Add ML models if desired
- `pages/api/` → Add database queries

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for career engineers everywhere**
