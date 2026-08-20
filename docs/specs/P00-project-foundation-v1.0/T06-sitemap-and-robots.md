# T06 — Sitemap and Robots

**Fase:** P00 — Project Foundation  
**Depende de:** T05  
**Objetivo:** generar el sitemap mediante la integración oficial de Astro y permitir su descubrimiento desde HTML y `robots.txt`.

## 1. Alcance exacto

P00 utilizará `@astrojs/sitemap`. No se debe escribir XML manualmente, crear endpoints `sitemap.xml.ts`, dividir sitemaps de forma personalizada ni mantener un inventario separado de URLs.

La integración debe obtener sus URLs de las rutas estáticas que Astro genera durante el build.

## 2. Instalación

Usar una de las dos rutas oficiales. Se prefiere el comando de Astro:

```bash
npx astro add sitemap
```

Si se requiere una instalación manual:

```bash
npm install @astrojs/sitemap
```

Nunca instalar ambos caminos por separado ni registrar la integración dos veces.

## 3. Configuración requerida

El resultado final de `astro.config.mjs` debe conservar Tailwind y añadir sitemap:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aula.finance',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  // Conservar aquí la configuración de Vite creada para Tailwind 4.
});
```

No añadir por ahora:

- `filter()`.
- `serialize()`.
- `customPages`.
- `customSitemaps`.
- prioridades o frecuencias de cambio.
- configuración i18n.
- shards personalizados.

## 4. Robots

Crear `public/robots.txt` exactamente con una política abierta y la ubicación absoluta del índice:

```text
User-agent: *
Allow: /

Sitemap: https://aula.finance/sitemap-index.xml
```

No bloquear assets, contenido, bots específicos ni rutas futuras.

## 5. Descubrimiento desde HTML

`SeoHead.astro` debe incluir:

```html
<link rel="sitemap" href="/sitemap-index.xml" />
```

Debe aparecer una sola vez en el `<head>` de cada página que use `BaseLayout.astro`.

## 6. Salida esperada

Después de:

```bash
npm run build
```

deben existir como mínimo:

```text
dist/sitemap-index.xml
dist/sitemap-0.xml
dist/robots.txt
```

`sitemap-index.xml` debe referenciar el sitemap numerado y `sitemap-0.xml` debe contener:

```text
https://aula.finance/
```

No asumir que se generará un archivo único llamado `sitemap.xml`.

## 7. Verificación manual

Estas comprobaciones validan artefactos; no constituyen una suite de tests:

```bash
npm run build
test -f dist/sitemap-index.xml
test -f dist/sitemap-0.xml
test -f dist/robots.txt
rg 'https://aula.finance/' dist/sitemap-0.xml
rg 'https://aula.finance/sitemap-index.xml' dist/robots.txt
```

Si `rg` no está disponible, utilizar una herramienta equivalente sin incorporar una dependencia al proyecto.

## 8. Criterios de aceptación

- `@astrojs/sitemap` aparece una sola vez en `package.json` y `astro.config.mjs`.
- `site` utiliza HTTPS y no tiene una ruta base adicional.
- El build produce el índice y al menos un sitemap numerado.
- La home aparece con su URL canónica terminada en `/`.
- `robots.txt` apunta al índice generado.
- El `<head>` declara el sitemap.
- No existe XML generado o mantenido manualmente en `src/` o `public/`.
- No se implementaron redirects ni filtros prematuros.

