"use client";

import Link from "next/link";
import {
  FormEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import { AppFooter } from "@/components/layout/app-footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import styles from "./new-shipment.module.css";

type FormValues = {
  senderCompany:string; senderEmail:string; senderPhoneCountryCode:string; senderPhone:string; pickupAddress:string;
  recipientCompany:string; recipientEmail:string; recipientPhoneCountryCode:string; recipientPhone:string; deliveryAddress:string;
  description:string; quantity:string; value:string; weight:string; units:string; length:string; width:string; height:string;
  freightType:string; carrier:string; shippingMethod:string; shipmentId:string; shipmentDate:string; notes:string;
  services:string[]; notify:boolean;
};
type FieldName = keyof FormValues;
type Errors = Partial<Record<FieldName,string>>;
type Touched = Partial<Record<FieldName,boolean>>;

const initialValues:FormValues = {
  senderCompany:"GreenHaven", senderEmail:"logistics@greenhaven.com", senderPhoneCountryCode:"+1", senderPhone:"408-555-7210", pickupAddress:"1120 Birch Street, Portland, OR 97205, USA",
  recipientCompany:"FreshNest", recipientEmail:"warehouse@freshnest.com", recipientPhoneCountryCode:"+1", recipientPhone:"786-555-4432", deliveryAddress:"",
  description:"Premium Garden Tool Set", quantity:"40", value:"$3,200", weight:"125", units:"Kg", length:"80", width:"60", height:"",
  freightType:"Road Freight", carrier:"FedEx", shippingMethod:"", shipmentId:"#SH9583742", shipmentDate:"March 21, 2035", notes:"",
  services:["Insurance Coverage","Signature on Delivery","Temperature Control"], notify:true,
};
const initialErrors:Errors = { deliveryAddress:"Delivery address is required.", shippingMethod:"Shipping method is required." };

type FieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  onChange: (value:string) => void;
  onBlur: () => void;
  className?: string;
};

function Field({
  label,
  name,
  value,
  placeholder,
  type = "text",
  disabled = false,
  error,
  onChange,
  onBlur,
  className = "",
}: FieldProps) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>

      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? styles.invalid : ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error?`${name}-error`:undefined}
        onChange={(event)=>onChange(event.currentTarget.value)}
        onBlur={onBlur}
      />

      {error && <small id={`${name}-error`} role="alert">{error}</small>}
    </label>
  );
}

function Phone({name,countryCode,value,error,onCountryCodeChange,onChange,onBlur}:{name:"senderPhone"|"recipientPhone";countryCode:string;value:string;error?:string;onCountryCodeChange:(value:string)=>void;onChange:(value:string)=>void;onBlur:()=>void}) {
  return (
    <label className={styles.field}>
      <span>Phone Number</span>

      <div className={`${styles.phone} ${error?styles.invalid:""}`}>
        <span className={styles.phoneFlag} aria-hidden="true" />

        <select aria-label="Country code" name={`${name}CountryCode`} value={countryCode} onChange={(event)=>onCountryCodeChange(event.currentTarget.value)}>
          <option value="+1">+1</option>
        </select>

        <input name={name} value={value} aria-label="Phone number" aria-invalid={Boolean(error)} aria-describedby={error?`${name}-error`:undefined} onChange={(event)=>onChange(event.currentTarget.value)} onBlur={onBlur}/>
      </div>
      {error&&<small id={`${name}-error`} role="alert">{error}</small>}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  children: ReactNode;
  value:string;
  error?: string;
  onChange:(value:string)=>void;
  onBlur:()=>void;
  className?: string;
};

function SelectField({
  label,
  name,
  children,
  value,
  error,
  onChange,
  onBlur,
  className = "",
}: SelectFieldProps) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>

      <select
        name={name}
        value={value}
        className={error ? styles.invalid : ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error?`${name}-error`:undefined}
        onChange={(event)=>onChange(event.currentTarget.value)}
        onBlur={onBlur}
      >
        {children}
      </select>

      {error && <small id={`${name}-error`} role="alert">{error}</small>}
    </label>
  );
}

export function NewShipmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues,setFormValues] = useState<FormValues>(()=>({...initialValues,services:[...initialValues.services]}));
  const [errors,setErrors] = useState<Errors>(initialErrors);
  const [touched,setTouched] = useState<Touched>({});
  const [submitAttempted,setSubmitAttempted] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const emailIsValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const getEmailError = (value: string) => {
    if (!value.trim()) return "Email is required.";
    if (!emailIsValid(value)) return "Please enter a valid email address.";
    return undefined;
  };
  const requiredMessages:Partial<Record<FieldName,string>> = {
    senderCompany:"Company is required.",senderPhone:"Phone number is required.",pickupAddress:"Pickup address is required.",
    recipientCompany:"Company is required.",recipientPhone:"Phone number is required.",deliveryAddress:"Delivery address is required.",
    description:"Item description is required.",quantity:"Quantity is required.",value:"Value is required.",weight:"Weight is required.",units:"Unit is required.",
    length:"Length is required.",width:"Width is required.",height:"Height is required.",freightType:"Freight type is required.",carrier:"Carrier is required.",
    shippingMethod:"Shipping method is required.",shipmentDate:"Shipment date is required.",
  };
  const numericLabels = {quantity:"Quantity",value:"Value",weight:"Weight",length:"Length",width:"Width",height:"Height"} as const;
  const validatedFields = ["senderCompany","senderEmail","senderPhone","pickupAddress","recipientCompany","recipientEmail","recipientPhone","deliveryAddress","description","quantity","value","weight","units","length","width","height","freightType","carrier","shippingMethod","shipmentDate"] as const;

  const getFieldError = (name:typeof validatedFields[number],value:string,values:FormValues=formValues) => {
    if(name==="senderEmail"||name==="recipientEmail") return getEmailError(value);
    if(!value.trim()) return requiredMessages[name];
    if(name==="senderPhone"||name==="recipientPhone") {
      const countryCode=name==="senderPhone"?values.senderPhoneCountryCode:values.recipientPhoneCountryCode;
      const digits=`${countryCode}${value}`.replace(/\D/g,"");
      if(!/^[\d\s()-]+$/.test(value)||digits.length<10) return "Please enter a valid phone number.";
    }
    if(name in numericLabels) {
      const normalized=name==="value"?value.replace(/[$,\s]/g,""):value.trim();
      const numericPattern=name==="quantity"?/^\d+$/:/^\d+(?:\.\d+)?$/;
      if(!numericPattern.test(normalized)||Number(normalized)<=0) return `${numericLabels[name as keyof typeof numericLabels]} must be greater than 0.`;
    }
    return undefined;
  };

  const updateError = (name:typeof validatedFields[number],value:string,values:FormValues,force=false) => {
    const nextError=getFieldError(name,value,values);
    setErrors(current=>{
      if(!nextError) return {...current,[name]:undefined};
      return force||touched[name]||submitAttempted||current[name]?{...current,[name]:nextError}:current;
    });
  };

  const changeField = (name:typeof validatedFields[number],value:string) => {
    const nextValues={...formValues,[name]:value};
    if((name==="freightType"||name==="carrier")&&formValues.shippingMethod) nextValues.shippingMethod="";
    setFormValues(nextValues);
    updateError(name,value,nextValues);
    if(name==="freightType"||name==="carrier") updateError("shippingMethod",nextValues.shippingMethod,nextValues,true);
    setMessage(""); setIsSubmitting(false);
  };

  const blurField = (name:typeof validatedFields[number]) => {
    setTouched(current=>({...current,[name]:true}));
    updateError(name,String(formValues[name]),formValues,true);
  };
  const bindField = (name:typeof validatedFields[number]) => ({value:String(formValues[name]),error:errors[name],onChange:(value:string)=>changeField(name,value),onBlur:()=>blurField(name)});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(isSubmitting)return;
    const next: Errors = {};
    validatedFields.forEach(name=>{const error=getFieldError(name,String(formValues[name]));if(error)next[name]=error});
    setSubmitAttempted(true);
    setTouched(Object.fromEntries(validatedFields.map(name=>[name,true])) as Touched);
    setErrors(next);
    const firstInvalid=validatedFields.find(name=>next[name]);
    if(firstInvalid){setMessage("");requestAnimationFrame(()=>{const field=formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);field?.focus();field?.scrollIntoView({behavior:"smooth",block:"center"})});return;}
    setIsSubmitting(true);
    setMessage("Shipment submitted successfully.");
  };

  const reset = () => {
    setFormValues({...initialValues,services:[...initialValues.services]});
    setErrors(initialErrors); setTouched({}); setSubmitAttempted(false); setIsSubmitting(false); setMessage("");
  };

  return (
    <>
      <MobileNavigation activeLabel="Shipments" barClassName={styles.mobileBar} backdropClassName={styles.drawerBackdrop} drawerClassName={styles.drawer} leading={<Link href="/shipments" aria-label="Back to Shipments">‹</Link>} title={<strong>Create New Shipment</strong>} menu="☰"/>

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
                {...bindField("senderCompany")}
              />

              <div className={styles.two}>
                <Field
                  label="Email"
                  name="senderEmail"
                  type="email"
                  {...bindField("senderEmail")}
                />

                <Phone name="senderPhone" countryCode={formValues.senderPhoneCountryCode} value={formValues.senderPhone} error={errors.senderPhone} onCountryCodeChange={(value)=>{const next={...formValues,senderPhoneCountryCode:value};setFormValues(next);updateError("senderPhone",next.senderPhone,next);setMessage("");setIsSubmitting(false)}} onChange={(value)=>changeField("senderPhone",value)} onBlur={()=>blurField("senderPhone")}/>
              </div>

              <Field
                label="Pickup Address"
                name="pickupAddress"
                {...bindField("pickupAddress")}
              />
            </fieldset>

            <fieldset>
              <legend>Recipient Info</legend>

              <Field
                label="Company"
                name="recipientCompany"
                {...bindField("recipientCompany")}
              />

              <div className={styles.two}>
                <Field
                  label="Email"
                  name="recipientEmail"
                  type="email"
                  {...bindField("recipientEmail")}
                />

                <Phone name="recipientPhone" countryCode={formValues.recipientPhoneCountryCode} value={formValues.recipientPhone} error={errors.recipientPhone} onCountryCodeChange={(value)=>{const next={...formValues,recipientPhoneCountryCode:value};setFormValues(next);updateError("recipientPhone",next.recipientPhone,next);setMessage("");setIsSubmitting(false)}} onChange={(value)=>changeField("recipientPhone",value)} onBlur={()=>blurField("recipientPhone")}/>
              </div>

              <Field
                label="Delivery Address"
                name="deliveryAddress"
                placeholder="Street address, city, state/province, ZIP code"
                {...bindField("deliveryAddress")}
              />
            </fieldset>
          </div>

          <div className={styles.details}>
            <fieldset className={styles.package}>
              <legend>Package Details</legend>

              <Field
                label="Item Description"
                name="description"
                {...bindField("description")}
              />

              <div className={styles.packageGrid}>
                <Field
                  label="Quantity"
                  name="quantity"
                  type="number"
                  {...bindField("quantity")}
                />

                <Field
                  label="Value"
                  name="value"
                  {...bindField("value")}
                />

                <Field
                  label="Weight"
                  name="weight"
                  {...bindField("weight")}
                />

                <SelectField label="Units" name="units" {...bindField("units")}>
                  <option>Kg</option>
                  <option>Lb</option>
                </SelectField>
              </div>

              <span className={styles.groupLabel}>Dimensions</span>

              <div className={styles.dimensions}>
                <label>
                  <div className={`${styles.dimensionField} ${errors.length?styles.dimensionInvalid:""}`}>
                    <input
                      name="length"
                      value={formValues.length}
                      aria-label="Length in centimeters"
                      aria-invalid={Boolean(errors.length)}
                      aria-describedby={errors.length?"length-error":undefined}
                      onChange={(event)=>changeField("length",event.currentTarget.value)}
                      onBlur={()=>blurField("length")}
                    />

                    <span className={styles.dimensionUnit}>cm</span>
                  </div>

                  <small id={errors.length?"length-error":undefined} className={errors.length?styles.dimensionError:undefined} role={errors.length?"alert":undefined}>{errors.length||"Length"}</small>
                </label>

                <label>
                  <div className={`${styles.dimensionField} ${errors.width?styles.dimensionInvalid:""}`}>
                    <input
                      name="width"
                      value={formValues.width}
                      aria-label="Width in centimeters"
                      aria-invalid={Boolean(errors.width)}
                      aria-describedby={errors.width?"width-error":undefined}
                      onChange={(event)=>changeField("width",event.currentTarget.value)}
                      onBlur={()=>blurField("width")}
                    />

                    <span className={styles.dimensionUnit}>cm</span>
                  </div>

                  <small id={errors.width?"width-error":undefined} className={errors.width?styles.dimensionError:undefined} role={errors.width?"alert":undefined}>{errors.width||"Width"}</small>
                </label>

                <label>
                  <div className={`${styles.heightDimensionField} ${errors.height?styles.dimensionInvalid:""}`}>
                    {!formValues.height && (
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
                      value={formValues.height}
                      aria-label="Height in centimeters"
                      aria-invalid={Boolean(errors.height)}
                      aria-describedby={errors.height?"height-error":undefined}
                      onChange={(event)=>changeField("height",event.currentTarget.value)}
                      onBlur={()=>blurField("height")}
                    />

                    <span className={styles.heightDimensionUnit}>cm</span>
                  </div>

                  <small id={errors.height?"height-error":undefined} className={errors.height?styles.dimensionError:undefined} role={errors.height?"alert":undefined}>{errors.height||"Height"}</small>
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
                ].map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="freightType"
                      value={item}
                      checked={formValues.freightType===item}
                      aria-describedby={errors.freightType?"freightType-error":undefined}
                      onChange={(event)=>changeField("freightType",event.currentTarget.value)}
                      onBlur={()=>blurField("freightType")}
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>
              {errors.freightType&&<small id="freightType-error" className={styles.choiceError} role="alert">{errors.freightType}</small>}

              <div className={styles.shippingGrid}>
                <SelectField label="Carrier" name="carrier" {...bindField("carrier")}>
                  <option>FedEx</option>
                  <option>DHL</option>
                  <option>UPS</option>
                </SelectField>

                <SelectField
                  label="Shipping Method"
                  name="shippingMethod"
                  {...bindField("shippingMethod")}
                >
                  <option value="">Select Method</option>
                  <option>Express</option>
                  <option>Standard</option>
                </SelectField>

                <div>
                  <Field
                    label="Shipment ID"
                    name="shipmentId"
                    value={formValues.shipmentId}
                    disabled
                    onChange={()=>undefined}
                    onBlur={()=>undefined}
                  />

                  <small className={styles.help}>Auto-generated</small>
                </div>

                <Field
                  label="Shipment Date"
                  name="shipmentDate"
                  {...bindField("shipmentDate")}
                />
              </div>

              <label className={styles.notes}>
                <span>Notes</span>

                <textarea
                  name="notes"
                  placeholder="Add special delivery notes (optional)"
                  value={formValues.notes}
                  onChange={(event)=>{setFormValues(current=>({...current,notes:event.currentTarget.value}));setMessage("");setIsSubmitting(false)}}
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
                    ].map((item) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          name="services"
                          value={item}
                          checked={formValues.services.includes(item)}
                          onChange={()=>{setFormValues(current=>({...current,services:current.services.includes(item)?current.services.filter(value=>value!==item):[...current.services,item]}));setMessage("");setIsSubmitting(false)}}
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
                    <input type="checkbox" name="notify" checked={formValues.notify} onChange={(event)=>{setFormValues(current=>({...current,notify:event.currentTarget.checked}));setMessage("");setIsSubmitting(false)}} />
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

            <button type="submit" disabled={isSubmitting}>Submit Shipment</button>
          </div>
        </form>

        <AppFooter className={styles.footer}/>
      </main>
    </>
  );
}
