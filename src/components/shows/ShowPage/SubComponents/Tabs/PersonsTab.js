const PersonsTab = ({ persons, type }) => {
	return (
		<div
			className="tab-pane"
			id={type}
			role="tabpanel"
			aria-labelledby="cast-tab"
		>
			<div className="container">
				<div className="row">
					{persons.length === 0 && (
						<p className="text-muted mt-2 h5">No {type}</p>
					)}
					{persons.map((member) => {
						const data = {
							name: member.person.name,
							role: "",
							image: "",
						};
						if (type === "cast") {
							data.image = member.character.image;
							data.role = member.character.name;
						}
						if (type === "crew") {
							data.image = member.person.image;
							data.role = member.type;
						}

						return (
							<div
								className="col-sm-6 col-md-4"
								key={"Cast " + data.name + data.role}
							>
								<div className="row mt-4">
									<div className="col-6">
										<img
											src={
												data.image
													? data.image.medium
													: "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
											}
											alt={data.name + " " + data.role}
											width="210"
										/>
									</div>
									<div className="col-6 ps-4">
										<h3 className="h3">{data.name}</h3>
										<p>as {data.role}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PersonsTab;
