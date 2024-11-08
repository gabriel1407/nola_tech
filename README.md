API de Evaluación 360
Esta API es un sistema de gestión de evaluaciones 360 para empleados. Permite a los usuarios (empleados, gerentes y administradores) realizar evaluaciones, responder preguntas, generar reportes y administrar datos relacionados con empleados, evaluaciones, preguntas y respuestas.

Características principales
Autenticación y Autorización:
Basado en JWT (JSON Web Tokens).
Roles definidos: admin, manager, empleado.
Gestión de empleados:
CRUD de empleados.
Gestión de evaluaciones:
Crear y listar evaluaciones.
Responder preguntas en evaluaciones.
Enviar y completar evaluaciones.
Gestión de preguntas:
CRUD de preguntas.
Generación de reportes:
Reportes por departamento.
Reportes por empleado.
Validaciones:
Valida los datos enviados en las solicitudes usando express-validator.
Documentación:
Documentación automática generada con Swagger.
Requisitos previos
Node.js: versión 14 o superior.
MongoDB: base de datos NoSQL en ejecución local o remota.
Postman (opcional): para probar los servicios.
Instalación
Clonar el repositorio

git clone <URL-del-repositorio>
cd <nombre-del-repositorio>
Instalar dependencias
bash
npm install
Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto basado en .env.example y configura las siguientes variables:

PORT=5000
MONGO_URI=mongodb://localhost:27017/evaluacion360
JWT_SECRET=tu_clave_secreta
Ejecución del proyecto
En modo desarrollo
Usa el siguiente comando para iniciar el servidor en modo desarrollo:

bash
Copiar código
npm run dev
El servidor estará disponible en http://localhost:5000.

En modo producción
Usa el siguiente comando para iniciar el servidor en modo producción:

bash
npm test
Documentación de la API
La documentación de la API está disponible en Swagger. Una vez que el servidor esté en funcionamiento, accede a:

bash
Copiar código
http://localhost:5000/api-docs
Esta documentación contiene detalles sobre cada endpoint, los parámetros esperados y las respuestas posibles.

Estructura del Proyecto
plaintext
Copiar código
src/
├── config/               # Configuración de base de datos y Swagger
├── controllers/          # Controladores que manejan la lógica de cada recurso
├── middleware/           # Middlewares para autenticación, validación, etc.
├── models/               # Modelos de MongoDB (Employee, Evaluation, etc.)
├── routes/               # Rutas de la API (empleados, evaluaciones, preguntas, etc.)
├── utils/                # Utilidades como cálculos y asignación
├── app.js                # Configuración principal de la aplicación
├── server.js             # Punto de entrada del servidor
Uso de los Servicios
1. Autenticación
Registro
POST /api/auth/register

Cuerpo de la solicitud:

json
{
  "username": "adminuser",
  "password": "password123",
  "role": "admin"
}
Login
POST /api/auth/login

Cuerpo de la solicitud:

json
Copiar código
{
  "username": "adminuser",
  "password": "password123"
}
Respuesta:

json
{
  "token": "tu_token_jwt"
}
Incluye este token en el encabezado Authorization para las solicitudes protegidas:

makefile
Authorization: Bearer <token>
2. Gestión de Empleados
Crear empleado
POST /api/employees

Cuerpo de la solicitud:

json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890",
  "age": 30,
  "gender": "male",
  "department": "Engineering",
  "position": "Developer",
  "user_id": "64a1f49c71c3c7f915a7b92b"
}
Listar empleados
GET /api/employees

3. Gestión de Evaluaciones
Crear evaluación
POST /api/evaluations

Cuerpo de la solicitud:

json
{
  "employeeId": "64a1f49c71c3c7f915a7b92b",
  "period": "2023 Q4",
  "type": "360 feedback"
}
Enviar respuestas y completar evaluación
POST /api/evaluations/:id/submit

Cuerpo de la solicitud:

json
{
  "answers": [
    { "questionId": "64a1f5a071c3c7f915a7b92c", "answer": "Muy bueno" },
    { "questionId": "64a1f5b271c3c7f915a7b92d", "answer": "Satisfactorio" }
  ]
}
4. Gestión de Preguntas
Crear pregunta
POST /api/questions

Cuerpo de la solicitud:

json
{
  "text": "¿Cómo calificarías tu experiencia en el último proyecto?",
  "type": "text"
}
Listar preguntas
GET /api/questions

5. Reportes
Reporte por empleado
GET /api/reports/employee/:id

Respuesta:

json
{
  "employeeId": "64a1f49c71c3c7f915a7b92b",
  "evaluations": [
    {
      "period": "2023 Q4",
      "type": "360 feedback",
      "score": 4.5
    }
  ]
}
Reporte por departamento
GET /api/reports/department/:name

Respuesta:

json
{
  "departmentName": "Engineering",
  "report": [
    {
      "employeeId": "64a1f49c71c3c7f915a7b92b",
      "name": "John Doe",
      "evaluations": [
        {
          "period": "2023 Q4",
          "type": "360 feedback",
          "score": 4.5
        }
      ]
    }
  ]
}
Pruebas
Ejecutar Pruebas
Para ejecutar las pruebas unitarias:

bash
Copiar código
npm test
Colección de Postman
Incluimos una colección de Postman (postman_collection.json) en el proyecto para facilitar la prueba de los endpoints. Importa el archivo en Postman y utiliza los ejemplos de solicitudes para probar la API.

