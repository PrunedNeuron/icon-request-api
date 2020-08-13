import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function PageLayout({ toggleTheme, children }) {
	return (
		<>
			<div className="wrapper">
				<header>
					<Header toggleTheme={toggleTheme} />
				</header>
				<main>{children}</main>
				<footer>
					<Footer />
				</footer>
			</div>
			<style jsx global>{`
				* {
					font-display: auto;
				}

				.wrapper {
					display: flex;
					flex-direction: column;
					min-height: 100vh;
					 {
						/* margin: 0 2rem; */
					}
				}

				main {
					display: flex;
					flex-wrap: wrap;
					flex: 1;
					 {
						/*margin: 1rem;
					 
						align-items: center; */
					}
				}

				header,
				footer {
					flex: 0 1 auto;
				}

				h1,
				h2,
				h3,
				h4,
				h5,
				h6,
				p,
				a small {
					font-family: "Inter", sans-serif !important;
				}

				.plainLink {
					text-decoration: none !important;
					color: inherit !important;
				}
			`}</style>
		</>
	);
}
