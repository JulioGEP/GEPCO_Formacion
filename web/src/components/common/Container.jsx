import React from 'react';

export function Container({ children, style }) {
  return (
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--container-padding)", ...style }}>{children}</div>
  );
}
