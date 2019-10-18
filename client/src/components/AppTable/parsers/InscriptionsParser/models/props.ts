import { IRootState } from "../../../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { user } = app

	return { user }
}

export type Props = ReturnType<typeof mapStateToProps>
