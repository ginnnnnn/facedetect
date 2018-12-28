import React from 'react';
import './ImageLinkFrom.css';


const ImageLinkFrom =({ onInputChange ,onButtonSubmit}) =>{

	return(
		<div className="f5">
			<p>{'this bunny will detect your face, paste img link here'	}</p>
			<div className='flex justify-center'>
			<div className="form pa4 br3 shadow-5 flex justify-center">
			<input className="f4 pa2 w-70" type='text' onChange= {onInputChange}/>
			<button 
			className="grow f4 link ph3 pv2 dib white w-30 bg-light-purple shadow-1"
			onClick = {onButtonSubmit}
			>shooo</button>
			</div>
			</div>		
		</div>
	)	
};

export default ImageLinkFrom;