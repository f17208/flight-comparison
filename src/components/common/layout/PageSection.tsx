import { FC } from 'react';

export interface PageSectionProps {
  children: JSX.Element;
  className?: string;
}

export const PageSection: FC<PageSectionProps> = ({ children, className }) => {
  return (
    <div
      className={`
        container mx-auto max-w-lg
        pt-4 px-4 sm:px-0
        ${className}
      `}
    >
      {children}
    </div>
  );
};
