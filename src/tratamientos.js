import React, {Component} from 'react';
import axios from 'axios';
const URL_BASE = 'https://localhost/factura_monjas/API';
axios.defaults.withCredentials = true;
class Tratamientos extends Component {
  constructor(props){
    super(props);
    let years = [];
    let months = [];
    for(let i=2020;i<2030;i++){
      years.push(i);
    }
    for(let i=1;i<=12;i++){
      months.push(i);
    }
    this.state = {tratamientos: [],pacientes:[],lista_tratamientos:[],years:years,months:months}
    this.add = this.add.bind(this);
    this.generar_factura = this.generar_factura.bind(this);
    this.generar_factura_d = this.generar_factura_d.bind(this);
  }
  componentDidMount(){
    this.load_data();
  }
  add(event){
    axios.post(URL_BASE+'/add_tratamiento',{paciente:this.paciente_nuevo.value,tratamiento:this.tratamiento_nuevo.value})
      .then(result => this.load_data());
    event.preventDefault();
  }
  generar_factura(event){
    const FileDownload = require('js-file-download')

    axios.get(URL_BASE+'/generar_factura').then((response) => {
      let filename = response.headers["content-disposition"].split("filename=")[1];
      FileDownload(response.data,filename);console.log();});
    event.preventDefault();
  }
  generar_factura_d(event){
    const FileDownload = require('js-file-download')

    axios.post(URL_BASE+'/generar_factura_mes',{year:this.year.value,month:this.month.value}).then((response) => {
      let filename = response.headers["content-disposition"].split("filename=")[1];
      FileDownload(response.data,filename);console.log();});
    event.preventDefault();
  }
  load_data(){
    axios.get(URL_BASE+'/visualizar_tratamientos')
      .then(result => this.set_data_t(result))
    axios.get(URL_BASE+'/list_pacientes')
      .then(result => this.set_data_p(result))
    axios.get(URL_BASE+'/list_tratamientos')
      .then(result => this.set_data_lt(result))
  }
  set_data_t(result){
    this.setState({tratamientos: result['data']['tratamientos']})
  }
  set_data_p(result){
    this.setState({pacientes: result['data']['pacientes']})
  }
  set_data_lt(result){
    this.setState({lista_tratamientos: result['data']['tratamientos']});
  }
  render(){
    return(
      <div><p>Tratamientos</p>
        <form onSubmit={this.add}>
          <p>Paciente:</p>
          <select name="paciente" ref={node => {this.paciente_nuevo = node}}>
            {this.state.pacientes.map(paciente =>
              <option value={paciente.nombre}>{paciente.nombre}</option>
            )}
          </select>
          <p>Tratamiento:</p>
          <select name="tratamiento" ref={node => {this.tratamiento_nuevo = node}}>
            {this.state.lista_tratamientos.map(tratamiento =>
              <option value={tratamiento.nombre}>{tratamiento.nombre}</option>
            )}
          </select>
          <button type="onSubmit">Añadir Tratamiento</button>
        </form>
        <form onSubmit={this.generar_factura}>
          <button type="onSubmit">generar_factura</button>
        </form>
        <form onSubmit={this.generar_factura_d}>
          <select name="year" ref={node => {this.year = node}}>
          {this.state.years.map(year =>
            <option value={year}>{year}</option>
          )}
          </select>
          <select name="month" ref={node => this.month = node}>
          {this.state.months.map(month =>
            <option value={month}>{month}</option>
          )}
          </select>
          <button type="onSubmit">generar_factura</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Tratamiento</th><th>Paciente</th><th>Fecha</th>
            </tr>
          </thead>
          <tbody>
          {this.state.tratamientos.map(tratamiento =>
            <tr >
              <td> {tratamiento.nombre_tratamiento}</td>
              <td> {tratamiento.nombre_paciente} </td>
              <td> {tratamiento.fecha}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}
export default Tratamientos;
