import { Header } from "../../../components/app-table/models"
import { CompanyParser, InscriptionsParser, TextFilter, ListFilter } from "../../../components/app-table/components"

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
		label: "Sector",
		filter: ListFilter
	},
	{
		value: "Company",
		parser: CompanyParser,
		// filter: ListFilter
	},
	{
		value: "Inscriptions",
		label: "Persons subscribed",
		parser: InscriptionsParser
	}
]
