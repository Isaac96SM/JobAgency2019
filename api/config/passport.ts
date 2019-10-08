import { Strategy, ExtractJwt } from "passport-jwt"
import passport from "passport"
import { keys } from "./"
import { User, Company } from "../models"
import { IUser, ICompany } from "../interfaces"

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secretOrKey
}

export const middleware = (passport: passport.PassportStatic) => {
	passport.use(
		new Strategy(opts, async (jwt_payload, done) => {
			const user: IUser = await User.findById(jwt_payload.id)

			if (user) return done(null, user)

			const company: ICompany = await Company.findById(jwt_payload.id)

			if (company) return done(null, company)

			return done(null, false)
		})
	)
}
