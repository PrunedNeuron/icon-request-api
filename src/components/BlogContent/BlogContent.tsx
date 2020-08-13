import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { ContentCard, ContentText, Container } from "./Styles";

function Image(props) {
	return <img {...props} style={{ maxWidth: "20%" }} />;
}

export default function BlogContent({ content }) {
	return (
		<div>
			<Container>
				<ContentCard>
					<ContentText>
						{/* <ReactMarkdown source={content} /> */}
						{content}
					</ContentText>
				</ContentCard>
			</Container>
		</div>
	);
}
