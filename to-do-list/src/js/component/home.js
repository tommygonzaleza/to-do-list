import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	return (
		<div className="container text-center">
			<div>
				<header className="entire-header row col-8 justify-content-center">
					<h1>Task List</h1>
				</header>
				<section className="entire-body row col-8 justify-content-center">
					<form className="form-styles">
						<input placeholder="New tasks..." />
					</form>
					<ul className="main-list ul-style">
						<li className="list-item">Task 1</li>
						<li className="list-item">Task 2</li>
						<li className="list-item">Task 3</li>
					</ul>
				</section>
				<footer className="list-footer row">
					<p>x tasks left.</p>
				</footer>
			</div>
		</div>
	);
}
