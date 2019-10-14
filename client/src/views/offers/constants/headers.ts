import { Header } from "../../../components/AppTable/models"
import { CompanyParser, InscriptionsParser } from "../../../components/AppTable/components"

export const Headers: Header[] = [
	{
		value: "Title"
	},
	{
		value: "Description"
	},
	{
		value: "Category",
		label: "Sector"
	},
	{
		value: "Company",
		parser: CompanyParser
	},
	{
		value: "Inscriptions",
		label: "Persons subscribed",
		parser: InscriptionsParser
	}
]
