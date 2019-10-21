import { Header } from "../../../components/app-table/models"
import { CompanyParser, InscriptionsParser } from "../../../components/app-table/parsers"
import { TextFilter } from "../../../components/app-table/filters"

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
