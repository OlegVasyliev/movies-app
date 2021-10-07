import { Accordion } from "react-bootstrap";

const SeasonsTab = ({ seasons, episodes }) => {
	return (
		<div
			className="tab-pane active"
			id="seasons"
			role="tabpanel"
			aria-labelledby="seasons-tab"
		>
			<Accordion className="mt-3">
				{seasons.map((season) => (
					<Accordion.Item
						eventKey={"cardSeason" + season.number}
						className="accordion-card mt-2"
						key={"cardSeason" + season.number}
					>
						<Accordion.Header>
							<div className="row w-100">
								{season.image && (
									<div className="col-2">
										<img
											src={season.image.medium}
											alt={"Season " + season.number}
										/>
									</div>
								)}
								<div className="col-9 ms-3">
									<h3 className="h3 mt-3">
										Season {season.number}{" "}
										<span className="text-muted">
											{season.name}
										</span>
									</h3>

									<p className="text-muted">
										{season.episodeOrder
											? season.episodeOrder + " episodes"
											: ""}
									</p>
									{season.summary && (
										<p>
											{season.summary
												? season.summary.replace(
														/(<([^>]+)>)/gi,
														""
												  )
												: ""}
										</p>
									)}
								</div>
							</div>
						</Accordion.Header>
						<Accordion.Body>
							<Accordion>
								{episodes
									.filter(
										(episode) =>
											episode.season === season.number
									)
									.map((episode) => (
										<Accordion.Item
											eventKey={
												"episodeCard" + episode.number
											}
											className="accordion-card"
											key={
												"episodeCard" +
												episode.name +
												episode.number
											}
										>
											<Accordion.Header>
												<div className="row w-100">
													{episode.number}.{" "}
													{episode.name}
												</div>
											</Accordion.Header>

											<Accordion.Body>
												<p>
													{episode.summary
														? episode.summary.replace(
																/(<([^>]+)>)/gi,
																""
														  )
														: ""}
												</p>
											</Accordion.Body>
										</Accordion.Item>
									))}
							</Accordion>
						</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</div>
	);
};

export default SeasonsTab;
