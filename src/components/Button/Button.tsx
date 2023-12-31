import { memo } from 'react';
import cn from 'classnames';
import styles from '@/styles/components/Button.module.scss';
import { IButtonProps } from '@/types';

export type Ref = HTMLButtonElement;

function ButtonComponent({
  variant,
  classes,
  size,
  children,
  type,
  disabled,
  full,
  Ref,
  ...props
}: IButtonProps) {
  const styleClasses = cn(
    classes,
    styles['base'],
    styles[`${size}`],
    styles[`${variant}-variant`],
    {
      [styles['full']]: full === true,
    }
  );

  return (
    <button type={type} className={styleClasses} {...props} ref={Ref}>
      <span>{children}</span>
    </button>
  );
}

export const Button = memo(ButtonComponent);
