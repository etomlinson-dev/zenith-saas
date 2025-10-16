// Zenith Matching Algorithm
// Calculates candidate-job match scores based on multiple factors

export interface JobRequirements {
  position: string
  requiredSkills: string[]
  preferredSkills: string[]
  minExperience: string // "0-2", "2-5", "5-10", "10+"
  preferredEducation: string[]
  certifications?: string[]
}

export interface Candidate {
  candidateId: string
  position: string
  skills: string
  experience: string
  education: string
  certifications?: string
}

// Convert experience range to numeric value for comparison
const experienceToYears = (exp: string): number => {
  switch (exp) {
    case "0-2":
      return 1
    case "2-5":
      return 3.5
    case "5-10":
      return 7.5
    case "10+":
      return 12
    default:
      return 0
  }
}

// Calculate skills match (40% weight)
const calculateSkillsMatch = (candidateSkills: string, jobRequirements: JobRequirements): number => {
  if (!candidateSkills) return 0

  const candidateSkillsList = candidateSkills
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  const requiredSkills = jobRequirements.requiredSkills.map((s) => s.toLowerCase())
  const preferredSkills = jobRequirements.preferredSkills.map((s) => s.toLowerCase())

  // Check required skills matches
  let requiredMatches = 0
  requiredSkills.forEach((reqSkill) => {
    const matched = candidateSkillsList.some((candSkill) => {
      return (
        candSkill.includes(reqSkill) ||
        reqSkill.includes(candSkill) ||
        areSkillsSimilar(candSkill, reqSkill)
      )
    })
    if (matched) requiredMatches++
  })

  // Check preferred skills matches
  let preferredMatches = 0
  preferredSkills.forEach((prefSkill) => {
    const matched = candidateSkillsList.some((candSkill) => {
      return (
        candSkill.includes(prefSkill) ||
        prefSkill.includes(candSkill) ||
        areSkillsSimilar(candSkill, prefSkill)
      )
    })
    if (matched) preferredMatches++
  })

  // Calculate score (required skills are more important)
  const requiredScore = requiredSkills.length > 0 ? (requiredMatches / requiredSkills.length) * 70 : 70
  const preferredScore = preferredSkills.length > 0 ? (preferredMatches / preferredSkills.length) * 30 : 30

  return Math.min(100, requiredScore + preferredScore)
}

// Fuzzy matching for similar skills
const areSkillsSimilar = (skill1: string, skill2: string): boolean => {
  const similarityMap: Record<string, string[]> = {
    javascript: ["js", "typescript", "ts", "node", "nodejs"],
    react: ["reactjs", "react.js", "next", "nextjs"],
    python: ["py", "django", "flask"],
    java: ["spring", "springboot"],
    css: ["scss", "sass", "tailwind", "bootstrap"],
    aws: ["amazon web services", "ec2", "s3", "lambda"],
    docker: ["containers", "kubernetes", "k8s"],
    sql: ["mysql", "postgresql", "postgres", "database"],
  }

  for (const [key, values] of Object.entries(similarityMap)) {
    if (
      (skill1.includes(key) && values.some((v) => skill2.includes(v))) ||
      (skill2.includes(key) && values.some((v) => skill1.includes(v)))
    ) {
      return true
    }
  }

  return false
}

// Calculate experience match (25% weight)
const calculateExperienceMatch = (
  candidateExperience: string,
  jobRequirements: JobRequirements,
): number => {
  if (!candidateExperience) return 0

  const candidateYears = experienceToYears(candidateExperience)
  const requiredYears = experienceToYears(jobRequirements.minExperience)

  // Perfect match if candidate meets or slightly exceeds requirements
  if (candidateYears >= requiredYears && candidateYears <= requiredYears + 3) {
    return 100
  }

  // Good match if candidate has more experience
  if (candidateYears > requiredYears + 3) {
    return Math.max(70, 100 - (candidateYears - requiredYears - 3) * 5)
  }

  // Lower match if candidate has less experience
  if (candidateYears < requiredYears) {
    const gap = requiredYears - candidateYears
    return Math.max(30, 100 - gap * 15)
  }

  return 50
}

// Calculate education match (15% weight)
const calculateEducationMatch = (candidateEducation: string, jobRequirements: JobRequirements): number => {
  if (!candidateEducation) return 50

  const educationLevels: Record<string, number> = {
    "High School": 1,
    Associate: 2,
    "Associate Degree": 2,
    Bachelor: 3,
    "Bachelor's Degree": 3,
    Master: 4,
    "Master's Degree": 4,
    PhD: 5,
    "PhD/Doctorate": 5,
    Bootcamp: 2.5,
    "Coding Bootcamp": 2.5,
    "Self-Taught": 2,
  }

  const candidateLevel = educationLevels[candidateEducation] || 2

  // Check if candidate's education matches any preferred education
  const preferredMatches = jobRequirements.preferredEducation.some((pref) => {
    const prefLevel = educationLevels[pref] || 3
    // Match if candidate meets or exceeds preferred level
    return candidateLevel >= prefLevel - 0.5
  })

  if (preferredMatches) {
    return 100
  }

  // Calculate based on average preferred level
  const avgPreferredLevel =
    jobRequirements.preferredEducation.reduce((sum, pref) => sum + (educationLevels[pref] || 3), 0) /
    jobRequirements.preferredEducation.length

  const difference = Math.abs(candidateLevel - avgPreferredLevel)
  return Math.max(40, 100 - difference * 20)
}

// Calculate position match (20% weight)
const calculatePositionMatch = (candidatePosition: string, jobRequirements: JobRequirements): number => {
  if (!candidatePosition || !jobRequirements.position) return 50

  const candPos = candidatePosition.toLowerCase()
  const reqPos = jobRequirements.position.toLowerCase()

  // Exact match
  if (candPos === reqPos) {
    return 100
  }

  // Partial match (contains key words)
  const reqWords = reqPos.split(" ").filter((w) => w.length > 3)
  const candWords = candPos.split(" ").filter((w) => w.length > 3)

  let matchedWords = 0
  reqWords.forEach((reqWord) => {
    if (candWords.some((candWord) => candWord.includes(reqWord) || reqWord.includes(candWord))) {
      matchedWords++
    }
  })

  if (reqWords.length > 0) {
    return Math.min(100, (matchedWords / reqWords.length) * 100 + 20)
  }

  return 50
}

// Calculate bonus points for certifications
const calculateCertificationBonus = (
  candidateCertifications: string | undefined,
  jobRequirements: JobRequirements,
): number => {
  if (!candidateCertifications || !jobRequirements.certifications) return 0

  const candCerts = candidateCertifications.toLowerCase().split(",").map((c) => c.trim())
  const reqCerts = jobRequirements.certifications.map((c) => c.toLowerCase())

  let matches = 0
  reqCerts.forEach((reqCert) => {
    if (candCerts.some((candCert) => candCert.includes(reqCert) || reqCert.includes(candCert))) {
      matches++
    }
  })

  // Up to +10 bonus points for certifications
  return Math.min(10, matches * 5)
}

// Main Zenith Matching Score Calculator
export const calculateZenithMatchScore = (
  candidate: Candidate,
  jobRequirements: JobRequirements,
): number => {
  // Calculate individual components
  const skillsScore = calculateSkillsMatch(candidate.skills, jobRequirements) * 0.4 // 40% weight
  const experienceScore = calculateExperienceMatch(candidate.experience, jobRequirements) * 0.25 // 25% weight
  const educationScore = calculateEducationMatch(candidate.education, jobRequirements) * 0.15 // 15% weight
  const positionScore = calculatePositionMatch(candidate.position, jobRequirements) * 0.2 // 20% weight

  // Base score (sum of weighted components)
  const baseScore = skillsScore + experienceScore + educationScore + positionScore

  // Add bonus points
  const certificationBonus = calculateCertificationBonus(candidate.certifications, jobRequirements)

  // Final score (capped at 100)
  const finalScore = Math.min(100, Math.round(baseScore + certificationBonus))

  return finalScore
}

// Get detailed breakdown of the score (for debugging or showing to users)
export const getZenithScoreBreakdown = (candidate: Candidate, jobRequirements: JobRequirements) => {
  const skillsScore = calculateSkillsMatch(candidate.skills, jobRequirements)
  const experienceScore = calculateExperienceMatch(candidate.experience, jobRequirements)
  const educationScore = calculateEducationMatch(candidate.education, jobRequirements)
  const positionScore = calculatePositionMatch(candidate.position, jobRequirements)
  const certificationBonus = calculateCertificationBonus(candidate.certifications, jobRequirements)

  return {
    skills: {
      score: Math.round(skillsScore),
      weight: 40,
      weighted: Math.round(skillsScore * 0.4),
    },
    experience: {
      score: Math.round(experienceScore),
      weight: 25,
      weighted: Math.round(experienceScore * 0.25),
    },
    education: {
      score: Math.round(educationScore),
      weight: 15,
      weighted: Math.round(educationScore * 0.15),
    },
    position: {
      score: Math.round(positionScore),
      weight: 20,
      weighted: Math.round(positionScore * 0.2),
    },
    certificationBonus: Math.round(certificationBonus),
    total: calculateZenithMatchScore(candidate, jobRequirements),
  }
}

// Default job requirements for common positions
export const defaultJobRequirements: Record<string, JobRequirements> = {
  "Senior Developer": {
    position: "Senior Developer",
    requiredSkills: ["javascript", "react", "node", "typescript"],
    preferredSkills: ["aws", "docker", "kubernetes", "ci/cd"],
    minExperience: "5-10",
    preferredEducation: ["Bachelor's Degree", "Master's Degree", "Coding Bootcamp"],
    certifications: ["aws certified", "azure certified"],
  },
  "Product Manager": {
    position: "Product Manager",
    requiredSkills: ["agile", "product strategy", "roadmapping", "stakeholder management"],
    preferredSkills: ["sql", "analytics", "jira", "user research"],
    minExperience: "5-10",
    preferredEducation: ["Bachelor's Degree", "Master's Degree", "MBA"],
    certifications: ["pmp", "cspo", "product management"],
  },
  "UX Designer": {
    position: "UX Designer",
    requiredSkills: ["figma", "user research", "prototyping", "wireframing"],
    preferredSkills: ["sketch", "adobe xd", "user testing", "design systems"],
    minExperience: "2-5",
    preferredEducation: ["Bachelor's Degree", "Associate Degree"],
    certifications: ["ux certification", "design thinking"],
  },
  "Marketing Manager": {
    position: "Marketing Manager",
    requiredSkills: ["seo", "content strategy", "analytics", "social media"],
    preferredSkills: ["google analytics", "hubspot", "email marketing", "ppc"],
    minExperience: "5-10",
    preferredEducation: ["Bachelor's Degree", "Master's Degree"],
    certifications: ["google analytics", "hubspot", "digital marketing"],
  },
  "Sales Representative": {
    position: "Sales Representative",
    requiredSkills: ["b2b sales", "crm", "negotiation", "lead generation"],
    preferredSkills: ["salesforce", "cold calling", "account management"],
    minExperience: "2-5",
    preferredEducation: ["Bachelor's Degree", "Associate Degree"],
    certifications: ["sales certification", "salesforce certified"],
  },
  "Data Analyst": {
    position: "Data Analyst",
    requiredSkills: ["sql", "python", "data visualization", "excel"],
    preferredSkills: ["tableau", "power bi", "r", "statistical analysis"],
    minExperience: "2-5",
    preferredEducation: ["Bachelor's Degree", "Master's Degree"],
    certifications: ["tableau", "power bi", "data analytics"],
  },
  "DevOps Engineer": {
    position: "DevOps Engineer",
    requiredSkills: ["docker", "kubernetes", "ci/cd", "linux"],
    preferredSkills: ["terraform", "ansible", "jenkins", "aws"],
    minExperience: "5-10",
    preferredEducation: ["Bachelor's Degree", "Coding Bootcamp"],
    certifications: ["aws certified", "kubernetes", "docker certified"],
  },
}






