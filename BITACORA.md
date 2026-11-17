# Bitácora de Desarrollo - Mensajero Distribuido WebRTC

## 2026-11-17 — Fase 1: Investigación, Arquitectura y UML
- **Avance:** Se completó la investigación técnica sobre contenedores Docker, redes bridge con DNS interno, señalización vía WebSockets, negociación SDP/ICE y transferencia fragmentada por `RTCDataChannel`.
- **Artefactos generados:** Informe de investigación en PDF (`docs/Informe_Investigacion_Fase1_WebRTC_UTP.pdf`), bosquejo de interfaz y diagramas UML de componentes, despliegue y secuencia en PlantUML (`docs/uml/`).
- **Decisiones:** Se eligió Docker + Docker Compose por bajo consumo de recursos, Caddy como proxy inverso con TLS local automático para habilitar `getUserMedia()`, Node.js + `ws` en backend y Vanilla JS en frontend.
- **Próximo paso:** Iniciar Fase 2 construyendo las imágenes Docker, la red bridge y el enlace de señalización entre `nodo-a` y `nodo-b`.