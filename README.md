# Mensajero Distribuido WebRTC (Sistemas Distribuidos - UTP)

Aplicación de mensajería en tiempo real (videollamada, chat y transferencia de archivos P2P) desplegada sobre dos nodos aislados en Docker.

## Estructura del Repositorio
- `docs/`: Informe de investigación de la Fase 1 y archivos fuente PlantUML (`docs/uml/`).
- `src/`: Código fuente del servidor Node.js (`server.js`) y archivos estáticos del cliente (`src/public/`).
- `Dockerfile`: Imagen base sobre `node:20-alpine` para ejecutar los nodos de señalización.
- `compose.yaml`: Orquestación de los contenedores (`nodo-a`, `nodo-b`, `caddy-proxy` y `coturn`) en la red interna `webrtc-net`.
- `Caddyfile`: Proxy inverso con certificados TLS locales automáticos (`8443` para `nodo-a` y `8444` para `nodo-b`).
- `package.json`: Dependencias del proyecto (`express` y `ws`).
- `BITACORA.md`: Registro cronológico de avances, decisiones técnicas, incidencias y declaración de uso de IA.

## Despliegue y Ejecución con Docker Compose
```bash
docker compose up --build
```

Una vez levantados los contenedores, accede desde dos pestañas del navegador (aceptando el certificado autofirmado local):
- **Nodo A:** `https://localhost:8443`
- **Nodo B:** `https://localhost:8444`

Para detener los servicios:
```bash
docker compose down
```