import { IconProp } from "@fortawesome/fontawesome"
import { ButtonProps } from "react-bootstrap"

import { ButtonStyle } from "components/app-modal/models"

export interface ModalData {
	buttonVariant: ButtonProps["variant"]
	buttonIcon: IconProp
	modalTitle: string
	acceptStyle: ButtonStyle
	closeStyle: ButtonStyle
	modalBody: JSX.Element | string
}
