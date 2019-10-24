import { IRootState } from "../../../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { currentUser, users } = app

	return { currentUser, users }
}

export type Props = ReturnType<typeof mapStateToProps>
