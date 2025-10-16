import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  Clock,
  Shield,
  Bell,
  Lock,
  Edit2,
  Camera,
  Save,
  X
} from "lucide-react"

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Mock user data
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    employeeId: "EMP-1234",
    department: "Engineering",
    position: "Senior Software Engineer",
    manager: "Michael Chen",
    startDate: "2023-01-15",
    employmentType: "Full-time",
    bio: "Passionate software engineer with 8+ years of experience building scalable web applications. Love React, TypeScript, and modern web technologies.",
  })

  const emergencyContact = {
    name: "John Johnson",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
    email: "john.johnson@email.com"
  }

  const notificationSettings = [
    { id: "email", label: "Email Notifications", enabled: true },
    { id: "performance", label: "Performance Reviews", enabled: true },
    { id: "goals", label: "Goal Updates", enabled: true },
    { id: "training", label: "Training Reminders", enabled: true },
    { id: "announcements", label: "Company Announcements", enabled: false },
  ]

  const privacySettings = [
    { id: "profile", label: "Show profile in directory", enabled: true },
    { id: "phone", label: "Show phone number", enabled: true },
    { id: "email", label: "Show email address", enabled: true },
    { id: "location", label: "Show location", enabled: false },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Saving profile:", profile)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values
  }

  return (
    <div className="min-h-screen bg-background p-6 my-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and settings</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Photo & Quick Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary mb-4">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  {isEditing && (
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="absolute bottom-3 right-0 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-1">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-muted-foreground mb-2">{profile.position}</p>
                <Badge variant="outline" className="mb-4">{profile.employmentType}</Badge>
                
                <div className="w-full space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{profile.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profile.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{profile.timezone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{emergencyContact.name}</p>
                <p className="text-muted-foreground">{emergencyContact.relationship}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{emergencyContact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{emergencyContact.email}</span>
              </div>
              {isEditing && (
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Edit2 className="w-3 h-3 mr-2" />
                  Update Emergency Contact
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profile.firstName}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profile.lastName}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={profile.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={profile.location}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input 
                        id="timezone" 
                        value={profile.timezone}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={profile.bio}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employment Information Tab */}
            <TabsContent value="employment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                  <CardDescription>Your work-related information (read-only)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee ID</Label>
                      <Input value={profile.employeeId} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <Input value={profile.employmentType} disabled />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input value={profile.position} disabled />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input value={profile.department} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Manager</Label>
                      <Input value={profile.manager} disabled />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input value={profile.startDate} disabled />
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      To update employment information, please contact HR at <a href="mailto:hr@company.com" className="text-primary hover:underline">hr@company.com</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notificationSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{setting.label}</p>
                      </div>
                      <Button
                        variant={setting.enabled ? "default" : "outline"}
                        size="sm"
                      >
                        {setting.enabled ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control what information is visible to others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {privacySettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{setting.label}</p>
                      </div>
                      <Button
                        variant={setting.enabled ? "default" : "outline"}
                        size="sm"
                      >
                        {setting.enabled ? "Visible" : "Hidden"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Password</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Last changed 45 days ago
                    </p>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <Badge variant="outline" className="border-green-500 text-green-600 bg-green-500/10">
                      Enabled
                    </Badge>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Active Sessions</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage devices where you're currently logged in
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium">Windows Desktop • San Francisco, CA</p>
                          <p className="text-muted-foreground">Current session</p>
                        </div>
                        <Badge variant="outline" className="border-green-500 text-green-600 bg-green-500/10">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-destructive/50">
                    <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Irreversible actions that require careful consideration
                    </p>
                    <Button variant="destructive" size="sm">
                      Deactivate Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

