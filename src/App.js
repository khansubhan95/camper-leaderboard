import React from 'react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {campers: []}
	}

	componentDidMount() {
		fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent?format=json')
		.then(response => response.json())
		.then(response => {
			this.setState({campers: response})
			console.log(response);
		})
	}

	sortRecent() {
		let campers = this.state.campers
		campers = campers.sort(function(a, b) {
			return b.recent - a.recent
		})

		this.setState({campers})
	}

	sortAlltime() {
		let campers = this.state.campers
		campers = campers.sort(function(a, b) {
			return b.alltime - a.alltime
		})

		this.setState({campers})	
	}

	render() {
		let campers = this.state.campers
		console.log(campers);
		return(
			<div>
				<div className="container-fluid">
					<div className="row">
					<div className="col-md-1 col-sm-0 col-xs-0"></div>
					<div className="col-md-10 col-sm-12 col-xs-12">
					
					<table className="table table-bordered">
						<caption>FCC Users by Brownie Points</caption>
						<thead>
							<tr>
								<th>#</th>
								<th>Image</th>
								<th>Username</th>
								<th className="click" onClick={this.sortRecent.bind(this)}>Recent</th>
								<th className="click" onClick={this.sortAlltime.bind(this)}>Alltime</th>
							</tr>
						</thead>

						<tbody>
						{campers.map((item, idx) => (
							<tr key={item.username}>
								<td>{idx+1}</td>
								<td>
									<div className="image-container"> 
										<img alt={item.username} src={item.img} />
									</div>
								</td>
								<td>{item.username}</td>
								<td>{item.recent}</td>
								<td>{item.alltime}</td>
							</tr>
						))}
						</tbody>
					
				    </table>
				    </div>
			<div className="col-md-1 col-sm-0 col-xs-0"></div>
			</div>
			</div>
			</div>
		)
	}
}

export default App