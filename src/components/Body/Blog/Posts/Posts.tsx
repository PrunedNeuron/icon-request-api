import Link from "next/link";
import { PostCard, PostTitle, PostDescription, Date } from "./Styles";
import Truncate from "react-truncate";

export default function Posts({ posts }) {
	return (
		<div style={{ display: "block" }}>
			{!posts && <div>No posts!</div>}
			<ul>
				{posts &&
					posts.map(({ id, date, title, description }) => {
						return (
							<PostCard key={title}>
								<Link
									href={{
										pathname: `blog/${id}`
									}}
								>
									<a>
										<PostTitle>{title}</PostTitle>
									</a>
								</Link>
								<br />
								<Date>{date}</Date>
								<PostDescription>
									<Truncate
										lines={5}
										ellipsis={<span>...</span>}
									>
										{description}
									</Truncate>
								</PostDescription>
							</PostCard>
						);
					})}
			</ul>
		</div>
	);
}
