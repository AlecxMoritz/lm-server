const jwt = require('jsonwebtoken');
const User = require('../models/index').sequelize.import('../models/user')

module.exports = function (req, res, next) {
    if (!token) res.status(403).send('No token provided')
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded) {
            User.findOne({
                where: {
                    id: decoded.id,
                    isAdmin: true
                }
            })
                .then(
                    findSuccess = user => {
                        req.user = user;
                        return next();
                    },

                    findFail = err => {
                        res.stats(403).send('Unauthorized');
                    }
                )
        }
    })
}