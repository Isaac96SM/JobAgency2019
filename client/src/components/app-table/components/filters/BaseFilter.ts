import { Component } from "react"

import { Props as BaseProps} from "./models"
import { Condition } from "../../models"

export class BaseFilter<State = {}, Props = {}> extends Component<Props & BaseProps, State> {
	// #region Constructor
	addCondition = this._addCondition.bind(this)
	removeCondition = this._removeCondition.bind(this)
	private filter = this._filter.bind(this)
	private filterRow = this._filterRow.bind(this)
	// #endregion

	private get conditions() {
		return this.table.state.conditions
	}

	private get data() {
		return this.table.state.data
	}

	private get table() {
		return this.props.tableRef
	}

	// #region Alter Conditions
	private _addCondition(condition: Condition) {
		const idx: number = this.conditions.map(x => x.field).indexOf(condition.field)
		const newConditions: Condition[] = [ ...this.conditions ]

		if (idx !== -1) {
			newConditions[idx].callback = condition.callback
		} else {
			newConditions.push(condition)
		}

		this.filter(newConditions)
	}

	private _removeCondition(field: string) {
		const idx: number = this.conditions.map(x => x.field).indexOf(field)
		const newConditions: Condition[] = [ ...this.conditions ]

		if (idx !== -1) {
			newConditions.splice(idx, 1)

			this.filter(newConditions)
		}
	}
	// #endregion

	// #region Alter Data
	private _filter(newConditions: Condition[]) {
		this.table.setState({
			conditions: newConditions,
			filteredData: this.data.filter(row => this.filterRow(row, newConditions))
		})
	}
	// #endregion

	// #region Utils
	private _filterRow(row: any, conditions: Condition[] = this.conditions) {
		let result: boolean = true

		conditions.forEach(condition => {
			if (!condition.callback(row[condition.field])) result = false
		})

		return result
	}
	// #endregion
}
