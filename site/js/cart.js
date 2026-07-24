// GEPCO — carrito simulado en cliente (localStorage). Sin lógica de pago real.
// [PENDIENTE: precios reales por curso — el carrito no muestra importes hasta tenerlos.]
(function () {
  var KEY = "gepco_cart_v1";
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("cart:change", { detail: items }));
  }
  window.GEPCO_CART = {
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
    on: function (cb) { window.addEventListener("cart:change", function (e) { cb(e.detail || read()); }); },
  };
})();
