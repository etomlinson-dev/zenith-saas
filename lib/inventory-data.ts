export interface InventoryItem {
  id: string
  sku: string
  productName: string
  location: string
  onHandQty: number
  minQty: number
  reorderQty: number
  unitCost: number
  totalValue: number
  allocated: number
  supplier: string
  status: "in-stock" | "low-stock" | "out-of-stock"
  barcode?: string
  image?: string
  category?: string
  lastMovement?: Date
}

export interface InventoryMovement {
  id: string
  itemId: string
  date: Date
  reason: string
  change: number
  reference: string
  user: string
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  status: "draft" | "open" | "pending" | "received" | "cancelled"
  total: number
  createdDate: Date
  expectedDate?: Date
  lineItems: POLineItem[]
  attachments?: string[]
}

export interface POLineItem {
  id: string
  itemId: string
  sku: string
  productName: string
  quantity: number
  receivedQty: number
  unitCost: number
  total: number
}

export interface Supplier {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  address: string
  performanceScore: number
  leadTime: number
  totalOrders: number
  onTimeDelivery: number
}

export interface Transaction {
  id: string
  type: "scan-in" | "check-out"
  itemId: string
  sku: string
  productName: string
  quantity: number
  date: Date
  user: string
  reference?: string
  notes?: string
}

// Mock data
export const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    sku: "SKU-001",
    productName: "Wireless Mouse",
    location: "A-01-01",
    onHandQty: 150,
    minQty: 50,
    reorderQty: 100,
    unitCost: 25.99,
    totalValue: 3898.5,
    allocated: 20,
    supplier: "Tech Supplies Inc",
    status: "in-stock",
    barcode: "123456789012",
    category: "Electronics",
    lastMovement: new Date("2024-01-15"),
  },
  {
    id: "2",
    sku: "SKU-002",
    productName: "USB-C Cable",
    location: "A-01-02",
    onHandQty: 8,
    minQty: 20,
    reorderQty: 50,
    unitCost: 12.5,
    totalValue: 100,
    allocated: 5,
    supplier: "Cable World",
    status: "low-stock",
    barcode: "123456789013",
    category: "Accessories",
    lastMovement: new Date("2024-01-14"),
  },
  {
    id: "3",
    sku: "SKU-003",
    productName: "Laptop Stand",
    location: "B-02-01",
    onHandQty: 0,
    minQty: 10,
    reorderQty: 25,
    unitCost: 45.0,
    totalValue: 0,
    allocated: 0,
    supplier: "Office Depot",
    status: "out-of-stock",
    barcode: "123456789014",
    category: "Furniture",
    lastMovement: new Date("2024-01-10"),
  },
  {
    id: "4",
    sku: "SKU-004",
    productName: "Mechanical Keyboard",
    location: "A-01-03",
    onHandQty: 75,
    minQty: 30,
    reorderQty: 50,
    unitCost: 89.99,
    totalValue: 6749.25,
    allocated: 10,
    supplier: "Tech Supplies Inc",
    status: "in-stock",
    barcode: "123456789015",
    category: "Electronics",
    lastMovement: new Date("2024-01-16"),
  },
  {
    id: "5",
    sku: "SKU-005",
    productName: "Monitor 27 inch",
    location: "B-02-02",
    onHandQty: 15,
    minQty: 15,
    reorderQty: 20,
    unitCost: 299.99,
    totalValue: 4499.85,
    allocated: 3,
    supplier: "Display Solutions",
    status: "low-stock",
    barcode: "123456789016",
    category: "Electronics",
    lastMovement: new Date("2024-01-13"),
  },
]

export const inventoryMovements: InventoryMovement[] = [
  {
    id: "1",
    itemId: "1",
    date: new Date("2024-01-15"),
    reason: "Purchase Order",
    change: 50,
    reference: "PO-2024-001",
    user: "John Doe",
  },
  {
    id: "2",
    itemId: "1",
    date: new Date("2024-01-14"),
    reason: "Sales Order",
    change: -20,
    reference: "SO-2024-045",
    user: "Jane Smith",
  },
  {
    id: "3",
    itemId: "2",
    date: new Date("2024-01-14"),
    reason: "Sales Order",
    change: -12,
    reference: "SO-2024-046",
    user: "Jane Smith",
  },
]

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    supplier: "Tech Supplies Inc",
    status: "open",
    total: 5299.5,
    createdDate: new Date("2024-01-10"),
    expectedDate: new Date("2024-01-20"),
    lineItems: [
      {
        id: "1",
        itemId: "1",
        sku: "SKU-001",
        productName: "Wireless Mouse",
        quantity: 100,
        receivedQty: 50,
        unitCost: 25.99,
        total: 2599,
      },
      {
        id: "2",
        itemId: "4",
        sku: "SKU-004",
        productName: "Mechanical Keyboard",
        quantity: 30,
        receivedQty: 0,
        unitCost: 89.99,
        total: 2699.7,
      },
    ],
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    supplier: "Cable World",
    status: "pending",
    total: 625,
    createdDate: new Date("2024-01-12"),
    expectedDate: new Date("2024-01-18"),
    lineItems: [
      {
        id: "3",
        itemId: "2",
        sku: "SKU-002",
        productName: "USB-C Cable",
        quantity: 50,
        receivedQty: 0,
        unitCost: 12.5,
        total: 625,
      },
    ],
  },
  {
    id: "3",
    poNumber: "PO-2024-003",
    supplier: "Office Depot",
    status: "open",
    total: 1125,
    createdDate: new Date("2024-01-13"),
    expectedDate: new Date("2024-01-22"),
    lineItems: [
      {
        id: "4",
        itemId: "3",
        sku: "SKU-003",
        productName: "Laptop Stand",
        quantity: 25,
        receivedQty: 0,
        unitCost: 45.0,
        total: 1125,
      },
    ],
  },
  {
    id: "4",
    poNumber: "PO-2024-004",
    supplier: "Display Solutions",
    status: "draft",
    total: 5999.8,
    createdDate: new Date("2024-01-16"),
    lineItems: [
      {
        id: "5",
        itemId: "5",
        sku: "SKU-005",
        productName: "Monitor 27 inch",
        quantity: 20,
        receivedQty: 0,
        unitCost: 299.99,
        total: 5999.8,
      },
    ],
  },
]

export const suppliers: Supplier[] = [
  {
    id: "1",
    name: "Tech Supplies Inc",
    contactName: "Michael Johnson",
    email: "michael@techsupplies.com",
    phone: "(555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    performanceScore: 95,
    leadTime: 7,
    totalOrders: 45,
    onTimeDelivery: 98,
  },
  {
    id: "2",
    name: "Cable World",
    contactName: "Sarah Williams",
    email: "sarah@cableworld.com",
    phone: "(555) 234-5678",
    address: "456 Cable Ave, New York, NY 10001",
    performanceScore: 88,
    leadTime: 5,
    totalOrders: 32,
    onTimeDelivery: 94,
  },
  {
    id: "3",
    name: "Office Depot",
    contactName: "David Brown",
    email: "david@officedepot.com",
    phone: "(555) 345-6789",
    address: "789 Office Blvd, Chicago, IL 60601",
    performanceScore: 92,
    leadTime: 10,
    totalOrders: 28,
    onTimeDelivery: 96,
  },
  {
    id: "4",
    name: "Display Solutions",
    contactName: "Emily Davis",
    email: "emily@displaysolutions.com",
    phone: "(555) 456-7890",
    address: "321 Display Road, Austin, TX 78701",
    performanceScore: 90,
    leadTime: 14,
    totalOrders: 18,
    onTimeDelivery: 92,
  },
]

export const transactions: Transaction[] = [
  {
    id: "1",
    type: "scan-in",
    itemId: "1",
    sku: "SKU-001",
    productName: "Wireless Mouse",
    quantity: 50,
    date: new Date("2024-01-15"),
    user: "John Doe",
    reference: "PO-2024-001",
  },
  {
    id: "2",
    type: "check-out",
    itemId: "1",
    sku: "SKU-001",
    productName: "Wireless Mouse",
    quantity: 20,
    date: new Date("2024-01-14"),
    user: "Jane Smith",
    reference: "SO-2024-045",
  },
  {
    id: "3",
    type: "check-out",
    itemId: "2",
    sku: "SKU-002",
    productName: "USB-C Cable",
    quantity: 12,
    date: new Date("2024-01-14"),
    user: "Jane Smith",
    reference: "SO-2024-046",
  },
]
