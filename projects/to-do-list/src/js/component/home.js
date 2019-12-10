import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import checkButton from "../../img/green-check.png";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [
				"Take a shower",
				"Wash the dishes",
				"Cook dinner",
				"Eat dinner"
			],
			newTask: ""
		};
		this.handleAddTasks = this.handleAddTasks.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}
	handleAddTasks(e) {
		e.preventDefault();
		let task = e.target.value;
		this.setState({
			tasks: [...this.state.tasks, this.state.newTask],
			newTask: ""
		});
	}
	handleInputChange(e) {
		this.setState({
			...this.state.tasks,
			newTask: e.target.value
		});
	}
	handleDeleteTask(e, indexToDelete) {
		let tasksLeft = this.state.tasks.filter(
			(value, index) => index != indexToDelete
		);
		this.setState({
			tasks: tasksLeft,
			newTask: this.state.newTask
		});
	}
	render() {
		let tasks = this.state.tasks;
		return (
			<div className="box_1 container">
				<header className="entire-header col-12 text-center mb-3">
					<h1>Task List</h1>
				</header>
				<section className="entire-body">
					<form
						className="form-style text-center"
						onSubmit={this.handleAddTasks}>
						<input
							placeholder="Add new tasks..."
							onChange={this.handleInputChange}
							value={this.state.newTask}
						/>
					</form>
					<ul className="main-list ul-style mx-auto my-auto">
						{tasks.map((value, index) => {
							return (
								<li key={index} className="li-style col-12">
									{value}
									<img
										className="check-style"
										onClick={e =>
											this.handleDeleteTask(e, index)
										}
										src={checkButton}
									/>
								</li>
							);
						})}
					</ul>
					<div className="task-left-style col-3">
						<p>{this.state.tasks.length} tasks left</p>
					</div>
				</section>
			</div>
		);
	}
}

export default Home;
