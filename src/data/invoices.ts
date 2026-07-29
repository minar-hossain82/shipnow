export type InvoiceStatus = "Paid" | "Unpaid" | "Overdue";
export type InvoiceContact = { name:string; email:string; address:string; phone:string };
export type InvoiceLineItem = { description:string; shipmentType:string; service:string; unitPrice:number; quantity:number };
export type Invoice = {
  invoiceId:string; shippingId:string; company:string; logoKey:string; status:InvoiceStatus; issueDate:string; dueDate:string;
  billFrom:InvoiceContact; billTo:InvoiceContact; packageSummary:InvoiceLineItem[]; taxRate:number; serviceFee:number; notes?:string;
};

const companies = [
  ["TechGear Inc.","#SH9283746","Mar 15, 2035","Mar 22, 2035","Paid","billing@techgear.com","74 Market Street, Minneapolis, MN 55401, USA","+1 612-555-2140"],
  ["StyleHub Co.","#SH9182635","Mar 16, 2035","Mar 23, 2035","Unpaid","billing@stylehub.com","201 Madison Ave, New York, NY 10016, USA","+1 212-555-0188"],
  ["FreshNest","#SH9037821","Mar 14, 2035","Mar 21, 2035","Paid","accounts@freshnest.com","38 Commerce Drive, Dallas, TX 75201, USA","+1 214-555-6402"],
  ["FitPlus Gear","#SH9374652","Mar 17, 2035","Mar 24, 2035","Unpaid","billing@fitplus.com","405 Pine Street, Seattle, WA 98101, USA","+1 206-555-8812"],
  ["AutoParts Pro","#SH9457830","Mar 15, 2035","Mar 22, 2035","Overdue","finance@autopartspro.com","720 Woodward Ave, Detroit, MI 48226, USA","+1 313-555-9014"],
  ["EcoLights","#SH8821349","Mar 13, 2035","Mar 20, 2035","Paid","billing@ecolights.com","112 Congress Ave, Austin, TX 78701, USA","+1 512-555-4407"],
  ["GreenHaven","#SH8967432","Mar 14, 2035","Mar 21, 2035","Paid","logistics@greenhaven.com","1120 Birch Street, Portland, OR 97205, USA","+1 503-555-7210"],
  ["ModaWear","#SH8893247","Mar 16, 2035","Mar 23, 2035","Unpaid","billing@modawear.com","89 Franklin St, Boston, MA 02110, USA","+1 617-555-2290"],
  ["SunCore Panels","#SH9018723","Mar 17, 2035","Mar 24, 2035","Unpaid","billing@suncore.com","450 Harbor Drive, San Diego, CA 92101, USA","+1 619-555-7710"],
  ["VitaFresh","#SH8881190","Mar 15, 2035","Mar 22, 2035","Overdue","billing@vitafresh.com","210 Broadway, Nashville, TN 37201, USA","+1 615-555-6020"],
  ["SmartAppliance","#SH8923752","Mar 18, 2035","Mar 25, 2035","Paid","billing@smartappliance.com","901 Lakeside Ave, Cleveland, OH 44114, USA","+1 216-555-4310"],
] as const;
const packageSummaries:InvoiceLineItem[][] = [
  [{description:"Electronics Cargo",shipmentType:"Air Freight",service:"Express",unitPrice:500,quantity:1},{description:"Electronics Cargo - Standard",shipmentType:"Air Freight",service:"Standard",unitPrice:438,quantity:1},{description:"Handling and Packaging",shipmentType:"Air Freight",service:"Priority",unitPrice:312,quantity:1}],
  [{description:"Apparel Collection",shipmentType:"Road Freight",service:"Express",unitPrice:392,quantity:1},{description:"Apparel Collection - Standard",shipmentType:"Road Freight",service:"Standard",unitPrice:343,quantity:1},{description:"Handling and Packaging",shipmentType:"Road Freight",service:"Priority",unitPrice:245,quantity:1}],
  [{description:"Kitchen Equipment",shipmentType:"Ocean Freight",service:"Express",unitPrice:528,quantity:1},{description:"Kitchen Equipment - Standard",shipmentType:"Ocean Freight",service:"Standard",unitPrice:462,quantity:1},{description:"Handling and Packaging",shipmentType:"Ocean Freight",service:"Priority",unitPrice:330,quantity:1}],
  [{description:"Fitness Gear",shipmentType:"Rail Freight",service:"Express",unitPrice:460,quantity:1},{description:"Fitness Gear - Standard",shipmentType:"Rail Freight",service:"Standard",unitPrice:403,quantity:1},{description:"Handling and Packaging",shipmentType:"Rail Freight",service:"Priority",unitPrice:287,quantity:1}],
  [{description:"Engine Components",shipmentType:"Air Freight",service:"Express",unitPrice:592,quantity:1},{description:"Engine Components - Standard",shipmentType:"Air Freight",service:"Standard",unitPrice:518,quantity:1},{description:"Handling and Packaging",shipmentType:"Air Freight",service:"Priority",unitPrice:370,quantity:1}],
  [{description:"Lighting Equipment",shipmentType:"Road Freight",service:"Express",unitPrice:316,quantity:1},{description:"Lighting Equipment - Standard",shipmentType:"Road Freight",service:"Standard",unitPrice:277,quantity:1},{description:"Handling and Packaging",shipmentType:"Road Freight",service:"Priority",unitPrice:197,quantity:1}],
  [{description:"Garden Tool Set",shipmentType:"Ocean Freight",service:"Express",unitPrice:350,quantity:1},{description:"Garden Tool Set - Standard",shipmentType:"Ocean Freight",service:"Standard",unitPrice:306,quantity:1},{description:"Handling and Packaging",shipmentType:"Ocean Freight",service:"Priority",unitPrice:219,quantity:1}],
  [{description:"Lightweight Hoodie Pack",shipmentType:"Road Freight",service:"Express",unitPrice:120,quantity:3},{description:"Autumn Jacket Set",shipmentType:"Road Freight",service:"Standard",unitPrice:180,quantity:2},{description:"Lightweight Hoodie Pack",shipmentType:"Road Freight",service:"Express",unitPrice:95,quantity:2}],
  [{description:"Solar Panel Units",shipmentType:"Air Freight",service:"Express",unitPrice:640,quantity:1},{description:"Solar Panel Units - Standard",shipmentType:"Air Freight",service:"Standard",unitPrice:560,quantity:1},{description:"Handling and Packaging",shipmentType:"Air Freight",service:"Priority",unitPrice:400,quantity:1}],
  [{description:"Fresh Produce",shipmentType:"Road Freight",service:"Express",unitPrice:448,quantity:1},{description:"Fresh Produce - Standard",shipmentType:"Road Freight",service:"Standard",unitPrice:392,quantity:1},{description:"Handling and Packaging",shipmentType:"Road Freight",service:"Priority",unitPrice:280,quantity:1}],
  [{description:"Smart Appliances",shipmentType:"Ocean Freight",service:"Express",unitPrice:420,quantity:1},{description:"Smart Appliances - Standard",shipmentType:"Ocean Freight",service:"Standard",unitPrice:368,quantity:1},{description:"Handling and Packaging",shipmentType:"Ocean Freight",service:"Priority",unitPrice:262,quantity:1}],
];

export const invoices:Invoice[]=companies.map((company,index)=>{
  return {
    invoiceId:`INV-${1001+index}`,shippingId:company[1],company:company[0],logoKey:company[0],issueDate:company[2],dueDate:company[3],status:company[4] as InvoiceStatus,
    billFrom:{name:company[0],email:company[5],address:company[6],phone:company[7]},
    billTo:{name:"ShipNow Logistics",email:`accounts+${1001+index}@shipnow.com`,address:`${901+index} Distribution Ave, Charlotte, NC 28217, USA`,phone:`+1 704-555-${String(9911+index).padStart(4,"0")}`},
    packageSummary:packageSummaries[index],taxRate:[.08,.075,.09,.085][index%4],serviceFee:10+index,
    notes:index%3===0?"Please process payment by the due date to avoid delivery disruption.":index%3===1?"Include the invoice number with your payment.":undefined,
  };
});
