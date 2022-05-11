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
        case 'error': return [
          'text-red-500 hover:text-red-600',
          'fill-red-500 hover:fill-red-600',
        ];
        case 'success': return [
          'text-green-500 hover:text-green-600',
          'fill-green-500 hover:fill-green-600',
        ];
        case 'info': return [
          'text-primary hover:text-secondary',
          'fill-primary hover:fill-secondary',
        ];
        default: return [
          'text-neutral hover:text-gray-600',
          'fill-neutral hover:fill-gray-600',
        ];
      }
    }
    if (variant === 'outlined') {
      const commonOutlined = [
        'border border-2',
        'disabled:border-gray-300',
      ];
      switch (color) {
        case 'error': return [
          'border-red-500 hover:border-red-600',
          'text-red-500 hover:text-red-600',
          'fill-red-500 hover:fill-red-600',
          ...commonOutlined,
        ];
        case 'success': return [
          'border-green-500 hover:border-green-600',
          'text-green-500 hover:text-green-600',
          'fill-green-500 hover:fill-green-600',
          ...commonOutlined,
        ];
        case 'info': return [
          'border-primary hover:border-secondary',
          'text-primary hover:text-secondary',
          'fill-primary hover:fill-secondary',
          ...commonOutlined,
        ];
        default: return [
          'border-neutral hover:border-gray-600 disabled:border-neutral',
          'text-neutral hover:text-gray-600',
          'fill-neutral hover:fill-gray-600',
          ...commonOutlined,
        ];
      }
    }

    const commonContained = [
      'disabled:bg-gray-300',
    ];
    // contained, default
    switch (color) {
      case 'error': return [
        'bg-red-500 hover:bg-red-600',
        'text-white fill-white',
        ...commonContained,
      ];
      case 'success': return [
        'bg-green-500 hover:bg-green-600',
        'text-white fill-white',
        ...commonContained,
      ];
      case 'info': return [
        'bg-primary hover:bg-secondary',
        'fill-neutral text-neutral',
        ...commonContained,
        'hover:text-white hover:fill-white',
      ];
      default: return [
        'fill-white text-white',
        'bg-neutral hover:bg-gray-600',
        ...commonContained,
      ];
    }
  }, [variant]);

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        ${variantClasses.join(' ')}
        disabled:opacity-50
        disabled:cursor-not-allowed disabled:text-gray-500 disabled:fill-gray-500
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
