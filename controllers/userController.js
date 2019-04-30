const router = require('express').Router();
const User = require('../models/index').sequelize.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/signup', (req, res) => {
    let reqUser = req.body.user;

    User.create({
        email : reqUser.email,
        password : bcrypt.hashSync(reqUser.password, 10),
        isAdmin : false
    })
    .then(user => {
        let token = jwt.sign({ uid : user.uid }, process.env.JWT_SECRET,  { expiresIn : 60 * 60 * 24 });

        res.status(200).json({
            user : user,
            token : token
        });
    })
    .catch(err => res.status(500).json({ error : err }));
});

router.post('/signin', (req, res) => {
    let reqUser = req.body.user;

    User.findOne({
        where : {
            email : reqUser.email
        }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(reqUser.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({ uid : user.uid }, process.env.JWT_SECRET,  { expiresIn : 60 * 60 * 24 });

                    res.status(200).json({
                        user : user,
                        token : token
                    });
                } else {
                    res.status(500).json({ error : 'Username and password does not match records '})
                };
            })
        } else {
            // no user
            res.status(500).json({ error : 'Username and password does not match records '});
        };
    });
});

module.exports = router;