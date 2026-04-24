# Usamos la imagen oficial y ligera de Nginx para servir archivos estáticos
FROM nginx:alpine

# Copiamos todos los archivos del proyecto al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto 
EXPOSE 1234

# El comando por defecto inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
