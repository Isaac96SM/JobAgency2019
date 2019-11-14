export interface Props {
	id: string,
	label: string,
	type: string,
	value: any,
	onInput: (e: React.FormEvent<HTMLInputElement>) => void
}
