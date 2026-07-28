export const metrics = [
  { label: "Active Shipments", value: "1,284", suffix: "shipments", change: "+8.7%", period: "from last week", icon: "truck" },
  { label: "Delivery Performance", value: "94.3%", suffix: "on-time", change: "-1.2%", period: "from last week", icon: "chart" },
  { label: "Revenue", value: "$82,450", suffix: "", change: "+12.4%", period: "from last month", icon: "money" },
] as const;

export const chartData = [
  { month: "Jan", shipments: 1300, revenue: 43000, cost: 30000 },
  { month: "Feb", shipments: 2000, revenue: 37000, cost: 26000 },
  { month: "Mar", shipments: 1000, revenue: 51000, cost: 42000 },
  { month: "Apr", shipments: 1900, revenue: 71000, cost: 39000 },
  { month: "May", shipments: 3124, revenue: 87524, cost: 45680 },
  { month: "Jan ", shipments: 2500, revenue: 79000, cost: 45000 },
  { month: "Jul", shipments: 3600, revenue: 61000, cost: 50000 },
  { month: "Aug", shipments: 4300, revenue: 69000, cost: 37000 },
];

export const freight = [
  { value: 46, name: "Road Freight", count: "1,150 shipment", color: "#8065f4" },
  { value: 17, name: "Ocean Freight", count: "425 shipments", color: "#77777a" },
  { value: 28, name: "Air Freight", count: "700 shipments", color: "#29292b" },
  { value: 9, name: "Rail Freight", count: "225 shipments", color: "#d7d7d9" },
];

export const categories = [
  { name: "Electronics", products: 240, percent: 24, color: "#8065f4" },
  { name: "Home & Kitchen", products: 200, percent: 20, color: "#dcd5fb" },
  { name: "Apparel", products: 180, percent: 18, color: "#29292b" },
  { name: "Beauty & Health", products: 140, percent: 14, color: "#7c7c7f" },
  { name: "Sports & Outdoors", products: 120, percent: 12, color: "#d2d2d4" },
  { name: "Automotive", products: 120, percent: 12, color: "#ededee" },
];

export const alerts = [
  { title: "Customs Clearance Delay", id: "#SH8743921", type: "Ocean Freight", date: "Mar 20", icon: "document" },
  { title: "Incorrect Address Provided", id: "#SH8725810", type: "Road Freight", date: "Mar 20", icon: "pin" },
  { title: "Weather-Related Hold", id: "#SH8790043", type: "Air Freight", date: "Mar 19", icon: "weather" },
  { title: "Incorrect Address Provided", id: "#SH8716654", type: "Rail Freight", date: "Mar 18", icon: "document" },
] as const;

export const shipments = [
  { id: "#SH9283746", company: "TechGear Inc.", category: "Electronics", carrier: "FedEx", route: "Los Angeles, CA → Chicago, IL", date: "Mar 20, 2035", status: "In Transit" },
  { id: "#SH9182635", company: "StyleHub Co.", category: "Apparel", carrier: "DHL", route: "New York, NY → Atlanta, GA", date: "Mar 19, 2035", status: "Out for Delivery" },
  { id: "#SH9037821", company: "FreshNest", category: "Home & Kitchen", carrier: "UPS", route: "Dallas, TX → Miami, FL", date: "Mar 18, 2035", status: "Delivered" },
  { id: "#SH9374652", company: "FitPlus Gear", category: "Sports & Outdoors", carrier: "USPS", route: "Seattle, WA → Denver, CO", date: "Mar 21, 2035", status: "Processing" },
  { id: "#SH9457830", company: "AutoParts Pro", category: "Automotive", carrier: "Aramex", route: "Detroit, MI → San Diego, CA", date: "Mar 20, 2035", status: "In Transit" },
];

export const activities = [
  { icon: "box", text: "User", user: "@TechGuru99", rest: " submitted a bulk shipment request", time: "12:00 PM" },
  { icon: "tag", text: "Customer Support", user: "@SupportKen", rest: " added a priority tag to Order ID 77889JKL", time: "11:30 AM" },
  { icon: "refresh", text: "User", user: "@SallyMae88", rest: " initiated a return process for Order ID 44556GHI", time: "11:00 AM" },
  { icon: "check", text: "Administrator", user: "@AdminLisa", rest: " resolved a delivery issue for Order ID 12345XYZ", time: "10:15 AM" },
] as const;
