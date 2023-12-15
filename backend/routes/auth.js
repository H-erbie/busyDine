const express = require('express')
const {login, register, del} = require('../controllers/auth')
const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/del-account').delete(del)


module.exports = router
