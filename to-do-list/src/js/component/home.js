import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	return (
		<div className="box_1 container">
			<header className="entire-header col-12 row justify-content-center">
				<h1>Task List</h1>
			</header>
			<section className="entire-body row justify-content-center">
				<form className="form-style">
					<input placeholder="New tasks..." />
				</form>
				<ul className="main-list ul-style">
					<li className="list-item">Take a Shower</li>
					<li className="list-item">Wash the Dishes</li>
					<li className="list-item">Cook Dinner</li>
				</ul>
				<div className="task-left-style">
					<p>X tasks left</p>
				</div>
			</section>
		</div>
	);
}
