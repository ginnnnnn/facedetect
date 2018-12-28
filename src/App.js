import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkFrom from './components/ImageLinkFrom/ImageLinkFrom';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import 'tachyons';
import './App.css';




  const option ={
    particles:{
      number:{
        value:60,
        density:{
          enable:true,
          value_area:800
        }
      }
    }
  };
const initialState = {
        input:'',
        imageUrl:'',
        box:{},
        route:'signin',
        isSignedIn:false,
        user:{
          id:"",
          email:"",
          password:"",
          name:"",
          entries:0,
          joined:""
  }
};
  class App extends Component {
    constructor(){
      super();
      this.state= initialState;
      }
    
    addUser =(data) =>{
      this.setState(
        {user:{
          id:data.id,
          email:data.email,
          password:data.password,
          name:data.name,
          entries:data.entries,
          joined:data.joined

      }})
    }
    // componentDidMount(){
    //   fetch('http://localhost:3000')
    //   .then(res=>res.json())
    //   .then(data=>console.log(data))
    // } //then(console.log)
    faceLocationCaculation=(data) =>{
      const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
      const img = document.getElementById('inputimg');
      const width= Number(img.width);
      const height =Number(img.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row*height,
        rightCol:width - (clarifaiFace.right_col*width),
        bottomRow:height - (clarifaiFace.bottom_row*height)
      }
    }

    displayFaceBox =(box)=> {
      console.log(box);
      this.setState({box: box});
      }
    

  onInputChange =(event)=>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit=()=>{
      this.setState({imageUrl:this.state.input});
      fetch('https://mighty-lowlands-19850.herokuapp.com/imageurl',{
          method:'post',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({
            input:this.state.input
          })
          })
      .then(response=>response.json())
    .then(response=>{
      if(response){
        fetch('https://mighty-lowlands-19850.herokuapp.com/image',{
          method:'put',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id})
          })
          .then(res=>res.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user,{
              entries:count}))
        })
          .catch(console.log)
        }
      this.displayFaceBox(this.faceLocationCaculation(response))
    })
     .catch(err=>console.log(err));
   }

   onRouteChange=(route)=>{
    if(route === 'signout'){
      this.setState({initialState})
    } else if( route === 'home') {
      console.log(route);
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
   }

  render(){
   const {isSignedIn, imageUrl, box, route} = this.state;
    return (
      <div className="App" >
        <Particles params={option} className="particle" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'?
          <div> 
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkFrom onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box ={box} imageUrl={imageUrl}/> 
          </div>
          :(
            route=== 'signin'
            ?<SignIn addUser={this.addUser} onRouteChange={this.onRouteChange}/>
            :<Register addUser={this.addUser} onRouteChange={this.onRouteChange} />
            )
          }
      </div>
      )
    }
  }



export default App;
