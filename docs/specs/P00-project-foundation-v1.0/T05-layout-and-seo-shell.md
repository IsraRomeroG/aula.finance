# T05 — Layout and SEO Shell

**Fase:** P00 — Project Foundation  
**Depende de:** T04  
**Objetivo:** implementar el shell HTML y SEO mínimo que utilizarán todas las páginas futuras.

## 1. `SeoHead.astro`

Crear `src/components/seo/SeoHead.astro` con props tipadas:

```ts
interface Props {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}
```

Debe producir:

- `<title>`.
- `meta[name="description"]`.
- `<link rel="canonical">` absoluto.
- `meta[name="robots"]` solamente cuando `noindex` sea `true`.
- `og:type`, `og:title`, `og:description`, `og:url`, `og:site_name` y `og:locale`.
- `og:image` y `og:image:alt` solamente si existe imagen.
- `twitter:card`, `twitter:title` y `twitter:description`.
- `twitter:image` solamente si existe imagen.
- JSON-LD solamente cuando se recibe `jsonLd`.
- `<link rel="sitemap" href="/sitemap-index.xml">`.

Usar `Astro.site` para resolver canonical absolutos y fallar de forma clara si no está configurado. No tomar `Host` de la petición ni duplicar manualmente `https://aula.finance` dentro del componente.

No incluir keywords meta, datos estructurados ficticios ni datos de redes sociales todavía inexistentes.

## 2. Layout general

Crear `src/layouts/BaseLayout.astro` con props compatibles con `SeoHead.astro` y un `<slot />` principal.

Estructura mínima:

```html
<!doctype html>
<html lang="es">
  <head>...</head>
  <body>
    <a href="#contenido">Saltar al contenido</a>
    <header>...</header>
    <main id="contenido"><slot /></main>
    <footer>...</footer>
  </body>
</html>
```

Requisitos:

- Importar `src/styles/global.css` una sola vez desde el layout.
- Incluir `meta charset` y viewport.
- Incluir favicon solo si el archivo correspondiente existe.
- Mantener HTML semántico y navegación por teclado.
- No hidratar ningún componente.

## 3. Header y footer

Crear:

- `src/components/layout/SiteHeader.astro`
- `src/components/layout/SiteFooter.astro`

El header debe incluir únicamente:

- Identidad textual `aula.finance` enlazada a `/`.
- Un `<nav>` accesible preparado para recibir enlaces futuros.

El footer debe incluir:

- Nombre del sitio.
- Año actual obtenido durante el build.
- Una nota breve que indique que el contenido es educativo y no constituye asesoría financiera personalizada.

No enlazar categorías ni páginas institucionales hasta que esas rutas existan.

## 4. Homepage mínima

Reemplazar el contenido del starter en `src/pages/index.astro` por una página que use `BaseLayout.astro` y contenga:

- Un único `<h1>`.
- La propuesta inicial de aula.finance.
- Una explicación breve de que el sitio ofrecerá educación financiera práctica.
- Una sección con los tres pilares, presentada como contenido estático sin enlaces si las rutas todavía no existen.

La homepage es un shell funcional, no el diseño final. Evitar testimonios, cifras, logos de instituciones, CTA de newsletter o afirmaciones no verificadas.

## 5. Criterios de aceptación

- `/` usa `BaseLayout.astro`.
- El documento declara `lang="es"`.
- Existe un único `<h1>`.
- El canonical de la home es `https://aula.finance/`.
- No hay enlaces internos rotos.
- No se envía JavaScript de hidratación.
- El aviso educativo es visible.
- Metadatos sociales ausentes no se inventan.
- `npm run check` y `npm run build` terminan correctamente.
