import { Props as TableProps, State as TableState } from "../../../models"
import { ComponentRef } from "../../../../../models"

export interface Props {
	tableRef: ComponentRef<TableProps, TableState>
	items: number
	limit: number
}
