export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Welcome to Zenith
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern SaaS Solution - Elevate your business to new heights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Project Management</h3>
              <p className="text-muted-foreground">Manage your projects with Kanban boards, timelines, and more</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Inventory Control</h3>
              <p className="text-muted-foreground">Track your inventory, manage suppliers, and handle purchase orders</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Team Management</h3>
              <p className="text-muted-foreground">HR, workforce management, and team collaboration tools</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}



