API de Evaluación 360
Una API diseñada para gestionar evaluaciones 360 de empleados. Ofrece funcionalidades para que administradores, gerentes y empleados puedan gestionar evaluaciones, responder preguntas, generar reportes y administrar datos relacionados con empleados, evaluaciones y respuestas.

Características principales
Autenticación y Autorización:
Basado en JWT (JSON Web Tokens).
Roles definidos: admin, manager, empleado.
Gestión de empleados:
Crear, listar, actualizar y eliminar empleados.
Gestión de evaluaciones:
Crear y listar evaluaciones.
Responder preguntas en evaluaciones.
Enviar y completar evaluaciones.
Gestión de preguntas:
CRUD (Crear, Leer, Actualizar y Eliminar) de preguntas.
Generación de reportes:
Reportes detallados por empleado.
Reportes generales por departamento.
Validaciones:
Valida los datos enviados en las solicitudes utilizando express-validator.
Documentación:
Documentación automática generada con Swagger.
Requisitos previos
Node.js: versión 14 o superior.
MongoDB: base de datos NoSQL (en ejecución local o remota).
Postman (opcional): para probar los servicios de la API.
Instalación
1. Clonar el repositorio
bash
Copiar código
git clone <URL-del-repositorio>
cd <nombre-del-repositorio>
2. Instalar dependencias
bash
Copiar código
npm install
3. Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto basado en .env.example y define las siguientes variables:

plaintext
Copiar código
PORT=5000
MONGO_URI=mongodb://localhost:27017/evaluacion360
JWT_SECRET=tu_clave_secreta
Ejecución del proyecto
Modo desarrollo
bash
Copiar código
npm run dev
El servidor estará disponible en http://localhost:5000.

Modo producción
bash
Copiar código
npm start
Documentación de la API
La documentación está disponible a través de Swagger. Una vez que el servidor esté en funcionamiento, accede a:

bash
Copiar código
http://localhost:5000/api-docs
Allí encontrarás detalles sobre los endpoints, parámetros esperados y respuestas posibles.

Estructura del proyecto
plaintext
Copiar código
src/
├── config/               # Configuración de la base de datos y Swagger
├── controllers/          # Lógica de cada recurso (auth, empleados, evaluaciones, etc.)
├── middleware/           # Middlewares para autenticación, validación, etc.
├── models/               # Modelos de MongoDB (Employee, Evaluation, etc.)
├── routes/               # Rutas de la API (empleados, evaluaciones, preguntas, etc.)
├── utils/                # Utilidades (funciones de cálculo, asignación, etc.)
├── app.js                # Configuración principal de la aplicación
├── server.js             # Punto de entrada del servidor
Uso de los servicios
1. Autenticación
Registro
POST /api/auth/register

Cuerpo de la solicitud:

json
Copiar código
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
Incluye el token en el encabezado Authorization:

plaintext
Copiar código
Authorization: Bearer <token>
2. Gestión de empleados
Crear empleado
POST /api/employees

Cuerpo de la solicitud:

json
Copiar código
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

3. Gestión de evaluaciones
Crear evaluación
POST /api/evaluations

Cuerpo de la solicitud:

json
Copiar código
{
  "employeeId": "64a1f49c71c3c7f915a7b92b",
  "period": "2023 Q4",
  "type": "360 feedback"
}
Enviar respuestas y completar evaluación
POST /api/evaluations/:id/submit

Cuerpo de la solicitud:

json
Copiar código
{
  "answers": [
    { "questionId": "64a1f5a071c3c7f915a7b92c", "answer": "Muy bueno" },
    { "questionId": "64a1f5b271c3c7f915a7b92d", "answer": "Satisfactorio" }
  ]
}
4. Gestión de preguntas
Crear pregunta
POST /api/questions

Cuerpo de la solicitud:

json
Copiar código
{
  "text": "¿Cómo calificarías tu experiencia en el último proyecto?",
  "type": "text"
}
Listar preguntas
GET /api/questions

5. Reportes
Reporte por empleado
GET /api/reports/employee/:id

Ejemplo de respuesta:

json
Copiar código
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

Ejemplo de respuesta:

json
Copiar código
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
Ejecutar pruebas
bash
Copiar código
npm test
Colección de Postman
Incluimos una colección de Postman (postman_collection.json) en el proyecto. Importa el archivo en Postman para probar los endpoints de la API.
