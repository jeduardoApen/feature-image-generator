# Generador de imágenes Open Graph

Editor local para los títulos bilingües de Infinity Management Company.

## Instalación y ejecución

Desde esta carpeta, con Node.js y npm:

```sh
npm install
npm run dev
```

Abre la dirección local que muestra Vite. Para compilar y revisar la compilación:

```sh
npm run build
npm run preview
```

## Uso

1. Selecciona una ruta o recorre las páginas con **Anterior** y **Siguiente**.
2. Elige inglés o español y edita el título si hace falta. Cada ruta e idioma conserva su propia edición hasta que se recarga la página.
3. Ajusta color, tamaño y dimensiones. El editor carga `logo-primary.webp` al abrirse. Puedes reemplazarlo con un PNG o SVG autónomo de hasta 5 MB. Usa un SVG con todos sus elementos incorporados.
4. Selecciona **Descargar PNG** para guardar la imagen activa con un nombre basado en el título visible y el idioma. Por ejemplo, «Gestión de Activos» se descarga como `gestion-de-activos-es.png`. Si el contenido se desborda, el editor indica qué ajuste revisar.
5. **Restablecer diseño y quitar logo** recupera el formato de 1200 × 630 px y conserva los títulos editados.

La vista previa se escala para adaptarse a la pantalla. El PNG usa las dimensiones configuradas. Los SVG se rasterizan al cargar, con un máximo de 4096 px en su lado mayor. El foco y los estados deshabilitados usan la presentación nativa del navegador.

El fondo y la sombra interior del borde tienen selectores de color independientes. El tamaño de la sombra en píxeles controla el difuminado. Usa 0 para quitarla. Ambos ajustes se incluyen en el PNG.

En **Título → Sombra del título**, ajusta el desplazamiento horizontal y vertical, el radio de difuminado, el color y la opacidad. La sombra empieza al 35 % de opacidad. Usa 0 % para quitarla y valores negativos para desplazarla hacia la izquierda o hacia arriba.
