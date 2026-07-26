export type InventoryCategory = { name:string; percent:number; packages:number; tone:"purple"|"stripePurple"|"dark"|"stripeDark"|"gray"|"stripeGray" };
export type StorageRow = { floor:number; section:string; category:string; used:number; available:number };
export type PackageStatus = { id:string; date:string; status:"Sent"|"Received"|"Expected" };
export type WarehouseZone = { name:string; prefix:string; slots:number; available:number; full:number[] };

export const warehouseSummary=[
  {label:"Total SKU",value:"285",suffix:"",change:"+2.58%"},
  {label:"Quantity on Hand",value:"12,450",suffix:"units",change:"+4.37%"},
  {label:"Capacity Usage",value:"62.5%",suffix:"Full",change:"+1.54%"},
];

export const inventory:InventoryCategory[]=[
  {name:"Electronics",percent:25,packages:2500,tone:"purple"},
  {name:"Apparel",percent:20,packages:2000,tone:"stripePurple"},
  {name:"Home & Kitchen",percent:18,packages:1800,tone:"dark"},
  {name:"Beauty & Health",percent:15,packages:1500,tone:"stripeDark"},
  {name:"Automotive Parts",percent:12,packages:1200,tone:"gray"},
  {name:"Sports Equipment",percent:10,packages:1000,tone:"stripeGray"},
];

export const storageRows:StorageRow[]=[
  {floor:1,section:"A1 – A10",category:"Electronics",used:80,available:20},
  {floor:2,section:"B1 – B10",category:"Apparel",used:60,available:40},
  {floor:1,section:"C1 – C10",category:"Home & Kitchen",used:90,available:10},
  {floor:3,section:"D1 – D10",category:"Automotive Parts",used:50,available:50},
  {floor:2,section:"E1 – E10",category:"Beauty & Health",used:70,available:30},
];

export const packageStatuses:PackageStatus[]=[
  {id:"PKG-HK77420",date:"March 20, 2035 – 05:30 PM",status:"Sent"},
  {id:"PKG-A50812",date:"March 21, 2035 – 01:45 PM",status:"Received"},
  {id:"PKG-E10293",date:"March 22, 2035 – 09:00 AM",status:"Expected"},
];

const floorOne:WarehouseZone[]=[
  {name:"Electronics",prefix:"A",slots:3,available:20,full:[2]},
  {name:"Home & Kitchen",prefix:"C",slots:3,available:10,full:[2,3]},
  {name:"Automotive Parts",prefix:"D",slots:3,available:50,full:[]},
  {name:"Sports Equipment",prefix:"F",slots:3,available:45,full:[3]},
  {name:"Apparel",prefix:"B",slots:10,available:20,full:[2,3,6,7,9]},
  {name:"Beauty & Health",prefix:"E",slots:4,available:30,full:[2]},
];

export const warehouseFloors:Record<number,WarehouseZone[]>={
  1:floorOne,
  2:floorOne.map((zone,index)=>({...zone,prefix:String.fromCharCode(71+index),available:[35,25,60,40,30,55][index]})),
  3:floorOne.map((zone,index)=>({...zone,prefix:String.fromCharCode(77+index),available:[45,50,25,65,40,20][index]})),
};

export const activities=[
  {name:"Leo Fernandez",text:"confirmed receipt of 40 units of Winter Jacket Series in Section B3 (Apparel)",time:"01:45 PM",icon:"✓",purple:false},
  {name:"Ava Martinez",text:"added 25 units of Smart Router Kit to Section A1 (Electronics)",time:"09:15 AM",icon:"≋",purple:true},
  {name:"Oscar Liem",text:"dispatched 18 units of Stainless Steel Cookware Set from Section C5 (Home & Kitchen)",time:"05:30 PM",icon:"▣",purple:false},
  {name:"Dina Choi",text:"created a shipment entry for Brake Pad Sets in Section D2 (Automotive Parts)",time:"04:10 PM",icon:"◇",purple:true},
];
