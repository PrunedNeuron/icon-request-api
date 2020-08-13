import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Body from "../components/Body/Home/Home";
import { Page } from "@zeit-ui/react";
import Layout from "../components/Layout/Layout";
import HomeHeader from "../components/HomeHeader/HomeHeader";

export default function Home() {
	return (
		<Page render="effect-seo" size="large">
			<Layout>
				<HomeHeader />
				<Body />
			</Layout>
			<Footer />
		</Page>
	);
}
