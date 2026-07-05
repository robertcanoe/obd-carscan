# BMW Unified Database

Este archivo explica cómo descargar la base de datos BMW necesaria para enriquecer las descripciones de los códigos de fallo (DTC) con texto real extraído del sistema de diagnóstico oficial de BMW (EDIABAS/SP-DATEN).

La base de datos no está incluida en el repositorio por su tamaño (654 MB descomprimida). Es un paso opcional: si no la descargas, la app sigue funcionando y muestra el código DTC en crudo tal cual lo devuelve el adaptador ELM327.

## Descargar

Ejecuta estos comandos desde la carpeta `backend/`:

```bash
curl -L -O https://github.com/gediz/bmw-unified-db/releases/latest/download/bmw.sqlite.gz
curl -L -O https://github.com/gediz/bmw-unified-db/releases/latest/download/SHA256SUMS
grep bmw.sqlite.gz SHA256SUMS | sha256sum -c
gunzip bmw.sqlite.gz
```

El resultado es el archivo `bmw.sqlite` que debe quedar en `backend/bmw.sqlite`.

## Qué aporta

Con la base de datos disponible, cuando el ELM327 devuelve un código como `P0299`, el backend consulta primero el texto BMW específico y si no lo encuentra, recurre a los 3.071 códigos OBD-II genéricos estándar. El frontend muestra automáticamente la descripción real sin ningún cambio adicional.

Sin la base de datos, el comportamiento es exactamente el mismo que antes: se muestra el código en crudo y la descripción que devuelve python-OBD.

## Fuente

[gediz/bmw-unified-db](https://github.com/gediz/bmw-unified-db) — 2.466 ECUs BMW, 326.161 códigos de fallo, 192.941 traducciones al inglés. Datos extraídos de BMW EDIABAS/SP-DATEN para uso de interoperabilidad y derecho a reparación.
