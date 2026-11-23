/*
 * Promociones temporales de plenaria.es.
 * Solo actúan entre START y END (hora de Madrid). Fuera de esas fechas no hacen nada,
 * así que no hace falta quitar nada a mano cuando terminan.
 * Black Friday 2026: −30 % en el alta, del lunes 23 al domingo 29 de noviembre.
 */
(function () {
  const START = Date.parse("2026-11-23T00:00:00+01:00");
  const END = Date.parse("2026-11-30T00:00:00+01:00");
  const now = Date.now();
  const test = /[?&]promo=1\b/.test(location.search); // para revisar el aspecto fuera de fechas
  if (!test && (now < START || now >= END)) return;

  const PCT = 30;
  const LABEL = "Black Friday";
  const UNTIL = "hasta el domingo 29 de noviembre";
  const eur = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €";
  const off = (n) => Math.round(n * (1 - PCT / 100));
  const num = (s) => Number(s.replace(/\./g, ""));

  // 1. Barra superior
  const bar = document.createElement("div");
  bar.setAttribute("role", "note");
  bar.style.cssText = "background:#0B1220;color:#fff;font-size:14px;font-weight:500;line-height:1.4;text-align:center;padding:10px 16px";
  bar.innerHTML = "<b>" + LABEL + "</b> · −" + PCT + " % en el alta para quien pida su demo " + UNTIL +
    '. <a href="#demo" style="color:#9CC8FF;font-weight:600;white-space:nowrap">Pedir demo →</a>';
  document.body.insertBefore(bar, document.body.firstChild);

  // 2. Tarjetas de precios: «Alta 890 € la primera vez»
  document.querySelectorAll("#precios .extra").forEach((p) => {
    const m = p.textContent.match(/Alta ([\d.]+) €/);
    if (!m) return;
    const full = num(m[1]);
    p.innerHTML = p.innerHTML.replace(m[0], 'Alta <s style="opacity:.6">' + eur(full) + "</s> <b>" + eur(off(full)) + "</b>") +
      '<br><span style="font-weight:600">−' + PCT + " % " + LABEL + ", " + UNTIL + "</span>";
  });

  // 3. Buscador de plan de la cabecera («+ alta 890 €»)
  const r = document.getElementById("rPrice");
  if (r) {
    const fix = () => {
      if (r.dataset.promo === r.innerHTML) return;
      const html = r.innerHTML.replace(/alta ([\d.]+) €/, (_, a) => 'alta <s style="opacity:.6">' + eur(num(a)) + "</s> " + eur(off(num(a))));
      r.innerHTML = html;
      r.dataset.promo = r.innerHTML;
    };
    new MutationObserver(fix).observe(r, { childList: true, subtree: true, characterData: true });
    fix();
  }
})();
