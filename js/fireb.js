//@ts-check
      /** Conexión al sistema de autenticación de Firebase. */
      // @ts-ignore
      const auth = firebase.auth();
      /** Tipo de autenticación de usuarios. En este caso es con Google. */
      // @ts-ignore
      const provider = new firebase.auth.GoogleAuthProvider();
      /* Configura el proveedor de Google para que permita seleccionar de una
       * lista. */
      provider.setCustomParameters({ prompt: "select_account" });
      /* Recibe una función que se invoca cada que hay un cambio en la
       * autenticación y recibe el modelo con las características del usuario.*/
      auth.onAuthStateChanged(
        /** Recibe las características del usuario o null si no ha iniciado
         * sesión. */
        usuarioAuth => {
          if (usuarioAuth && usuarioAuth.email) {
            // Usuario aceptado.
            // @ts-ignore Muestra el email registrado en Google.
            email.value = usuarioAuth.email;
            // @ts-ignore Muestra el nombre registrado en Google.
            nombre.value = usuarioAuth.displayName;
            // @ts-ignore Muestra el avatar registrado en Google.
            avatar.src = usuarioAuth.photoURL;
          } else {
            // No ha iniciado sesión. Pide datos para iniciar sesión.
            auth.signInWithRedirect(provider); 
          }
        },
        // Función que se invoca si hay un error al verificar el usuario. //
        procesaError
      );
      /** Termina la sesión. */
      async function terminaSesión() {
        try {
          await auth.signOut();
        } catch (e) {
          procesaError(e);
        }
      }
      /** Procesa un error. Muestra el objeto en la consola y un cuadro de
       * alerta con el mensaje.
       * @param {Error} e descripción del error. */
      function procesaError(e) {
        console.log(e);
        alert(e.message);
      } 
  // Set the configuration for your app
  // TODO: Replace with your app's config object
  var firebaseConfig = {
    apiKey: "AIzaSyCMAl6K5nkzVh__a-6S1SvJk7OpU6fLZT0",
    authDomain: "todolist-44d12.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/project/todolist-44d12/storage/todolist-44d12.appspot.com/files",
    storageBucket: "todolist-44d12.appspot.com"
  };
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
const firestore = firebase.firestore();
function agrega(){
firestore.collection("PENDIENTES").add({
TEXTO: texto.value.trim(),
TIMESTAMP: firebase.firestore.FieldValue.serverTimestamp()
});
}
