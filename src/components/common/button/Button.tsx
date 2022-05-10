import { ButtonHTMLAttributes, FC, useMemo } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'error' | 'info' | 'success' | 'default';
  variant?: 'contained' | 'outlined' | 'text';
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'contained',
  color = 'default',
  disabled,
  ...rest
}) => {
  const variantClasses = useMemo(() => {
    if (variant === 'text') {
      switch (color) {
        case 'error': return 'text-red-500 hover:text-red-600 disabled:text-red-500';
        case 'success': return 'text-green-500 hover:text-green-600 disabled:text-green-500';
        case 'info': return 'text-primary hover:text-secondary disabled:text-primary';
        default: return 'text-gray-500 hover:text-gray-600 disabled:text-gray-500';
      }
    }
    if (variant === 'outlined') {
      switch (color) {
        case 'error': return [
          'border border-solid border-red-500 hover:border-red-600 disabled:border-red-500',
          'text-red-500 hover:text-red-600 disabled:text-red-500',
        ].join(' ');
        case 'success': return [
          'border border-solid border-green-500 hover:border-green-600 disabled:border-green-500',
          'text-green-500 hover:text-green-600 disabled:text-green-500',
        ].join(' ');
        case 'info': return [
          'border border-primary hover:border-secondary disabled:border-primary',
          'text-primary hover:text-secondary disabled:text-primary',
        ].join(' ');
        default: return [
          'border border-gray-500 hover:border-gray-600 disabled:border-gray-500',
          'text-gray-500 hover:text-gray-600 disabled:text-gray-500',
        ].join(' ');
      }
    }
    // contained, default
    switch (color) {
      case 'error': return 'bg-red-500 hover:bg-red-600 disabled:bg-red-500 text-white';
      case 'success': return 'bg-green-500 hover:bg-green-600 disabled:bg-green-500 text-white';
      case 'info': return 'bg-primary hover:bg-secondary disabled:bg-primary hover:text-white text-neutral';
      default: return 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-500 text-white';
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
