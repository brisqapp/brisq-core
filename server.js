/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : server.js
 * Description    : Mise en écoute du serveur
 */

 const app = require("./app");
 
// Configuration du port pour l'écoute des requêtes
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});