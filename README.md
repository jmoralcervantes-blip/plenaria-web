# Plenaria · web comercial

Página estática (HTML y CSS, sin compilación) para presentar Plenaria y recibir solicitudes de demo.

## Antes de publicar

1. En `index.html`, cambia `CONTACT_EMAIL` (al final del archivo) por el correo que recibirá las solicitudes.
2. En `aviso-legal.html` y `privacidad.html`, completa lo marcado entre corchetes: titular, NIF, domicilio, correo y fecha.

## Publicar gratis en Cloudflare Pages

1. Crea una cuenta en cloudflare.com (plan gratuito).
2. Workers & Pages › Crear › Pages › Conectar con Git › elige el repositorio `plenaria-web`.
3. Configuración de compilación: *Framework* «Ninguno», comando de compilación vacío, directorio de salida `/`.
4. Guardar y desplegar. Quedará en `plenaria-web.pages.dev`; cada cambio en GitHub se publica solo.

## Dominio propio

1. Compra el dominio (por ejemplo, en el propio Cloudflare Registrar, a precio de coste).
2. En el proyecto de Pages › Dominios personalizados › añade el dominio.
3. Correo con tu dominio sin pagar buzón: Email › Email Routing › reenvía `hola@tudominio` a tu Gmail.

El archivo `_headers` añade cabeceras de seguridad que Cloudflare Pages aplica automáticamente.
