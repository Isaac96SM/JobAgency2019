import { Strategy, ExtractJwt } from "passport-jwt"
import passport from "passport"
import { keys } from "./"
import { User } from "../models"

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secretOrKey
}

export const middleware = (passport: passport.PassportStatic) => {
	passport.use(
		new Strategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (user)
						return done(null, user)

					return done(null, false)
				})
				.catch(err => console.log(err))
		})
	)
}
