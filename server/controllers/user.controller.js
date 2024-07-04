const userSchema = require('../models/user.schema');

const addUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const user = new userSchema({
        name,
        email,
        password,
        isAdmin
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addUser };
