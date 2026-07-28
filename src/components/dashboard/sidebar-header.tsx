import { Icon } from "./dashboard-icons";
import styles from "./sidebar-header.module.css";

export function SidebarHeader({ onClose }: { onClose?: () => void }) {
  return <div className={styles.header}>
    <div className={styles.brand}>
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.wordmark}>SHIPNOW</span>
      {onClose && <button className={styles.close} onClick={onClose} aria-label="Close menu"><Icon name="close" /></button>}
    </div>
    <div className={styles.profile}>
      <span className={styles.avatar}>JD</span>
      <div className={styles.identity}><b>John Doe</b><small>Admin</small></div>
      <span className={styles.chevron}>⌄</span>
    </div>
  </div>;
}
