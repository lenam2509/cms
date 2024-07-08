const express = require('express');
const router = express.Router();

const { addUser, updateInfo, findOne } = require('../controllers/user.controller');

router.post('/add', addUser);
router.put('/updateInfo', updateInfo);
router.get('/findOne', findOne);

module.exports = router;