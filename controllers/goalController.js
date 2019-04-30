const router = require('express').Router();
const Goal = require('../models/index').sequelize.model('Goal');
const validateSession = require('../middleware/validate-session');

// create
router.post('/', validateSession, (req, res) => {
    reqGoal = req.body.goal;

    Goal.create({
        user_uid : req.user.uid,
        name : reqGoal.name,
        completion_date : reqGoal.completion_date,
        start : reqGoal.start
    })
    .then(goal => res.status(200).json(goal))
    .catch(err => res.status(500).json({ error : err.message }));
});

// get by user
router.get('/user/:uid', (req, res) => {
    Goal.findAll({
        where : {
            user_uid : req.params.uid
        }
    })
    .then(goals => res.status(200).json(goals))
    .catch(err => res.status(500).json({ error : err.message }));
});

// get by token
router.get('/me', validateSession, (req, res) => {
    Goal.findAll({
        where : {
            user_uid : req.user.uid
        }
    })
    .then(goals => res.status(200).json(goals))
    .catch(err => res.status(500).json({ error : err.message }));
});

// get by id
router.get('/:uid', (req, res) => {
    Goal.findAll({
        where : {
            uid : req.params.uid
        }
    })
    .then(goals => res.status(200).json(goals))
    .catch(err => res.status(500).json({ error : err.message }));
});

// by all
router.get('/', (req, res) => {
    Goal.findAll()
    .then(goals => res.status(200).json(goals))
    .catch(err => res.status(500).json({ error : err.message }));
});

// update
router.put('/:uid', validateSession, (req, res) => {
    let reqGoal = req.body.goal;

    Goal.update({
        name : reqGoal.name,
        completion_date : reqGoal.completion_date,
        start : reqGoal.start
    },
        {
        where : {
            uid : req.params.uid,
            user_uid : req.user.uid
        }
    })
    .then(recordsChanged => res.status(200).json(recordsChanged))
    .catch(err => res.status(500).json({ error : err.message }));
});

// delete
router.delete('/:uid', validateSession, (req, res) => {
    Goal.destroy({
        where : {
            uid : req.params.uid,
            user_uid : req.user.uid
        }
    })
    .then(recordsChanged => res.status(200).json(recordsChanged))
    .catch(err => res.status(500).json({ error : err.message }));
});
module.exports = router;