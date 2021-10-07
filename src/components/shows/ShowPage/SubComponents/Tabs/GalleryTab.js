const GalleryTab = ({ images }) => {
	const posters = images.filter((image) => image.type === "poster");
	const banners = images.filter((image) => image.type === "banners");
	const background = images.filter((image) => image.type === "background");

	return (
		<div
			className="tab-pane"
			id="gallery"
			role="tabpanel"
			aria-labelledby="gallery-tab"
		>
			<div className="container">
				<h3 className="h3 mt-3">Posters</h3>
				<div className="row">
					{posters.length === 0 && (
						<h4 className="h4 text-muted">No posters</h4>
					)}
					{posters.length !== 0 &&
						posters.map((image, i) => (
							<div
								className="col-sm-6 col-md-3 mt-3"
								key={image.id}
							>
								<img
									src={
										image.resolutions.medium
											? image.resolutions.medium.url
											: image.resolutions.original.url
									}
									alt={"Poster " + i}
									width="210"
								/>
							</div>
						))}
				</div>
				<h3 className="h3 mt-3">Banners</h3>
				<div className="row">
					{banners.length === 0 && (
						<h4 className="h4 text-muted">No banners</h4>
					)}
					{banners.length !== 0 &&
						banners.map((image, i) => (
							<div
								className="col-sm-6 col-md-3 mt-3"
								key={image.id}
							>
								<img
									src={
										image.resolutions.medium
											? image.resolutions.medium.url
											: image.resolutions.original.url
									}
									alt={"Poster " + i}
									width="210"
								/>
							</div>
						))}
				</div>
				<h3 className="h3 mt-3">Background images</h3>
				<div className="row">
					{background.length === 0 && (
						<h4 className="h4 text-muted">No backgrounds</h4>
					)}
					{background.length !== 0 &&
						background.map((image, i) => (
							<div
								className="col-sm-6 col-md-3 mt-3"
								key={image.id}
							>
								<img
									src={
										image.resolutions.medium
											? image.resolutions.medium.url
											: image.resolutions.original.url
									}
									alt={"Poster " + i}
									width="210"
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default GalleryTab;
