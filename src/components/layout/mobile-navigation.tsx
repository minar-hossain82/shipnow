"use client";

import { useEffect, useRef, useState } from "react";
import { AuthenticatedSidebarContent } from "@/components/dashboard/authenticated-sidebar-content";

type MobileNavigationProps = {
  activeLabel: string;
  barClassName: string;
  backdropClassName: string;
  drawerClassName?: string;
  openBackdropClassName?: string;
  openDrawerClassName?: string;
  leading: React.ReactNode;
  title: React.ReactNode;
  menu: React.ReactNode;
  menuAriaLabel?: string;
  persistent?: boolean;
};

export function MobileNavigation({activeLabel,barClassName,backdropClassName,drawerClassName="",openBackdropClassName="",openDrawerClassName="",leading,title,menu,menuAriaLabel="Open navigation",persistent=false}:MobileNavigationProps) {
  const [open,setOpen]=useState(false);
  const triggerRef=useRef<HTMLButtonElement>(null);
  const drawerRef=useRef<HTMLElement>(null);
  const close=()=>setOpen(false);

  useEffect(()=>{
    if(!open)return;
    const trigger=triggerRef.current;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape")close()};
    document.addEventListener("keydown",onKeyDown);
    requestAnimationFrame(()=>drawerRef.current?.querySelector<HTMLElement>("button, a")?.focus());
    return()=>{document.body.style.overflow=previousOverflow;document.removeEventListener("keydown",onKeyDown);trigger?.focus()};
  },[open]);

  const drawer=<><button type="button" aria-label="Close navigation" className={`${backdropClassName} ${open?openBackdropClassName:""}`} onClick={close}/><aside ref={drawerRef} className={`${drawerClassName} ${open?openDrawerClassName:""}`} onClick={event=>event.stopPropagation()}><AuthenticatedSidebarContent active={activeLabel} onNavigate={close} onClose={close}/></aside></>;
  return <><header className={barClassName}>{leading}{title}<button ref={triggerRef} type="button" aria-label={menuAriaLabel} aria-expanded={open} onClick={()=>setOpen(true)}>{menu}</button></header>{persistent?drawer:open&&<div className={backdropClassName} onClick={close}><aside ref={drawerRef} className={drawerClassName} onClick={event=>event.stopPropagation()}><AuthenticatedSidebarContent active={activeLabel} onNavigate={close} onClose={close}/></aside></div>}</>;
}
