# P00 — Project Foundation

**Proyecto:** aula.finance  
**Paquete:** `P00-project-foundation`  
**Versión:** `1.0`  
**Estado:** listo para implementación  
**Tipo de producto:** blog editorial estático de educación financiera  
**Stack base:** Astro, TypeScript, Markdown, Content Collections y Tailwind CSS 4

## 1. Propósito

Establecer una base técnica mínima, mantenible y preparada para SEO sobre el proyecto Astro que ya existe. Al concluir P00, el repositorio debe poder desarrollar, validar y compilar una primera página estática de aula.finance, además de generar automáticamente el sitemap mediante la integración oficial de Astro.

P00 no implementa todavía la experiencia editorial completa, las páginas dinámicas de artículos ni el diseño visual definitivo. Su responsabilidad es dejar contratos, estructura, configuración y componentes base suficientemente estables para construir esas capacidades en las siguientes fases.

## 2. Contexto confirmado

- El proyecto ya fue creado con `npm create astro@latest`.
- Se eligió la plantilla `Use minimal (empty) template`.
- El repositorio Git ya está inicializado.
- npm es el gestor de paquetes del proyecto y `package-lock.json` debe conservarse actualizado.
- aula.finance comenzará como un sitio estático en español, orientado inicialmente a México.
- No se requiere backend, base de datos, CMS, autenticación ni renderizado en servidor.
- No se agregarán tests en esta fase.
- Sí se permiten comprobaciones estáticas y de compilación: `astro check` y `astro build`.

## 3. Objetivos de la fase

1. Auditar y preservar el proyecto Astro existente sin volver a inicializarlo.
2. Establecer TypeScript estricto y scripts mínimos de calidad.
3. Incorporar Tailwind CSS 4 mediante el mecanismo oficial compatible con la versión instalada de Astro.
4. Crear una estructura de código pequeña y escalable.
5. Definir contratos iniciales para artículos, autores y categorías.
6. Crear el layout, metadatos SEO y página inicial mínimos.
7. Instalar y configurar `@astrojs/sitemap` con la URL canónica de producción.
8. Publicar `robots.txt` y declarar el sitemap en el `<head>`.
9. Verificar que el sitio compila y que el sitemap aparece en `dist/`.
10. Incorporar una validación automática de `check` + `build` en GitHub Actions, sin tests.

## 4. Principios obligatorios

- **Static first:** mantener `output: 'static'`, explícita o implícitamente.
- **YAGNI:** no añadir abstracciones, integraciones o dependencias que P00 no utilice.
- **Astro first:** no instalar React, Vue, Svelte, Solid u otro framework de interfaz.
- **Content first:** usar Content Collections y Markdown como fuente editorial local.
- **SEO by construction:** generar URLs, canonical y sitemap desde una sola URL base.
- **No contenido ficticio:** no crear artículos de ejemplo que puedan terminar publicados.
- **No enlaces rotos:** el shell inicial no debe enlazar páginas que aún no existan.
- **No redirects:** no implementar middleware, mapas ni placeholders de redirecciones.
- **No tests por ahora:** no instalar Vitest, Playwright, Cypress ni Testing Library.
- **Cambios pequeños:** cada tarea debe producir un diff revisable y dejar el build funcionando.

## 5. Decisiones arquitectónicas

| Tema | Decisión P00 |
| --- | --- |
| Renderizado | Sitio estático generado durante el build |
| Idioma inicial | Español, `lang="es"` y locale `es_MX` |
| URL de producción | `https://aula.finance` |
| Trailing slash | `always` |
| Formato del build | `directory` |
| Contenido | Markdown/MDX local mediante Content Collections |
| Categorías iniciales | `finanzas-personales`, `credito-y-deudas`, `inversiones` |
| URL futura de artículo | `/{category}/{slug}/` |
| Fuente de la categoría | Primer segmento del `id` del artículo |
| Autores | Colección separada y referenciada desde artículos |
| Estilos | Tailwind CSS 4 + variables CSS semánticas mínimas |
| JavaScript cliente | Ninguno salvo que una función futura lo requiera |
| Sitemap | Integración oficial `@astrojs/sitemap` |
| Robots | Archivo estático `public/robots.txt` |
| Verificación | `astro check`, `astro build` y comprobación de artefactos |
| Tests | Fuera de alcance |

## 6. Arquitectura objetivo al finalizar P00

```text
.
├── .github/
│   └── workflows/
│       └── quality.yml
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── articles/
│   │           └── .gitkeep
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteFooter.astro
│   │   │   └── SiteHeader.astro
│   │   └── seo/
│   │       └── SeoHead.astro
│   ├── config/
│   │   ├── categories.ts
│   │   └── site.ts
│   ├── content/
│   │   ├── articles/
│   │   │   └── .gitkeep
│   │   └── authors/
│   │       └── .gitkeep
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   ├── articles.ts
│   │   └── urls.ts
│   └── content.config.ts
├── astro.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

Los directorios vacíos definidos en esta estructura deben conservarse mediante `.gitkeep`. Cuando un directorio reciba contenido real, su `.gitkeep` puede eliminarse.

## 7. Tareas del paquete

| Orden | Especificación | Resultado principal |
| --- | --- | --- |
| 1 | `T01-existing-project-baseline.md` | Proyecto existente auditado y scripts mínimos definidos |
| 2 | `T02-astro-typescript-and-styles.md` | Astro, TypeScript y Tailwind configurados |
| 3 | `T03-source-tree-and-conventions.md` | Árbol fuente y convenciones creados |
| 4 | `T04-content-foundation.md` | Colecciones y contratos editoriales definidos |
| 5 | `T05-layout-and-seo-shell.md` | Layout, SEO base y homepage mínima funcionando |
| 6 | `T06-sitemap-and-robots.md` | Sitemap oficial y robots implementados |
| 7 | `T07-verification-and-handoff.md` | Build verificado y fase preparada para cierre |

Las tareas deben ejecutarse en ese orden. Cada una depende de que la anterior haya cumplido sus criterios de aceptación.

## 8. Dependencias permitidas

P00 puede añadir únicamente dependencias que respondan a sus objetivos:

- `@astrojs/sitemap`
- Tailwind CSS 4 y el plugin de Vite instalado por la integración oficial de Astro
- `@astrojs/check`
- `typescript`

No se debe añadir una dependencia si ya está presente y es compatible. Nunca se debe borrar y regenerar `package-lock.json` como atajo.

## 9. Fuera de alcance

- Reinicializar Astro o Git.
- Elegir o configurar hosting.
- Hacer commit, push o crear ramas automáticamente.
- Diseñar la identidad visual definitiva.
- Implementar navegación completa o mega menús.
- Crear páginas de categorías, artículos, autores o tags.
- Agregar RSS.
- Agregar JSON-LD de `BlogPosting`.
- Implementar búsqueda, newsletter, comentarios o analítica.
- Crear calculadoras o herramientas financieras.
- Integrar un backend Java o APIs de mercado.
- Integrar un CMS.
- Crear redirecciones.
- Instalar o configurar tests.

## 10. Definition of Done de P00

P00 se considera terminado solamente cuando:

- El proyecto existente fue modificado sin ejecutar `npm create astro@latest` ni `git init`.
- `package-lock.json` está sincronizado con `package.json`.
- TypeScript usa la configuración estricta de Astro.
- La estructura acordada existe y no contiene abstracciones no utilizadas.
- `src/content.config.ts` registra las colecciones `articles` y `authors`.
- La página `/` usa `BaseLayout.astro` y renderiza HTML válido en español.
- El canonical de `/` resuelve a `https://aula.finance/`.
- `@astrojs/sitemap` está instalado y registrado una sola vez.
- `public/robots.txt` apunta a `https://aula.finance/sitemap-index.xml`.
- El `<head>` declara `/sitemap-index.xml`.
- `npm run check` termina correctamente.
- `npm run build` termina correctamente.
- `dist/sitemap-index.xml` y `dist/sitemap-0.xml` existen después del build.
- El sitemap contiene `https://aula.finance/`.
- GitHub Actions ejecuta `npm ci`, `npm run check` y `npm run build`, sin un paso de tests.
- No se añadieron frameworks UI, backend, CMS ni librerías de testing.

## 11. Resultado esperado para la siguiente fase

P01 podrá concentrarse en la plataforma editorial: generación de rutas `/{category}/{slug}/`, páginas de categorías y autores, layout de artículo, navegación, datos estructurados editoriales y contenido real. P00 no debe anticipar esa implementación más allá de los contratos necesarios.

## 12. Referencias oficiales

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro TypeScript](https://docs.astro.build/en/guides/typescript/)
- [Astro Styles and CSS — Tailwind](https://docs.astro.build/en/guides/styling/)
- [Astro Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Astro Images](https://docs.astro.build/en/guides/images/)
