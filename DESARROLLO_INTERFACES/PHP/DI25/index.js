function obtenerVista(controlador, metodo, destino) {
    let parametros = "controlador=" + controlador + "& metodo=" + metodo
    let opciones =  {method: "GET",};
    fetch("CFrontal.php?" + parametros, opciones)
        .then(res =>{
            if (res.ok) {
                return res.text();
             }
        })
        .then(vista =>{
            document.getElementById(destino).innerHTML = vista;
        })
        .catch(err =>{
            document.getElementById(destino).innerHTML = 'Se ha producido un error, vuelva a intertarlo';
        })

} //FIN obtenerVista