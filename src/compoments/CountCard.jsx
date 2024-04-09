import React, { useState, useEffect } from 'react'
import { BASE_URL } from "../constants/Constants.js";
import Axios from "axios";

const CountCard = () => {

	const [data, setData] = useState([])

	const getData = async () => {
		const response = await Axios.get(BASE_URL + "/api/v1/count")
		await new Promise(r => setTimeout(r, 1000));
		setData(response.data.data)
		//console.log(data[0])
	}

	useEffect(() => {
		getData()
	})

	return (
		<div className="count">
			<center>
				<p>Count is : {data}</p>
			</center>
		</div>
	);
};

export default CountCard