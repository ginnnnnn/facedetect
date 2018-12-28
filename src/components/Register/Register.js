import React from 'react';


class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email:"",
			password:"",
			name:""
		}
	}
	onEmailChange = (event) =>{
		this.setState({email:event.target.value})
	};
	onNameChange =(event)=>{
		this.setState({name:event.target.value})
	};
	onPasswordChange =(event) => {
		this.setState({password:event.target.value})
	}; 
	onSubmitSignIn =() =>{
		fetch('https://mighty-lowlands-19850.herokuapp.com/register', {
			method: 'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password,
				name:this.state.name
			}) //send body data with post method and convert in json
		}).then(res=>res.json())
		.then(data =>{
			if(data.id){
				this.props.addUser(data);
				this.props.onRouteChange('home');
			}
		})
		 }
render(){
	
	return (
		<div>
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 flex center ">
				<main className="pa4 black-80">
				  <div className="measure center">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0" >Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        onChange={this.onNameChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name"  
				        id="name"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        onChange={this.onEmailChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        onChange={this.onPasswordChange}
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="password"  
				        id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={ this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="confirm"/>
				    </div>
				  </div>
				</main>
				</article>
		</div>
		)
	}
};
export default Register;