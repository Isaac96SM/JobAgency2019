import { IRootState } from "../../../../../store"
import { Inscription } from "../../../../../models"

export const mapStateToProps = ({ app }: IRootState) => {
	const { user } = app

	return { user }
}

interface OwnProps {
	value: Inscription[]
}

export type Props = ReturnType<typeof mapStateToProps>
	& OwnProps
