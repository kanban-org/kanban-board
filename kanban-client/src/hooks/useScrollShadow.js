import { useState } from "react";

export function useScrollShadow() {
	const [scrollTop, setScrollTop] = useState(0);

	const onScrollHandler = (event) => {
		setScrollTop(event.target.scrollTop);
	};

	return { applyBoxShadow: scrollTop > 0, onScrollHandler };
}
