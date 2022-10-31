import React, {Component} from 'react';
import axios from 'axios';
const URL_BASE = 'https://localhost/factura_monjas/API';
axios.defaults.withCredentials = true;
class ListaTratamientos extends Component {
  constructor(props){
    super(props);
    this.state = {tratamientos: []}
    this.add = this.add.bind(this);
  }
  add(event){
    axios.post(URL_BASE+'/add_list_tratamiento/',{nombre: this.nombre_nuevo.value}).then(result => this.load_data());
    event.preventDefault();
  }MainPage
  componentDidMount(){
    this.load_data();
  }
  load_data(){
    axios.get(URL_BASE+'/list_tratamientos')
    .then(result => this.set_data(result))
  }
  set_data(result){
    this.setState({tratamientos: result['data']['tratamientos']});
    console.log(this.tratamientos);
  }
  render(){
    return(
      <div><p>Tratamientos</p>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
          {this.state.tratamientos.map(tratamiento =>
              <tr key = {tratamiento.id}>
                <td> {tratamiento.nombre} <br/> </td>
              </tr>
          )}
          </tbody>
        </table>
        <form onSubmit={this.add}>
          <br/>
          <input type="text" name="nombre" ref={node => {this.nombre_nuevo = node}}/>
          <button type="onSubmit">Añadir Tratamiento</button>
        </form>
      </div>
    );
  }
}
export default ListaTratamientos;
