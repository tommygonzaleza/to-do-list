import React from "react";
import checkButton from "../../img/green-check.png";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: ["Sample Task"],
			newTask: ""
		};
		this.handleAddTasks = this.handleAddTasks.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}
	componentDidMount() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/tommygonzaleza",
			{
				method: "GET",
				headers: {
					"Content-type": "application/json"
				}
			}
		)
			.then(res => {
				let res1 = res.clone();
				console.log(res1.ok);
				console.log(res1.status);
				if (res1.status == 404) {
					let emptyArray = [];
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/tommygonzaleza",
						{
							method: "POST",
							body: JSON.stringify(emptyArray),
							headers: {
								"Content-type": "application/json"
							}
						}
					)
						.then(res2 => {
							console.log("Tried to create user: ");
							console.log(res2.status);
							console.log(res2.text());
							fetch(
								"https://assets.breatheco.de/apis/fake/todos/user/tommygonzaleza",
								{
									method: "GET",
									headers: {
										"Content-type": "application/json"
									}
								}
							).then(res3 => res3.json());
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					return res1.json();
				}
			})
			.then(data => {
				console.log(data);
				this.setState({
					tasks: data,
					newTask: ""
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	handleAddTasks(e) {
		e.preventDefault();
		let currentTasks = this.state.tasks;
		currentTasks.push({
			label: this.state.newTask,
			done: false
		});
		this.setState({
			...this.state,
			newTask: ""
		});
		console.log(currentTasks);
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/tommygonzaleza",
			{
				method: "PUT",
				body: JSON.stringify(currentTasks),
				headers: {
					"Content-type": "application/json"
				}
			}
		)
			.then(res1 => {
				if (res1.ok) {
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/tommygonzaleza",
						{
							method: "GET",
							headers: {
								"Content-type": "application/json"
							}
						}
					)
						.then(res2 => {
							return res2.json();
						})
						.then(data => {
							console.log(data);
							this.setState({
								tasks: data,
								newTask: ""
							});
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					console.log("Error fetching tasks ", res1.text());
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
	handleInputChange(e) {
		this.setState({
			...this.state,
			newTask: e.target.value
		});
	}
	handleDeleteTask(indexToDelete) {
		let tasksLeft = this.state.tasks.filter(
			index => index != indexToDelete
		);
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/tommygonzaleza",
			{
				method: "PUT",
				body: JSON.stringify(tasksLeft),
				headers: {
					"Content-type": "application/json"
				}
			}
		)
			.then(res1 => {
				if (res1.ok) {
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/tommygonzaleza",
						{
							method: "GET",
							headers: {
								"Content-type": "application/json"
							}
						}
					)
						.then(res2 => {
							return res2.json();
						})
						.then(data => {
							console.log(data);
							this.setState({
								tasks: data,
								newTask: ""
							});
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					console.log("Error fetching tasks ", res1.text());
				}
			})
			.catch(error => {
				console.log(error);
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
						{this.state.tasks.map((value, index) => {
							return (
								<li key={index} className="li-style col-12">
									{value.label}
									<img
										className="check-style"
										onClick={e =>
											this.handleDeleteTask(index)
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
