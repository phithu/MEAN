var express = require('express');
var router = express.Router();
var User = require('../model/user');
var path = require('path');
var app = express();


app.use(express.static(path.join(__dirname, '../../dist')));

router.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

router.get('/api/users', (req, res, next) => {

    User.getUser((err, result) => {
        if (err) {
            res.json({
                status: 404,
                mgs: err,
            })
        }
        res.json({
            status: 200,
            mgs: 'success',
            data: result
        })
    })
})

router.get('/api/users/:id', (req, res, next) => {

    let idUser = req.params.id;


    User.getUserById(idUser, (err, result) => {
        if (err) {
            res.json({
                status: 404,
                mgs: err,
            })
        }
        else {
            res.json({
                status: 200,
                mgs: 'success',
                data: result
            })
        }
    })
})

router.post('/api/users', (req, res, next) => {

    let user = new User({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        images: req.body.images
    })

    User.inserUser(user, (err, result) => {
        if (err) {
            res.json({
                status: 404,
                mgs: "Can not insert user - Error: " + err
            })
        }
        else {
            res.json({
                status: 200,
                mgs: 'Insert successfully'
            })
        }

    })

})

router.put('/api/update:id', (req, res, next) => {
    let idUser = req.params.id;

    let userUpdate = User({
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        images: req.body.images
    })

    User.updateUserById(idUser, userUpdate, (err, result) => {
        if (err) {
            res.json({
                status: 404,
                mgs: "Can not delete user - Error: " + err
            })
        }
        else {
            res.json({
                status: 200,
                mgs: 'delete successfully'
            })
        }
    })
})

router.delete('/api/delete/:id', (req, res, next) => {
    let idUser = req.params.id;
    User.deleteUserById(idUser, (err, result) => {
        if (err) {
            res.json({
                status: 404,
                mgs: "Can not delete user - Error: " + err
            })
        }
        else {
            res.json({
                status: 200,
                mgs: 'delete successfully'
            })
        }
    })
})

router.put('/api/update/:id', (req, res, next) => {
    let idUser = req.params.id;
    let userUpdate = {
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        images: req.body.images
    }
    User.updateUserById(idUser, userUpdate, (err, result) => {

        if (err) {
            res.json({
                status: 404,
                mgs: "Can not delete user - Error: " + err
            })
        }
        else {
            res.json({
                status: 200,
                mgs: 'update successfully'
            })
        }
    })
})

module.exports = router;