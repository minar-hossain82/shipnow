"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Icon } from "@/components/dashboard/icons";
import { type InventoryCategory } from "@/data/warehouse";
import styles from "./warehouse-inventory.module.css";

const fills:Record<InventoryCategory["tone"],string>={purple:"#8065f4",stripePurple:"url(#stripePurple)",dark:"#292929",stripeDark:"url(#stripeDark)",gray:"#858585",stripeGray:"url(#stripeGray)"};
function Patterns(){return <defs><pattern id="stripePurple" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="11" fill="#8065f4"/><rect x="9" width="2" height="11" fill="#b9aafa"/></pattern><pattern id="stripeDark" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="11" fill="#292929"/><rect x="9" width="2" height="11" fill="#747474"/></pattern><pattern id="stripeGray" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="11" fill="#777"/><rect x="9" width="2" height="11" fill="#aaa"/></pattern></defs>}
function InventoryTooltip({active,payload}:{active?:boolean;payload?:Array<{payload:InventoryCategory}>}){const item=payload?.[0]?.payload;if(!active||!item)return null;return <div className={styles.tooltip}><b>{item.name}</b><span>{item.percent}% · {item.packages.toLocaleString()} packages</span></div>}

function InventoryColumn({item}:{item:InventoryCategory}){
  return <article className={styles.column}><div className={styles.label}>{item.name}</div><div className={styles.guide}><div className={styles.verticalChart}><ResponsiveContainer width="100%" height="100%"><BarChart data={[item]} margin={{top:0,right:0,bottom:0,left:0}}><Patterns/><XAxis dataKey="name" hide/><YAxis domain={[0,100]} hide/><Tooltip cursor={false} content={<InventoryTooltip/>}/><Bar dataKey="percent" fill={fills[item.tone]} radius={[4,4,0,0]} isAnimationActive={false}/></BarChart></ResponsiveContainer></div><div className={styles.horizontalChart}><ResponsiveContainer width="100%" height="100%"><BarChart data={[item]} layout="vertical" margin={{top:0,right:0,bottom:0,left:0}}><Patterns/><XAxis type="number" domain={[0,100]} hide/><YAxis type="category" dataKey="name" hide/><Tooltip cursor={false} content={<InventoryTooltip/>}/><Bar dataKey="percent" fill={fills[item.tone]} radius={[0,2,2,0]} isAnimationActive={false}/></BarChart></ResponsiveContainer></div></div><div className={styles.footerValue}><strong>{item.percent}%</strong><span>· {item.packages.toLocaleString()}</span></div></article>;
}

export function WarehouseInventory({items,className=""}:{items:InventoryCategory[];className?:string}){
  const total=items.reduce((sum,item)=>sum+item.packages,0);
  return <section className={`${styles.card} ${className}`}><header className={styles.header}><h2>Warehouse Inventory</h2><div><strong>{total.toLocaleString()}</strong><span>packages</span><Icon name="more"/></div></header><div className={styles.grid}>{items.map(item=><InventoryColumn item={item} key={item.name}/>)}</div></section>;
}
