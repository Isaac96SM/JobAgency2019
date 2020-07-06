import { IRootState } from "../../../../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { companies } = app

	return { companies }
}

export type Props = ReturnType<typeof mapStateToProps>
