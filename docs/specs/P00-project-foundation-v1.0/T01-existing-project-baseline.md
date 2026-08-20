# T01 — Existing Project Baseline

**Fase:** P00 — Project Foundation  
**Depende de:** ninguna  
**Objetivo:** preparar el proyecto Astro existente sin reinicializarlo ni alterar innecesariamente su historial o lockfile.

## 1. Precondiciones

- La terminal está ubicada en la raíz del proyecto aula.finance.
- Existen `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json` y `src/`.
- El directorio ya pertenece a un repositorio Git.

Si falta alguna precondición, detener la tarea y documentar la diferencia. No ejecutar generadores para intentar reparar silenciosamente el repositorio.

## 2. Prohibiciones

No ejecutar:

```bash
npm create astro@latest
git init
rm package-lock.json
```

Tampoco sustituir npm por otro gestor de paquetes ni crear un segundo lockfile.

## 3. Inspección inicial

Revisar antes de modificar:

```bash
git status --short
npm --version
node --version
npm ls astro
```

Inspeccionar el contenido actual de:

- `package.json`
- `astro.config.mjs`
- `tsconfig.json`
- `src/pages/index.astro`
- `.gitignore`

Las modificaciones deben preservar cambios previos del usuario y propiedades válidas creadas por el starter actual de Astro.

## 4. Scripts requeridos

Conservar los scripts estándar del starter y asegurar que `package.json` exponga al menos:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

Si el starter no incluye `start`, se puede añadir como alias de `dev`. No introducir scripts de tests, linting, formato, despliegue o generación de contenido en P00.

## 5. Comprobación del lockfile

Todas las instalaciones posteriores deben realizarse con npm para que `package-lock.json` se actualice normalmente. No usar `--force`, `--legacy-peer-deps` ni borrar el lockfile salvo que exista un error comprobado y se apruebe una corrección fuera de esta especificación.

## 6. Entregables

- Baseline inspeccionado.
- Scripts mínimos presentes en `package.json`.
- Confirmación de que el repositorio y el proyecto no fueron reinicializados.
- Lista privada de archivos ya modificados antes de P00 para evitar sobrescribir trabajo ajeno.

## 7. Criterios de aceptación

- `git status --short` sigue mostrando intactos los cambios previos del usuario.
- Existe un único lockfile npm.
- `npm run dev`, `npm run build`, `npm run preview` y `npm run check` están definidos.
- No existe un script `test` agregado por P00.
- No se ejecutó un generador de proyecto.

## 8. Verificación

```bash
npm run
git status --short
```

No es obligatorio ejecutar todavía `npm run check`, porque la dependencia correspondiente se instala en T02.

