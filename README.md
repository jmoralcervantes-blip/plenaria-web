# Plenaria · web comercial

Página estática (HTML y CSS, sin compilación) para presentar Plenaria y recibir solicitudes de demo.
Se publica en Cloudflare Pages desde este repositorio (sin comando de compilación; carpeta de salida `/`).
Dominio: https://plenaria.es

## Formulario de demo

Usa Web3Forms (gratis hasta 250 solicitudes al mes). Cada solicitud llega por email a la cuenta de Web3Forms
y queda también en app.web3forms.com › formulario «Plenaria» › Submissions. La clave de acceso está en
`index.html` y es pública por diseño: solo permite enviar correos a esa cuenta.

## Cabeceras de seguridad

`_headers` (formato compatible con Cloudflare Pages): CSP, canonical y demás. Si se añade un servicio externo
al que la página haga peticiones, hay que permitirlo en `connect-src`.
