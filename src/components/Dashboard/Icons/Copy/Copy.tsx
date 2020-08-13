import React, { useState } from "react";
import { CopyIcon } from "./Styles";
import { Tooltip, useClipboard, useToasts } from "@zeit-ui/react";

export default function Copy(props: { component: string }) {
	const [copied, setCopied] = useState(false);
	const [toasts, setToast] = useToasts();
	const { copy } = useClipboard();

	const copyClickHandler = () => {
		copy(props.component);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 3000);
		setToast({ text: "Text copied.", type: "success" });
	};

	return (
		<Tooltip text="Copy" placement="bottom">
			<a href="#" onClick={copyClickHandler}>
				<CopyIcon />
			</a>
		</Tooltip>
	);
}
