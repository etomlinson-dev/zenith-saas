import { mockProjects } from './project-data'
import type { Milestone } from './project-data'

// Add a milestone to a project
export function addMilestone(projectId: string, milestoneData: Omit<Milestone, 'id'>): Milestone | null {
  const project = mockProjects.find(p => p.id === projectId)
  if (!project) return null
  
  // Initialize milestones array if it doesn't exist
  if (!project.milestones) {
    project.milestones = []
  }
  
  // Generate new milestone ID
  const maxId = project.milestones.reduce((max, milestone) => {
    const milestoneNum = parseInt(milestone.id.replace(/\D/g, ''))
    return milestoneNum > max ? milestoneNum : max
  }, 0)
  
  const newMilestone: Milestone = {
    ...milestoneData,
    id: `m${maxId + 1}`,
  }
  
  project.milestones.push(newMilestone)
  
  // Update tasks with milestone ID
  if (milestoneData.taskIds) {
    milestoneData.taskIds.forEach(taskId => {
      const task = project.tasks.find(t => t.id === taskId)
      if (task) {
        task.milestoneId = newMilestone.id
      }
    })
  }
  
  // Trigger a custom event to notify components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('projectDataUpdated', { detail: { projectId } }))
  }
  
  return newMilestone
}

// Update a milestone
export function updateMilestone(projectId: string, milestoneId: string, updates: Partial<Milestone>): Milestone | null {
  const project = mockProjects.find(p => p.id === projectId)
  if (!project || !project.milestones) return null
  
  const milestoneIndex = project.milestones.findIndex(m => m.id === milestoneId)
  if (milestoneIndex === -1) return null
  
  const oldMilestone = project.milestones[milestoneIndex]
  
  // Update the milestone
  project.milestones[milestoneIndex] = {
    ...oldMilestone,
    ...updates,
  }
  
  // Handle task reassignments
  if (updates.taskIds) {
    // Remove milestone from old tasks
    if (oldMilestone.taskIds) {
      oldMilestone.taskIds.forEach(taskId => {
        const task = project.tasks.find(t => t.id === taskId)
        if (task && !updates.taskIds?.includes(taskId)) {
          task.milestoneId = undefined
        }
      })
    }
    
    // Add milestone to new tasks
    updates.taskIds.forEach(taskId => {
      const task = project.tasks.find(t => t.id === taskId)
      if (task) {
        task.milestoneId = milestoneId
      }
    })
  }
  
  // Trigger a custom event to notify components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('projectDataUpdated', { detail: { projectId } }))
  }
  
  return project.milestones[milestoneIndex]
}

// Delete a milestone
export function deleteMilestone(projectId: string, milestoneId: string): boolean {
  const project = mockProjects.find(p => p.id === projectId)
  if (!project || !project.milestones) return false
  
  const milestoneIndex = project.milestones.findIndex(m => m.id === milestoneId)
  if (milestoneIndex === -1) return false
  
  // Remove milestone from all tasks
  project.tasks.forEach(task => {
    if (task.milestoneId === milestoneId) {
      task.milestoneId = undefined
    }
  })
  
  project.milestones.splice(milestoneIndex, 1)
  
  // Trigger a custom event to notify components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('projectDataUpdated', { detail: { projectId } }))
  }
  
  return true
}

// Get milestones for a project
export function getProjectMilestones(projectId: string): Milestone[] {
  const project = mockProjects.find(p => p.id === projectId)
  return project?.milestones || []
}


