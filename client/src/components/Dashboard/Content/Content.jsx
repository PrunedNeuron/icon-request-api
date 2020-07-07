import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { StyledBox, StyledType } from "./Styles";

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<CardContent>
				<Typography component="div">
					<StyledType>
						{this.props.name}
						{/* <TooltipIcon
							title={this.props.id}
							interactive={true}
							icon={<FingerprintIcon />}
							aria="Id"
						/>
						<TooltipIcon
							title={this.props.requesters}
							icon={<PeopleOutlineIcon />}
						/> */}
					</StyledType>
					<StyledBox fontFamily="monospace" color="text.secondary">
						{this.props.component}
					</StyledBox>
				</Typography>
			</CardContent>
		);
	}
}

export default Content;
