import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: React.ReactNode;
  className?: string;
}

export const Button = ({
  buttonText,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {buttonText}
    </button>
  );
};
