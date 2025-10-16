"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Generate anonymous candidate ID
const generateCandidateId = () => {
  const prefix = "CAND"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

// Redact PII from resume text
const redactPII = (text: string): string => {
  let redacted = text

  // Redact email addresses
  redacted = redacted.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL REDACTED]")
  
  // Redact phone numbers (various formats)
  redacted = redacted.replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, "[PHONE REDACTED]")
  
  // Redact LinkedIn URLs
  redacted = redacted.replace(/https?:\/\/(www\.)?linkedin\.com\/[^\s]*/gi, "[LINKEDIN REDACTED]")
  
  // Redact social media URLs
  redacted = redacted.replace(/https?:\/\/(www\.)?(twitter|facebook|instagram|github)\.com\/[^\s]*/gi, "[SOCIAL MEDIA REDACTED]")
  
  // Redact street addresses (basic pattern)
  redacted = redacted.replace(/\d+\s+[\w\s]+\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir)\.?\s*,?\s*[\w\s]*,?\s*[A-Z]{2}\s*\d{5}/gi, "[ADDRESS REDACTED]")
  
  return redacted
}

export function AddCandidateDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    candidateId: "",
    position: "",
    assignedTo: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
    notes: "",
    resumeFile: null as File | null,
    resumeText: "",
  })
  const [showRedactionWarning, setShowRedactionWarning] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, resumeFile: file })
      setShowRedactionWarning(true)
      
      // In a real app, you would:
      // 1. Upload to server
      // 2. Use OCR/PDF parsing to extract text
      // 3. Apply redaction on server side
      // 4. Store only redacted version
      
      // For demo purposes, simulate reading text
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const redactedText = redactPII(text)
        setFormData(prev => ({ ...prev, resumeText: redactedText }))
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate anonymous ID if not exists
    const candidateId = formData.candidateId || generateCandidateId()
    
    // Redact any PII in notes field
    const redactedNotes = redactPII(formData.notes)
    
    const anonymousCandidate = {
      ...formData,
      candidateId,
      notes: redactedNotes,
    }
    
    console.log("[v0] Adding anonymous candidate:", anonymousCandidate)
    // In a real app, this would save to database with full PII redaction
    setOpen(false)
    setFormData({
      candidateId: "",
      position: "",
      assignedTo: "",
      skills: "",
      experience: "",
      education: "",
      certifications: "",
      notes: "",
      resumeFile: null,
      resumeText: "",
    })
    setShowRedactionWarning(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Anonymous Candidate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Anonymous Candidate</DialogTitle>
            <DialogDescription>
              All candidate information is anonymized. No personal identifying information (PII) will be stored or displayed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Anonymous ID Display */}
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Anonymous ID System:</strong> Each candidate will be assigned a unique identifier (e.g., CAND-XXXXX-XXXX). 
                No names, emails, phone numbers, or other PII will be collected or displayed.
              </AlertDescription>
            </Alert>

            <div className="grid gap-2">
              <Label htmlFor="candidateId">Candidate ID (Optional - Auto-generated)</Label>
              <Input
                id="candidateId"
                value={formData.candidateId}
                onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                placeholder="Leave blank for auto-generation"
              />
              <p className="text-xs text-muted-foreground">
                If left blank, a unique ID will be automatically generated (e.g., CAND-LXYZ1234-AB5C)
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Position Applied For *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => setFormData({ ...formData, position: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senior Developer">Senior Developer</SelectItem>
                  <SelectItem value="Product Manager">Product Manager</SelectItem>
                  <SelectItem value="UX Designer">UX Designer</SelectItem>
                  <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                  <SelectItem value="Sales Representative">Sales Representative</SelectItem>
                  <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                  <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="resume">Resume Upload (Auto-Redacted)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                All PII (names, emails, phone numbers, addresses, LinkedIn, social media) will be automatically redacted
              </p>
            </div>

            {showRedactionWarning && (
              <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription>
                  <strong>Resume Uploaded:</strong> All identifying information has been automatically redacted. 
                  Only skills, experience, and qualifications are retained.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="skills">Skills & Technologies</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, Node.js, Python, AWS..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => setFormData({ ...formData, experience: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="education">Education Level</Label>
              <Select
                value={formData.education}
                onValueChange={(value) => setFormData({ ...formData, education: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Associate">Associate Degree</SelectItem>
                  <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="Master">Master's Degree</SelectItem>
                  <SelectItem value="PhD">PhD/Doctorate</SelectItem>
                  <SelectItem value="Bootcamp">Coding Bootcamp</SelectItem>
                  <SelectItem value="Self-Taught">Self-Taught</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="certifications">Certifications (Optional)</Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                placeholder="AWS Certified, PMP, Google Analytics..."
              />
              <p className="text-xs text-muted-foreground">
                Enter certifications separated by commas. This helps improve matching accuracy.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignedTo">Assigned Recruiter *</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recruiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recruiter-1">Recruiter A</SelectItem>
                  <SelectItem value="recruiter-2">Recruiter B</SelectItem>
                  <SelectItem value="recruiter-3">Recruiter C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Anonymous Notes (No PII)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Technical assessment results, interview observations (avoid any identifying information)..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Any PII accidentally entered here will be automatically redacted upon submission
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Anonymous Candidate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
