const jwt = require("jsonwebtoken")
const User = require("../../model/User")

// Set User Permission
const isUser = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(404).json({ message: 'Token not found' })
        }
        // decode token
        const decode = await jwt.verify(token, "145")
        
        // find user using token
        let user = await User.findOne( {$and: [{_id: decode.id}, {token: token}]}).exec()
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // check role
        if (user.role === 'user') {
            next()
        } else {
            return res.status(401).json({ message: 'You have no permissions to access' })
        }

    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }
            return res.status(501).json({ message: 'unauthorized request' })
        }
    }
}

module.exports = {isUser}