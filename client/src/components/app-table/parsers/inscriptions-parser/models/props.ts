import { IRootState } from "../../../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { currentUser } = app

	return { currentUser }
}

export type Props = ReturnType<typeof mapStateToProps>
