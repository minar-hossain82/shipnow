import styles from "./sidebar-promo-card.module.css";

export function SidebarPromoCard() {
  return <div className={styles.card}><i aria-hidden="true">{"//"}</i><h2>Loving<br/>ShipNow<br/>Free?</h2><p>Go Pro to access priority support, real-time tracking, and full analytics.</p><button type="button">Go Pro Today</button></div>;
}
