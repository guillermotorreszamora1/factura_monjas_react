import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Pacientes from './paciente';
import ListaTratamientos from './listatratamientos';
import Tratamientos from './tratamientos';
import fs from 'fs';
import './App.css';
const URL_BASE = 'https://localhost/factura_monjas/API';
axios.defaults.withCredentials = true;
class App extends Component {
  constructor(props){
    super(props);
    this.changeView = this.changeView.bind(this);
    this.login = this.login.bind(this);
    this.isLogged = this.isLogged.bind(this);
    this.state = {
      page: 'mainPage',
      isLogged: false
    }
  };
  changeView(view){
    console.log('His');
    this.setState({page: view})
  };
  login(event){
    console.log("LOGING");
    console.log(this.email.value);
    console.log(this.password.value);
    axios.post(URL_BASE+'/login',{email: this.email.value,contrasena: this.password.value},{headers: {'Access-Control-Allow-Origin':'*'}})
      .then(result => this.login2(result));
    event.preventDefault();
  }
  isLogged(result){
    if(result.data.status==='true'){
      this.setState({isLogged: true})
    }else{
      this.setState({isLogged: false})
    }
  }
  componentDidMount(){
      axios.get(URL_BASE+'/is_logged')
      .then(result => this.isLogged(result))
  }

  login2(result){
    console.log(result.data.status);
    if( result.data.status==='true'){
      this.setState({isLogged: true})
    }
  }
  render(){
    return (
      <div className="App">
          <button onClick={() => this.changeView('mainPage')}>Main Page</button>
        <button onClick={() => this.changeView('Pacientes')}>Pacientes</button>
          <button onClick={() => this.changeView('Lista tratamientos')}>Lista tratamientos</button>
          <button onClick={() => this.changeView('Tratamientos')}>Tratamientos</button>
        { this.state.isLogged == true ? <div>
          { this.state.page === 'mainPage'? <MainPage/> : <p/>}
          { this.state.page === 'Pacientes'? <Pacientes/> : <p/>}
          { this.state.page === 'Lista tratamientos'? <ListaTratamientos/>: <p/>}
          { this.state.page === 'Tratamientos'? <Tratamientos/>: <p/>} </div>
          : <div>
            <form onSubmit={this.login}>
              <br/>
              Email: <input type="text" name="email" ref={node => {this.email = node}}/>
              Contrase&ntilde;a: <input type="password" name="contrasena" ref={node => this.password = node}/>
              <button type="onSubmit">Login</button>
            </form>
        </div>}
      </div>
    );
  }
}
class MainPage extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <p>MainPage</p>
    );
  }
}
export default App;
