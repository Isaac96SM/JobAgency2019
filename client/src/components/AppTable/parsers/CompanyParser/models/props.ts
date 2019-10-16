import { IRootState } from "../../../../../store"

export const mapStateToProps = ({ app }: IRootState) => {
	const { companies } = app

	return { companies }
}

interface OwnProps {
	value: string
}

export type Props = ReturnType<typeof mapStateToProps>
	& OwnProps
