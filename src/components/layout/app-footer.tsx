type AppFooterProps = {
  className: string;
  socialClassName?: string;
  dashboardLinks?: boolean;
};

const legal = <><b>Copyright © 2025 Peterdraw</b><span>Privacy Policy</span><span>Term and conditions</span><span>Contact</span></>;
const social = <><span>ⓕ</span><span>𝕏</span><span>◎</span><span>▷</span><span>in</span></>;

export function AppFooter({className,socialClassName,dashboardLinks=false}:AppFooterProps) {
  if(dashboardLinks) return <footer className={className}><div><b>Copyright © 2025 Peterdraw</b><a href="#">Privacy Policy</a><a href="#">Term and conditions</a><a href="#">Contact</a></div><nav aria-label="Social media"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="X">𝕏</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="YouTube">▷</a><a href="#" aria-label="LinkedIn">in</a></nav></footer>;
  return <footer className={className}><div>{legal}</div><div className={socialClassName} aria-label="Social links">{social}</div></footer>;
}
