# T03 — Source Tree and Conventions

**Fase:** P00 — Project Foundation  
**Depende de:** T02  
**Objetivo:** crear una estructura fuente predecible sin añadir capas o componentes que todavía no se utilizan.

## 1. Árbol requerido

Crear el siguiente árbol dentro de `src/`:

```text
src/
├── assets/
│   └── images/
│       └── articles/
├── components/
│   ├── layout/
│   └── seo/
├── config/
├── content/
│   ├── articles/
│   └── authors/
├── layouts/
├── pages/
├── styles/
└── utils/
```

Usar `.gitkeep` solamente en directorios que deban existir pero permanezcan vacíos al terminar P00:

- `src/assets/images/articles/`
- `src/content/articles/`
- `src/content/authors/`

No agregar `.gitkeep` a directorios que ya contienen archivos reales.

## 2. Responsabilidades

| Directorio | Responsabilidad |
| --- | --- |
| `assets/images/articles` | Imágenes locales procesables por Astro |
| `components/layout` | Header, footer y piezas estructurales del sitio |
| `components/seo` | Metadatos y declaraciones del `<head>` |
| `config` | Datos estables del sitio y taxonomía controlada |
| `content/articles` | Artículos Markdown o MDX organizados por categoría |
| `content/authors` | Registros JSON de autores y revisores |
| `layouts` | Composición completa de páginas |
| `pages` | Rutas creadas por Astro |
| `styles` | Estilos globales |
| `utils` | Funciones puras compartidas |

## 3. Configuración del sitio

Crear `src/config/site.ts` con un objeto inmutable y tipado que sea la fuente de verdad para metadatos editoriales:

```ts
export const SITE = {
  name: 'aula.finance',
  language: 'es',
  locale: 'es_MX',
  title: 'aula.finance — Educación financiera práctica',
  description:
    'Educación financiera práctica para administrar mejor tu dinero, reducir deudas y comenzar a invertir.',
} as const;
```

No duplicar la URL del sitio en `SITE` ni en componentes. `astro.config.mjs#site` es la única fuente de verdad para la URL absoluta y debe consumirse mediante `Astro.site`.

## 4. Categorías iniciales

Crear `src/config/categories.ts`:

```ts
export const CATEGORY_IDS = [
  'finanzas-personales',
  'credito-y-deudas',
  'inversiones',
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CATEGORIES = {
  'finanzas-personales': {
    name: 'Finanzas personales',
    description: 'Organización, presupuesto, ahorro y decisiones cotidianas.',
  },
  'credito-y-deudas': {
    name: 'Crédito y deudas',
    description: 'Uso responsable del crédito y estrategias para reducir deudas.',
  },
  inversiones: {
    name: 'Inversiones',
    description: 'Conceptos y primeros pasos para invertir con mayor claridad.',
  },
} as const satisfies Record<CategoryId, {
  name: string;
  description: string;
}>;
```

P00 no crea rutas públicas para estas categorías; únicamente establece su contrato.

## 5. Convenciones de nombres

- Componentes Astro: `PascalCase.astro`.
- Archivos TypeScript: `kebab-case.ts` o nombres de dominio simples como `site.ts`.
- IDs y slugs: minúsculas ASCII y guiones.
- Artículos: `src/content/articles/{category}/{slug}.md`.
- Autores: `src/content/authors/{author-id}.json`.
- Imports internos: aliases definidos en `tsconfig.json` cuando mejoren claridad.
- Exports nombrados para configuración y utilidades; evitar exports por defecto salvo donde Astro los requiera.

## 6. Restricciones

- No crear `src/views/`, `src/services/`, `src/repositories/` ni `src/api/`.
- No crear un barrel `index.ts` por directorio.
- No crear componentes genéricos sin un uso inmediato.
- No añadir rutas de categorías o artículos en esta tarea.
- No añadir un sistema de tags público.

## 7. Criterios de aceptación

- El árbol requerido existe.
- Cada directorio tiene una responsabilidad no superpuesta.
- Los directorios vacíos están registrados correctamente.
- `SITE`, `CATEGORY_IDS` y `CATEGORIES` están tipados y no contienen `any`.
- No existen rutas o dependencias prematuras.
- `npm run check` y `npm run build` siguen funcionando.
