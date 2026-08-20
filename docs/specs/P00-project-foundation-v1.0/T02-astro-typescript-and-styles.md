# T02 — Astro, TypeScript and Styles

**Fase:** P00 — Project Foundation  
**Depende de:** T01  
**Objetivo:** fijar la configuración estática, TypeScript estricto y Tailwind CSS 4 sin incorporar un framework cliente.

## 1. Dependencias de comprobación

Instalar únicamente si no están presentes:

```bash
npm install --save-dev @astrojs/check typescript
```

No instalar Zod por separado. La configuración de Content Collections debe importar `z` desde `astro/zod`, conservando compatibilidad con la versión utilizada por Astro.

## 2. Tailwind CSS 4

Agregar Tailwind mediante el comando oficial compatible con Astro actual:

```bash
npx astro add tailwind
```

Revisar el diff generado antes de continuar. El resultado esperado es Tailwind CSS 4 integrado mediante `@tailwindcss/vite`, no la integración heredada `@astrojs/tailwind` de Tailwind 3.

`src/styles/global.css` debe contener:

```css
@import "tailwindcss";
```

P00 puede añadir variables semánticas y estilos base pequeños, pero no debe definir todavía un design system completo ni una paleta final.

Variables mínimas sugeridas:

```css
:root {
  color-scheme: light;
  --color-page: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #0f172a;
  --color-muted: #475569;
  --color-border: #e2e8f0;
  --color-accent: #0f766e;
}
```

El `body` debe eliminar el margen por defecto y aplicar colores, tipografía de sistema y un interlineado legible. No descargar fuentes externas en P00.

## 3. TypeScript

`tsconfig.json` debe extender la plantilla estricta de Astro:

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

Conservar cualquier opción válida generada por Astro o requerida por Tailwind. Añadir aliases solamente si no entran en conflicto:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@config/*": ["src/config/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

No configurar JSX ni tipos de React.

## 4. Configuración base de Astro

Configurar en `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aula.finance',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
```

La configuración real debe conservar cualquier bloque `vite` añadido por Tailwind. La integración del sitemap se incorporará en T06; no duplicarla anticipadamente.

## 5. Decisiones de configuración

- `site` es la única fuente técnica para construir URLs absolutas.
- `output: 'static'` documenta explícitamente la intención del proyecto.
- `trailingSlash: 'always'` fija la forma canónica de las URLs.
- `build.format: 'directory'` alinea la salida física con las URLs terminadas en `/`.
- No añadir adapters de Node, Vercel, Netlify o Cloudflare en P00.

## 6. Criterios de aceptación

- Tailwind 4 funciona mediante el plugin de Vite.
- No está instalado `@astrojs/tailwind`.
- `global.css` importa `tailwindcss` una sola vez.
- TypeScript extiende `astro/tsconfigs/strict`.
- `astro.config.mjs` declara `site`, salida estática y política de trailing slash.
- No existe una dependencia de framework cliente.
- `package-lock.json` está actualizado mediante npm.

## 7. Verificación

```bash
npm run check
npm run build
```

Ambos comandos deben terminar con código de salida `0` antes de iniciar T03.

