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
import { Plus } from "lucide-react"

export function AddGoalDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    employee: "",
    goal: "",
    category: "",
    dueDate: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Adding goal:", formData)
    // In a real app, this would save to database
    setOpen(false)
    setFormData({
      employee: "",
      goal: "",
      category: "",
      dueDate: "",
      description: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Employee Goal</DialogTitle>
            <DialogDescription>Set a new goal for an employee to track their progress.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="employee">Employee *</Label>
              <Select
                value={formData.employee}
                onValueChange={(value) => setFormData({ ...formData, employee: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diane-young">Diane Young</SelectItem>
                  <SelectItem value="kathryn-washington">Kathryn Washington</SelectItem>
                  <SelectItem value="guy-hawkins">Guy Hawkins</SelectItem>
                  <SelectItem value="michael-chen">Michael Chen</SelectItem>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="goal">Goal Title *</Label>
              <Input
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                placeholder="Complete React certification"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional Development">Professional Development</SelectItem>
                  <SelectItem value="Leadership">Leadership</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Sales Target">Sales Target</SelectItem>
                  <SelectItem value="Mentorship">Mentorship</SelectItem>
                  <SelectItem value="Process Improvement">Process Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of the goal and success criteria..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
