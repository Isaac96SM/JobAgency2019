import { Schema, HookNextFunction } from "mongoose"
import bcrypt from "bcrypt"
import * as util from "util"
import { IUser } from "../interfaces";

const SALT_WORK_FACTOR = 10

export function UserModel() {
	Schema.apply(this, arguments);

	this.add({
		Email: {
			type: String,
			required: true
		},
		Password: {
			type: String,
			required: true
		},
		RegisterDate: {
			type: Date,
			default: Date.now
		}
	})

	this.pre("save", function (this: IUser, next: HookNextFunction) {
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

	this.method({
		comparePassword: async function (this: IUser, candidatePassword: string): Promise<boolean> {
			try {
				return await bcrypt.compare(candidatePassword, this.Password)
			} catch {
				return false
			}
		},
		cleanPassword: function (this: IUser, flag: boolean): IUser {
			if (flag)
				this.Password = null

			return this
		}
	})
}

util.inherits(UserModel, Schema)
