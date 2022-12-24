import { useState } from "react";

export function useScrollShadow() {
	const [scrollTop, setScrollTop] = useState(0);

	const onScrollHandler = (event) => {
		console.log("Scrolling...");
		setScrollTop(event.target.scrollTop);
	};

	return { applyBoxShadow: scrollTop > 0, onScrollHandler };
}
