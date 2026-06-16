🇪🇸 [Versión en español](README.es.md)

# 📸 Photo Book Album

An interactive digital scrapbook where you can create personalized photo albums with text, stickers, and different frame styles. Each user has their own private album saved in the cloud.

## ✨ Features

- 🖼️ Upload photos from your device
- ✍️ Add text (with optional link)
- 🎉 Search and add animated stickers/GIFs
- 🖱️ Freely move, rotate, and resize each element
- 🖼️ Frames: no border, simple border, polaroid, top tape, corner tape
- 📄 Multiple pages
- ☁️ Automatic cloud saving per user
- 🔐 Google login (everyone gets their own private album)

<img width="1869" height="971" alt="Screanshoot1" src="https://github.com/user-attachments/assets/3e062fb5-1fc3-4399-ae1c-706197f3d231" />


## 🛠️ Services you need to set up

This project uses **3 free external services**. You need to create an account on each one and get your own credentials.

---

### 1. 🔥 Firebase (authentication + database)

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project
2. Inside the project, go to **Authentication > Sign-in method** and enable **Google**
3. Go to **Firestore Database > Create database** (production mode is fine)
4. Go to **Project settings ⚙️ > Your apps > Add app > Web**
5. Copy the `firebaseConfig` object Firebase generates for you

In the file `scripts/firebase.js`, replace:

```js
const firebaseConfig = {
    apiKey:            "YOUR_API_KEY",
    authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
    projectId:         "YOUR_PROJECT_ID",
    storageBucket:     "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId:             "YOUR_APP_ID",
    measurementId:     "YOUR_MEASUREMENT_ID"
};
```

#### Firestore security rules

Go to **Firestore > Rules** and paste this so each user can only access their own album:

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

### 2. ☁️ Cloudinary (image storage)

1. Create a free account at [https://cloudinary.com](https://cloudinary.com)
2. In your dashboard, copy your **Cloud name**
3. Go to **Settings > Upload > Add upload preset**
   - Give it a name (e.g. `my_album`)
   - Set the signing mode to **Unsigned**
   - Save

In the file `scripts/cloudinary.js`, replace:

```js
const CLOUD_NAME = 'YOUR_CLOUD_NAME';
const UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
```

---

### 3. 🎭 Giphy (stickers and GIFs)

1. Create an account at [https://developers.giphy.com](https://developers.giphy.com)
2. Go to **Dashboard > Create an App**
3. Choose the **API** option (free)
4. Copy your **API Key**

In the file `scripts/apis.js`, replace:

```js
const GIPHY_KEY = 'YOUR_GIPHY_API_KEY';
```

---

## 🚀 Running the project locally

This project is vanilla HTML/CSS/JS — no installation or build tools needed.

1. Clone the repository:
```bash
git clone https://github.com/your-username/photo-book-album.git
cd photo-book-album
```

2. Set up the 3 credentials as described above

3. Open `index.html` in your browser, or use an extension like **Live Server** in VS Code

> ⚠️ **Important:** For Google login to work locally, add `localhost` to the authorized domains in Firebase: **Authentication > Settings > Authorized domains**

---

## ☁️ Deploy with Firebase Hosting (free)

Firebase Hosting is a great fit for this project: it's free, fast, and already integrated with the same Firebase project you use for auth and Firestore.

### Prerequisites

Have [Node.js](https://nodejs.org) installed (only needed for the Firebase CLI).

### Steps

**1. Install Firebase CLI** (only once):
```bash
npm install -g firebase-tools
```

**2. Log in with your Google account:**
```bash
firebase login
```

**3. Inside the project folder, initialize Hosting:**
```bash
firebase init hosting
```

During setup it will ask you several questions, answer like this:

```
? Please select an option: Use an existing project
? Select a default Firebase project: [choose your project]
? What do you want to use as your public directory? .
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File index.html already exists. Overwrite? No   ⚠️ important — say No
```

> The `.` as public directory tells Firebase to serve files from the project root, where your `index.html` lives.

This will generate (or update) the `firebase.json` and `.firebaserc` files already included in this repo, so you likely won't need to change anything.

**4. Deploy:**
```bash
firebase deploy --only hosting
```

When it's done, you'll get a public URL like:
```
https://YOUR_PROJECT_ID.web.app
```

That's it! Every time you want to update the site, just run `firebase deploy --only hosting` again.

### Add your domain to Firebase Auth

Once you have your Firebase Hosting URL, add it to the authorized domains so Google login works in production:

**Firebase Console > Authentication > Settings > Authorized domains > Add domain**

Add: `YOUR_PROJECT_ID.web.app`

---

## 📁 Project structure

```
Album_De_Fotos_Tipo_Libro/
├── index.html
├── scripts/
│   ├── estado.js           # Global variables and DOM references
│   ├── firebase.js         # 🔑 Login, save and load album
│   ├── cloudinary.js       # 🔑 Image uploading
│   ├── apis.js             # 🔑 Sticker search with Giphy
│   ├── dibujar.js          # Renders elements on screen
│   ├── añadir.js           # Add photos, text and stickers
│   ├── mover.js            # Drag & drop elements
│   ├── modificar_tamaño.js # Resize, rotation and font size
│   ├── edicion.js          # Edit mode and tools panel
│   └── paginas.js          # Page navigation
└── styles/
    ├── funcional.css       # Structural styles
    ├── diseño.css          # Visual styles and theme
    └── paginasYargollas.css
```

Files marked with 🔑 require your credentials.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or have an idea to improve the project, feel free to open an issue or a pull request.

---

## 📄 License

MIT — use it freely for your own album.
