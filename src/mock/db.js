const customers = [
  { id: 1, name: 'J. Carter', company: 'Bluewave Trading', email: 'j.carter@bluewavetrading.example.com', phone: '+1-555-0101', country: 'USA' },
  { id: 2, name: 'M. Okafor', company: 'Northgate Supply', email: 'm.okafor@northgatesupply.example.com', phone: '+1-555-0102', country: 'Canada' },
  { id: 3, name: 'A. Haddad', company: 'Solstice Logistics', email: 'a.haddad@solsticelogistics.example.com', phone: '+44-555-0103', country: 'UK' },
  { id: 4, name: 'L. Fontaine', company: 'Horizon Freight', email: 'l.fontaine@horizonfreight.example.com', phone: '+33-555-0104', country: 'France' },
  { id: 5, name: 'R. Tanaka', company: 'Pacifica Imports', email: 'r.tanaka@pacificaimports.example.com', phone: '+81-555-0105', country: 'Japan' },
  { id: 6, name: 'S. Nielsen', company: 'Nordic Cargo Co.', email: 's.nielsen@nordiccargo.example.com', phone: '+45-555-0106', country: 'Denmark' },
  { id: 7, name: 'P. dos Santos', company: 'Verde Shipping', email: 'p.santos@verdeshipping.example.com', phone: '+55-555-0107', country: 'Brazil' },
  { id: 8, name: 'K. Patel', company: 'Apex Distribution', email: 'k.patel@apexdistribution.example.com', phone: '+91-555-0108', country: 'India' },
  { id: 9, name: 'E. Schmidt', company: 'Rhine Transit', email: 'e.schmidt@rhinetransit.example.com', phone: '+49-555-0109', country: 'Germany' },
  { id: 10, name: 'N. Ivanov', company: 'Volga Forwarding', email: 'n.ivanov@volgaforwarding.example.com', phone: '+7-555-0110', country: 'Russia' },
  { id: 11, name: 'T. O\'Brien', company: 'Emerald Express', email: 't.obrien@emeraldexpress.example.com', phone: '+353-555-0111', country: 'Ireland' },
  { id: 12, name: 'Y. Yamamoto', company: 'Rising Sun Freight', email: 'y.yamamoto@risingsunfreight.example.com', phone: '+81-555-0112', country: 'Japan' },
  { id: 13, name: 'C. Mueller', company: 'Alpine Haulage', email: 'c.mueller@alpinehaulage.example.com', phone: '+41-555-0113', country: 'Switzerland' },
  { id: 14, name: 'O. Kowalski', company: 'Baltic Trade Lines', email: 'o.kowalski@baltictradelines.example.com', phone: '+48-555-0114', country: 'Poland' },
  { id: 15, name: 'H. Andersen', company: 'Fjord Logistics', email: 'h.andersen@fjordlogistics.example.com', phone: '+47-555-0115', country: 'Norway' },
  { id: 16, name: 'G. Rossi', company: 'Medlink Transport', email: 'g.rossi@medlinktransport.example.com', phone: '+39-555-0116', country: 'Italy' },
  { id: 17, name: 'B. Sato', company: 'Sakura Courier', email: 'b.sato@sakuracourier.example.com', phone: '+81-555-0117', country: 'Japan' },
  { id: 18, name: 'F. Dubois', company: 'Seine Logistics', email: 'f.dubois@seinelogistics.example.com', phone: '+33-555-0118', country: 'France' },
  { id: 19, name: 'D. Fernandez', company: 'Iberia Freight', email: 'd.fernandez@iberiafreight.example.com', phone: '+34-555-0119', country: 'Spain' },
  { id: 20, name: 'I. Popescu', company: 'Danube Dispatch', email: 'i.popescu@danubedispatch.example.com', phone: '+40-555-0120', country: 'Romania' },
  { id: 21, name: 'W. Chen', company: 'Red Star Forwarding', email: 'w.chen@redstarforwarding.example.com', phone: '+86-555-0121', country: 'China' },
  { id: 22, name: 'Z. Ali', company: 'Crescent Cargo', email: 'z.ali@crescentcargo.example.com', phone: '+92-555-0122', country: 'Pakistan' },
  { id: 23, name: 'V. Kumar', company: 'Monsoon Shipping', email: 'v.kumar@monsoonshipping.example.com', phone: '+91-555-0123', country: 'India' },
  { id: 24, name: 'Q. van der Berg', company: 'Cape Route Logistics', email: 'q.vanderberg@caproutelogistics.example.com', phone: '+27-555-0124', country: 'South Africa' }
]

const statusPool = ['pending', 'shipped', 'delivered', 'cancelled']
const statusWeights = [22, 28, 42, 8]

const weightedStatus = () => {
  const total = statusWeights.reduce((a, b) => a + b, 0)
  let random = Math.random() * total
  for (let i = 0; i < statusPool.length; i++) {
    random -= statusWeights[i]
    if (random <= 0) return statusPool[i]
  }
  return statusPool[statusPool.length - 1]
}

const products = [
  'Industrial Pallet Rack',
  'Corrugated Boxes 20x20x20',
  'Shrink Wrap Film',
  'Wooden Crates',
  'Shipping Labels',
  'Steel Strapping',
  'Foam Inserts',
  'Pallet Jacks',
  'Barcode Scanners',
  'Warehouse Totes'
]

const generateOrders = () => {
  const orders = []
  const startDate = new Date('2024-01-01').getTime()
  const endDate = new Date('2024-12-31').getTime()

  for (let i = 1; i <= 62; i++) {
    const idNumber = 2024000 + i
    const orderId = `ORD-${idNumber}`
    const customer = customers[(i - 1) % customers.length]
    const orderDate = new Date(startDate + Math.random() * (endDate - startDate))
    const amountRaw = 300 + Math.random() * 4700
    const amount = Math.round(amountRaw * 100) / 100
    const status = weightedStatus()
    const productCount = 1 + Math.floor(Math.random() * 4)
    const items = []
    for (let j = 0; j < productCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)]
      const qty = 1 + Math.floor(Math.random() * 12)
      const unitPrice = Math.round((20 + Math.random() * 180) * 100) / 100
      items.push({ product, qty, unitPrice })
    }
    const destination = customer.country
    orders.push({
      id: orderId,
      customerId: customer.id,
      customerName: customer.name,
      company: customer.company,
      email: customer.email,
      amount,
      status,
      orderDate: orderDate.toISOString().split('T')[0],
      destination,
      items,
      notes: status === 'cancelled' ? 'Cancelled per customer request.' : ''
    })
  }
  return orders.sort((a, b) => b.orderDate.localeCompare(a.orderDate))
}

const orders = generateOrders()

export { orders, customers }
