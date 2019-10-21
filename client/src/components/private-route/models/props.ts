import { RouteProps } from "react-router-dom"

import { IRootState } from "../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { isAuthenticated } = app

	return { isAuthenticated }
}

export type Props = ReturnType<typeof mapStateToProps>
	& RouteProps
