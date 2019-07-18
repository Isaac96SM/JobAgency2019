import { Strategy, ExtractJwt } from "passport-jwt"
import mongoose from "mongoose"
import { keys } from "./"
import passport from "passport"

const User = mongoose.model('users')

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
						return done(null, user);

					return done(null, false);
				})
				.catch(err => console.log(err));
		})
	);
};