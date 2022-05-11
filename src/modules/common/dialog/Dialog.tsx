import { FC, ReactNode, useState } from 'react';
import { Typography } from '../typography/typography';
import { Button, ButtonProps } from '../button/button';

import './dialog.css';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string | ReactNode;
  body: ReactNode;
  actions?: ReactNode;
}

export const Dialog: FC<DialogProps> = ({
  open,
  onClose,
  title,
  body,
  actions,
}) => {
  if (!open) return null;
  return (
    <div>
      <div
        className={`
          ${open ? '' : 'hidden'}
          flex justify-center items-center
          h-full
          overflow-x-hidden overflow-y-auto
          fixed
          inset-0 z-50
          outline-none focus:outline-none
        `}
      >
        <div className="relative w-full sm:w-auto my-6 mx-auto max-w-3xl">
          <div
            className="
              flex flex-col
              border-0
              sm:rounded-lg
              shadow-lg
              relative
              w-full
              bg-white
              outline-none focus:outline-none
            "
            style={{
              minWidth: '50vw',
            }}
          >
            {/* Header */}
            <div
              className="
                flex items-start justify-between
                pl-3 pt-1 pb-3 pr-1 sm:pl-4 sm:pt-2 sm:pr-2 sm:pb-4
                border-b border-solid border-slate-200
                sm:rounded-t
              "
            >
              <span className="mt-auto">
                {
                  typeof title === 'string'
                    ? <Typography variant="h4">
                      {title}
                    </Typography>
                    : title
                }
              </span>
              <button
                type="button"
                className="
                  p-1
                  ml-auto
                  bg-transparent border-0
                  text-black text-3xl font-semibold
                  float-right
                  leading-none
                  outline-none focus:outline-none
                "
                onClick={onClose}
              >
                <span
                  className="
                    text-black text-2xl
                    h-6 w-6
                    block
                    outline-none focus:outline-none
                  "
                >
                  ×
                </span>
              </button>
            </div>

            {/* Body */}
            <div className="relative p-2 sm:p-6 flex-auto max-h-3/4-vh overflow-auto">
              {body}
            </div>

            {/* Footer */}
            {actions && (
              <div
                className="
                  flex items-center justify-end space-x-2
                  p-6
                  border-t border-solid border-slate-200
                  sm:rounded-b
                "
              >
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
      <span className={`${open ? '' : 'hidden'} Dialog-modal`} />
    </div>
  );
};

export interface DialogButtonProps {
  label: string;
  dialogProps: Omit<DialogProps, 'onClose' | 'open'>;
  buttonProps?: Omit<ButtonProps, 'onClick'>;
}

export const DialogButton: FC<DialogButtonProps> = ({ label, dialogProps, buttonProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <Button
      onClick={() => setIsOpen(true)}
      {...buttonProps}
    >
      {label}
    </Button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} {...dialogProps} />
  </>;
};
