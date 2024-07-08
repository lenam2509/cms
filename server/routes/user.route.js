const express = require('express');
const router = express.Router();

const { addUser, updateInfo } = require('../controllers/user.controller');

router.post('/add', addUser);
router.post('/updateInfo', updateInfo);

module.exports = router;