# obd-carscan

Aplicación de diagnóstico OBD-II para vehículos, pensada inicialmente para un BMW 320d E90,pero preparada para ampliarse a otros coches de la familia. Permite conectar un adaptador ELM327 al puerto OBD-II del coche y visualizar en el ordenador, en tiempo real, los principales parámetros del motor.

## Qué hace

La aplicación se conecta al vehículo mediante un cable ELM327 por USB y muestra en una interfaz web datos como las revoluciones del motor, la velocidad, la temperatura del refrigerante y de admisión, el nivel de combustible, la carga del motor y la presión de rail. También permite consultar los códigos de fallo almacenados en la centralita y borrarlos cuando sea necesario, siempre pidiendo confirmación antes de hacerlo para evitar borrados accidentales.

Los datos se actualizan de forma continua gracias a una conexión en tiempo real entre el backend y el frontend, y además se muestra un histórico reciente en forma de gráfica, útil para observar la evolución de valores como las revoluciones o la temperatura durante un trayecto.

## Cómo está construido

El proyecto se divide en dos partes. El backend está desarrollado en Python con FastAPI, y es el encargado de comunicarse directamente con el adaptador OBD-II, leer los datos del coche y exponerlos hacia el frontend. El frontend está construido con React y TypeScript, y es la interfaz visual donde se muestran los valores y las gráficas, con un diseño sobrio pensado para parecer un panel de instrumentación serio, evitando estilos genéricos o llamativos.

## Qué se necesita para usarla

Para utilizar la aplicación hace falta un ordenador con Linux (probado en Ubuntu), un adaptador ELM327 con conexión USB de calidad, y tener instalados Python y Node.js con el gestor de paquetes pnpm. El usuario del sistema debe tener permisos para acceder al puerto USB donde se conecta el adaptador, algo que se configura una sola vez al preparar el entorno.

## Seguridad del diagnóstico

Todas las lecturas de datos que realiza la aplicación son operaciones estándar del protocolo OBD-II, pensadas únicamente para leer información sin modificar el funcionamiento del motor ni de ninguna otra parte del vehículo. La única acción que modifica algo es el borrado de códigos de fallo, que es una operación estándar, reversible y segura: solo elimina el registro de averías guardado en la memoria de la centralita, sin tocar la configuración del coche. Aun así, se recomienda usar un adaptador ELM327 de calidad reconocida, evitando clones baratos de origen dudoso que puedan dar lecturas incorrectas.

## Estado actual

El proyecto está en desarrollo activo. Por ahora soporta un único perfil de vehículo, el BMW 320d E90, aunque la estructura del código está pensada para poder añadir perfiles de otros coches más adelante sin tener que rehacer la aplicación desde cero.