import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  buttonText: string;
  className?: string;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

export const Button = ({
  buttonText,
  className = '',
  href,
  ...props
}: ButtonProps) => {
  if (href) {
    return (
      <a
        href={href}
        className={clsx(styles.button, className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {buttonText}
      </a>
    );
  }

  return (
    <button
      className={clsx(styles.button, className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {buttonText}
    </button>
  );
};
