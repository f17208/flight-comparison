import { FC, DetailedHTMLProps, HTMLAttributes, createElement } from 'react';

interface TypographyProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
  HTMLParagraphElement | HTMLHeadingElement
> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'subtitle2' | 'subtitle1';
}

function getTypographyClassName(variant: TypographyProps['variant']) {
  switch (variant) {
    case 'h1': return `
      font-bold text-5xl
      mt-0 mb-2
    `;
    case 'h2': return `
      font-bold text-4xl
      mt-0 mb-2
    `;
    case 'h3': return `
      font-bold text-3xl
      mt-0 mb-2
    `;
    case 'h4': return `
      font-medium text-xl
      leading-tight
    `;
    case 'h5': return `
      font-medium text-lg
      leading-tight
    `;
    case 'subtitle2': return `
      text-md
      leading-tight
    `;
    default: return `
      font-light
    `;
  }
}

export const Typography: FC<TypographyProps> = ({
  variant = 'subtitle1',
  children,
  className,
  ...props
}) => {
  const variantElement = (['subtitle1', 'subtitle2']).includes(variant)
    ? 'p'
    : variant;

  return createElement(
    variantElement,
    {
      ...props,
      className: `${getTypographyClassName(variant)} ${className || ''}`,
    },
    children,
  );
};
