import React, { useState } from "react";
import { Tooltip, useToasts } from "@zeit-ui/react";
import { CheckSolidIcon, CheckOutlineIcon } from "./Styles";

export default function Check(props: { status: string }) {
	const [status, setStatus] = useState(props.status);
	const [toasts, setToast] = useToasts();

	const doneClickHandler = () => {
		// await updateRequestStatus();
		setToast({ text: "Marked icon request as done.", type: "success" });
	};

	return status === "done" ? (
		<a>
			<CheckSolidIcon />
		</a>
	) : (
		<Tooltip text="Mark as done" placement="bottom">
			<a href="#" onClick={doneClickHandler}>
				<CheckOutlineIcon />
			</a>
		</Tooltip>
	);
}
