const bcrypt = require('bcrypt');
const privateKey = require('../../authentification/key');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

module.exports = (app, User) => {
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({message:  `Le user avec l'email ${email} n'existe pas` });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: `Le mot de passe est incorrect pour l'utilisateur ${email}` });
        }
        //genere un nouveau token
        const token = jwt.sign({ userId: user.id }, privateKey, { expiresIn: '10h' });
        //res.cookie('token', token, {httpOnly:true, secure:true});
        return res.json({ message: 'User connecté avec succès', data: user, token});
      } catch (error) {
          return res.status(500).json({message: "Désolé, une erreur interne du serveur est survenue. Veuillez réessayer plus tard ou contacter l'administrateur système si le problème persiste.", data: error})
      }
    });
  };