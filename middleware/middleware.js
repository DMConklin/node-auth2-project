const jwt = require("jsonwebtoken")

function restrict(role) {
	return async (req, res, next) => {
		const authError = {
			message: "You shall not pass!",
		}

		try {
            const token = req.cookies.token
            
            if (!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, "secret string", (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError)
                }

                req.token = decoded

                next()
            })
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict