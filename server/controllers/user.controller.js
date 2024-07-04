const userSchema = require('../models/user.schema');
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const cryptPassword = await bcrypt.hash(password, 10);

    const userExist = await userSchema.findOne({ email: email });
    if (userExist) {
        return res.status(400).json({ message: 'Tài khoản này đã tồn tại' });
    }

    const user = new userSchema({
        name,
        email,
        password: cryptPassword,
        isAdmin
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


