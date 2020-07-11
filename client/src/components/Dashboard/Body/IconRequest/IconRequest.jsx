import Actions from "../../Action/Actions";
import Card from "@material-ui/core/Card";
import Content from "../../Content/Content";
import React from "react";
import { StyledBox } from "./Styles";

export default class IconRequest extends React.Component {
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
