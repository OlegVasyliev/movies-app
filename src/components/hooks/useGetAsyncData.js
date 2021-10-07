import { useEffect, useRef } from "react";

export const useGetAsyncData = (fetcher, setter) => {
	const mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;
		fetcher()
			.then((result) => {
				if (mounted.current) {
					setter(result);
				}
			})
			.catch(() => {
				if (mounted.current) {
					setter(null);
				}
			});

		return () => {
			mounted.current = false;
		};
	}, []);
};
