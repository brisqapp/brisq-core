/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : checkjwt.js
 * Description    : Permet d'effectuer la vérification de la validité du token.             
 */

const jwt = require('jsonwebtoken');

exports.checkJwt = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  // Vérification du token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenId) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    // enregistrement de l'id
    req.tokenId = tokenId

    console.log(tokenId);

    next()
  })
}
