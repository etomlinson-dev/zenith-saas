import type React from "react"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import {
  LayoutDashboard,
  Kanban,
  Box,
  Users,
  MapPin,
  UserCog,
  Cpu,
  Bot,
  ChevronLeft,
  ChevronRight,
  Home,
  ListTodo,
  BarChart3,
  Settings,
  Package,
  ShoppingCart,
  Truck,
  MapPinned,
  UserPlus,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Wrench,
  Activity,
  FileText,
} from "lucide-react"
import { LeLoLogo } from "./lelo-logo"
import { useSidebar } from "./sidebar-context"
import { SimpleThemeToggle } from "../src/components/SimpleThemeToggle"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface ModuleNavigation {
  [key: string]: NavItem[]
}

const moduleNavigation: ModuleNavigation = {
  "/projects": [
    { label: "Overview", href: "/projects", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Task Boards", href: "/projects#tasks", icon: <ListTodo className="w-4 h-4" /> },
    { label: "Time Tracking", href: "/projects#time", icon: <Clock className="w-4 h-4" /> },
    { label: "Reports", href: "/projects#reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", href: "/projects#settings", icon: <Settings className="w-4 h-4" /> },
  ],
  "/inventory": [
    { label: "Stock Overview", href: "/inventory", icon: <Package className="w-4 h-4" /> },
    { label: "Purchase Orders", href: "/inventory#orders", icon: <ShoppingCart className="w-4 h-4" /> },
    { label: "Suppliers", href: "/inventory#suppliers", icon: <Truck className="w-4 h-4" /> },
    { label: "Locations", href: "/inventory#locations", icon: <MapPinned className="w-4 h-4" /> },
    { label: "Reports", href: "/inventory#reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", href: "/inventory#settings", icon: <Settings className="w-4 h-4" /> },
  ],
  "/customer-success": [
    { label: "Dashboard", href: "/customer-success", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Health Scores", href: "/customer-success#health", icon: <Activity className="w-4 h-4" /> },
    { label: "Milestones", href: "/customer-success#milestones", icon: <Target className="w-4 h-4" /> },
    { label: "Renewals", href: "/customer-success#renewals", icon: <Calendar className="w-4 h-4" /> },
    { label: "Reports", href: "/customer-success#reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", href: "/customer-success#settings", icon: <Settings className="w-4 h-4" /> },
  ],
  "/workforce": [
    { label: "Job Dashboard", href: "/workforce", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Schedules", href: "/workforce#schedules", icon: <Calendar className="w-4 h-4" /> },
    { label: "Technicians", href: "/workforce#technicians", icon: <Users className="w-4 h-4" /> },
    { label: "Routes", href: "/workforce#routes", icon: <MapPin className="w-4 h-4" /> },
    { label: "Reports", href: "/workforce#reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", href: "/workforce#settings", icon: <Settings className="w-4 h-4" /> },
  ],
  "/hr": [
    { label: "Dashboard", href: "/hr", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Recruitment", href: "/hr#recruitment", icon: <UserPlus className="w-4 h-4" /> },
    { label: "Performance", href: "/hr#performance", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Goals", href: "/hr#goals", icon: <Target className="w-4 h-4" /> },
    { label: "Reports", href: "/hr#reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", href: "/hr#settings", icon: <Settings className="w-4 h-4" /> },
  ],
  "/manufacturing": [
    { label: "Operations", href: "/manufacturing", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Machine Status", href: "/manufacturing#machines", icon: <Cpu className="w-4 h-4" /> },
    { label: "Production", href: "/manufacturing#production", icon: <Activity className="w-4 h-4" /> },
    { label: "Maintenance", href: "/manufacturing#maintenance", icon: <Wrench className="w-4 h-4" /> },
    { label: "Reports", href: "/manufacturing#reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", href: "/manufacturing#settings", icon: <Settings className="w-4 h-4" /> },
  ],
  "/automation": [
    { label: "Overview", href: "/automation", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Workflows", href: "/automation#workflows", icon: <Activity className="w-4 h-4" /> },
    { label: "Jobs", href: "/automation#jobs", icon: <ListTodo className="w-4 h-4" /> },
    { label: "Logs", href: "/automation#logs", icon: <FileText className="w-4 h-4" /> },
    { label: "Settings", href: "/automation#settings", icon: <Settings className="w-4 h-4" /> },
  ],
}

const getMainModules = (isCollapsed: boolean) => [
  { label: "Hub", href: "/hub", icon: <LayoutDashboard className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
  { label: "PM", href: "/projects", icon: <Kanban className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
  { label: "Inventory", href: "/inventory", icon: <Box className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
  { label: "CSP", href: "/customer-success", icon: <Users className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
  { label: "WFM", href: "/workforce", icon: <MapPin className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
  { label: "HR", href: "/hr", icon: <UserCog className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
  { label: "Z-MO", href: "/manufacturing", icon: <Cpu className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
  { label: "Automation", href: "/automation", icon: <Bot className={isCollapsed ? "w-6 h-6" : "w-4 h-4"} /> },
]

export function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Get current module's navigation items
  const currentModuleNav = Object.keys(moduleNavigation).find((key) => pathname.startsWith(key))
  const moduleNavItems = currentModuleNav ? moduleNavigation[currentModuleNav] : []

  const mainModules = getMainModules(isCollapsed)

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border z-50 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-72"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <a href="/" className="flex items-center gap-2">
                <LeLoLogo />
              </a>
            )}
            {isCollapsed && (
              <a href="/" className="flex items-center justify-center w-full">
                <Home className="w-6 h-6" />
              </a>
            )}
          </div>

          {/* Module Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-3 mb-4">
              <p className={`text-xs font-semibold text-muted-foreground mb-2 ${isCollapsed ? "text-center" : ""}`}>
                {isCollapsed ? "•" : "MODULES"}
              </p>
              <nav className="space-y-1">
                {mainModules.map((module) => {
                  const isActive = pathname.startsWith(module.href)
                  return (
                    <a
                      key={module.href}
                      href={module.href}
                      className={`flex items-center gap-3 py-2 rounded-lg transition-all duration-200 px-2.5 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      title={isCollapsed ? module.label : undefined}
                    >
                      {module.icon}
                      {!isCollapsed && <span className="text-sm font-medium">{module.label}</span>}
                    </a>
                  )
                })}
              </nav>
            </div>

            {/* Module-Specific Navigation */}
            {moduleNavItems.length > 0 && !isCollapsed && (
              <div className="px-3 mt-6">
                <p className="text-xs font-semibold text-muted-foreground mb-2">CURRENT MODULE</p>
                <nav className="space-y-1">
                  {moduleNavItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>

          {/* Collapse Button */}
          <div className="p-4 border-t border-border space-y-2">
            <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
              {!isCollapsed && <span className="text-sm text-muted-foreground">Theme</span>}
              <SimpleThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full hidden lg:flex items-center justify-center"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <LayoutDashboard className="w-4 h-4" />
      </Button>
    </>
  )
}

export default Sidebar
