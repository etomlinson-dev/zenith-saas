# Anonymous Recruitment System - Implementation Guide

## Overview
The Zenith SaaS HR module now includes a fully anonymous recruitment system designed to eliminate bias in the hiring process. All personally identifiable information (PII) is automatically redacted, and candidates are identified solely by unique anonymous IDs.

## Key Features

### 1. **Anonymous Candidate IDs**
- Each candidate is assigned a unique identifier (e.g., `CAND-M2K8L-4A7C`)
- IDs are automatically generated using timestamp and random components
- No names, emails, phone numbers, or other PII are collected or displayed

### 2. **Automatic PII Redaction**
When candidates upload resumes or enter information, the system automatically redacts:
- **Email addresses** → `[EMAIL REDACTED]`
- **Phone numbers** (all formats) → `[PHONE REDACTED]`
- **LinkedIn profiles** → `[LINKEDIN REDACTED]`
- **Social media URLs** → `[SOCIAL MEDIA REDACTED]`
- **Physical addresses** → `[ADDRESS REDACTED]`

### 3. **Skills-Based Evaluation**
The system focuses on relevant qualifications only:
- Skills & Technologies
- Years of Experience (ranges: 0-2, 2-5, 5-10, 10+)
- Education Level
- Position Applied For
- Anonymous Notes (auto-redacted)

### 4. **Resume Upload with Sanitization**
- Accepts PDF, DOC, DOCX, and TXT files
- Automatically extracts and redacts text content
- Only retains skills, experience, and qualifications
- Removes all identifying information before storage

## User Interface Components

### Add Anonymous Candidate Dialog
Located at: `src/components/hr/add-candidate-dialog.tsx`

**Form Fields:**
- Candidate ID (optional - auto-generated if blank)
- Position Applied For (dropdown)
- Resume Upload (auto-redacted)
- Skills & Technologies
- Years of Experience
- Education Level
- Assigned Recruiter (anonymized as Recruiter A, B, C)
- Anonymous Notes

**Visual Indicators:**
- Blue information banner explaining the anonymous system
- Amber alert when resume is uploaded and redacted
- Helper text under each field explaining privacy measures

### Recruitment Dashboard View
Located at: `src/pages/HRPage.tsx` (Recruitment Tab)

**Features:**
- **Anonymous System Banner**: Displayed at top of recruitment tab
  - Explains the anonymous system
  - Shows checkmarks for: No names, PII redaction, Resume sanitization, Skills-based evaluation
  
- **Candidate Cards**: Display anonymous information
  - Candidate ID (instead of name)
  - Position
  - Stage in pipeline
  - AI Match Score
  - Experience level
  - Education level
  - Top skills
  - "Resume (Redacted)" button label

## Technical Implementation

### PII Redaction Function
```typescript
const redactPII = (text: string): string => {
  // Redacts emails, phone numbers, URLs, addresses
  // Returns sanitized text with [REDACTED] placeholders
}
```

### Anonymous ID Generator
```typescript
const generateCandidateId = () => {
  const prefix = "CAND"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}
```

### Mock Data Structure
```typescript
{
  id: 1,
  candidateId: "CAND-M2K8L-4A7C",
  position: "Senior Developer",
  stage: "Applied",
  skills: "React, Node.js, TypeScript",
  experience: "5-10 years",
  education: "Bachelor's Degree",
  assignedTo: "Recruiter A",
  // No name, email, phone, or other PII
}
```

## Benefits

### 1. **Reduced Bias**
- Eliminates unconscious bias based on names, gender, ethnicity, or location
- Focuses hiring managers on skills and qualifications only
- Promotes diversity and inclusion

### 2. **GDPR/Privacy Compliance**
- Minimizes PII collection and storage
- Reduces data breach risk
- Easier compliance with privacy regulations

### 3. **Fair Evaluation**
- Standardized candidate profiles
- Skills-based assessment
- AI matching based on qualifications only

### 4. **Transparent Process**
- Clear communication about anonymization
- Candidates know their information is protected
- Builds trust in the hiring process

## Future Enhancements

### Planned Features:
1. **Advanced Resume Parsing**: Use AI/ML to extract structured data from resumes
2. **Blind Interview Scheduling**: Schedule interviews without revealing candidate identity
3. **Skills Assessment Integration**: Automated coding challenges and assessments
4. **De-anonymization Control**: Controlled reveal of candidate information at final stages
5. **Audit Logging**: Track when and why PII is accessed
6. **Candidate Portal**: Allow candidates to update anonymous profiles

## Best Practices

### For Recruiters:
1. Focus evaluation on skills, experience, and qualifications only
2. Use the notes field for objective observations (avoid any PII)
3. Review redacted resumes to ensure all sensitive data is removed
4. Don't attempt to identify candidates through external searches

### For System Administrators:
1. Regularly audit PII redaction effectiveness
2. Update regex patterns as new PII patterns emerge
3. Implement server-side redaction for production use
4. Encrypt anonymous profiles at rest
5. Set up automated PII detection alerts

## Testing the System

### How to Test:
1. Navigate to HR module → Recruitment tab
2. Click "Add Anonymous Candidate"
3. Fill out the form (leave Candidate ID blank for auto-generation)
4. Upload a sample resume with PII
5. Verify redaction warnings appear
6. Submit and check candidate list displays only anonymous ID
7. Verify no PII is visible anywhere in the UI

### Sample Test Resume:
```
John Smith
john.smith@email.com
+1 (555) 123-4567
linkedin.com/in/johnsmith
123 Main Street, San Francisco, CA 94102

Senior Developer with 8 years experience in React, Node.js, and TypeScript.
[Add technical skills and achievements...]
```

Expected Output:
```
[EMAIL REDACTED]
[PHONE REDACTED]
[LINKEDIN REDACTED]
[ADDRESS REDACTED]

Senior Developer with 8 years experience in React, Node.js, and TypeScript.
[Technical skills and achievements retained...]
```

## Support

For questions or issues with the anonymous recruitment system:
- Check this guide first
- Review the code comments in the implementation files
- Test with sample data before production use
- Report bugs or suggestions for improvement

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Status**: Active Development

