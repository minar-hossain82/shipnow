import { Icon } from "@/components/dashboard/icons";
import { inventory, type InventoryCategory } from "@/data/warehouse";
import styles from "./warehouse-inventory.module.css";

function InventoryColumn({ item }: { item: InventoryCategory }) {
  return (
    <article className={styles.column}>
      <div className={styles.label}>{item.name}</div>
      <div className={styles.guide}>
        <span
          className={`${styles.bar} ${styles[item.tone]}`}
          style={{ height: `${Math.max(22, item.percent * 2.4)}px` }}
        />
      </div>
      <div className={styles.footerValue}>
        <strong>{item.percent}%</strong>
        <span>· {item.packages.toLocaleString()}</span>
      </div>
    </article>
  );
}

export function WarehouseInventory() {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2>Warehouse Inventory</h2>
        <div>
          <strong>10,000</strong>
          <span>packages</span>
          <Icon name="more" />
        </div>
      </header>
      <div className={styles.grid}>
        {inventory.map((item) => (
          <InventoryColumn item={item} key={item.name} />
        ))}
      </div>
    </section>
  );
}
