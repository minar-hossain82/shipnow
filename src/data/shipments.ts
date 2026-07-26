export type ShipmentStatus = "In Transit" | "Out for Delivery" | "Delivered" | "Processing";

export type Shipment = {
  id: string;
  company: string;
  category: string;
  carrier: string;
  freight: string;
  product: string;
  weight: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  progress: number;
  status: ShipmentStatus;
  mark: string;
};

const baseShipments: Shipment[] = [
  { id:"#SH9283746", company:"TechGear Inc.", category:"Electronics", carrier:"FedEx", freight:"Air Freight", product:"Electronics", weight:"1,200 kg", origin:"Los Angeles, CA", destination:"Chicago, IL", departure:"Mar 20, 2035 – 10:00 AM", arrival:"Mar 23, 2035 – 03:00 PM", progress:60, status:"In Transit", mark:"◆" },
  { id:"#SH9182635", company:"StyleHub Co.", category:"Apparel", carrier:"DHL", freight:"Road Freight", product:"Apparel", weight:"850 kg", origin:"New York, NY", destination:"Atlanta, GA", departure:"Mar 19, 2035 – 11:30 AM", arrival:"Mar 22, 2035 – 01:00 PM", progress:75, status:"Out for Delivery", mark:"△" },
  { id:"#SH9037821", company:"FreshNest", category:"Home & Kitchen", carrier:"UPS", freight:"Ocean Freight", product:"Kitchen Appliances", weight:"1,450 kg", origin:"Dallas, TX", destination:"Miami, FL", departure:"Mar 18, 2035 – 09:00 AM", arrival:"Mar 21, 2035 – 06:00 PM", progress:100, status:"Delivered", mark:"♜" },
  { id:"#SH9374652", company:"FitPlus Gear", category:"Sports & Outdoors", carrier:"USPS", freight:"Rail Freight", product:"Fitness Equipment", weight:"960 kg", origin:"Seattle, WA", destination:"Denver, CO", departure:"Mar 21, 2035 – 08:45 AM", arrival:"Mar 25, 2035 – 04:30 PM", progress:40, status:"Processing", mark:"●" },
  { id:"#SH8821349", company:"EcoLights", category:"Electronics", carrier:"FedEx", freight:"Air Freight", product:"Electronics", weight:"1,100 kg", origin:"Austin, TX", destination:"Phoenix, AZ", departure:"Mar 19, 2035 – 12:00 PM", arrival:"Mar 21, 2035 – 05:00 PM", progress:90, status:"Out for Delivery", mark:"◩" },
  { id:"#SH9457830", company:"AutoParts Pro", category:"Automotive", carrier:"Aramex", freight:"Road Freight", product:"Engine Components", weight:"1,680 kg", origin:"Detroit, MI", destination:"San Diego, CA", departure:"Mar 20, 2035 – 07:15 AM", arrival:"Mar 26, 2035 – 02:00 PM", progress:100, status:"Delivered", mark:"✳" },
  { id:"#SH8967432", company:"GreenHaven", category:"Home & Garden", carrier:"USPS", freight:"Road Freight", product:"Home Tools", weight:"1,250 kg", origin:"Portland, OR", destination:"Salt Lake City, UT", departure:"Mar 18, 2035 – 02:45 PM", arrival:"Mar 22, 2035 – 11:00 AM", progress:65, status:"In Transit", mark:"♜" },
  { id:"#SH8893247", company:"ModaWear", category:"Apparel", carrier:"DHL", freight:"Road Freight", product:"Apparel", weight:"920 kg", origin:"Boston, MA", destination:"Charlotte, NC", departure:"Mar 20, 2035 – 01:00 PM", arrival:"Mar 23, 2035 – 08:00 AM", progress:80, status:"Out for Delivery", mark:"ᴍ" },
  { id:"#SH9018723", company:"SunCore Panels", category:"Electronics", carrier:"UPS", freight:"Rail Freight", product:"Solar Equipment", weight:"1,375 kg", origin:"San Diego, CA", destination:"Reno, NV", departure:"Mar 21, 2035 – 09:30 AM", arrival:"Mar 24, 2035 – 01:30 PM", progress:30, status:"Processing", mark:"✣" },
  { id:"#SH9113471", company:"QuickParts", category:"Automotive", carrier:"Aramex", freight:"Road Freight", product:"Automotive", weight:"1,020 kg", origin:"Tampa, FL", destination:"Houston, TX", departure:"Mar 20, 2035 – 04:00 PM", arrival:"Mar 23, 2035 – 12:00 PM", progress:90, status:"In Transit", mark:"▰" },
  { id:"#SH8881190", company:"VitaFresh", category:"Food & Beverage", carrier:"Local Courier", freight:"Road Freight", product:"Perishables", weight:"980 kg", origin:"Nashville, TN", destination:"Jacksonville, FL", departure:"Mar 21, 2035 – 06:00 AM", arrival:"Mar 22, 2035 – 10:00 AM", progress:85, status:"Out for Delivery", mark:"☁" },
  { id:"#SH8776103", company:"StyleDepot", category:"Fashion", carrier:"FedEx", freight:"Air Freight", product:"Fashion Items", weight:"1,020 kg", origin:"Minneapolis, MN", destination:"Kansas City, MO", departure:"Mar 19, 2035 – 10:15 AM", arrival:"Mar 22, 2035 – 03:30 PM", progress:60, status:"In Transit", mark:"▧" },
];

export const shipments: Shipment[] = Array.from({ length: 48 }, (_, index) => {
  const source = baseShipments[index % baseShipments.length];
  if (index < baseShipments.length) return source;
  return { ...source, id: `${source.id.slice(0, -2)}${String((Number(source.id.slice(-2)) + index) % 100).padStart(2, "0")}` };
});
