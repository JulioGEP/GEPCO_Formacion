// Carrito simulado en cliente (localStorage). Mismo comportamiento que el sitio estático.
// API: items()/count()/add()/remove()/setQty()/clear()/on(). Clave 'gepco_cart_v1', evento 'cart:change'.
const KEY = "gepco_cart_v1";
function read() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
}
function write(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:change", { detail: items }));
}
export const cart = {
  items: read,
  count: function () { return read().reduce(function (n, i) { return n + i.qty; }, 0); },
  add: function (course, opts) {
    var qty = Math.max(1, (opts && opts.qty) || 1);
    var items = read();
    var ex = items.find(function (i) { return i.id === course.id; });
    if (ex) {
      ex.qty += qty;
      if (opts && opts.sede) { ex.sede = opts.sede; }
      if (opts && opts.fecha) { ex.fecha = opts.fecha; }
    } else {
      items.push({
        id: course.id, title: course.title, norm: course.norm, img: course.img,
        sede: (opts && opts.sede) || null, fecha: (opts && opts.fecha) || null, qty: qty,
      });
    }
    write(items);
  },
  remove: function (id) { write(read().filter(function (i) { return i.id !== id; })); },
  setQty: function (id, qty) {
    var items = read();
    var it = items.find(function (i) { return i.id === id; });
    if (it) { it.qty = Math.max(1, qty); }
    write(items);
  },
  clear: function () { write([]); },
  on: function (cb) {
    if (typeof window === "undefined") return function () {};
    var handler = function (e) { cb((e && e.detail) || read()); };
    window.addEventListener("cart:change", handler);
    return function () { window.removeEventListener("cart:change", handler); };
  },
};
