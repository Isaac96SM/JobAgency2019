import { Header } from "../../../components/AppTable/models"
import { CompanyParser } from "../../../components/AppTable/components"

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
	}
]
