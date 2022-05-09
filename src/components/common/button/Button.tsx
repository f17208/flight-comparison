import { ButtonHTMLAttributes, FC, useMemo } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'error' | 'info';
  variant?: 'contained' | 'outlined' | 'text';
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'contained',
  color = 'info',
  disabled,
  ...rest
}) => {
  const variantClasses = useMemo(() => {
    if (variant === 'text') {
      switch (color) {
        case 'error': return 'text-red-500 hover:text-red-600 disabled:text-red-500';
        default: return 'text-primary hover:text-secondary disabled:text-primary';
      }
    }
    if (variant === 'outlined') {
      switch (color) {
        case 'error': return [
          'border border-solid border-red-500 hover:border-red-600 disabled:border-red-500',
          'text-red-500 hover:text-red-600 disabled:text-red-500',
        ].join(' ');
        default: return [
          'border border-primary hover:border-secondary disabled:border-primary',
          'text-primary hover:text-secondary disabled:text-primary',
        ].join(' ');
      }
    }
    // contained, default
    switch (color) {
      case 'error': return 'bg-red-500 hover:bg-red-600 disabled:bg-red-500 text-white';
      default: return 'bg-primary hover:bg-secondary disabled:bg-primary text-white';
    }
  }, [variant]);

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        ${variantClasses}
        disabled:opacity-50 disabled:cursor-not-allowed
        font-bold
        px-4 py-1
        rounded-lg
        flex space-x-2 items-center
        ${className || ''}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};
