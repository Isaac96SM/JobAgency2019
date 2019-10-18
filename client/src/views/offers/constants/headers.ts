import { Header } from "../../../components/AppTable/models"
import { CompanyParser, InscriptionsParser } from "../../../components/AppTable/parsers"

export const Headers: Header[] = [
	{
		value: "Title",
		filter: true
	},
	{
		value: "Description",
		filter: true
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
