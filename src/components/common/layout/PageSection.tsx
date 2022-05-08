import { FC } from 'react';

export interface PageSectionProps {
  children: JSX.Element;
  className?: string;
}

export const PageSection: FC<PageSectionProps> = ({ children, className }) => {
  return (
    <div
      className={`
        container mx-auto
        ${className}
      `}
    >
      {children}
    </div>
  );
};
