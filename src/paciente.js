import React, {Component} from 'react';
import axios from 'axios';
const URL_BASE = 'https://localhost/factura_monjas/API';
axios.defaults.withCredentials = true;
class Pacientes extends Component {
  constructor(props){
    super(props);
    this.state = {pacientes: []}
    this.add = this.add.bind(this);
  }
  add(event){
    axios.post(URL_BASE+'/add_paciente',{nombre:this.nombre_nuevo.value}).then(result => this.load_data());
    event.preventDefault();
  }
  load_data(){
    axios.get(URL_BASE+'/list_pacientes')
    .then(result => this.set_data(result))
  }
  set_data(result){
    this.setState({pacientes: result['data']['pacientes']})
    console.log(this.state.pacientes);
  }
  componentDidMount(){
    this.load_data();
  }
  render(){
    return(
    <div><p>Pacientes</p>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>

        {this.state.pacientes.map(paciente =>
          <tr key = {paciente.id}>
            <td> {paciente.nombre} <br/> </td>
          </tr>
        )}
        </tbody>
      </table>
      <form onSubmit={this.add}>
        <br/>
        <input type="text" name="nombre" ref={node => {this.nombre_nuevo = node}}/>
        <button type="onSubmit">Añadir Paciente</button>
      </form>
    </div>
    );
  }
}
export default Pacientes;
