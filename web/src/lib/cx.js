// Une clases condicionales, ignorando valores falsy. Alternativa mínima a clsx.
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
