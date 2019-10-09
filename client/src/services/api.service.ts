import axios from "axios"

import { User, Company, Offer, Inscription } from "../models"

class ApiService {
	public users = {
		get: async () => await this.http.get("users") as User[],
		post: async (user: any) => await this.http.post("users", user) as boolean,
		getById: async (id: string) => await this.http.get(`users/${id}`) as User,
		put: async (user: any) => await this.http.put(`users/${user.id}`, user) as User,
		delete: async (id: string) => await this.http.delete(`users/${id}`) as boolean,
		login: async (email: string, password: string) =>
			await this.http.post("users/login", { email, password }) as string
	}

	companies = {
		get: async () => await this.http.get("companies") as Company[],
		post: async (company: any) => await this.http.post("companies", company) as boolean,
		getById: async (id: string) => await this.http.get(`companies/${id}`) as Company,
		put: async (company: any) => await this.http.put(`companies/${company.id}`, company) as Company,
		delete: async (id: string) => await this.http.delete(`companies/${id}`) as boolean,
		login: async (email: string, password: string) =>
			await this.http.post("companies/login", { email, password }) as string,
		offers: {
			get: async (company_id: string) => await this.http.get(`companies/${company_id}/offers`) as Offer[]
		}
	}

	offers = {
		get: async () => await this.http.get("offers") as Offer[],
		post: async (offer: any) => await this.http.post("offers", offer) as boolean,
		getById: async (id: string) => await this.http.get(`offers/${id}`) as Offer,
		put: async (offer: any) => await this.http.put(`offers/${offer.id}`, offer) as Offer,
		delete: async (id: string) => await this.http.delete(`offers/${id}`) as boolean,
		inscriptions: {
			get: async (offer_id: string) => await this.http.get(`offers/${offer_id}/inscriptions`) as Inscription[],
			put: async (offer_id: string) => await this.http.put(`offers/${offer_id}/inscriptions`) as Inscription[],
			delete: async (offer_id: string) => await this.http.delete(`offers/${offer_id}/inscriptions`) as Inscription[],
		}
	}

	private readonly http = axios.create({
		baseURL: "/"
	})

	constructor() {
		this.http.interceptors.response.use(
			response => response.data,
			error => { throw new Error(error) }
		)

		this.http.interceptors.request.use((config: any) => {
			/*if (authService.isLogged)
				config.headers.Authorization = authService.get().jwt*/

			return config
		}, (err: any) => Promise.reject(err))
	}
}

export default new ApiService()
