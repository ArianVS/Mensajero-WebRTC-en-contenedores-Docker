/**
 * Servidor HTTP base y futuro nodo de señalización WebRTC.
 * Se ejecuta de forma idéntica tanto en el contenedor 'nodo-a' como en 'nodo-b',
 * diferenciándose únicamente por las variables de entorno inyectadas por Docker.
 */

const express = require('express'); // Framework web para servir archivos estáticos y rutas API
const http = require('http');       // Módulo nativo de Node para crear el servidor HTTP base
const path = require('path');       // Módulo nativo para construir rutas de carpetas sin errores entre Windows/Linux

// 1. Inicialización de Express y del servidor HTTP
const app = express();
const server = http.createServer(app);

// 2. Configuración mediante variables de entorno
// Si Docker no le pasa un nombre o puerto, usa valores por defecto para pruebas locales
const PORT = process.env.PORT || 3000;
const NODE_NAME = process.env.NODE_NAME || 'nodo-local';

// 3. Middleware para archivos estáticos
// Todo lo que pongamos dentro de 'src/public' será accesible directamente desde el navegador
app.use(express.static(path.join(__dirname, 'public')));

// 4. Endpoint de diagnóstico (Healthcheck / Identidad del nodo)
// Permite verificar en qué contenedor exacto cayó la petición del cliente
app.get('/api/info', (req, res) => {
  res.json({
    node: NODE_NAME,
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// 5. Arranque del servidor
// Escuchamos en '0.0.0.0' (todas las interfaces de red del contenedor) para que el proxy Caddy pueda alcanzarlo
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[${NODE_NAME}] Servidor HTTP activo y escuchando en el puerto ${PORT}`);
});