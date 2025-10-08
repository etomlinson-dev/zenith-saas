"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/project-data"
import {
  Upload,
  Search,
  File,
  FileText,
  ImageIcon,
  FileCode,
  Download,
  MoreHorizontal,
  FolderOpen,
  Grid3x3,
  List,
} from "lucide-react"

interface FileManagementProps {
  project: Project
}

export function FileManagement({ project }: FileManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredFiles = project.files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
        return <ImageIcon className="w-8 h-8 text-blue-500" />
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />
      case "js":
      case "ts":
      case "jsx":
      case "tsx":
      case "css":
      case "html":
        return <FileCode className="w-8 h-8 text-green-500" />
      default:
        return <File className="w-8 h-8 text-muted-foreground" />
    }
  }

  const getFileType = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
        return "Image"
      case "pdf":
        return "PDF"
      case "js":
      case "ts":
      case "jsx":
      case "tsx":
        return "Code"
      case "css":
        return "Stylesheet"
      case "html":
        return "HTML"
      default:
        return "Document"
    }
  }

  return (
    <div className="space-y-4">
      {/* File Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Files</p>
              <p className="text-3xl font-bold text-foreground">{project.files.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Size</p>
              <p className="text-3xl font-bold text-foreground">
                {project.files.reduce((sum, f) => sum + Number.parseFloat(f.size), 0).toFixed(1)}
                <span className="text-lg">MB</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <File className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Images</p>
              <p className="text-3xl font-bold text-foreground">
                {project.files.filter((f) => /\.(jpg|jpeg|png|gif|svg)$/i.test(f.name)).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Documents</p>
              <p className="text-3xl font-bold text-foreground">
                {project.files.filter((f) => /\.(pdf|doc|docx|txt)$/i.test(f.name)).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </Card>

      {/* Files Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="p-4 hover:border-primary/40 transition-all group">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getFileIcon(file.name)}
                </div>
                <div className="flex-1 w-full">
                  <p className="font-medium text-sm text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{file.size}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {getFileType(file.name)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border/40">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Size</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Uploaded</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <tr
                    key={file.id}
                    className={`
                      border-b border-border/40 hover:bg-muted/20 transition-colors
                      ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}
                    `}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.name)}
                        <span className="font-medium text-foreground">{file.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {getFileType(file.name)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-foreground">{file.size}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredFiles.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
            <p className="text-muted-foreground mb-4">Upload files to get started</p>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
