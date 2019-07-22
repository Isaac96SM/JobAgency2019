import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { IUser } from "../interfaces"

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	FirstName: {
		type: String,
		required: true
	},
	LastName: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	},
	IsCompany: {
		type: Boolean,
		default: false
	},
	RegisterDate: {
		type: Date,
		default: Date.now
	}
})

UserSchema.pre("save", function (this: IUser, next: mongoose.HookNextFunction) {
	// Only hash the password if it has been modified (or is new)
	if (!this.isModified('Password'))
		return next()

	// Generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err)
			return next(err)

		// Hash the password using our new salt
		bcrypt.hash(this.Password, salt, (err, hash) => {
			if (err)
				return next(err)

			// Override the cleartext password with the hashed one
			this.Password = hash
			next()
		})
	})
})

UserSchema.methods.comparePassword = function (this: IUser, candidatePassword: string, cb: any) {
	bcrypt.compare(candidatePassword, this.Password, (err, isMatch) => {
		if (err)
			return cb(err)

		cb(null, isMatch)
	})
}

export const User = mongoose.model("users", UserSchema)
