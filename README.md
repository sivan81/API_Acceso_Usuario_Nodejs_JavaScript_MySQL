# API Acceso Usuario Nodejs JavaScript MySQL

En estas APIs se busca conseguir el **acceso de un usuario**, buscando la información introducida en la base de datos. También la opción de **recuperar contraseña del usuario**.

- El lenguaje de programación utilizado es **JavaScript**.
- Base de datos en **MySQL**.
- Entorno de ejecución **NodeJS**.
- Para comprobar el funcionamiento, he probado las APIs con **POSTMAN** y **Render** (render.com).

##### Como ejecutarlo:

- Crear una base de datos en **MySQL**.
- Crear una tabla en la base de datos llamada **"usuarios"**. En este caso los campos importantes son **"email"** y **"clave"**.
- Una vez todo listo, ejecutar en terminal **"node index.js"** para tenerlo en ejecución, pero antes instala los paquetes con **"npm install"** y se crearán los módulos de Nodejs.
- Crear un archivo en la raiz llamado **".env"** donde pondremos las variables de entorno.

***En el caso de estas APIs las variables de entorno serían así:***


    DB_HOST = 
    DB_USER = 
    DB_PASS = 
    DB_DATABASE = 
    
    EMAIL_SEND = 
    PASS_APP_EMAIL = 
    
    PORT = 3000


##### ¿Qué hacen estas APIS?

Podrás probar el POST en cada API, donde en la primera API llamada **"login"**, la utilizarás para comprobar en una base de datos el email y la clave que el usuario ya ha creado anteriormente.

En la segunda API llamada **"forgot-password"**, tendrás la opción de pedir al usuario el email con el que está registrado. En ese momento si no está registrado ese email, le dirá que no está en la base de datos, y si lo está, le enviará al email que tiene en la base de datos, la clave correspondiente con la que se dió de alta.


