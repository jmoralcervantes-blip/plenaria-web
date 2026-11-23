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

  // 2. Tarjetas de precios: distintivo encima del precio y alta rebajada bien visible
  const css = document.createElement("style");
  css.textContent =
    ".promo-badge{display:inline-flex;align-self:flex-start;align-items:center;gap:6px;background:#0B1220;color:#fff;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border-radius:999px;padding:6px 12px;margin:0 0 14px}" +
    ".price.featured .promo-badge{background:#fff;color:#0B1220}" +
    ".promo-alta{margin:16px 0 0;padding:14px 16px;border-radius:14px;background:#EEF4FF;border:1.5px dashed rgba(11,111,242,.45)}" +
    ".price.featured .promo-alta{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.55)}" +
    ".promo-alta .row{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}" +
    ".promo-alta .lbl{font-size:14px;font-weight:600}" +
    ".promo-alta s{font-size:18px;opacity:.55}" +
    ".promo-alta b{font-size:30px;font-weight:700;letter-spacing:-.03em;line-height:1}" +
    ".promo-alta p{margin:6px 0 0;font-size:13px;opacity:.85}";
  document.head.appendChild(css);
  document.querySelectorAll("#precios .price").forEach((card) => {
    const p = card.querySelector(".extra");
    const m = p && p.textContent.match(/Alta ([\d.]+) €(.*)/);
    if (!m) return;
    const full = num(m[1]);
    const badge = document.createElement("span");
    badge.className = "promo-badge";
    badge.textContent = LABEL + " · −" + PCT + " % en el alta";
    const amount = card.querySelector(".amount");
    if (amount) amount.parentNode.insertBefore(badge, amount);
    const box = document.createElement("div");
    box.className = "promo-alta";
    box.innerHTML = '<div class="row"><span class="lbl">Alta</span><s>' + eur(full) + "</s><b>" + eur(off(full)) + "</b></div>" +
      "<p>" + m[2].trim().replace(/^la primera vez/, "La primera vez") + "<br>Oferta " + UNTIL + "</p>";
    p.replaceWith(box);
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
