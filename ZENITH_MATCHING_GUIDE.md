# Zenith Matching System - Technical Documentation

## Overview
The Zenith Matching System is a sophisticated candidate-job matching algorithm that analyzes multiple factors to calculate a compatibility score between candidates and job positions.

## How It Works

### Scoring Algorithm
The Zenith Match Score is calculated using a weighted average of four key components:

1. **Skills Match (40% weight)**
   - Compares candidate skills against required and preferred job skills
   - Uses fuzzy matching to recognize similar technologies (e.g., "React" matches "ReactJS")
   - Required skills are weighted more heavily than preferred skills
   - Score range: 0-100

2. **Experience Match (25% weight)**
   - Evaluates if candidate's experience aligns with job requirements
   - Perfect score for candidates who meet or slightly exceed requirements
   - Reduced score for over-qualification or under-qualification
   - Score range: 0-100

3. **Education Match (15% weight)**
   - Compares candidate's education level with preferred qualifications
   - Accepts various education paths (traditional degrees, bootcamps, self-taught)
   - Score range: 0-100

4. **Position Match (20% weight)**
   - Analyzes how closely the candidate's target position matches the job
   - Uses keyword matching and semantic similarity
   - Score range: 0-100

5. **Certification Bonus (up to +10 points)**
   - Additional points for relevant certifications
   - Bonus is added on top of the base score
   - Final score capped at 100

### Final Score Calculation

```typescript
finalScore = min(100, 
  (skillsScore × 0.40) + 
  (experienceScore × 0.25) + 
  (educationScore × 0.15) + 
  (positionScore × 0.20) + 
  certificationBonus
)
```

## Score Interpretation

- **90-100**: Excellent match - Strong candidate for the position
- **75-89**: Good match - Candidate meets most requirements
- **60-74**: Fair match - Candidate has some relevant qualifications
- **45-59**: Moderate match - Significant gaps exist
- **Below 45**: Poor match - Major misalignment

## Implementation

### Location
- Algorithm: `src/lib/zenith-matching.ts`
- Usage: `src/pages/HRPage.tsx`
- Form: `src/components/hr/add-candidate-dialog.tsx`

### Key Functions

#### `calculateZenithMatchScore(candidate, jobRequirements)`
Returns the final match score (0-100) for a candidate.

**Parameters:**
- `candidate`: Object containing candidate information
  - `candidateId`: Unique identifier
  - `position`: Target position
  - `skills`: Comma-separated list of skills
  - `experience`: Experience range ("0-2", "2-5", "5-10", "10+")
  - `education`: Education level
  - `certifications`: Optional comma-separated certifications

- `jobRequirements`: Object containing job criteria
  - `position`: Job title
  - `requiredSkills`: Array of must-have skills
  - `preferredSkills`: Array of nice-to-have skills
  - `minExperience`: Minimum experience required
  - `preferredEducation`: Array of acceptable education levels
  - `certifications`: Optional array of valuable certifications

**Example:**
```typescript
const candidate = {
  candidateId: "CAND-12345",
  position: "Senior Developer",
  skills: "React, Node.js, TypeScript, AWS",
  experience: "5-10 years",
  education: "Bachelor's Degree",
  certifications: "AWS Certified Developer"
}

const jobReqs = defaultJobRequirements["Senior Developer"]
const score = calculateZenithMatchScore(candidate, jobReqs)
// Returns: 85 (example)
```

#### `getZenithScoreBreakdown(candidate, jobRequirements)`
Returns detailed breakdown of the score calculation for transparency.

**Returns:**
```typescript
{
  skills: { score: 90, weight: 40, weighted: 36 },
  experience: { score: 100, weight: 25, weighted: 25 },
  education: { score: 80, weight: 15, weighted: 12 },
  position: { score: 95, weight: 20, weighted: 19 },
  certificationBonus: 5,
  total: 97
}
```

### Predefined Job Requirements

The system includes default requirements for common positions:
- Senior Developer
- Product Manager
- UX Designer
- Marketing Manager
- Sales Representative
- Data Analyst
- DevOps Engineer

Access via: `defaultJobRequirements[positionName]`

## Skills Similarity Detection

The system includes fuzzy matching for related skills:

### Technology Families
- **JavaScript**: js, typescript, ts, node, nodejs
- **React**: reactjs, react.js, next, nextjs
- **Python**: py, django, flask
- **Java**: spring, springboot
- **CSS**: scss, sass, tailwind, bootstrap
- **AWS**: amazon web services, ec2, s3, lambda
- **Docker**: containers, kubernetes, k8s
- **SQL**: mysql, postgresql, postgres, database

This ensures candidates aren't penalized for naming variations.

## Adding New Job Requirements

To add requirements for a new position:

```typescript
export const defaultJobRequirements: Record<string, JobRequirements> = {
  // ... existing positions ...
  
  "Your Position": {
    position: "Your Position",
    requiredSkills: ["skill1", "skill2", "skill3"],
    preferredSkills: ["skill4", "skill5"],
    minExperience: "2-5",
    preferredEducation: ["Bachelor's Degree", "Master's Degree"],
    certifications: ["cert1", "cert2"]
  }
}
```

## Resume Integration

When candidates upload resumes, the system:

1. **Extracts text** from PDF/DOC/TXT files
2. **Redacts PII** (names, emails, phones, addresses)
3. **Parses skills** from resume content
4. **Calculates match score** automatically
5. **Displays score** in candidate listings

## Candidate Form Fields

The anonymous candidate form collects:
- Candidate ID (auto-generated if blank)
- Position Applied For
- Resume Upload (with auto-redaction)
- Skills & Technologies
- Years of Experience
- Education Level
- Certifications (optional but improves matching)
- Assigned Recruiter
- Anonymous Notes

## Real-Time Scoring

Scores are calculated in real-time when:
- Viewing candidate lists
- Adding new candidates
- Updating candidate information
- Filtering by position

No backend API calls required - all calculations happen client-side for speed.

## Privacy & Anonymity

The Zenith Matching System maintains full anonymity:
- Only evaluates skills, experience, education
- No personal identifiable information used in scoring
- Candidate IDs used instead of names
- Resume PII automatically redacted

## Testing the System

### Test with Real Data

1. Navigate to HR → Recruitment tab
2. Click "Add Anonymous Candidate"
3. Fill out the form with real candidate information
4. Submit the form
5. View the calculated Zenith Match Score in the candidate list

### Expected Results

For a Senior Developer candidate with:
- Skills: "React, Node.js, TypeScript, JavaScript, AWS"
- Experience: "5-10 years"
- Education: "Bachelor's Degree"
- Certifications: "AWS Certified Developer"

Expected score: **85-95** (Excellent match)

### Score Variations

Modify candidate attributes to see score changes:
- Remove required skills → Score drops significantly
- Increase experience to "10+" → Score may drop slightly (overqualified)
- Add more certifications → Score increases by 5-10 points
- Change position to unrelated field → Score drops dramatically

## Future Enhancements

Potential improvements to the matching system:

1. **Machine Learning Integration**
   - Learn from hiring outcomes
   - Adjust weights based on successful hires
   - Identify non-obvious skill correlations

2. **Industry-Specific Scoring**
   - Different weights for different industries
   - Custom scoring models per company

3. **Soft Skills Assessment**
   - Add communication skills evaluation
   - Include leadership potential scoring

4. **Location Matching**
   - Factor in geographic preferences
   - Remote work compatibility scoring

5. **Salary Range Alignment**
   - Compare candidate expectations with budget
   - Flag misalignments early

6. **Cultural Fit Scoring**
   - Assess values alignment
   - Team compatibility prediction

## Support

For questions or issues with the Zenith Matching System:
- Check this documentation first
- Review the code comments in `zenith-matching.ts`
- Test with the provided examples
- Adjust weights and requirements as needed

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Status**: Production Ready






