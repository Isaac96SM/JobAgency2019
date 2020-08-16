import { Offer } from "models"
import { Form } from "./"

export interface State {
	offers: Offer[]
	form: Form
}
