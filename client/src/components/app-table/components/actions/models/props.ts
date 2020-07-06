import { RouteComponentProps } from "react-router-dom"

export interface OwnProps {
	row_id: string
}

export type Props = RouteComponentProps & OwnProps
