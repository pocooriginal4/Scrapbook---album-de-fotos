🇺🇸 [English version](README.md)

# 📸 Album de Fotos Tipo Libro

Un scrapbook digital interactivo donde puedes crear álbumes de fotos personalizados con textos, stickers y diferentes estilos de marcos. Cada usuario tiene su propio álbum guardado en la nube.

## ✨ Funcionalidades

- 🖼️ Subir fotos desde tu dispositivo
- ✍️ Añadir textos (con link opcional)
- 🎉 Buscar y añadir stickers/GIFs animados
- 🖱️ Mover, rotar y redimensionar cada elemento libremente
- 🖼️ Marcos: sin borde, borde simple, polaroid, cinta arriba, cinta en esquinas
- 📄 Múltiples páginas
- ☁️ Guardado automático en la nube por usuario
- 🔐 Login con Google (cada quien tiene su álbum privado)

## 🛠️ Servicios que necesitas configurar

Este proyecto usa **3 servicios externos gratuitos**. Necesitas crear una cuenta en cada uno y obtener tus propias credenciales.

---

### 1. 🔥 Firebase (autenticación + base de datos)

1. Ve a [https://console.firebase.google.com](https://console.firebase.google.com) y crea un proyecto nuevo
2. Dentro del proyecto, ve a **Authentication > Sign-in method** y activa **Google**
3. Ve a **Firestore Database > Crear base de datos** (modo producción está bien)
4. Ve a **Configuración del proyecto ⚙️ > Tus apps > Agregar app > Web**
5. Copia el objeto `firebaseConfig` que te genera

En el archivo `scripts/firebase.js`, reemplaza:

```js
const firebaseConfig = {
    apiKey:            "TU_API_KEY",
    authDomain:        "TU_PROJECT_ID.firebaseapp.com",
    projectId:         "TU_PROJECT_ID",
    storageBucket:     "TU_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId:             "TU_APP_ID",
    measurementId:     "TU_MEASUREMENT_ID"
};
```

#### Reglas de seguridad en Firestore

Ve a **Firestore > Reglas** y pega esto para que cada usuario solo pueda acceder a su propio álbum:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /albums/{albumId} {
      allow read, write: if request.auth != null 
                         && albumId == ("album-" + request.auth.uid);
    }
  }
}
```

---

### 2. ☁️ Cloudinary (almacenamiento de imágenes)

1. Crea una cuenta gratuita en [https://cloudinary.com](https://cloudinary.com)
2. En tu dashboard, copia tu **Cloud name**
3. Ve a **Settings > Upload > Add upload preset**
   - Ponle un nombre (ej: `mi_album`)
   - Cambia el modo a **Unsigned**
   - Guarda

En el archivo `scripts/cloudinary.js`, reemplaza:

```js
const CLOUD_NAME = 'TU_CLOUD_NAME';
const UPLOAD_PRESET = 'TU_UPLOAD_PRESET';
```

---

### 3. 🎭 Giphy (stickers y GIFs)

1. Crea una cuenta en [https://developers.giphy.com](https://developers.giphy.com)
2. Ve a **Dashboard > Create an App**
3. Elige la opción **API** (gratuita)
4. Copia tu **API Key**

En el archivo `scripts/apis.js`, reemplaza:

```js
const GIPHY_KEY = 'TU_GIPHY_API_KEY';
```

---

## 🚀 Cómo correr el proyecto localmente

Este proyecto es vanilla HTML/CSS/JS, no necesita instalación ni build tools.

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/album-de-fotos.git
cd album-de-fotos
```

2. Configura las 3 credenciales como se describe arriba

3. Abre `index.html` en tu navegador, o usa una extensión como **Live Server** en VS Code

> ⚠️ **Importante:** Para que el login con Google funcione correctamente en local, agrega `localhost` a los dominios autorizados en Firebase: **Authentication > Settings > Authorized domains**

---

## ☁️ Deploy con Firebase Hosting (gratis)

Firebase Hosting es perfecto para este proyecto: es gratuito, rápido y ya está integrado con el mismo proyecto de Firebase que usas para auth y Firestore.

### Requisitos previos

Tener [Node.js](https://nodejs.org) instalado (solo para usar el CLI de Firebase).

### Pasos

**1. Instala Firebase CLI** (solo la primera vez):
```bash
npm install -g firebase-tools
```

**2. Inicia sesión con tu cuenta de Google:**
```bash
firebase login
```

**3. Dentro de la carpeta del proyecto, inicializa Hosting:**
```bash
firebase init hosting
```

Durante la configuración te va a preguntar varias cosas, responde así:

```
? Please select an option: Use an existing project
? Select a default Firebase project: [elige tu proyecto]
? What do you want to use as your public directory? .
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File index.html already exists. Overwrite? No   ⚠️ importante decir No
```

> El punto `.` como directorio público le dice a Firebase que sirva los archivos desde la raíz del proyecto, donde está tu `index.html`.

Esto va a generar (o actualizar) los archivos `firebase.json` y `.firebaserc` que ya vienen incluidos en este repositorio, así que probablemente no necesites cambiar nada.

**4. Despliega:**
```bash
firebase deploy --only hosting
```

Al terminar te va a dar una URL pública del tipo:
```
https://TU_PROJECT_ID.web.app
```

¡Eso es todo! Cada vez que quieras actualizar el sitio, solo corre `firebase deploy --only hosting` de nuevo.

### Agregar tu dominio a Firebase Auth

Cuando tengas tu URL de Firebase Hosting, agrégala a los dominios autorizados para que el login con Google funcione en producción:

**Firebase Console > Authentication > Settings > Authorized domains > Add domain**

Agrega: `TU_PROJECT_ID.web.app`

---

## 📁 Estructura del proyecto

```
Album_De_Fotos_Tipo_Libro/
├── index.html
├── scripts/
│   ├── estado.js          # Variables globales y referencias al DOM
│   ├── firebase.js        # 🔑 Login, guardar y cargar álbum
│   ├── cloudinary.js      # 🔑 Subida de imágenes
│   ├── apis.js            # 🔑 Búsqueda de stickers con Giphy
│   ├── dibujar.js         # Renderiza los elementos en pantalla
│   ├── añadir.js          # Añadir fotos, textos y stickers
│   ├── mover.js           # Drag & drop de elementos
│   ├── modificar_tamaño.js # Resize, rotación y tamaño de letra
│   ├── edicion.js         # Modo edición y panel de herramientas
│   └── paginas.js         # Navegación entre páginas
└── styles/
    ├── funcional.css      # Estilos estructurales
    ├── diseño.css         # Estilos visuales y tema
    └── paginasYargollas.css
```

Los archivos marcados con 🔑 son los que requieren tus credenciales.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una idea para mejorar el proyecto, abre un issue o un pull request.

---

## 📄 Licencia

MIT — úsalo libremente para tu propio álbum.
