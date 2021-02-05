const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('./../models/user.model')

// User registration
router.get('/registro', (req, res) => res.render('auth/signup-form'))
router.post('/registro', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            // Validación en backend
            if (username.length === 0 || password.length === 0) {
                res.render('auth/signup-form', { errorMsg: 'Rellena los campos' })
                return
            }

            if (user) {
                res.render('auth/signup-form', { errorMsg: 'Usuario ya registrado' })
                return
            }

            if (password.length <= 1) {
                res.render('auth/signup-form', { errorMsg: 'Contraseña débil' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))


        })
        .catch(err => console.log(err))

})





// User login
router.get('/iniciar-sesion', (req, res) => res.render('auth/login-form'))
router.post('/iniciar-sesion', (req, res) => {

    const { username, password } = req.body


    // Validación en backend
    if (username.length === 0 || password.length === 0) {
        res.render('auth/login-form', { errorMsg: 'Rellena los campos' })
        return
    }


    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login-form', { errorMsg: 'Usuario no reconocido' })
                return
            }

            if (!bcrypt.compareSync(password, user.password)) {
                res.render('auth/login-form', { errorMsg: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            console.log('ESTE ES EL OBJETO DE SESIÓN CREADO', req.session)
            res.redirect('/')
        })
        .catch(err => console.log(err))
})




router.get("/cerrar-sesion", (req, res) => {
    req.session.destroy((err) => res.redirect("/"))
})



module.exports = router
