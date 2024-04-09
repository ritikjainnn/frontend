import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { BASE_URL } from "../constants/Constants.js";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { ImPencil2 } from "react-icons/im";
import Axios from "axios";

const DisplayCard = (props) => {

	const [data, setData] = useState([])
	const [id, setId] = useState('')
	const [rData, setRData] = useState('')
	const [resp, setResp] = useState('')
	const [toggle, setToggle] = useState(false)

	var ind = 1;
	const getData = async () => {
		const response = await Axios.get(BASE_URL + "/api/v1")
		await new Promise(r => setTimeout(r, 1000));
		setData(response.data.data)
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		getData()
	}, [resp, props])

	const updateRow = (row_id, row_data) => {
		setId(row_id)
		setRData(row_data)
		setToggle(true)
	};

	const handleDataChange = (event) => {
		setRData(event.target.value);
		console.log(rData)
	};

	const updateData = async () => {
		console.log(id);
		const resp = await Axios.put(BASE_URL + "/api/v1/update", {
			id: id,
			data: rData
		})
		if (resp.data.statusCode < 400) {
			setId('')
			setRData('')
			setToggle(false)
			setResp(resp)
			alert("Data updated successfully!!!")
			props.refresh("true")
		}
		else if (resp.data.statusCode === 500) {
			setToggle(false)
			alert("Something went wrong!!! \n Please Try Again...")
		}
		else {
			setToggle(false)
			alert("Data cannot be Empty!!!")
		}
	}

	return (
		<div >
			<center>
				{!toggle && <Form.Label>Data Table</Form.Label>}
				{!toggle && <div style={{
					maxHeight: "300px",
					overflowY: "auto",
					width: "50%"
				}}>
					<Table striped bordered hover>
						<thead style={{
							position: "sticky",
							top: "0"
						}}>
							<tr>
								<th>Id</th>
								<th>Data</th>
								<th>Edit</th>
							</tr>
						</thead>

						<tbody>
							{data.map((row) => (
								<tr key={row._id}>
									<td>{ind++}</td>
									<td><Form.Control type="text" value={row.data} disabled="true"
									/></td>

									<td>
										<button variant="primary" onClick={() => updateRow(row._id, row.data)}>
											<ImPencil2 />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>}

				{toggle && <div style={{
					width: "40%",
					marginTop: "3%"
				}}>
					<Form.Group className="mb-3" controlId="formBasic">
						<Form.Label>Update Data</Form.Label>
						<Form.Control type="text" placeholder="Data" value={rData}
							onChange={handleDataChange} />
					</Form.Group>
					<Button variant="primary" onClick={updateData}>
						Update
					</Button>
				</div>}
			</center>
		</div>
	);
};

export default DisplayCard