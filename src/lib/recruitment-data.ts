// Recruitment Data Management System
// Handles anonymous application storage and recruiter access

export interface Application {
  id: string // Anonymous ID (e.g., "APL-2025-0001")
  anonymousId: string // Display ID for recruiters
  jobId: string
  jobTitle: string
  department: string
  status: "new" | "reviewing" | "interview-scheduled" | "interviewed" | "offer" | "rejected" | "withdrawn"
  appliedDate: string
  
  // Personal Information (hidden until revealed)
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
  }
  
  // Professional Information (visible to recruiters)
  professionalInfo: {
    resumeUrl?: string
    coverLetter: string
    linkedin?: string
    portfolio?: string
    resumeFileName?: string
  }
  
  // Metadata
  isRevealed: boolean // Whether personal info has been revealed
  revealedAt?: string
  revealedBy?: string // Recruiter who revealed the info
  
  // Recruiter notes
  notes?: string
  rating?: number // 1-5 stars
  interviewDate?: string
}

// Mock applications storage - synced with Candidate Pipeline
let mockApplications: Application[] = [
  {
    id: "CAND-M2K8L-4A7C",
    anonymousId: "CAND-M2K8L-4A7C",
    jobId: "1",
    jobTitle: "Senior Developer",
    department: "Engineering",
    status: "new",
    appliedDate: "2025-01-08",
    personalInfo: {
      firstName: "Marcus",
      lastName: "Thompson",
      email: "marcus.thompson@email.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA"
    },
    professionalInfo: {
      resumeFileName: "marcus_thompson_resume.pdf",
      coverLetter: "I am excited to apply for the Senior Developer position. With over 7 years of experience in React, Node.js, and TypeScript, I have successfully delivered scalable applications for Fortune 500 companies. My expertise includes microservices architecture, CI/CD pipelines, and leading development teams.",
      linkedin: "https://linkedin.com/in/marcusthompson",
      portfolio: "https://marcusdev.io"
    },
    isRevealed: false,
    rating: 4,
    notes: "Strong technical background. 5-10 years experience. AWS Certified Developer."
  },
  {
    id: "CAND-N3J9M-5B8D",
    anonymousId: "CAND-N3J9M-5B8D",
    jobId: "2",
    jobTitle: "Product Manager",
    department: "Product",
    status: "reviewing",
    appliedDate: "2025-01-03",
    personalInfo: {
      firstName: "Nicole",
      lastName: "Rodriguez",
      email: "nicole.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX"
    },
    professionalInfo: {
      resumeFileName: "nicole_rodriguez_resume.pdf",
      coverLetter: "As a seasoned Product Manager with 8 years of experience, I specialize in Agile methodologies, product strategy, and stakeholder management. I have successfully launched multiple products that achieved 200%+ ROI. My Master's degree in Business Administration complements my technical background, allowing me to bridge the gap between business and engineering teams.",
      linkedin: "https://linkedin.com/in/nicolerodriguez",
      portfolio: "https://nicolepm.com"
    },
    isRevealed: false,
    rating: 5,
    notes: "CSPO certified. Strong product strategy skills. Master's degree."
  },
  {
    id: "CAND-P4K1N-6C9E",
    anonymousId: "CAND-P4K1N-6C9E",
    jobId: "3",
    jobTitle: "UX Designer",
    department: "Design",
    status: "interviewed",
    appliedDate: "2024-12-28",
    personalInfo: {
      firstName: "Patricia",
      lastName: "Kim",
      email: "patricia.kim@email.com",
      phone: "+1 (555) 456-7890",
      location: "New York, NY"
    },
    professionalInfo: {
      resumeFileName: "patricia_kim_portfolio.pdf",
      coverLetter: "I am passionate about creating intuitive and accessible user experiences. With 4 years of experience in user research, prototyping, and visual design, I have worked with startups and established companies to deliver products that users love. My expertise in Figma, user testing, and design systems ensures that every design decision is data-driven.",
      linkedin: "https://linkedin.com/in/patriciakim",
      portfolio: "https://patriciadesigns.com"
    },
    isRevealed: true,
    revealedAt: "2025-01-12T14:30:00",
    revealedBy: "HR Manager",
    rating: 5,
    interviewDate: "2025-01-15",
    notes: "Excellent portfolio. Strong UX research background. UX certified. Identity revealed for interview scheduling."
  },
  {
    id: "CAND-Q5L2O-7D1F",
    anonymousId: "CAND-Q5L2O-7D1F",
    jobId: "4",
    jobTitle: "Senior Developer",
    department: "Engineering",
    status: "offer",
    appliedDate: "2024-12-20",
    personalInfo: {
      firstName: "Quentin",
      lastName: "Li",
      email: "quentin.li@email.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA"
    },
    professionalInfo: {
      resumeFileName: "quentin_li_resume.pdf",
      coverLetter: "I am writing to express my interest in the Senior Developer position. With over 12 years of experience in Python, AWS, Kubernetes, and Docker, I have architected and deployed cloud-native applications serving millions of users. My certifications include AWS Solutions Architect and Kubernetes Certified Administrator. I am passionate about building scalable, resilient systems.",
      linkedin: "https://linkedin.com/in/quentinli",
      portfolio: "https://quentintech.dev"
    },
    isRevealed: false,
    rating: 5,
    notes: "Outstanding candidate. 10+ years experience. AWS & Kubernetes certified. Offer status - can reveal identity."
  },
  {
    id: "CAND-R6M3P-8E2G",
    anonymousId: "CAND-R6M3P-8E2G",
    jobId: "5",
    jobTitle: "Marketing Manager",
    department: "Marketing",
    status: "new",
    appliedDate: "2025-01-09",
    personalInfo: {
      firstName: "Rachel",
      lastName: "Martinez",
      email: "rachel.martinez@email.com",
      phone: "+1 (555) 678-9012",
      location: "Los Angeles, CA"
    },
    professionalInfo: {
      resumeFileName: "rachel_martinez_resume.pdf",
      coverLetter: "As a Marketing Manager with 7 years of experience, I specialize in SEO, content strategy, and data-driven marketing campaigns. I have increased organic traffic by 300% and conversion rates by 150% through strategic initiatives. My certifications in Google Analytics and HubSpot demonstrate my commitment to staying current with industry best practices.",
      linkedin: "https://linkedin.com/in/rachelmartinez"
    },
    isRevealed: false,
    rating: 4,
    notes: "Google Analytics and HubSpot certified. Strong SEO background."
  },
  {
    id: "CAND-S7N4Q-9F3H",
    anonymousId: "CAND-S7N4Q-9F3H",
    jobId: "6",
    jobTitle: "Sales Representative",
    department: "Sales",
    status: "reviewing",
    appliedDate: "2025-01-04",
    personalInfo: {
      firstName: "Samuel",
      lastName: "Nguyen",
      email: "samuel.nguyen@email.com",
      phone: "+1 (555) 789-0123",
      location: "Chicago, IL"
    },
    professionalInfo: {
      resumeFileName: "samuel_nguyen_resume.pdf",
      coverLetter: "I am excited to apply for the Sales Representative position. With 4 years of B2B sales experience and expertise in Salesforce CRM, I have consistently exceeded sales quotas by 120%+. My negotiation skills and ability to build lasting client relationships have resulted in a 95% client retention rate. I am Salesforce certified and passionate about driving revenue growth.",
      linkedin: "https://linkedin.com/in/samuelnguyen"
    },
    isRevealed: false,
    rating: 4,
    notes: "Salesforce certified. Strong B2B sales background. 2-5 years experience."
  }
]

// Generate unique anonymous ID
export function generateApplicationId(): string {
  const year = new Date().getFullYear()
  const existingIds = mockApplications
    .filter(app => app.id.includes(year.toString()))
    .map(app => parseInt(app.id.split('-')[2]))
  
  const nextNumber = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1
  return `APL-${year}-${String(nextNumber).padStart(4, '0')}`
}

// Create new application (called from careers page)
export function submitApplication(applicationData: {
  jobId: string
  jobTitle: string
  department: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  resume: File | null
  coverLetter: string
  linkedin?: string
  portfolio?: string
}): Application {
  const newApplication: Application = {
    id: generateApplicationId(),
    anonymousId: generateApplicationId(),
    jobId: applicationData.jobId,
    jobTitle: applicationData.jobTitle,
    department: applicationData.department,
    status: "new",
    appliedDate: new Date().toISOString().split('T')[0],
    personalInfo: {
      firstName: applicationData.firstName,
      lastName: applicationData.lastName,
      email: applicationData.email,
      phone: applicationData.phone,
      location: applicationData.location
    },
    professionalInfo: {
      resumeFileName: applicationData.resume?.name,
      coverLetter: applicationData.coverLetter,
      linkedin: applicationData.linkedin,
      portfolio: applicationData.portfolio
    },
    isRevealed: false
  }
  
  mockApplications.push(newApplication)
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('applicationSubmitted', { 
    detail: newApplication 
  }))
  
  console.log('New application submitted:', newApplication)
  return newApplication
}

// Get all applications (for recruiter dashboard)
export function getAllApplications(): Application[] {
  return [...mockApplications]
}

// Get applications by status
export function getApplicationsByStatus(status: Application['status']): Application[] {
  return mockApplications.filter(app => app.status === status)
}

// Get applications by job
export function getApplicationsByJob(jobId: string): Application[] {
  return mockApplications.filter(app => app.jobId === jobId)
}

// Get single application
export function getApplicationById(id: string): Application | undefined {
  return mockApplications.find(app => app.id === id)
}

// Update application status
export function updateApplicationStatus(
  applicationId: string, 
  status: Application['status']
): Application | null {
  const application = mockApplications.find(app => app.id === applicationId)
  if (application) {
    const previousStatus = application.status
    application.status = status
    
    // If status is changed to a non-revealing status, automatically hide identity again
    const revealAllowedStatuses: Application['status'][] = ['interviewed', 'offer']
    if (!revealAllowedStatuses.includes(status) && application.isRevealed) {
      application.isRevealed = false
      application.revealedAt = undefined
      application.revealedBy = undefined
      console.log(`Identity automatically hidden for ${applicationId} due to status change from ${previousStatus} to ${status}`)
    }
    
    window.dispatchEvent(new CustomEvent('applicationUpdated'))
    return application
  }
  return null
}

// Reveal personal information (only allowed at interviewed status or later)
export function revealApplicantInfo(
  applicationId: string,
  recruiterName: string
): Application | null {
  const application = mockApplications.find(app => app.id === applicationId)
  if (application) {
    // Only allow reveal if status is interviewed or later
    const allowedStatuses: Application['status'][] = ['interviewed', 'offer']
    if (!allowedStatuses.includes(application.status)) {
      console.warn(`Cannot reveal identity. Candidate must be in "interviewed" status or later. Current status: ${application.status}`)
      return null
    }
    
    application.isRevealed = true
    application.revealedAt = new Date().toISOString()
    application.revealedBy = recruiterName
    
    window.dispatchEvent(new CustomEvent('applicationUpdated'))
    console.log(`Personal info revealed for ${applicationId} by ${recruiterName}`)
    return application
  }
  return null
}

// Add notes to application
export function addApplicationNotes(
  applicationId: string,
  notes: string
): Application | null {
  const application = mockApplications.find(app => app.id === applicationId)
  if (application) {
    application.notes = notes
    window.dispatchEvent(new CustomEvent('applicationUpdated'))
    return application
  }
  return null
}

// Rate application
export function rateApplication(
  applicationId: string,
  rating: number
): Application | null {
  const application = mockApplications.find(app => app.id === applicationId)
  if (application) {
    application.rating = rating
    window.dispatchEvent(new CustomEvent('applicationUpdated'))
    return application
  }
  return null
}

// Schedule interview
export function scheduleInterview(
  applicationId: string,
  interviewDate: string
): Application | null {
  const application = mockApplications.find(app => app.id === applicationId)
  if (application) {
    application.interviewDate = interviewDate
    application.status = "interview-scheduled"
    window.dispatchEvent(new CustomEvent('applicationUpdated'))
    return application
  }
  return null
}

// Get statistics
export function getApplicationStats() {
  return {
    total: mockApplications.length,
    new: mockApplications.filter(app => app.status === 'new').length,
    reviewing: mockApplications.filter(app => app.status === 'reviewing').length,
    interviewScheduled: mockApplications.filter(app => app.status === 'interview-scheduled').length,
    interviewed: mockApplications.filter(app => app.status === 'interviewed').length,
    offers: mockApplications.filter(app => app.status === 'offer').length,
  }
}

