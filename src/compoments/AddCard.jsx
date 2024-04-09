import React, { useState } from 'react'
import { BASE_URL } from "../constants/Constants.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import './Card.css'

const AddCard = (props) => {

	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		console.log(inputValue)
	};

	const setData = async () => {
		const resp = await Axios.post(BASE_URL + "/api/v1/add", {
			data: inputValue
		})
		console.log(resp);
		if(resp.data.statusCode < 400){
			setInputValue('')
			props.refresh()
			console.log(props);
			alert("Data added successfully!!!")
		}
		else if (resp.data.statusCode === 500) {
			setInputValue('')
			alert("Something went wrong!!! \n Please Try Again...")
		}
		else {
			setInputValue('')
			alert("Data cannot be Empty!!!")
		}
	}

	return (
		<Form className='form'>
			<center>
				<Form.Group className="mb-3" controlId="formBasic">
					<Form.Label>Add new Data</Form.Label>
					<Form.Control type="text" placeholder="Enter Data" value={inputValue}
						onChange={handleInputChange} />
				</Form.Group>
				<Button variant="primary" onClick={setData}>
					Add
				</Button>
			</center>
		</Form>
	)
}

export default AddCard