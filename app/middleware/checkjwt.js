const jwt = require('jsonwebtoken');

exports.checkJwt = (req, res, next) => {
  console.log("testjasdfwt");
  const authHeader = req.headers['authorization']
  console.log(authHeader);
  const token = authHeader;

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenId) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.tokenId = tokenId

    console.log(tokenId);

    next()
  })
}
