import styled from "@emotion/styled";
import ChevronLeftCircleFill from "@zeit-ui/react-icons/chevronLeftCircleFill";

export const BackIcon = styled(ChevronLeftCircleFill)`
	margin: 0 0 0 2rem;
`;

export const HeadingCard = styled.div`
	display: inline-block;

	margin: 2rem 2rem 0 2rem;
	width: 60rem;

	/* Neumorphism begin */
	border-radius: 0.5rem;
	box-shadow: 1px 10px 70px #dedede, 1px 1px 1px #ffffff;
	/* Neumorphism end */
`;

export const Heading = styled.p`
	margin-left: 2rem;
	margin-right: 2rem;
	font-size: 2rem;
	font-weight: 300;
`;

export const HeadingContainer = styled.div`
	display: inline-block;
`;

export const BackButtonContainer = styled.div`
	margin: 0 0 0 2rem;
`;
