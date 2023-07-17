const logOutController = async (req, res) => {
    // Destroy session
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(500);
        }

        // Clear cookie assigned to the client
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logged out successfuly." });
    });
};

module.exports = logOutController;
