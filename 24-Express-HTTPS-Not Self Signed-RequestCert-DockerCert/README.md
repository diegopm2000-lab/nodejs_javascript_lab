# Casos de prueba para cargar certificados de la ca 

se basa en el ejemplo 22, donde tenemos server y client y ambos se intentan verificar mutuamente. Los certificados han sido verificados por la misma ca.

## 1. El servidor exige certificado al cliente

Server             Client
- server-cert      - client-cert 
- server-key       - client-key
- ca-cert          - ca-cert

Funciona

## 2. Quito las CA en los dos lados

Server             Client
- server-cert      - client-cert 
- server-key       - client-key

Falla: Unable to verify the first certificate

## 3. Dejo solo la CA en el cliente (pero sigo dejando que el servidor exija el certificado al cliente)

Server             Client
- server-cert      - client-cert 
- server-key       - client-key
                   - ca-cert

Falla

## 4. Igual, pero ya no exige el servidor el certificado al cliente

Server             Client
- server-cert      - client-cert 
- server-key       - client-key
                   - ca-cert

Funciona

Esto parece demostrar que la parte que necesite verificar la identidad del otro, va a necesitar acceso a la ca-cert.

## 5. Quito el ca-cert del cliente Añadiendo el certificado de la CA a la carpeta de docker 

Server             Client
- server-cert      - client-cert 
- server-key       - client-key

### 5.1 Añadiendolo a localhost:8443
                  
/etc/docker/certs.d/localhost:8443/ca-crt.pem

(Sin reiniciar el docker daemon)

Falla

### 5.2 Idem, pero reiniciando el docker daemon

/etc/docker/certs.d/localhost:8443/ca-crt.pem

sudo service docker stop
sudo service docker start

Falla

### 5.3 Añadiendolo a server-tls:8443, sin reiniciar el docker daemon

/etc/docker/certs.d/server-tls:8443/ca-crt.pem

Falla

### 5.4 Añadiendolo a server-tls:8443, pero reiniciando el docker daemon

/etc/docker/certs.d/server-tls:8443/ca-crt.pem

Falla

## 6. Montandolo en la imagen del cliente 

He añadido el certificado al Dockerfile del cliente. A partir de aquí todas las pruebas se hacen con esta modificacion

```RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
COPY ca-crt.pem /usr/local/share/ca-certificates/ca-crt-DIEGO.crt
RUN update-ca-certificates
```

He comprobado que se monta bien, ya que lo que hace es montarlo en /etc/ssl y ahí se puede comprobar que queda montado.

Falla

## 7. Montandolo en la imagen del servidor, pero dejandolo en el cliente y exigiendo el certificado al cliente

Server             Client
- server-cert      - client-cert 
- server-key       - client-key
                   - ca-cert

He añadido el certificado al Dockerfile del server. A partir de aquí todas las pruebas se hacen con esta modificacion

```RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
COPY ca-crt.pem /usr/local/share/ca-certificates/DIEGO.crt
RUN update-ca-certificates
```

FALLA

## 8. Usando la variable de entorno NODE_EXTRA_CA_CERTS para el server

Server             Client
- server-cert      - client-cert 
- server-key       - client-key
                   - ca-cert

Añado esta variable de entorno al server, que lo que hace es añadir el fichero que le pasemos a las CA que tiene hardcodeadas por defecto NodeJS.

NODE_EXTRA_CA_CERTS: /etc/ssl/certs/ca-cert-DIEGO.pem

FUNCIONA

## 9. Usando la variable de entorno NODE_EXTRA_CA_CERTS para el cliente

Server             Client
- server-cert      - client-cert 
- server-key       - client-key

NODE_EXTRA_CA_CERTS: /etc/ssl/certs/ca-cert-DIEGO.pem

FUNCIONA
                
## 10. Cargo el certificado que se instala mediante el dockerfile en el server de forma programatica

```javascript
// Loading manually
const trustedCa = [
  '/etc/ssl/certs/ca-cert-DIEGO.pem',
];

https.globalAgent.options.ca = [];
for (const ca of trustedCa) {
  https.globalAgent.options.ca.push(fs.readFileSync(ca));
}
```

(y he quitado la variable de entorno de NODE_EXTRA_CA_CERTS)

Es una forma de cargar un array, se puede hacer en el https.globalAgent.options o directamente en un options, que de todas formas
hay que pasarlo cuando se crea el servidor



