import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import HomePage from './pages/HomePage'
import HubPage from './pages/HubPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import InventoryPage from './pages/InventoryPage'
import InventoryCheckOutPage from './pages/InventoryCheckOutPage'
import InventoryScanInPage from './pages/InventoryScanInPage'
import InventoryPurchaseOrdersPage from './pages/InventoryPurchaseOrdersPage'
import InventorySuppliersPage from './pages/InventorySuppliersPage'
import InventoryTransactionsPage from './pages/InventoryTransactionsPage'
import InventoryItemDetailPage from './pages/InventoryItemDetailPage'
import InventoryPurchaseOrderDetailPage from './pages/InventoryPurchaseOrderDetailPage'
import CustomerSuccessPage from './pages/CustomerSuccessPage'
import WorkforcePage from './pages/WorkforcePage'
import HRPage from './pages/HRPage'
import ManufacturingPage from './pages/ManufacturingPage'
import AutomationPage from './pages/AutomationPage'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hub" element={<HubPage />} />
          
          {/* Projects Routes */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          
          {/* Inventory Routes */}
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/check-out" element={<InventoryCheckOutPage />} />
          <Route path="/inventory/scan-in" element={<InventoryScanInPage />} />
          <Route path="/inventory/purchase-orders" element={<InventoryPurchaseOrdersPage />} />
          <Route path="/inventory/purchase-orders/:id" element={<InventoryPurchaseOrderDetailPage />} />
          <Route path="/inventory/suppliers" element={<InventorySuppliersPage />} />
          <Route path="/inventory/transactions" element={<InventoryTransactionsPage />} />
          <Route path="/inventory/items/:id" element={<InventoryItemDetailPage />} />
          
          {/* Other Module Routes */}
          <Route path="/customer-success" element={<CustomerSuccessPage />} />
          <Route path="/workforce" element={<WorkforcePage />} />
          <Route path="/hr" element={<HRPage />} />
          <Route path="/manufacturing" element={<ManufacturingPage />} />
          <Route path="/automation" element={<AutomationPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
