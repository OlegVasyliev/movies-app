import * as bootstrap from "bootstrap";
import { useEffect } from "react";
import FavouriteShowsTab from "./Tabs/FavouriteShowsTab";
import FriendsTab from "./Tabs/FriendsTab";

const UserTabs = ({ user }) => {
	useEffect(() => {
		// Activate bootstrap tabs
		const triggerTabList = [].slice.call(
			document.querySelectorAll("#showTab a")
		);
		triggerTabList.forEach((triggerEl) => {
			const tabTrigger = new bootstrap.Tab(triggerEl);

			triggerEl.addEventListener("click", (event) => {
				event.preventDefault();
				tabTrigger.show();
			});
		});
	}, []);

	return (
		<div className="container mt-3 p-3">
			<ul className="nav nav-tabs" id="showTab" role="tablist">
				<li className="nav-item" role="presentation">
					<button
						className="nav-link active"
						id="favourite-tab"
						data-bs-toggle="tab"
						data-bs-target="#favourite"
						type="button"
						role="tab"
						aria-controls="favourite"
						aria-selected="true"
					>
						Favourite Shows
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link"
						id="friends-tab"
						data-bs-toggle="tab"
						data-bs-target="#friends"
						type="button"
						role="tab"
						aria-controls="friends"
						aria-selected="false"
					>
						Friends
					</button>
				</li>
			</ul>

			<div className="tab-content">
				<FavouriteShowsTab showsIDs={user.userInfo.favourite} />
				<FriendsTab friendsUIDs={user.userInfo.friends} />
			</div>
		</div>
	);
};

export default UserTabs;
