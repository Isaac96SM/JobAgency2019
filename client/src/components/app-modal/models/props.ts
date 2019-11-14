import { ButtonProps } from "react-bootstrap"

export interface ButtonStyle {
	label: string,
	variant: ButtonProps["variant"]
}

export interface Props {
	title: string
	onAccept?: () => void
	acceptStyle?: ButtonStyle,
	closeStyle?: ButtonStyle
}
