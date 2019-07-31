import { IAccount } from "../interfaces/IAccount";
import { BaseHelper } from "./BaseHelper"

export abstract class AccountHelper<T extends IAccount> extends BaseHelper<T> {
	public async findByEmail(Email: string): Promise<T> {
		try {
			return await this.Schema.findOne({ Email }) as T
		} catch {
			return null
		}
	}
}
