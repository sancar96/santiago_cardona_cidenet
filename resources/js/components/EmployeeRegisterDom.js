import React from 'react';
import ReactDOM from 'react-dom';

function updateRegisterDate(){
    let currentDate = new Date();
    let day = (currentDate.getDate() < 10) ? "0"+currentDate.getDate() : currentDate.getDate();
    let month = ((currentDate.getMonth()+1) < 10) ? "0"+(currentDate.getMonth()+1) : (currentDate.getMonth()+1);
    let year = currentDate.getFullYear();

    let hours = (currentDate.getHours() < 10) ? "0"+currentDate.getHours() : currentDate.getHours();
    let minutes = (currentDate.getMinutes() < 10) ? "0"+currentDate.getMinutes() : currentDate.getMinutes();
    let seconds = (currentDate.getSeconds() < 10) ? "0"+currentDate.getSeconds() : currentDate.getSeconds();

    let registerDateDom = document.getElementById("register_date");
    if(registerDateDom){
        registerDateDom.value = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
}

setInterval(() => { updateRegisterDate(); }, 1000);

function handleSubmit(event) {
    event.preventDefault();
    let dataEmployee = {
        first_ape: event.target.first_ape.value,
        second_ape: event.target.second_ape.value,
        first_name: event.target.first_name.value,
        other_name: event.target.other_name.value,
        employ_country: event.target.employ_country.value,
        ide_type: event.target.ide_type.value,
        ide_num: event.target.ide_num.value,
        email: event.target.email.value,
        login_date: event.target.login_date.value,
        area: event.target.area.value,
        status: event.target.status.value,
        register_date: event.target.register_date.value,
    };
    
    axios.post('save.employee', dataEmployee)
      .then(function (response) {
        if(response.data.status == 200){
            alert(response.data.message);
            location.reload();
        }else{
            alert(response.data.message.errorInfo[2]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

function generateEmailCidenet(event){
    //<PRIMER_NOMBRE>.<PRIMER_APELLIDO>.<ID>@<DOMINIO>
    let firstName = document.getElementById("first_name").value;
    let firstApe = document.getElementById("first_ape").value.replaceAll(" ","");
    let email = document.getElementById("email");
    let country = event.target.value;
    let newEmail = "", domain = "";

    if(country == "Colombia"){
        newEmail = firstName+"."+firstApe;
        domain = "@cidenet.com.co";
    }else{
        newEmail = firstName+"."+firstApe;
        domain = "@cidenet.com.us";
    } 
    
    axios.post('validate.email', {newEmail, domain}).then(function (response) {
        let increment = response.data.increment;
        if(country == "Colombia"){
            if(!increment){
                email.value = firstName+"."+firstApe+"@cidenet.com.co";
            }else{
                email.value = firstName+"."+firstApe+"."+increment+"@cidenet.com.co";
            }            
        }else{
            if(!increment){
                email.value = firstName+"."+firstApe+"@cidenet.com.us";
            }else{
                email.value = firstName+"."+firstApe+"."+increment+"@cidenet.com.us";
            } 
        }

    }).catch(function (error) {
        console.log(error);
    });
    
       
}

function validateInputString(e){
    let currentElement = e.target;
    let inputType = currentElement.getAttribute("data-type-input");
    let inputLong = currentElement.getAttribute("data-long-input");
    let domError = document.getElementById(currentElement.getAttribute("data-dom-error"));
    let errorMessage = "";
    let flagError = false;

    //Validacion caracteres especiales, espacios en blanco y numeros
    if(inputType == "string"){
        if (/[^a-zA-Z]/.test(currentElement.value)){
            errorMessage += `- El input no puede contener caracteres especiales, números o espacios.<br>`;
            flagError = true;
        }
    }else if(inputType == "stringWithSpace"){//Validacion caracteres especiales y numeros
        if (/[^a-zA-Z\s]/.test(currentElement.value)){
            errorMessage += `- El input no puede contener caracteres especiales o números.<br>`;
            flagError = true;
        }
    }else if(inputType == "superString"){
        if (/[^a-zA-Z0-9\-\s]/.test(currentElement.value)){
            errorMessage += `- El input no puede contener caracteres especiales.<br>`;
            flagError = true;
        }
    }

    //Validacion la longitud
    if(currentElement.value.length > inputLong){
        errorMessage += `- El input tiene demasiados caracteres (${currentElement.value.length}/${inputLong}).`;
        flagError = true;
    }

    domError.innerHTML = errorMessage;
    
}

function EmployeeRegisterDom() {
    return (
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-2">
                        <div className="col">
                            <label htmlFor="first_ape" className="form-label">Primer Apellido</label>
                            <input type="text" 
                                data-type-input="stringWithSpace" 
                                data-long-input="20"  
                                data-dom-error="firstApeHelp"
                                className="form-control"
                                name='first_ape' 
                                id="first_ape" 
                                onKeyUp={validateInputString} required/>
                            <div id="firstApeHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className="col">
                            <label htmlFor="second_ape" className="form-label">Segundo Apellido</label>
                            <input type="text" 
                                data-type-input="stringWithSpace" 
                                data-long-input="20"  
                                data-dom-error="secondApeHelp"
                                className="form-control" 
                                name="second_ape" 
                                id="second_ape" 
                                onKeyUp={validateInputString} required/>
                            <div id="secondApeHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label htmlFor="first_name" className="form-label">Primer Nombre</label>
                            <input type="text" 
                                data-type-input="string" 
                                data-long-input="20"  
                                data-dom-error="firstNameHelp"
                                className="form-control"
                                name="first_name"
                                id="first_name"
                                onKeyUp={validateInputString} required/>
                            <div id="firstNameHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className="col">
                            <label htmlFor="other_name" className="form-label">Otros Nombres</label>
                            <input type="text" 
                                data-type-input="stringWithSpace" 
                                data-long-input="50"  
                                data-dom-error="otherNameHelp"
                                className="form-control"
                                name="other_name"  
                                id="other_name" 
                                onKeyUp={validateInputString}/>
                            <div id="otherNameHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className='col'>
                            <label htmlFor="employ_country" className="form-label">País del Empleo</label>
                            <select className="form-select" 
                                name='employ_country' 
                                id='employ_country' 
                                defaultValue={'DEFAULT'} 
                                data-dom-error="countryHelp" 
                                onChange={generateEmailCidenet} required
                            >
                                <option value="DEFAULT" disabled>-Seleccione-</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Estados Unidos">Estados Unidos</option>
                            </select>
                            <div id="countryHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label htmlFor="ide_type" className="form-label">Tipo de Identificación</label>
                            <select className="form-select" 
                                name='ide_type' 
                                id='ide_type' 
                                defaultValue={'DEFAULT'} 
                                data-dom-error="ideTypeHelp" required>
                                <option value="DEFAULT" disabled>-Seleccione-</option>
                                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Permiso Especial">Permiso Especial</option>
                            </select>
                            <div id="ideTypeHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className="col">
                            <label htmlFor="ide_num" className="form-label">Número de Identificación</label>
                            <input type="text" 
                                data-type-input="superString" 
                                data-long-input="20"  
                                data-dom-error="ideNumHelp"
                                className="form-control" 
                                name="ide_num"
                                id="ide_num" 
                                onKeyUp={validateInputString} required/>
                            <div id="ideNumHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className="col">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="text"  
                                data-dom-error="emailHelp"
                                className="form-control" 
                                name="email"
                                id="email" readOnly/>
                            <div id="emailHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label htmlFor="login_date" className="form-label">Fecha de Ingreso</label>
                            <input type="text"  
                                data-dom-error="loginDateHelp"
                                className="form-control" 
                                name="login_date"
                                id="login_date"/>
                            <div id="loginDateHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className="col">
                            <label htmlFor="area" className="form-label">Área</label>
                            <select className="form-select" 
                                name='area' 
                                id='area' 
                                defaultValue={'DEFAULT'} 
                                data-dom-error="areaHelp" required>
                                <option value="DEFAULT" disabled>-Seleccione-</option>
                                <option value="Administración">Administración</option>
                                <option value="Financiera">Financiera</option>
                                <option value="Compras">Compras</option>
                                <option value="Infraestructura">Infraestructura</option>
                                <option value="Operación">Operación</option>
                                <option value="Talento Humano">Talento Humano</option>
                                <option value="Servicios Varios">Servicios Varios</option>
                            </select>
                            <div id="areaHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className="col">
                            <label htmlFor="status" className="form-label">Estado</label>
                            <input type="text"  
                                data-dom-error="statusHelp"
                                className="form-control" 
                                name="status"
                                id="status" value="Activo" readOnly/>
                            <div id="statusHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                        <div className="col">
                            <label htmlFor="register_date" className="form-label">Fecha y Hora de Registro</label>
                            <input type="text"  
                                data-dom-error="registerDateHelp"
                                className="form-control" 
                                name="register_date"
                                id="register_date" readOnly/>
                            <div id="registerDateHelp" className="form-text" style={{color:"red"}}></div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Empleado</button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeRegisterDom;
if (document.getElementById('EmployeeRegisterComponent')) {
    ReactDOM.render(<EmployeeRegisterDom />, document.getElementById('EmployeeRegisterComponent'));
}