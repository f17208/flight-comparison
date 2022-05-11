import { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export const Link: FC<LinkProps> = ({ children, className, ...otherProps }) => {
  return (
    <RouterLink
      className={`hover:underline ${className || ''}`}
      {...otherProps}
    >
      {children}
    </RouterLink>
  );
};
