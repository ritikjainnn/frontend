import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane'
import AddCard from '../compoments/AddCard';
import CountCard from '../compoments/CountCard';
import DisplayCard from '../compoments/DisplayCard';

const Home = () => {
	let [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			handleChange();
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	function handleChange(e) {
		width = window.innerWidth;
		setWidth(width)
		console.log(window.innerWidth + " " + width);
	}

	let [toggle, setToggle] = useState(false);

	function refresh() {
		setToggle(!toggle)
	}

	useEffect(() => {
		console.log("Refresh")
	},[toggle]);


	return (
			<SplitPane split="horizontal" minSize={50} defaultSize={window.innerHeight / 1.3} resizerStyle={{ backgroundColor: "black", height: "10px" }}>
				<SplitPane split="vertical" minSize={50} defaultSize={width / 2} resizerStyle={{ backgroundColor: "black", width: "10px" }}>
					<div style={{ backgroundColor: "#efdaaa", height: "100%", alignContent: "center" }} >
						<AddCard refresh={refresh}/>
					</div>
					<div style={{ backgroundColor: "#9dbeb7", height: "100%", alignContent: "center" }} >
						<DisplayCard refresh={refresh}/>
					</div>
				</SplitPane>
				<div style={{ backgroundColor: "#5786d5", height: "100%", alignContent: "center" }} >
					<CountCard/>
				</div>
			</SplitPane>
	);
}

export default Home