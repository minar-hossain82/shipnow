export type InvoiceStatus = "Paid" | "Unpaid" | "Overdue";
export type LineItem = { description:string; shipmentType:string; service:string; price:number; quantity:number };
export type Invoice = { id:string; company:string; shippingId:string; issueDate:string; dueDate:string; amount:number; status:InvoiceStatus; mark:string; email:string; address:string; phone:string; items:LineItem[] };

const companies = [
  ["TechGear Inc.","#SH9283746","Mar 15, 2035","Mar 22, 2035","Paid","◆","billing@techgear.com","74 Market Street, Minneapolis, MN 55401, USA","+1 612-555-2140"],
  ["StyleHub Co.","#SH9182635","Mar 16, 2035","Mar 23, 2035","Unpaid","△","billing@stylehub.com","201 Madison Ave, New York, NY 10016, USA","+1 212-555-0188"],
  ["FreshNest","#SH9037821","Mar 14, 2035","Mar 21, 2035","Paid","♜","accounts@freshnest.com","38 Commerce Drive, Dallas, TX 75201, USA","+1 214-555-6402"],
  ["FitPlus Gear","#SH9374652","Mar 17, 2035","Mar 24, 2035","Unpaid","●","billing@fitplus.com","405 Pine Street, Seattle, WA 98101, USA","+1 206-555-8812"],
  ["AutoParts Pro","#SH9457830","Mar 15, 2035","Mar 22, 2035","Overdue","◩","finance@autopartspro.com","720 Woodward Ave, Detroit, MI 48226, USA","+1 313-555-9014"],
  ["EcoLights","#SH8821349","Mar 13, 2035","Mar 20, 2035","Paid","✳","billing@ecolights.com","112 Congress Ave, Austin, TX 78701, USA","+1 512-555-4407"],
  ["GreenHaven","#SH8967432","Mar 14, 2035","Mar 21, 2035","Paid","♜","logistics@greenhaven.com","1120 Birch Street, Portland, OR 97205, USA","+1 503-555-7210"],
  ["ModaWear","#SH8893247","Mar 16, 2035","Mar 23, 2035","Unpaid","ᴍ","billing@modawear.com","89 Franklin St, Boston, MA 02110, USA","+1 617-555-2290"],
  ["SunCore Panels","#SH9018723","Mar 17, 2035","Mar 24, 2035","Unpaid","✣","billing@suncore.com","450 Harbor Drive, San Diego, CA 92101, USA","+1 619-555-7710"],
  ["VitaFresh","#SH8881190","Mar 15, 2035","Mar 22, 2035","Overdue","☁","billing@vitafresh.com","210 Broadway, Nashville, TN 37201, USA","+1 615-555-6020"],
  ["SmartAppliance","#SH8923752","Mar 18, 2035","Mar 25, 2035","Paid","▧","billing@smartappliance.com","901 Lakeside Ave, Cleveland, OH 44114, USA","+1 216-555-4310"],
] as const;
const amounts=[1250,980,1320,1150,1480,790,875,910,1600,1120,1050];

export const invoices:Invoice[]=companies.map((company,index)=>{
  const amount=amounts[index];
  const prices=index===7?[120,180,95]:[Math.round(amount*.4),Math.round(amount*.35),Math.round(amount*.25)];
  const quantities=index===7?[3,2,2]:[1,1,1];
  const items=prices.map((price,itemIndex)=>({description:["Lightweight Hoodie Pack","Autumn Jacket Set","Lightweight Hoodie Pack"][itemIndex],shipmentType:"Road Freight",service:["Express","Standard","Express"][itemIndex],price,quantity:quantities[itemIndex]}));
  return {id:`INV-${1001+index}`,company:company[0],shippingId:company[1],issueDate:company[2],dueDate:company[3],status:company[4] as InvoiceStatus,mark:company[5],email:company[6],address:company[7],phone:company[8],amount,items};
});
