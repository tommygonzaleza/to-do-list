import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import checkButton from "../../img/green-check.png";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
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
				console.log(res.ok);
				console.log(res.status);
				console.log(res.text());
				if (res.status == 404) {
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
						.then(res => {
							console.log("Tried to create user: ");
							console.log(res.status);
							console.log(res.text());
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					return Response.json();
				}
			})
				.then(data => {
					console.log(data);
					this.setState({
						tasks: data,
						newTask: ""
					})
				})
				.catch(error => {
					console.log(error)
				});
	}
	handleAddTasks(e) {
		e.preventDefault();
		let currentTasks = this.state.tasks;
		currentTasks.push({
			label: this.state.newTask,
			done: false
		})
		this.setState({
			...this.state,
			newTask: ""
		});
		console.log(currentTasks);
		fetch(
			"https://assets.breatheco.d/apis/fake/todos/user/tommygonzaleza",
			{
				method: "PUT",
				body: JSON.stringify(currentTasks),
				headers: {
					"Content-type": "application/json"
				}
			}
		)
			.then(res => {
				if (res.ok) {
					fetch(
						"https://assets.breatheco.d/apis/fake/todos/user/tommygonzaleza",
						{
							method: "GET",
							headers: {
								"Content-type": "application/json"
							}
						}
					)
						.then(res => {
							return Response.json();
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
					console.log("Ocurred an  error fetching tasks ", res.text());
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
