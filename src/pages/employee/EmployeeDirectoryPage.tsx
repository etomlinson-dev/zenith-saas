import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Filter,
  Download,
  Grid3x3,
  List
} from "lucide-react"

interface Employee {
  id: string
  name: string
  position: string
  department: string
  location: string
  email: string
  phone: string
  manager: string
  photo: string
  timezone: string
  status: "active" | "away" | "offline"
}

export default function EmployeeDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Mock employee data
  const employees: Employee[] = [
    {
      id: "1",
      name: "Michael Chen",
      position: "Engineering Manager",
      department: "Engineering",
      location: "San Francisco, CA",
      email: "michael.chen@company.com",
      phone: "+1 (555) 123-4567",
      manager: "David Park",
      photo: "/placeholder.svg?height=100&width=100",
      timezone: "PST",
      status: "active"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      position: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 234-5678",
      manager: "Michael Chen",
      photo: "/placeholder.svg?height=100&width=100",
      timezone: "PST",
      status: "active"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      position: "Product Manager",
      department: "Product",
      location: "New York, NY",
      email: "emily.rodriguez@company.com",
      phone: "+1 (555) 345-6789",
      manager: "James Wilson",
      photo: "/placeholder.svg?height=100&width=100",
      timezone: "EST",
      status: "active"
    },
    {
      id: "4",
      name: "Alex Kim",
      position: "UX Designer",
      department: "Design",
      location: "Austin, TX",
      email: "alex.kim@company.com",
      phone: "+1 (555) 456-7890",
      manager: "Lisa Anderson",
      photo: "/placeholder.svg?height=100&width=100",
      timezone: "CST",
      status: "away"
    },
    {
      id: "5",
      name: "David Park",
      position: "VP of Engineering",
      department: "Engineering",
      location: "San Francisco, CA",
      email: "david.park@company.com",
      phone: "+1 (555) 567-8901",
      manager: "CEO",
      photo: "/placeholder.svg?height=100&width=100",
      timezone: "PST",
      status: "active"
    },
    {
      id: "6",
      name: "Jessica Martinez",
      position: "Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA",
      email: "jessica.martinez@company.com",
      phone: "+1 (555) 678-9012",
      manager: "Robert Taylor",
      photo: "/placeholder.svg?height=100&width=100",
      timezone: "PST",
      status: "active"
    },
  ]

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesLocation = locationFilter === "all" || employee.location === locationFilter
    
    return matchesSearch && matchesDepartment && matchesLocation
  })

  const departments = Array.from(new Set(employees.map(e => e.department)))
  const locations = Array.from(new Set(employees.map(e => e.location)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "offline": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Online"
      case "away": return "Away"
      case "offline": return "Offline"
      default: return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Company Directory</h1>
        <p className="text-muted-foreground">Find and connect with your colleagues</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, position, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Department Filter */}
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Export Button */}
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  {/* Avatar */}
                  <div className="relative mb-3">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full ${getStatusColor(employee.status)} border-2 border-background`} />
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-lg text-foreground mb-1">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{employee.position}</p>
                  <Badge variant="outline" className="mb-3">{employee.department}</Badge>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${employee.email}`} className="hover:text-primary truncate">
                      {employee.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{employee.location} ({employee.timezone})</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Reports to: {employee.manager}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getStatusColor(employee.status)} border-2 border-background`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{employee.name}</h3>
                        <Badge variant="outline" className="text-xs">{getStatusLabel(employee.status)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.position} • {employee.department}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {employee.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Reports to {employee.manager}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
                      <a href={`mailto:${employee.email}`} className="hover:text-primary flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {employee.email}
                      </a>
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {employee.phone}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="ghost">
                        Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {filteredEmployees.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No employees found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        </Card>
      )}
    </div>
  )
}

