const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const privateKey = require('../authentification/key');

const verifyToken = promisify(jwt.verify);

module.exports = async (req, res, next) => {
  if (!req.headers.hasOwnProperty('authorization')) {
    console.log('1')
    return res.status(401).json({ error: 'Token manquant' });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = await verifyToken(token, privateKey);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      console.log('3')
      return res.status(401).json({ error: 'ID utilisateur incorrect' });
    }
    next();
  } catch (error) {
    console.error(error);
    console.log('2')
    return res.status(401).json({ error: 'Token invalide' });
  }
};
