# Bitácora de Desarrollo - Mensajero Distribuido WebRTC

> **Declaración de Uso de Inteligencia Artificial:** Durante el desarrollo de este proyecto se emplearon herramientas de IA generativa como apoyo en la redacción, estructuración y revisión de la documentación técnica (informe, bitácora y comentarios), así como asistencia en la construcción y estilizado de la interfaz web (frontend en HTML/CSS/JS). Las decisiones de arquitectura distribuida, configuración de redes Docker y lógica de señalización fueron diseñadas, validadas y comprendidas por el autor.

---

## 2026-11-17 — Fase 1: Investigación, Arquitectura y UML
- **Avance:** Se completó la investigación técnica sobre contenedores Docker, redes bridge con DNS interno, señalización vía WebSockets, negociación SDP/ICE y transferencia fragmentada por `RTCDataChannel`.
- **Artefactos generados:** Informe de investigación en PDF (`docs/Informe_Investigacion_Fase1_WebRTC_UTP.pdf`), bosquejo de interfaz y diagramas UML de componentes, despliegue y secuencia en PlantUML (`docs/uml/`).
- **Decisiones:** Se eligió Docker + Docker Compose por bajo consumo de recursos, Caddy como proxy inverso con TLS local automático para habilitar `getUserMedia()`, Node.js + `ws` en backend y Vanilla JS en frontend.
- **Uso de IA en esta fase:** Apoyo en redacción, síntesis de conceptos técnicos y corrección de sintaxis en los scripts de PlantUML.
- **Próximo paso:** Iniciar Fase 2 construyendo las imágenes Docker, la red bridge y el enlace de señalización entre `nodo-a` y `nodo-b`.

## 2026-11-20 — Fase 2 (Sesión 2.1): Estructura base, Dockerfile y servidor HTTP
- **Avance:** Se configuró la base del proyecto Node.js (`package.json`, `.gitignore`), se creó la receta de contenedorización (`Dockerfile` sobre `node:20-alpine`) y se implementó el servidor HTTP inicial (`src/server.js`) con el endpoint `/api/info` y la vista de prueba (`src/public/index.html`).
- **Decisiones:** Se parametriza la identidad de cada instancia mediante la variable de entorno `NODE_NAME` y se configura la escucha en `0.0.0.0:3000` para permitir comunicación futura desde el proxy inverso.
- **Uso de IA en esta fase:** Redacción de la documentación en el código y apoyo en la estructura base de la vista HTML/CSS (`src/public/index.html`).
- **Próximo paso:** Definir `compose.yaml` y `Caddyfile` para orquestar `nodo-a`, `nodo-b`, `coturn` y `caddy-proxy` con HTTPS local automático.

## 2026-11-21 — Fase 2 (Sesión 2.2): Orquestación Docker, Proxy HTTPS (Caddy) y STUN/TURN (Coturn)
- **Avance:** Se crearon `Caddyfile` y `compose.yaml` para levantar la infraestructura distribuida completa con 4 contenedores aislados (`nodo-a`, `nodo-b`, `caddy-proxy` y `coturn`) sobre una red interna `bridge` (`webrtc-net`), validando el acceso HTTPS independiente en `https://localhost:8443` (`nodo-a`) y `https://localhost:8444` (`nodo-b`).
- **Decisiones:** Se utilizó `tls internal` en Caddy para emitir certificados locales automáticos exigidos por el contexto seguro de WebRTC y se expusieron puertos diferenciados en el host (`8443` y `8444`) apuntando al puerto interno `3000` de cada nodo.
- **Incidencias y soluciones:**
  - *Comando `docker` no reconocido en Windows:* Se resolvió instalando Docker Desktop (arquitectura AMD64)[cite: 1].
  - *Fallo por requisito de "Virtual Machine Platform" en instalación Per-user:* Se resolvió ejecutando el instalador en modo *All-users installation* con privilegios de administrador para habilitar WSL 2 automáticamente[cite: 2, 3].
  - *Advertencia `NET::ERR_CERT_AUTHORITY_INVALID` en navegador:* Comportamiento esperado por el certificado autofirmado local de Caddy; se validó aceptando la excepción de seguridad en ambos puertos[cite: 4, 5].
- **Uso de IA en esta fase:** Apoyo en la estructura declarativa de `Caddyfile` y `compose.yaml`, diagnóstico de requisitos de virtualización en Windows y redacción de la bitácora.
- **Próximo paso:** Completar Fase 2 (Sesión 2.3) implementando el servidor de señalización WebSocket en cada nodo, su interconexión por nombre de servicio (`nodo-a` ↔ `nodo-b`) y las pruebas de intercambio de mensajes desde consola con logs visibles.