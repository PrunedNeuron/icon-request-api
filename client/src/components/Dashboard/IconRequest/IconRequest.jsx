import React from "react";
import Card from "@material-ui/core/Card";

import Content from "../Content/Content";
import Actions from "../Action/Actions";
import { StyledBox } from "./Styles";

class IconRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<StyledBox>
				<Card variant="outlined">
					<Content
						// id={this.props.id.join(", ")}
						name={this.props.name}
						component={this.props.component}
						url={this.props.url}
						// requesters={this.props.requesters}
					/>
					<Actions
						component={this.props.component}
						url={this.props.url}
					/>
				</Card>
			</StyledBox>
		);
	}
}

/* function IconRequest(props) {
	const [copied, setCopied] = useState(false);

	const handleClick = () => {
		console.log("COPIED = " + copied);
		navigator.clipboard.writeText(props.component);
		setCopied(true);
		console.log("Copied = " + copied);
		setTimeout(() => {
			console.log(copied);
			if (copied === true) setCopied(false);
		}, 3000);
	};
} */

export default IconRequest;
