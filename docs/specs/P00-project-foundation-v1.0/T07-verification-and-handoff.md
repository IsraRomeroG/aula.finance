# T07 — Verification and Handoff

**Fase:** P00 — Project Foundation  
**Depende de:** T06  
**Objetivo:** cerrar la fase con comprobaciones reproducibles y automatizar `check` + `build` sin introducir tests.

## 1. Validación local obligatoria

Ejecutar en este orden:

```bash
npm ci
npm run check
npm run build
```

`npm ci` debe funcionar porque `package.json` y `package-lock.json` están sincronizados. No corregir un fallo eliminando el lockfile.

Después del build, comprobar:

```bash
test -f dist/index.html
test -f dist/sitemap-index.xml
test -f dist/sitemap-0.xml
test -f dist/robots.txt
rg 'https://aula.finance/' dist/index.html dist/sitemap-0.xml
rg 'https://aula.finance/sitemap-index.xml' dist/index.html dist/robots.txt
```

## 2. Smoke check manual

Ejecutar:

```bash
npm run dev
```

Revisar `/` en un navegador y confirmar:

- La página carga sin errores de consola.
- El idioma del documento es español.
- Existe un único H1.
- El enlace para saltar al contenido funciona.
- No existen enlaces internos rotos.
- La vista móvil no produce overflow horizontal.
- El source HTML contiene canonical y declaración del sitemap.

Detener el servidor al terminar. Este smoke check no debe convertirse en Playwright ni en otra herramienta automatizada en P00.

## 3. GitHub Actions sin tests

Crear `.github/workflows/quality.yml`:

```yaml
name: Quality

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  check-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Check Astro and TypeScript
        run: npm run check

      - name: Build
        run: npm run build
```

Antes de fijar Node 22, comprobar que la versión instalada de Astro lo soporta. Si el proyecto ya declara una versión distinta en `.nvmrc`, `.node-version` o `package.json#engines`, esa declaración tiene prioridad y el workflow debe utilizarla.

No añadir un paso `npm test`, cobertura, publicación de artefactos ni despliegue.

## 4. Revisión del diff

Ejecutar:

```bash
git status --short
git diff --check
git diff
```

Confirmar:

- No se modificaron archivos ajenos al alcance.
- No se incluyeron secretos ni archivos de entorno.
- `dist/` y `node_modules/` no están versionados.
- No se agregó un segundo lockfile.
- No se agregó infraestructura de tests.
- No se agregó un adapter SSR.

P00 no realiza commit ni push automáticamente.

## 5. Evidencia mínima de cierre

El implementador debe reportar:

- Versión de Node, npm y Astro utilizadas.
- Dependencias añadidas.
- Resultado de `npm ci`.
- Resultado de `npm run check`.
- Resultado de `npm run build`.
- Confirmación de los tres archivos de sitemap/robots.
- Lista de archivos modificados o creados.
- Cualquier desviación respecto de las especificaciones.

No adjuntar `node_modules/` ni `dist/` al repositorio.

## 6. Criterios de aceptación

- Todos los comandos obligatorios terminan con código `0`.
- La home funciona en viewport de escritorio y móvil.
- El workflow utiliza `npm ci`, `npm run check` y `npm run build`.
- El workflow no contiene tests ni despliegue.
- El sitemap generado contiene la home canónica.
- No hay errores de whitespace detectados por `git diff --check`.
- El diff corresponde exclusivamente a P00.
- Se entrega evidencia de cierre, pero no se realiza commit ni push sin autorización.

## 7. Handoff

Con P00 cerrado, la siguiente fase puede implementar:

- Rutas de artículos y categorías con `getStaticPaths()`.
- Páginas de autores.
- Layout editorial.
- Navegación real.
- Datos estructurados `BlogPosting` y breadcrumbs.
- RSS.
- Contenido editorial inicial.

Estas capacidades no deben incorporarse retroactivamente a P00.

