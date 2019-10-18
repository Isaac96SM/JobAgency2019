import { Header } from "../../../components/AppTable/models"
import { CompanyParser, InscriptionsParser } from "../../../components/AppTable/parsers"
import { TextFilter } from "../../../components/AppTable/filters"

export const Headers: Header[] = [
	{
		value: "Title",
		filter: TextFilter
	},
	{
		value: "Description",
		filter: TextFilter
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
