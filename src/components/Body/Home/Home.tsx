import React from "react";
import {
	Page,
	Spacer,
	Fieldset,
	Button,
	Tag,
	Dot,
	Grid,
	Divider
} from "@zeit-ui/react";
import { BodyContainer, Card, Projects, ProjectContainer } from "./Styles";
import { Card as ZeitCard } from "@zeit-ui/react";
import { Github, ExternalLink } from "@zeit-ui/react-icons";
import Project from "../../Project/Project";

export default function Home() {
	return (
		<Page.Content>
			<BodyContainer>
				<h3 style={{ marginLeft: "3rem" }}>Projects</h3>
				<Divider />
				<Projects>
					<Project
						title="Amphetamine"
						description="Bright, vibrant, energetic icon pack for android devices containing over 1400 high quality icons."
						link="https://play.google.com/store/apps/details?id=com.ayushm.icons.amphetamine"
						linkText="Play Store"
						icon={<ExternalLink />}
						maintained
					/>
					<Project
						title="Icon Request API"
						description="API to manage, collect and view icon requests for Android icon packs."
						link="https://github.com/PrunedNeuron/icon-request-api"
						linkText="Source"
						icon={<Github />}
						maintained
					/>
					<Project
						title="PyGitio"
						description="A wrapper over the git.io URL shortener written in Python."
						link="https://github.com/PrunedNeuron/PyGitio"
						linkText="Source"
						icon={<Github />}
					/>
					<Project
						title="Personal Website"
						description="The source code of this website."
						link="https://github.com/PrunedNeuron/Portfolio"
						linkText="Source"
						icon={<Github />}
						maintained
					/>
				</Projects>
			</BodyContainer>
		</Page.Content>
	);
}
