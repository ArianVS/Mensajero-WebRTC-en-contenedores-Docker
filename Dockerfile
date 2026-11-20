# 1. Imagen base: Usamos Linux Alpine con Node.js 20 preinstalado 
FROM node:20-alpine

# 2. Carpeta de trabajo: Crea y entra a la carpeta /app dentro del contenedor
WORKDIR /app

# 3. Copiamos primero el package.json para instalar las librerías
COPY package.json ./

# 4. Instala únicamente las dependencias de producción
RUN npm install --only=production

# 5. Copia toda nuestra carpeta src/ hacia /app/src
COPY src ./src

# 6. Documenta que el servidor interno escuchará en el puerto 3000
EXPOSE 3000

# 7. Comando que se ejecuta automáticamente cuando arranca el contenedor
CMD ["npm", "start"]