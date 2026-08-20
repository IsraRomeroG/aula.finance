# T04 — Content Foundation

**Fase:** P00 — Project Foundation  
**Depende de:** T03  
**Objetivo:** definir las colecciones y metadatos que utilizará la futura plataforma editorial, sin publicar contenido ficticio.

## 1. Colecciones requeridas

Crear `src/content.config.ts` y registrar exactamente:

- `articles`: archivos `**/*.{md,mdx}` bajo `src/content/articles`.
- `authors`: archivos `**/*.json` bajo `src/content/authors`.

Usar:

```ts
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
```

No instalar Zod manualmente y no usar la API heredada `src/content/config.ts`.

## 2. Identidad y rutas futuras

El `glob()` loader genera el `id` a partir de la ruta relativa del archivo. Para un artículo en:

```text
src/content/articles/finanzas-personales/como-hacer-un-presupuesto.md
```

el identificador esperado es:

```text
finanzas-personales/como-hacer-un-presupuesto
```

Ese `id` será la fuente de verdad para la URL futura:

```text
/finanzas-personales/como-hacer-un-presupuesto/
```

No duplicar `slug` ni `category` en el frontmatter. Esto evita inconsistencias entre metadatos, ubicación del archivo y URL.

## 3. Esquema de autores

La colección `authors` debe validar:

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| `name` | string no vacía | sí | Nombre público |
| `role` | string no vacía | sí | Rol editorial o profesional |
| `bio` | string no vacía | sí | Biografía breve |
| `credentials` | string[] | no | Default `[]` |
| `sameAs` | URL[] | no | Default `[]` |
| `avatar` | imagen local | no | Validada con `image()` |

Los revisores financieros se modelan como autores. No crear una tercera colección `reviewers` en P00.

## 4. Esquema de artículos

La colección `articles` debe validar:

| Campo | Tipo | Obligatorio | Regla |
| --- | --- | --- | --- |
| `title` | string | sí | No vacío |
| `description` | string | sí | Entre 50 y 170 caracteres |
| `publishedAt` | date coercible | sí | Fecha original |
| `updatedAt` | date coercible | no | Última modificación sustancial |
| `reviewedAt` | date coercible | no | Última revisión de exactitud |
| `author` | referencia a `authors` | sí | `reference('authors')` |
| `reviewedBy` | referencia a `authors` | no | Revisor, si aplica |
| `tags` | string[] | no | Default `[]`, máximo 8 |
| `cover` | imagen local | no | Validada con `image()` |
| `coverAlt` | string | condicional | Obligatoria cuando exista `cover` |
| `draft` | boolean | no | Default `true` |
| `featured` | boolean | no | Default `false` |
| `jurisdiction` | enum | no | `MX` o `general`; default `MX` |
| `affiliateDisclosure` | boolean | no | Default `false` |
| `sources` | array de fuentes | no | Default `[]` |

Cada fuente debe incluir:

```ts
{
  title: string;
  publisher: string;
  url: URL;
  accessedAt: Date;
}
```

Aplicar una validación de esquema para que `coverAlt` exista si `cover` está definido. No exigir fuentes mínimas todavía: la política de publicación se implementará en una fase editorial posterior.

## 5. Utilidades de consulta

Crear `src/utils/articles.ts` con funciones pequeñas:

- `getAllArticles()`: obtiene la colección completa y ordena de forma descendente por `publishedAt`.
- En producción excluye `draft: true`.
- En desarrollo puede incluir borradores para previsualización.
- `parseArticleId(id)`: exige exactamente dos segmentos y valida que el primero pertenezca a `CATEGORY_IDS`.

La función `parseArticleId()` debe devolver una estructura tipada:

```ts
{
  category: CategoryId;
  slug: string;
}
```

Si el `id` es inválido, debe lanzar un error descriptivo durante el build. No reparar ni normalizar silenciosamente IDs inválidos.

Crear `src/utils/urls.ts` con:

- `toAbsoluteUrl(pathname, baseUrl)`.
- `articlePathFromId(id)` que reutilice `parseArticleId()` y produzca `/{category}/{slug}/`.

No crear una clase URL builder.

## 6. Contenido inicial

- Conservar vacías las colecciones mediante `.gitkeep`.
- No crear autor, artículo o imagen de demostración.
- La ausencia de entradas debe compilar correctamente.

## 7. Criterios de aceptación

- `src/content.config.ts` usa loaders de build y schemas Zod.
- Las dos colecciones están registradas.
- Los artículos no duplican categoría ni slug en frontmatter.
- Autores y revisores comparten la colección `authors`.
- Los borradores se excluyen de consultas de producción.
- IDs con categoría desconocida o más de dos segmentos provocan un error claro cuando se procesan.
- No existe contenido editorial ficticio.
- `npm run check` y `npm run build` terminan correctamente con colecciones vacías.

