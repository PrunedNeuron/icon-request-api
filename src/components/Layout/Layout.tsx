import React from "react";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<AnimatePresence exitBeforeEnter>
				<motion.div
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.2 }}
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default Layout;
