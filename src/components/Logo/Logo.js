import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import Bunny from './bunny.png'


const Logo =() =>{

	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt br3 shadow-2" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
		 		<div className="Tilt-inner"> <img alt='bunny' src={Bunny}/> </div>
			</Tilt>
		</div>
	)	
};

export default Logo;