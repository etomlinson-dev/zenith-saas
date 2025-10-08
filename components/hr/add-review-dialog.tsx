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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export function AddReviewDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    employee: "",
    collaboration: 3,
    accountability: 3,
    trustworthy: 3,
    leadership: 3,
    comments: "",
    nextReviewDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Adding review:", formData)
    // In a real app, this would save to database
    setOpen(false)
    setFormData({
      employee: "",
      collaboration: 3,
      accountability: 3,
      trustworthy: 3,
      leadership: 3,
      comments: "",
      nextReviewDate: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          New Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Performance Review</DialogTitle>
            <DialogDescription>Rate the employee on key performance categories (1-5 scale).</DialogDescription>
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
              <Label>Collaboration: {formData.collaboration}/5</Label>
              <Slider
                value={[formData.collaboration]}
                onValueChange={(value) => setFormData({ ...formData, collaboration: value[0] })}
                min={1}
                max={5}
                step={1}
              />
            </div>

            <div className="grid gap-2">
              <Label>Accountability: {formData.accountability}/5</Label>
              <Slider
                value={[formData.accountability]}
                onValueChange={(value) => setFormData({ ...formData, accountability: value[0] })}
                min={1}
                max={5}
                step={1}
              />
            </div>

            <div className="grid gap-2">
              <Label>Trustworthy: {formData.trustworthy}/5</Label>
              <Slider
                value={[formData.trustworthy]}
                onValueChange={(value) => setFormData({ ...formData, trustworthy: value[0] })}
                min={1}
                max={5}
                step={1}
              />
            </div>

            <div className="grid gap-2">
              <Label>Leadership: {formData.leadership}/5</Label>
              <Slider
                value={[formData.leadership]}
                onValueChange={(value) => setFormData({ ...formData, leadership: value[0] })}
                min={1}
                max={5}
                step={1}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                placeholder="Performance feedback and notes..."
                rows={4}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nextReviewDate">Next Review Date *</Label>
              <input
                id="nextReviewDate"
                type="date"
                value={formData.nextReviewDate}
                onChange={(e) => setFormData({ ...formData, nextReviewDate: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Review</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
