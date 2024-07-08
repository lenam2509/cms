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

exports.updateInfo = async (req, res) => {
    const { name, email, id } = req.body;
    try {
        // check token
        const freshToken = req.headers['authorization']
        if (!freshToken) {
            return res.status(400).json({ message: 'Token không tồn tại' });
        }
        const token = freshToken.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'Token không hợp lệ' });
        }
        // check user
        const user = await userSchema.findOne({
            _id: id,
        });
        if (!user) {
            return res.status(400).json({ message: 'Người dùng không tồn tại' });
        }
        // update user
        await userSchema.updateOne({
            _id: id
        }, {
            name: name,
            email: email
        });
        return res.status(200).json({
            name: name,
            email: email,
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.findOne = async (req, res) => {
    const { id } = req.query;
    try {
        const user = await userSchema.findOne({
            _id: id,
        }, { password: 0 });
        if (!user) {
            return res.status(400).json({ message: 'Người dùng không tồn tại' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
