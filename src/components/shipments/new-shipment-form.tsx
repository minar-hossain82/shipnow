"use client";

import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/dashboard/icons";
import styles from "./new-shipment.module.css";

type Errors = {
  deliveryAddress?: string;
  shippingMethod?: string;
};

type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  onInput?: () => void;
  className?: string;
};

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  disabled = false,
  error,
  onInput,
  className = "",
}: FieldProps) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>

      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? styles.invalid : ""}
        onInput={onInput}
      />

      {error && <small role="alert">{error}</small>}
    </label>
  );
}

function Phone({ name, value }: { name: string; value: string }) {
  return (
    <label className={styles.field}>
      <span>Phone Number</span>

      <div className={styles.phone}>
        <span className={styles.phoneFlag} aria-hidden="true" />

        <select aria-label="Country code" name={`${name}CountryCode`}>
          <option value="+1">+1</option>
        </select>

        <input name={name} defaultValue={value} aria-label="Phone number" />
      </div>
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  children: ReactNode;
  error?: string;
  onChange?: () => void;
  className?: string;
};

function SelectField({
  label,
  name,
  children,
  error,
  onChange,
  className = "",
}: SelectFieldProps) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>

      <select
        name={name}
        className={error ? styles.invalid : ""}
        onChange={onChange}
      >
        {children}
      </select>

      {error && <small role="alert">{error}</small>}
    </label>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <b>Copyright © 2025 Peterdraw</b>
        <span>Privacy Policy</span>
        <span>Term and conditions</span>
        <span>Contact</span>
      </div>

      <div>
        <span>ⓕ</span>
        <span>𝕏</span>
        <span>◎</span>
        <span>▷</span>
        <span>in</span>
      </div>
    </footer>
  );
}

export function NewShipmentForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<Errors>({
    deliveryAddress: "Address is required.",
    shippingMethod: "Shipping method is required.",
  });

  const [message, setMessage] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({ height: "" });

  const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/[^\d.]/g, "");

    setForm((current) => ({
      ...current,
      height: nextValue,
    }));
  };

  const clear = (key: keyof Errors) => {
    setErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const next: Errors = {};

    if (!String(data.get("deliveryAddress") || "").trim()) {
      next.deliveryAddress = "Address is required.";
    }

    if (!data.get("shippingMethod")) {
      next.shippingMethod = "Shipping method is required.";
    }

    setErrors(next);
    setMessage(
      Object.keys(next).length ? "" : "Shipment submitted successfully.",
    );
  };

  const reset = () => {
    formRef.current?.reset();
    setForm({ height: "" });

    setErrors({
      deliveryAddress: "Address is required.",
      shippingMethod: "Shipping method is required.",
    });

    setMessage("");
  };

  return (
    <>
      <header className={styles.mobileBar}>
        <Link href="/shipments" aria-label="Back to Shipments">
          ‹
        </Link>

        <strong>Create New Shipment</strong>

        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setNavOpen(true)}
        >
          ☰
        </button>
      </header>

      {navOpen && (
        <div
          className={styles.drawerBackdrop}
          onClick={() => setNavOpen(false)}
        >
          <aside
            className={styles.drawer}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setNavOpen(false)}
              aria-label="Close navigation"
            >
              ×
            </button>

            <nav>
              <Link href="/dashboard">
                <Icon name="grid" />
                Dashboard
              </Link>

              <Link href="/shipments" className={styles.active}>
                <Icon name="truck" />
                Shipments
              </Link>
            </nav>
          </aside>
        </div>
      )}

      <main className={styles.page}>
        <header className={styles.heading}>
          <h1>
            <Link href="/shipments">←</Link> Create New Shipment
          </h1>

          <p>
            <b>Dashboard</b>
            <span>/</span>
            <b>Shipments</b>
            <span>/</span>
            Create New Shipment
          </p>
        </header>

        <form
          ref={formRef}
          onSubmit={submit}
          className={styles.form}
          noValidate
        >
          <h2>Shipment Form</h2>

          <div className={styles.people}>
            <fieldset>
              <legend>Sender Info</legend>

              <Field
                label="Company"
                name="senderCompany"
                defaultValue="GreenHaven"
              />

              <div className={styles.two}>
                <Field
                  label="Email"
                  name="senderEmail"
                  type="email"
                  defaultValue="logistics@greenhaven.com"
                />

                <Phone name="senderPhone" value="408-555-7210" />
              </div>

              <Field
                label="Pickup Address"
                name="pickupAddress"
                defaultValue="1120 Birch Street, Portland, OR 97205, USA"
              />
            </fieldset>

            <fieldset>
              <legend>Recipient Info</legend>

              <Field
                label="Company"
                name="recipientCompany"
                defaultValue="FreshNest"
              />

              <div className={styles.two}>
                <Field
                  label="Email"
                  name="recipientEmail"
                  type="email"
                  defaultValue="warehouse@freshnest.com"
                />

                <Phone name="recipientPhone" value="786-555-4432" />
              </div>

              <Field
                label="Delivery Address"
                name="deliveryAddress"
                placeholder="Street address, city, state/province, ZIP code"
                error={errors.deliveryAddress}
                onInput={() => clear("deliveryAddress")}
              />
            </fieldset>
          </div>

          <div className={styles.details}>
            <fieldset className={styles.package}>
              <legend>Package Details</legend>

              <Field
                label="Item Description"
                name="description"
                defaultValue="Premium Garden Tool Set"
              />

              <div className={styles.packageGrid}>
                <Field
                  label="Quantity"
                  name="quantity"
                  type="number"
                  defaultValue="40"
                />

                <Field
                  label="Value"
                  name="value"
                  defaultValue="$3,200"
                />

                <Field
                  label="Weight"
                  name="weight"
                  defaultValue="125"
                />

                <SelectField label="Units" name="units">
                  <option>Kg</option>
                  <option>Lb</option>
                </SelectField>
              </div>

              <span className={styles.groupLabel}>Dimensions</span>

              <div className={styles.dimensions}>
                <label>
                  <div className={styles.dimensionField}>
                    <input
                      name="length"
                      defaultValue="80"
                      aria-label="Length in centimeters"
                    />

                    <span className={styles.dimensionUnit}>cm</span>
                  </div>

                  <small>Length</small>
                </label>

                <label>
                  <div className={styles.dimensionField}>
                    <input
                      name="width"
                      defaultValue="60"
                      aria-label="Width in centimeters"
                    />

                    <span className={styles.dimensionUnit}>cm</span>
                  </div>

                  <small>Width</small>
                </label>

                <label>
                  <div className={styles.heightDimensionField}>
                    {!form.height && (
                      <span
                        className={styles.heightPlaceholder}
                        aria-hidden="true"
                      >
                        ex. 20
                      </span>
                    )}

                    <input
                      name="height"
                      type="text"
                      inputMode="decimal"
                      value={form.height}
                      aria-label="Height in centimeters"
                      onChange={handleHeightChange}
                    />

                    <span className={styles.heightDimensionUnit}>cm</span>
                  </div>

                  <small>Height</small>
                </label>
              </div>
            </fieldset>

            <fieldset className={styles.shipping}>
              <legend>Shipping Details</legend>

              <span className={styles.groupLabel}>Freight Type</span>

              <div className={styles.radios}>
                {[
                  "Road Freight",
                  "Rail Freight",
                  "Ocean Freight",
                  "Air Freight",
                ].map((item, index) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="freightType"
                      value={item}
                      defaultChecked={index === 0}
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className={styles.shippingGrid}>
                <SelectField label="Carrier" name="carrier">
                  <option>FedEx</option>
                  <option>DHL</option>
                  <option>UPS</option>
                </SelectField>

                <SelectField
                  label="Shipping Method"
                  name="shippingMethod"
                  error={errors.shippingMethod}
                  onChange={() => clear("shippingMethod")}
                >
                  <option value="">Select Method</option>
                  <option>Express</option>
                  <option>Standard</option>
                </SelectField>

                <div>
                  <Field
                    label="Shipment ID"
                    name="shipmentId"
                    defaultValue="#SH9583742"
                    disabled
                  />

                  <small className={styles.help}>Auto-generated</small>
                </div>

                <Field
                  label="Shipment Date"
                  name="shipmentDate"
                  defaultValue="March 21, 2035"
                />
              </div>

              <label className={styles.notes}>
                <span>Notes</span>

                <textarea
                  name="notes"
                  placeholder="Add special delivery notes (optional)"
                />
              </label>

              <div className={styles.options}>
                <div>
                  <span className={styles.groupLabel}>
                    Additional Services
                  </span>

                  <div className={styles.checks}>
                    {[
                      "Insurance Coverage",
                      "Signature on Delivery",
                      "Temperature Control",
                      "Fragile Item Handling",
                    ].map((item, index) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          name="services"
                          value={item}
                          defaultChecked={index < 3}
                        />

                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <span className={styles.groupLabel}>
                    Tracking & Status Updates
                  </span>

                  <label className={styles.switch}>
                    <input type="checkbox" name="notify" defaultChecked />
                    <i />
                    <span>Notify Recipient via Email/SMS</span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className={styles.actions}>
            {message && <p role="status">{message}</p>}

            <button type="button" onClick={reset}>
              Delete Form
            </button>

            <button type="submit">Submit Shipment</button>
          </div>
        </form>

        <Footer />
      </main>
    </>
  );
}
