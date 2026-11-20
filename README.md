# Mensajero Distribuido WebRTC (Sistemas Distribuidos - UTP)

Aplicación de mensajería en tiempo real (videollamada, chat y transferencia de archivos P2P) desplegada sobre dos nodos aislados en Docker.

## Estructura del Repositorio
- `docs/`: Informe de investigación de la Fase 1 y archivos fuente PlantUML (`docs/uml/`).
- `src/`: Código fuente del servidor Node.js (`server.js`) y archivos estáticos del cliente (`src/public/`).
- `Dockerfile`: Imagen base sobre `node:20-alpine` para ejecutar los nodos de señalización.
- `package.json`: Dependencias del proyecto (`express` y `ws`).
- `BITACORA.md`: Registro cronológico de avances, decisiones técnicas y declaración de uso de IA.

## Construcción de la Imagen Base
```bash
docker build -t mensajero-webrtc-node .