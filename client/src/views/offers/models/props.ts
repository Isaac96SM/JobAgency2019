import { IRootState } from "../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { currentCompany, currentUser } = app

	return { currentCompany, currentUser }
}

export type Props = ReturnType<typeof mapStateToProps>
