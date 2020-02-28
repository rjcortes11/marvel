FROM nginx:1.17.8-alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./certs /etc/nginx/certs
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["nginx","-g","daemon off;"]