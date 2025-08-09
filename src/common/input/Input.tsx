import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={clsx(styles.input, className)}
        {...props}
      />
    </div>
  );
};

export default Input;
