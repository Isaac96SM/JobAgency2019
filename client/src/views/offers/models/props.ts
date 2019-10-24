import { IRootState } from "../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { currentCompany } = app

	return { currentCompany }
}

export type Props = ReturnType<typeof mapStateToProps>
