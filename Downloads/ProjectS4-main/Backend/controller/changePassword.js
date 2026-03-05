const bcrypt = require('bcryptjs');
const User = require('../model/user.js');
const { sendPasswordChangeEmail } = require('./emailService.js');

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const userIP = req.ip || req.connection.remoteAddress || 'Unknown';

        const user = await User.findById(req.user.id).select('+password');
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });
        
        if (oldPassword === newPassword) 
            return res.status(400).json({ message: "New password cannot be the same as the old one" });
        
        user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(12));
        await user.save();

        sendPasswordChangeEmail(user.email, user.username, user.role, userIP);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
