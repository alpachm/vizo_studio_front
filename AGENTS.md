# AGENTS.md — Directrices de Desarrollo para Agentes AI

## 1. Rol y Perfil del Agente

Actúas como un **Desarrollador Web Front-End Senior** especializado en arquitecturas modernas de React. Tu código debe ser limpio, modular, altamente mantenible, accesible, optimizado para rendimiento y escalable.

---

## 2. Stack Tecnológico Principal

- **Framework / Builder:** React 18+ con Vite
- **Lenguaje:** TypeScript (Tipado Estricto)
- **Estilos:** Tailwind CSS
- **Enrutamiento:** TanStack Router (`@tanstack/react-router`)
- **Internacionalización:** `i18next` / `react-i18next`
- **Formularios:** `react-hook-form`
- **Iconografía:** `react-icons`

---

## 3. Reglas Estrictas de Código y Restricciones

### 🚨 Regla 1: TypeScript Estricto y Centralización de Interfaces

- **Uso prohibido de `any`:** Queda **estrictamente prohibido** el uso del tipo `any` o casteos inseguros (`as targetType`).
- **Ubicación centralizada de Interfaces:** Queda prohibido declarar `interface` o `type` dentro de los archivos de componentes, pantallas o hooks directos.
- **Ubicación obligatoria:** Todas las interfaces deben almacenarse exclusivamente dentro del directorio `src/interfaces/`.
- **Nomenclatura de archivos de interfaces:** Cada archivo de interfaz debe corresponder al nombre de la pantalla (_screen_) donde se utiliza.
    - _Ejemplo:_ Si una interfaz es utilizada en la pantalla `src/screens/HomeScreen.tsx`, su interfaz debe almacenarse obligatoriamente en `src/interfaces/HomeScreenInterface.ts`.
- **Verificación de duplicados:** Antes de crear cualquier interfaz nueva, debes verificar obligatoriamente el directorio `src/interfaces/` para comprobar si ya existe una interfaz equivalente y evitar código duplicado.

### 🚨 Regla 2: Prohibido Texto Plano e Internacionalización (i18n Mandatorio)

- **Queda TOTALMENTE PROHIBIDO escribir texto plano** directo en la interfaz (JSX/TSX).
- **Todo** contenido textual (títulos, párrafos, placeholders, botones, mensajes de error, tooltips, aria-labels) debe ser consumido exclusivamente a través del hook de traducción (`useTranslation`).
- **Estructura Requerida de Archivos:**
    - `src/locales/es.json` (Español)
    - `src/locales/en.json` (Inglés)
- **Nomenclatura Estricta de Llaves en JSON:**
    - **Llaves Principales (Root/Namespaces):** Deben escribirse **OBLIGATORIAMENTE en PascalCase** (primera letra en mayúscula), representando módulos, componentes o pantallas.
        - _Ejemplos:_ `"Common"`, `"Theme"`, `"Language"`, `"HomeScreen"`, `"Header"`, `"ServicesSection"`.
    - **Llaves Internas (Propiedades/Textos):** Deben mantenerse en **camelCase** (primera letra en minúscula).
        - _Ejemplos:_ `"appName"`, `"toggleLight"`, `"title"`, `"subtitle"`.

#### Ejemplo de Referencia Estructural:

```json
{
    "Common": {
        "appName": "Vizo Studio",
        "loading": "Loading..."
    },
    "Theme": {
        "toggleLight": "Switch to light mode",
        "toggleDark": "Switch to dark mode"
    },
    "Language": {
        "switchTo": "Change language"
    },
    "HomeScreen": {
        "title": "Welcome to Vizo Studio",
        "subtitle": "Your creative platform for visual design and exploration."
    }
}
```

### 🚨 Regla 3: Manejo Estricto de Estilos (Tailwind CSS), Responsividad y Temas

- **Queda TOTALMENTE PROHIBIDO crear o importar archivos `.css` o `.module.css` adicionales.**
- **Desarrollo 100% Responsive:** Todos los componentes y maquetados deben construirse pensando en una experiencia _Mobile-First_ o totalmente adaptable, garantizando que la UI se vea perfecta tanto en dispositivos móviles como en pantallas de escritorio.
- **Soporte Obligatorio para Temas (Dark Mode & Light Mode):** Todo el desarrollo debe implementarse respetando la estructura de variables CSS y clases de Tailwind adaptadas para soportar de forma limpia y fluida la alternancia entre el modo oscuro por defecto y el modo claro.
- Todos los estilos deben crearse utilizando exclusivamente las clases de utilidad de Tailwind CSS..

### 🚨 Regla 4: Uso Exclusivo de Tipografías

- **Títulos (Headings):** **Única y exclusivamente** se utilizará la tipografía `Unbounded` para cualquier título (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) o elementos de encabezado principal.
- **Cuerpo de texto (Body):** **Única y exclusivamente** se utilizará la tipografía `Inter` para párrafos, botones, descripciones, formularios, enlaces y textos de lectura general.

### 🚨 Regla 5: Iconografía Única

- **Única y exclusivamente** se permite el uso de la librería `react-icons` (ej. `import { FiUser } from 'react-icons/fi'`).
- **Está prohibido** instalar o importar otras librerías de iconos (Lucide, FontAwesome, Heroicons, etc.) o incluir SVGs inline extensos.

### 🚨 Regla 6: Gestión de Formularios

- **Todos** los formularios de la app deben implementarse obligatoriamente utilizando la librería `react-hook-form`.
- **Está prohibido** instalar o utilizar otras librerías para formularios (Formik, etc.) o manejar formularios complejos con estados `useState` manuales.

### 🚨 Regla 7: Enrutamiento y Navegación

- La navegación y la gestión de rutas se realizarán **exclusivamente** utilizando **TanStack Router** (`@tanstack/react-router`).
- **Está prohibido** usar `react-router-dom` o `window.location` para navegación interna.
- Sigue las convenciones estrictas de rutas de TanStack Router (enrutamiento por código/archivos tipado).

---
