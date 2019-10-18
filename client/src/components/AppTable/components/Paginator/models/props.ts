export interface Props {
	items: number
	itemsPerPage: number
	emit: (skip: number, limit: number) => void
}
