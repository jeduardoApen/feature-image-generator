# OG Image Reference — Infinity Management Company

Referencia para generar las imágenes destacadas / Open Graph por página de forma
manual (sin depender de WordPress): títulos por página (EN/ES), paleta de colores
de marca y tipografía.

## 1. Títulos de página (ruta canónica → EN / ES)

| Ruta canónica | Inglés | Español |
|---|---|---|
| `home` | `home` | `home` |
| `asset-management` | `asset-management` | `asset-management` |
| `asset-management/about-us` | `asset-management/about-us` | `asset-management/about-us` |
| `residential` | `residential` | `residential` |
| `residential/single-family-residential` | `residential/single-family-residential` | `residential/single-family-residential` |
| `residential/1-4-units` | `residential/1-4-units` | `residential/1-4-units` |
| `residential/adus` | `residential/adus` | `residential/adus` |
| `residential/multifamily-property-management` | `residential/multifamily-property-management` | `residential/multifamily-property-management` |
| `residential/affordable-housing` | `residential/affordable-housing` | `residential/affordable-housing` |
| `commercial` | `commercial` | `commercial` |
| `commercial/office-space` | `commercial/office-space` | `commercial/office-space` |
| `commercial/retail` | `commercial/retail` | `commercial/retail` |
| `commercial/mixed-use` | `commercial/mixed-use` | `commercial/mixed-use` |
| `commercial/warehouses` | `commercial/warehouses` | `commercial/warehouses` |
| `commercial/storage-buildings` | `commercial/storage-buildings` | `commercial/storage-buildings` |
| `other-services` | `other-services` | `other-services` |
| `other-services/construction-management-repositioning` | `other-services/construction-management-repositioning` | `other-services/construction-management-repositioning` |
| `other-services/new-construction-lease-up` | `other-services/new-construction-lease-up` | `other-services/new-construction-lease-up` |
| `other-services/utility-management-cost-analysis` | `other-services/utility-management-cost-analysis` | `other-services/utility-management-cost-analysis` |
| `other-services/self-directed-ira` | `other-services/self-directed-ira` | `other-services/self-directed-ira` |
| `other-services/1031-exchange` | `other-services/1031-exchange` | `other-services/1031-exchange` |
| `landlords` | `landlords` | `landlords` |
| `residents` | `residents` | `residents` |
| `residents/apply` | `residents/apply` | `residents/apply` |
| `residents/faq` | `residents/faq` | `residents/faq` |
| `residents/maintenance-request` | `residents/maintenance-request` | `residents/maintenance-request` |
| `residents/search-for-rentals` | `residents/search-for-rentals` | `residents/search-for-rentals` |
| `real-estate-professionals` | `real-estate-professionals` | `real-estate-professionals` |
| `real-estate-professionals/broker-agent-referral-program` | `real-estate-professionals/broker-agent-referral-program` | `real-estate-professionals/broker-agent-referral-program` |
| `resources` | `resources` | `resources` |
| `resources/cost-savings-with-rubs` | `resources/cost-savings-with-rubs` | `resources/cost-savings-with-rubs` |
| `contact-us` | `contact-us` | `contact-us` |
| `blog` | `blog` | `blog` |
| `privacy-policy` | `privacy-policy` | `privacy-policy` |
| `terms-and-conditions` | `terms-and-conditions` | `terms-and-conditions` |
| `sms-terms-opt-in` | `sms-terms-opt-in` | `sms-terms-opt-in` |
| `home/home-form` | `home/home-form` | `home/home-form` |
| `landlords/landlords-form` | `landlords/landlords-form` | `landlords/landlords-form` |
| `residential/multifamily-property-management/multifamily-property-management-form` | `residential/multifamily-property-management/multifamily-property-management-form` | `residential/multifamily-property-management/multifamily-property-management-form` |

## 2. Paleta de colores

### Verde principal (marca)

| Nombre | Hex | RGB |
|---|---|---|
| Verde principal | `#008f48` | `rgb(0, 143, 72)` |

### Verdes derivados

| Uso | Hex |
|---|---|
| Hover de botones | `#006b36` |
| Verde oscuro | `#004d26` |
| Verde oscuro (degradado) | `#004937` / `rgb(0, 73, 37)` |
| Verde oscuro (degradado) | `#005c30`, `#005c2e`, `#026131`, `#12462c` |
| Acentos claros | `#11af60`, `#5ba743`, `#3a9968`, `#b2ddc9`, `#a2ca97` |

### Texto

| Uso | Hex |
|---|---|
| Texto principal | `#171717` |
| Alternativos | `#222222`, `#111111` |
| Azul grisáceo (oscuro) | `#323a4d`, `#232a39` |

### Grises

| Hex |
|---|
| `#8e8d8e` |
| `#706f6f` / `#706e6f` |
| `#757475` |
| `#5a5959` |
| `#b7b7b7` |

### Blanco y fondos claros

| Uso | Hex |
|---|---|
| Blanco puro | `#ffffff` (se usa como `#fff`) |
| Blanco verdoso (tinte) | `#eaf5ec`, `#f2f8ef` |
| Gris claro | `#e9e9e9` |
| Neutros claros | `#f3f3f3`, `#f5f5f5`, `#d9d9d9`, `#d7d7d7`, `#e0e0e0` |

> **Nota sobre el "blanco":** no existe un blanco especial (tipo `#fafafa`).
> El blanco utilizado es **puro `#ffffff`**; los fondos suaves son
> `#eaf5ec` / `#f2f8ef` (blanco verdoso) y `#e9e9e9` (gris claro).

## 3. Tipografía

- El child theme **no define fuente propia**: no hay `font-family`, ni
  `@font-face`, ni import de Google Fonts en `assets/css/site.css` ni en
  `functions.php`.
- La fuente renderizada por defecto es la de **Astra Free: `Helvetica, sans-serif`**.
- **Aviso:** la fuente real en Producción depende del **Customizer de Astra**
  (opción de Google Fonts), que vive en la base de datos y no en Git. El sitio
  antiguo (dev) usaba *Montserrat*; el tema reconstruido actual **no** la declara.
  Confirmar en Astra → Customizer → Tipografía antes de fijarla en el generador.

## Resumen rápido para el generador

- **Color primario:** `#008f48` (verde marca).
- **Texto:** `#171717` sobre blanco, o `#ffffff` sobre verde.
- **Fondo claro:** `#ffffff` o `#eaf5ec` (tinte verde suave).
- **Fuente:** `Helvetica, sans-serif` (pendiente de confirmar en Astra).
- **Título:** usar el título EN o ES de la tabla según el idioma de la página.
