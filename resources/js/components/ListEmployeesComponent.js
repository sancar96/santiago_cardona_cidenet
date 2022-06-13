import React from 'react';
import ReactDOM from 'react-dom';

function getEmployees(){
    axios.get('list.employees').then(function (response) {
        if(response.data.status == 200){
            let employees = response.data.employees;
            generateHtmlListEmployees(employees);
        }else{
            alert(response.data.message.errorInfo[2]);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function deleteEmployee(event){
    let id = event.target.dataset.id;
    let text = "Está seguro de que desea eliminar el empleado?";
    if (confirm(text) == true) {
        axios.post('delete.employee', {id}).then(function (response) {
            if(response.data.status == 200){
                alert(response.data.message);
                getEmployees();
            }else{
                alert(response.data.message.errorInfo[2]);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
        text = "You canceled!";
    }
}

function generateHtmlListEmployees(data){
    let table_employees = document.getElementById("body_table_employees");
    let htmlDOM = "";
    Object.keys(data).map(key => 
        htmlDOM += `<tr>
                        <td>${data[key].first_name} ${data[key].other_name}</td>
                        <td>${data[key].first_ape} ${data[key].second_ape}</td>
                        <td>${data[key].ide_num}</td>
                        <td>${data[key].employ_country}</td>
                        <td>${data[key].email}</td>
                        <td>${data[key].status}</td>
                        <td>
                            <a type="button" class="btn btn-primary" href="./editarempleado/${data[key].id}">Editar</a>
                            <button type="button" class="btn btn-danger deleteEmployee" data-id="${data[key].id}">Eliminar</button>
                        </td>
                    </tr>`
    );
    table_employees.innerHTML = htmlDOM;
    let deleteEmployeeButton = document.getElementsByClassName("deleteEmployee");
    Object.keys(deleteEmployeeButton).map(key => 
        deleteEmployeeButton[key].addEventListener("click", deleteEmployee, false)
    );    
}

function handleSubmit(event) {
    event.preventDefault();
    let ide_type = (event.target.ide_type.value == "DEFAULT") ? "" : event.target.ide_type.value;
    let employ_country = (event.target.employ_country.value == "DEFAULT") ? "" : event.target.employ_country.value;
    let status = (event.target.status.value == "DEFAULT") ? "" : event.target.status.value;
    let dataSearch = {
        first_name: event.target.first_name.value,
        other_name: event.target.other_name.value,
        first_ape: event.target.first_ape.value,
        second_ape: event.target.second_ape.value,
        email: event.target.email.value,
        ide_type: ide_type,
        ide_num: event.target.ide_num.value,
        employ_country: employ_country,
        status: status
    };
    axios.post('filter.employees', dataSearch).then(function (response) {
        if(response.data.status == 200){
            let employees = response.data.employees;
            generateHtmlListEmployees(employees); 
        }else{
            alert(response.data.message.errorInfo[2]);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function ListEmployeesComponent() {
    getEmployees();
    return (
        <div className="container">
            <div className="row">
                <h2>Listado de Empleados</h2>
                <form onSubmit={handleSubmit} className="mb-3">
                    <div className="row mb-2">
                        <div className="col">
                            <input type="text" className="form-control" name='first_name' id="first_name" placeholder='Primer Nombre'/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" name='other_name' id="other_name" placeholder='Otros Nombres'/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" name='first_ape' id="first_ape" placeholder='Primer Apellido'/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" name='second_ape' id="second_ape" placeholder='Segundo Apellido'/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" name='email' id="email" placeholder='Correo Electronico'/>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <select className="form-select" name='ide_type' id='ide_type' defaultValue={'DEFAULT'}>
                                <option value="DEFAULT">-Tipo de Identificación-</option>
                                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Permiso Especial">Permiso Especial</option>
                            </select>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" name='ide_num' id="ide_num" placeholder='Número de Identificación'/>
                        </div>
                        <div className="col">
                            <select className="form-select" name='employ_country' id='employ_country' defaultValue={'DEFAULT'}>
                                <option value="DEFAULT">-País del empleo-</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Estados Unidos">Estados Unidos</option>
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" name='status' id='status' defaultValue={'DEFAULT'}>
                                <option value="DEFAULT">-Estado-</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary form-control">Buscar</button>
                        </div>
                    </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Identificación</th>
                            <th scope="col">País Empleo</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Estado</th>
                            <th scope="col" colSpan='2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id='body_table_employees'>
                        <tr><th colSpan='6' style={{textAlign:"center"}}>Cargando...</th></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeesComponent
if (document.getElementById('ListEmployeesComponent')) {
    ReactDOM.render(<ListEmployeesComponent />, document.getElementById('ListEmployeesComponent'));
}