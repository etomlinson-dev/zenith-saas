import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle2, 
  LayoutGrid, 
  Users, 
  Package, 
  Calendar, 
  BarChart3, 
  Shield,
  Zap,
  Globe,
  ChevronDown,
  Star,
  DollarSign,
  Building2,
  ShoppingCart,
  Factory,
  Briefcase,
  Laptop,
  Heart
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  // Company logos for social proof
  const companies = [
    { name: "TechCorp", icon: Laptop },
    { name: "BuildRight", icon: Factory },
    { name: "RetailPro", icon: ShoppingCart },
    { name: "HealthCare+", icon: Heart },
    { name: "FinanceHub", icon: DollarSign },
    { name: "LogisTech", icon: Package },
    { name: "ConsultPro", icon: Briefcase },
    { name: "DataStream", icon: BarChart3 },
    { name: "CloudBase", icon: Globe },
    { name: "TeamSync", icon: Users },
    { name: "ProjectFlow", icon: LayoutGrid },
    { name: "TimeTrack", icon: Calendar },
  ]

  // Double the array for seamless infinite scroll
  const allCompanies = [...companies, ...companies]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Strip */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl">Zenith Technologies</div>
            <span className="text-sm text-muted-foreground hidden md:inline">— Unified BusinessOps Platform</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#usecases" className="text-sm font-medium hover:text-primary transition-colors">Use Cases</a>
            <a href="#integrations" className="text-sm font-medium hover:text-primary transition-colors">Integrations</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                One intelligent hub for your whole business
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Projects, tasks, customers, inventory, HR, and analytics—finally connected. 
                Automate handoffs and remove busywork so teams stay focused.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/hub">
                  <Button size="lg" className="gap-2">
                    Launch the Hub <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="gap-2">
                    Explore Features <ChevronDown className="h-4 w-4" />
                  </Button>
                </a>
              </div>

              {/* Feature Highlights */}
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="gap-2 py-2 px-4">
                  <Shield className="h-4 w-4" /> SOC2-ready
                </Badge>
                <Badge variant="secondary" className="gap-2 py-2 px-4">
                  <Zap className="h-4 w-4" /> 99.9% uptime
                </Badge>
                <Badge variant="secondary" className="gap-2 py-2 px-4">
                  <Globe className="h-4 w-4" /> Integrations
                </Badge>
              </div>
            </div>

            {/* Right side - Product preview */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg border flex items-center gap-3">
                      <LayoutGrid className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-semibold">Projects</div>
                        <div className="text-xs text-muted-foreground">24 active</div>
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border flex items-center gap-3">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="font-semibold">Tasks</div>
                        <div className="text-xs text-muted-foreground">156 tracked</div>
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border flex items-center gap-3">
                      <Users className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="font-semibold">Customers</div>
                        <div className="text-xs text-muted-foreground">89 clients</div>
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border flex items-center gap-3">
                      <Package className="h-8 w-8 text-orange-500" />
                      <div>
                        <div className="font-semibold">Inventory</div>
                        <div className="text-xs text-muted-foreground">2.4K items</div>
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-purple-500" />
                      <div>
                        <div className="font-semibold">HR</div>
                        <div className="text-xs text-muted-foreground">45 employees</div>
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-lg border flex items-center gap-3">
                      <BarChart3 className="h-8 w-8 text-pink-500" />
                      <div>
                        <div className="font-semibold">Analytics</div>
                        <div className="text-xs text-muted-foreground">Real-time</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-6 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground mb-8">Trusted by teams across industries</p>
          
          {/* Infinite Scrolling Logos */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll">
              {allCompanies.map((company, i) => {
                const Icon = company.icon
                return (
                  <motion.div
                    key={i}
                    className="h-20 min-w-[180px] bg-background border rounded-lg flex items-center justify-center gap-3 px-6 opacity-70 transition-all cursor-pointer shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ 
                      scale: 1.1, 
                      opacity: 1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-foreground">{company.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-180px * 12 - 32px * 12));
            }
          }
          
          .animate-scroll {
            animation: scroll 40s linear infinite;
            width: fit-content;
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Everything you need, designed to work together</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Pick modules you need today. Add more anytime—no migrations, no new logins.
            </p>
            <Link to="/hub">
              <Button size="lg">Open the Hub</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <LayoutGrid className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Projects & Tasks</CardTitle>
                <CardDescription>Plan, track, and deliver</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Kanban boards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Gantt charts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Analytics & reporting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Customer Success</CardTitle>
                <CardDescription>Milestones, files, renewals in a portal</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Client portals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Milestone tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Renewal management
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Package className="h-10 w-10 text-orange-500 mb-2" />
                <CardTitle>Inventory & Assets</CardTitle>
                <CardDescription>Track items, suppliers, POs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Real-time tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Purchase orders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Supplier management
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle>Workforce & Scheduling</CardTitle>
                <CardDescription>Plan schedules, capture time, routes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Shift planning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Time tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Route optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>People & HR</CardTitle>
                <CardDescription>Recruit, review, SMART goals, anonymous hiring</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Performance reviews
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Goal tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Anonymous recruitment
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-pink-500 mb-2" />
                <CardTitle>Dashboards & Analytics</CardTitle>
                <CardDescription>KPIs across work, customers, and inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Real-time dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Custom reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> KPI tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecases" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built to fit the way you work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Agencies</CardTitle>
                <CardDescription>Plan deliverables, share proofs, track time</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/hub">
                  <Button variant="outline" className="w-full">See example</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShoppingCart className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Retail & eCom</CardTitle>
                <CardDescription>Coordinate launches, manage supplier POs</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/hub">
                  <Button variant="outline" className="w-full">See example</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Factory className="h-10 w-10 text-orange-500 mb-2" />
                <CardTitle>Manufacturing</CardTitle>
                <CardDescription>Plan production, control inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/hub">
                  <Button variant="outline" className="w-full">See example</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle>Professional Services</CardTitle>
                <CardDescription>Manage engagements and client access</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/hub">
                  <Button variant="outline" className="w-full">See example</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Laptop className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>SaaS</CardTitle>
                <CardDescription>Run roadmaps, support queues, renewals</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/hub">
                  <Button variant="outline" className="w-full">See example</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-pink-500 mb-2" />
                <CardTitle>Nonprofit</CardTitle>
                <CardDescription>Coordinate programs, volunteers, reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/hub">
                  <Button variant="outline" className="w-full">See example</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Works with your stack</h2>
            <p className="text-xl text-muted-foreground">Connect the tools your team already uses</p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium">QuickBooks</div>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium">Xero</div>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium">Google Workspace</div>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium">Microsoft 365</div>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium">Slack</div>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium">Microsoft Teams</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium">+ Many more</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <Link to="/hub">
                  <Button>View in Hub</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Teams get more done with Zenith</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-semibold mb-2">"We replaced four tools."</p>
                <p className="text-muted-foreground text-sm">
                  Zenith consolidated our project management, inventory, and HR systems into one platform. 
                  Setup was smooth and our team adapted quickly.
                </p>
                <div className="mt-4 text-sm text-muted-foreground">— Sarah M., Operations Director</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-semibold mb-2">"Setup was quick."</p>
                <p className="text-muted-foreground text-sm">
                  We were up and running in less than a day. The interface is intuitive and 
                  our team didn't need extensive training.
                </p>
                <div className="mt-4 text-sm text-muted-foreground">— James L., IT Manager</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-semibold mb-2">"Reporting is instant."</p>
                <p className="text-muted-foreground text-sm">
                  Real-time dashboards give us visibility across all departments. 
                  No more waiting for weekly reports or manual data compilation.
                </p>
                <div className="mt-4 text-sm text-muted-foreground">— Maria G., CEO</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simple, modular pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the modules you need. Scale as you grow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-6 w-6 text-primary" />
                  <CardTitle>Starter</CardTitle>
                </div>
                <CardDescription>Perfect for small teams</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Up to 10 users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">2 modules included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic integrations</span>
                  </li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-primary border-2 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                  <CardTitle>Growth</CardTitle>
                </div>
                <CardDescription>For growing businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Up to 50 users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">All modules included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Custom dashboards</span>
                  </li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  <CardTitle>Enterprise</CardTitle>
                </div>
                <CardDescription>For large organizations</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Unlimited users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">All modules + custom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">SSO & advanced security</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">On-premise option</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does setup take?</AccordionTrigger>
              <AccordionContent>
                Most teams are up and running within 24 hours. Our guided onboarding process walks you 
                through configuring your modules, importing data, and inviting team members. For enterprise 
                deployments, our customer success team provides hands-on support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I integrate with existing tools?</AccordionTrigger>
              <AccordionContent>
                Yes! Zenith integrates with popular tools like QuickBooks, Xero, Google Workspace, 
                Microsoft 365, Slack, and Microsoft Teams. We also offer a robust REST API for custom 
                integrations. View our full integration catalog in the hub.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What's your pricing model?</AccordionTrigger>
              <AccordionContent>
                We charge per user per month. You only pay for the modules you use. Start with what you 
                need today and add more modules as you grow—no migrations required. All plans include 
                a 14-day free trial with no credit card required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We're SOC2 compliant and use bank-level encryption for data in transit and 
                at rest. Our infrastructure is hosted on AWS with 99.9% uptime SLA. Enterprise plans 
                include SSO, advanced access controls, and optional on-premise deployment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I try before I buy?</AccordionTrigger>
              <AccordionContent>
                Yes! All plans come with a 14-day free trial. No credit card required. You'll have full 
                access to all features during the trial period. Our team is available to help you get 
                the most out of your trial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
              <AccordionContent>
                Starter plans include email support with 24-hour response time. Growth plans get priority 
                support with 4-hour response time. Enterprise customers get a dedicated account manager 
                and phone support. All plans include access to our comprehensive documentation and video 
                tutorials.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to unify your business operations?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join teams that are working smarter with Zenith. Start your free trial today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/hub">
              <Button size="lg" className="gap-2">
                Launch the Hub <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">Schedule a Demo</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-lg mb-4">Zenith Technologies</div>
              <p className="text-sm text-muted-foreground">
                Unified BusinessOps Platform for modern teams
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#integrations" className="hover:text-foreground">Integrations</a></li>
                <li><Link to="/hub" className="hover:text-foreground">Launch Hub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground">Tutorials</a></li>
                <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 Zenith Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
