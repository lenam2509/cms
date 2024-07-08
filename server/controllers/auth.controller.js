const userSchema = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({
            email: email
        });

        if (!user) {
            return res.status(400).json({ message: 'Email không tồn tại' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none'
        });
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.logout = async (req, res) => {
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
        // delete token and cookie
        // clear Bear token
        res.setHeader('Authorization', '');
        // res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        res.clearCookie('token');
        return res.status(200).json({ message: 'Đăng xuất thành công' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


