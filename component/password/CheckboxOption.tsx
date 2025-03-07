import styles from "@/app/password/page.module.css";

type CheckboxOptionProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxOption = ({ label, onChange }: CheckboxOptionProps) => (
  <div className={styles.formGroup}>
    <label className={styles.checkboxLabel}>
      <input type="checkbox" onChange={onChange} />
      {label}
    </label>
  </div>
);

export default CheckboxOption;
