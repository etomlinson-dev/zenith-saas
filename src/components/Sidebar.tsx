import { Link, useLocation } from 'react-router-dom'
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
} from 'lucide-react'

const navItems = [
  { path: '/hub', label: 'Hub', icon: LayoutDashboard },
  { path: '/projects', label: 'PM', icon: Kanban },
  { path: '/inventory', label: 'Inventory', icon: Box },
  { path: '/customer-success', label: 'CSP', icon: Users },
  { path: '/workforce', label: 'WFM', icon: MapPin },
  { path: '/hr', label: 'HR', icon: UserCog },
  { path: '/manufacturing', label: 'Z-MO', icon: Cpu },
  { path: '/automation', label: 'Automation', icon: Bot },
]

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-card border-r border-border z-50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-72'} -translate-x-full lg:translate-x-0`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-background rounded-sm transform rotate-45" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
              </div>
              {!isCollapsed && <span className="text-xl font-bold text-foreground">Zenith</span>}
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-4">
            {!isCollapsed && <p className="text-xs font-semibold text-muted-foreground mb-2">MODULES</p>}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname.startsWith(item.path)
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={item.label}
                    className={`flex items-center gap-3 py-2 rounded-lg transition-all duration-200 px-2.5 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full hidden lg:flex items-center justify-center gap-1.5 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  )
}

