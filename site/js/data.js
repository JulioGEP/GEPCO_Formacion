// GEPCO Formación — catalog data (real titles + images from gepcoformacion.es), GEP Commerce visual model
const CDN = "https://gepcoformacion.es/wp-content/uploads";
window.GEPCO_DATA = {
  categories: [
    { slug: "extincion", name: "Extinción de incendios", count: 6, subcount: 1,
      blurb: "Cursos teórico-prácticos, de nivel básico a avanzado, para actuar con eficacia ante el fuego." },
    { slug: "bombero", name: "Bombero de empresa", count: 5, subcount: 1,
      blurb: "Formación oficial ISPC y renovación de la habilitación de Bombero/a de Empresa." },
    { slug: "auxilios", name: "Primeros auxilios", count: 2, subcount: 1,
      blurb: "SVB, DEA y soporte vital con certificación oficial." },
    { slug: "emergencias", name: "Emergencias", count: 3, subcount: 1,
      blurb: "Gestión de emergencias, jefes de intervención y equipos de respiración autónoma." },
    { slug: "prl", name: "Prevención de Riesgos Laborales", count: 9, subcount: 5,
      blurb: "Espacios confinados, trabajos en altura, carretilla, andamios y TELCO." },
    { slug: "medida", name: "Formación a medida", count: 2, subcount: 2,
      blurb: "Safety Day, Team Building y planes adaptados para empresas." },
  ],
  courses: [
    { id: "bombero-empresa", title: "Curso Oficial de Bombero/a de Empresa", cat: "bombero", featured: true, recommended: true,
      code: "gepco-bombero-empresa-ispc", norm: "ISPC · 350 H",
      hora: "08:00", // hora de inicio de la formación (variante por curso, por defecto 08:00)
      price: 1950, // [PENDIENTE: importe real] valor de demostración para ver el tratamiento de precio
      hours: "350 Horas",
      bullets: ["240 h presenciales + 110 online", "Certificación oficial ISPC", "Decreto 374/1996"],
      img: CDN + "/2025/03/Bomberos1-941x1024.jpeg" },
    { id: "campo-fuego", title: "Curso avanzado en Campo de Fuego", cat: "extincion", outOfStock: true, featured: true, recommended: true,
      code: "gepco-campo-de-fuego", norm: "AVANZADO", soloSede: true, // requiere nuestro campo de fuego
      bullets: ["Casa de humo y rescate", "Fuego real controlado", "Aforo 15 alumnos"],
      img: CDN + "/2024/09/campo-de-fuego-gepco-formacion-00.jpg" },
    { id: "extincion-basico", title: "Curso de extinción de incendios", cat: "extincion", recommended: true,
      code: "gepco-extincion-basico", norm: "BÁSICO",
      bullets: ["Teórico-práctico", "Uso de extintor y BIE", "Certificado"],
      img: CDN + "/2024/02/extincion-fuego-basico-gepco-formacion-w.jpg" },
    { id: "svb-dea", title: "Curso SVB y DEA (certificación oficial)", cat: "auxilios", recommended: true,
      code: "gepco-svb-dea-oficial", norm: "SVB + DEA",
      bullets: ["Soporte Vital Básico", "Desfibrilador DEA/DESA", "Certificación oficial"],
      img: CDN + "/2024/04/primeros-auxiliso-DEA-DESA-gepco-formacion-h-scaled.jpg" },
    { id: "jefes-emergencia", title: "Curso Jefes de Emergencia y de Intervención", cat: "emergencias", recommended: true,
      code: "gepco-jefes-emergencia", norm: "PAU",
      bullets: ["Coordinación de equipos", "Planes de autoprotección", "Liderazgo en emergencia"],
      img: CDN + "/2024/02/Curso-Jefes-de-Emergencia.webp" },
    { id: "era", title: "Curso Equipo de Respiración Autónomo (ERA)", cat: "emergencias",
      code: "gepco-era", norm: "ERA",
      bullets: ["Equipos autónomos", "Atmósferas peligrosas", "Práctica guiada"],
      img: CDN + "/2024/04/curso-emergencias-gepco-formacion.jpg" },
    { id: "confinados", title: "Curso Espacios Confinados", cat: "prl", recommended: true,
      code: "gepco-espacios-confinados", norm: "PRL",
      bullets: ["Prevención y rescate", "Acceso limitado", "Normativa vigente"],
      img: CDN + "/2024/04/curso-de-espacios-confinados.webp" },
    { id: "altura", title: "Curso de Trabajos en Altura", cat: "prl",
      code: "gepco-trabajos-altura", norm: "RD 2177/2004", soloSede: true, // requiere estructuras de altura
      bullets: ["Sistemas anticaídas", "EPI de altura", "Práctica en estructura"],
      img: CDN + "/2024/04/curso-especializado-telco-gepco-formacion.jpg" },
    { id: "carretilla", title: "Curso Carretilla Elevadora", cat: "prl",
      code: "gepco-carretilla-elevadora", norm: "UNE 58451",
      bullets: ["Manejo seguro", "Teórico + práctico", "Carnet acreditativo"],
      img: CDN + "/2024/04/curso-carretilla-elevadora-gepco-formacion.jpg" },
    { id: "riesgo-quimico", title: "Curso Riesgo Químico NBQ", cat: "extincion",
      code: "gepco-riesgo-quimico-nbq", norm: "NBQ",
      bullets: ["Productos peligrosos", "Autoprotección", "Descontaminación"],
      img: CDN + "/2024/04/riesgo-quimico-gepco-formacion.jpg" },
    { id: "verticales", title: "Curso de Trabajos Verticales", cat: "prl",
      code: "gepco-trabajos-verticales", norm: "PRL", soloSede: true, // requiere estructuras / anclajes
      bullets: ["Técnicas de cuerda", "Rescate en suspensión", "Práctica real"],
      img: CDN + "/2024/04/curso-trabajos-verticales-gepco-formacion.jpg" },
    { id: "andamios", title: "Curso montaje y desmontaje de Andamios", cat: "prl",
      code: "gepco-andamios", norm: "PRL",
      bullets: ["Montaje seguro", "Inspección", "Normativa"],
      img: CDN + "/2024/02/montage-andamios-gepco-formacion.jpg" },
    { id: "safety-day", title: "Safety Day — jornada de seguridad", cat: "medida", recommended: true,
      code: "gepco-safety-day", norm: "A MEDIDA",
      bullets: ["Jornada in company", "Talleres prácticos", "Para equipos"],
      img: CDN + "/2024/04/Cursos-de-formacion-de-emergencia-a-medida.webp" },
    { id: "team-building", title: "Team Building — Seguridad esencial", cat: "medida",
      code: "gepco-team-building", norm: "A MEDIDA",
      bullets: ["Trabajo en equipo", "Emergencias simuladas", "Para empresas"],
      img: CDN + "/2024/02/avanzado-en-lucha-contra-incendios.webp" },
  ],
  blog: [
    { id: "epis-bomberos", title: "Mantenimiento y uso profesional de EPIs de bomberos", cat: "Extinción de incendios",
      excerpt: "Los EPI son la primera línea de protección en el sector de la seguridad industrial y las emergencias.",
      img: CDN + "/2024/03/EPIs-revisados-y-puestos-3.jpeg" },
    { id: "normativa-desfibriladores", title: "Normativa sobre desfibriladores (DEA) en España", cat: "Primeros auxilios",
      excerpt: "Qué instalaciones deben disponer de un DEA/DESA y cómo afecta a tu empresa.",
      img: CDN + "/2024/03/Que-instalaciones-deben-tener-un-DESA-o-desfibrilador-min-11.jpg" },
    { id: "contacto-electrico-indirecto", title: "Diferencia entre el contacto eléctrico directo e indirecto", cat: "PRL",
      excerpt: "Guía práctica para responsables de seguridad que trabajan con instalaciones eléctricas.",
      img: CDN + "/2024/04/curso-riesgo-electrico-gepco-formacion.jpg" },
  ],
  // Convocatorias EN ABIERTO — sesiones de 1 día abiertas a autónomos y empresas con pocos empleados.
  // [PENDIENTE: se definirán en el backend] Solo algunas formaciones se imparten en abierto.
  // price = importe por persona (valores de demostración [PENDIENTE: importes reales]).
  openIntakes: [
    { courseId: "extincion-basico", fecha: "18/09/2025", sede: "Sabadell", plazas: 6, price: 180 },
    { courseId: "svb-dea", fecha: "02/10/2025", sede: "Arganda del Rey", plazas: 8, price: 150 },
    { courseId: "confinados", fecha: "16/10/2025", sede: "Sabadell", plazas: 6, price: 220 },
    { courseId: "carretilla", fecha: "23/10/2025", sede: "Arganda del Rey", plazas: 10, price: null },
    { courseId: "extincion-basico", fecha: "13/11/2025", sede: "Arganda del Rey", plazas: 6, price: 180 },
    { courseId: "svb-dea", fecha: "27/11/2025", sede: "Sabadell", plazas: 8, price: 150 },
  ],
  logoDark: CDN + "/2024/02/logo-GEPCO-Formacion.png",
  logoLight: CDN + "/2024/03/LOGO-FOOTER-GEPCO.png",
  hero: CDN + "/2025/03/Bomberos4.jpg",
  heroQuote: CDN + "/2025/03/emergency-management-bushfire.jpg",
  ispc: CDN + "/2025/03/logo-ISPC-Generalitat.png",
  // 8 áreas de formación (briefing Home) — cada una enlaza a su página con el nombre real como texto de enlace.
  areas: [
    { name: "Extinción de Incendios", cat: "extincion", img: CDN + "/2024/02/extincion-fuego-basico-gepco-formacion-w.jpg" },
    { name: "Bombero/a de Empresa", cat: "bombero", img: CDN + "/2025/03/Bomberos1-941x1024.jpeg" },
    { name: "Emergencias", cat: "emergencias", img: CDN + "/2024/02/Curso-Jefes-de-Emergencia.webp" },
    { name: "Altura y Trabajos Verticales", cat: "prl", img: CDN + "/2024/04/curso-trabajos-verticales-gepco-formacion.jpg", pend: true },
    { name: "Primeros Auxilios", cat: "auxilios", img: CDN + "/2024/04/primeros-auxiliso-DEA-DESA-gepco-formacion-h-scaled.jpg" },
    { name: "PRL", cat: "prl", img: CDN + "/2024/04/curso-de-espacios-confinados.webp", note: "Espacios confinados, altura, carretilla, andamios" },
    { name: "TELCO", cat: "prl", img: CDN + "/2024/04/curso-especializado-telco-gepco-formacion.jpg", note: "Riesgo eléctrico, altura, confinados", pend: true },
    { name: "Formación In Company", cat: "medida", img: CDN + "/2024/04/Cursos-de-formacion-de-emergencia-a-medida.webp" },
  ],
  // Diferenciales confirmados (briefing #3)
  diff: [
    { v: "Fuego real", l: "Simulacros con fuego real y casa de humo" },
    { v: "FUNDAE", l: "Formación bonificable para empresas" },
    { v: "Toda España", l: "Cobertura en península e islas para empresas" },
    { v: "Oficiales", l: "Certificaciones oficiales" },
  ],
  // Prueba social — [PENDIENTE: testimonios y logos reales de empresas cliente]
  testimonios: [
    { quote: "[PENDIENTE: testimonio real de empresa cliente]", author: "[PENDIENTE: nombre]", role: "[PENDIENTE: cargo y empresa]" },
    { quote: "[PENDIENTE: testimonio real de empresa cliente]", author: "[PENDIENTE: nombre]", role: "[PENDIENTE: cargo y empresa]" },
    { quote: "[PENDIENTE: testimonio real de empresa cliente]", author: "[PENDIENTE: nombre]", role: "[PENDIENTE: cargo y empresa]" },
  ],
  logosClientes: 6, // [PENDIENTE: logos reales de clientes]
  // Logos reales de clientes (en assets/logos). Se muestran en carrusel lateral en la Home.
  logosClientesList: [
    "logo-akzoNobel-c.webp", "logo-amazon-c.webp", "logo-apple-c.webp", "logo-banc-sabadell-c.webp",
    "logo-casumo-c.webp", "logo-cbre-c.webp", "logo-celsa-group-c.webp", "logo-colonial-c.png",
    "logo-conforama-c.png", "logo-fcb-c.webp", "logo-Freixenet-c.webp", "logo-hempel-c.png",
    "logo-hera-c.webp", "logo-hipra-c.webp", "logo-ikea-c.png", "logo-iss-c.png",
    "logo-mapfre-c.png", "logo-mecalux-c.png", "logo-moehs-c.png", "logo-nupik-c.webp",
    "logo-primavera-sound-c.webp", "logo-privalia-c.webp", "logo-realcis-c.webp", "logo-teatre-lliure-c.png",
  ].map(function (f) { return { src: "assets/logos/" + f, alt: f.replace(/^logo-/, "").replace(/-c\.(webp|png)$/, "").replace(/-/g, " ") }; }),
  logoAll: CDN + "/2024/02/logo-GEPCO-Formacion.png",
  // Opiniones — [PENDIENTE: integrar reseñas reales de Google My Business]
  reviews: {
    rating: null, // [PENDIENTE: valoración media real]
    count: null,  // [PENDIENTE: nº de reseñas]
    items: [
      { stars: 5, quote: "[PENDIENTE: reseña real de Google]", author: "[PENDIENTE: nombre]", date: "[PENDIENTE: fecha]" },
      { stars: 5, quote: "[PENDIENTE: reseña real de Google]", author: "[PENDIENTE: nombre]", date: "[PENDIENTE: fecha]" },
      { stars: 5, quote: "[PENDIENTE: reseña real de Google]", author: "[PENDIENTE: nombre]", date: "[PENDIENTE: fecha]" },
    ],
  },
  // Company stats — [PENDIENTE: cifras reales]
  stats: [
    { value: "34", label: "Formaciones en catálogo" },
    { value: "6", label: "Áreas de especialidad" },
    { value: "24 h", label: "Respuesta a solicitudes" },
  ],
};
