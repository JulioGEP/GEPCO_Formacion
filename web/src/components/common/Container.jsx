import React from 'react';
import { cx } from '../../lib/cx.js';

export function Container({ children, className, ...rest }) {
  return (
    <div className={cx('mx-auto w-full max-w-container px-container', className)} {...rest}>{children}</div>
  );
}
