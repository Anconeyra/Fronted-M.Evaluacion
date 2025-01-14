# 🚀 **MOSS Coevaluación: Potencia el Aprendizaje Colaborativo con Evaluaciones Interactivas**

<p align="center">
  <img src="public/MOSS.png" alt="Logo de MOSS Coevaluación" width="300px">
</p>

## **Descripción**

📚 **MOSS Coevaluación** es una innovadora herramienta educativa diseñada para arquitecturas locales, que permite la coevaluación entre estudiantes. Facilita la interacción, mejora la experiencia de aprendizaje y optimiza las tareas de enseñanza para los profesores. Los estudiantes asignan puntajes entre sí, generando un promedio combinado con la evaluación del docente, obteniendo así una calificación final justa y un ranking de desempeño.

## **Requisitos Previos**

🔧 **Tecnologías necesarias**:
- **Node.js** (Recomendado: versión 16 o superior)
- **npm** (para manejar las dependencias)

## **Instrucciones de Ejecución**

1. **Backend**: El backend de la aplicación debe estar ejecutándose antes de proceder con el frontend. Para lanzar el backend, visita el siguiente repositorio: [Backend M.Evaluacion](https://github.com/Anconeyra/Backend-M.Evaluacion).

2. **Frontend**:

   - Clona el repositorio:

     ```bash
     git clone https://github.com/Anconeyra/Fronted-M.Evaluacion
     ```

   - Navega a la carpeta del proyecto:

     ```bash
     cd Frontend-M.Evaluacion
     ```

   - Instala las dependencias:

     ```bash
     npm install
     ```

   - Lanza el proyecto:

     ```bash
     npm run start
     ```

## **🔑 Administración**

El administrador debe iniciar sesión con sus credenciales para gestionar la aplicación. A continuación, se detallan los pasos para gestionar el entorno:

1. **Iniciar sesión**: El administrador debe ingresar sus credenciales para poder gestionar la aplicación y los jugadores.
2. **Iniciar un juego**: Antes de que los jugadores puedan conectarse, el administrador necesita iniciar un juego desde la interfaz administrativa.

## **🌐 Conexión de los Jugadores**

Los jugadores deben estar conectados a la misma red que el ordenador que ejecuta los servidores. Para acceder a la aplicación, el administrador debe revisar y cambiar el valor de la IP local `{local_ip}` en el archivo `frontend/.env`. Los jugadores deben navegar a `http://{local_ip}:3000/` en su navegador web.

## **📊 Funcionalidades**

La aplicación **MOSS Coevaluación** permite:

- **Gestión de pruebas**: Ver, crear, editar y eliminar canales.
- **Gestión de jugadores**: Ver y eliminar jugadores.
- **Resultados**: Consultar los resultados de cada jugador y de cada grupo del canal.
- **Jugar**: Iniciar y asignar a los estudiantes en cada grupo y calificar a cada uno, esto gracias a la votación de cada estudiante y una rúbrica puesta por el docente.
