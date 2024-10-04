document.getElementById('fechaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const fechaInput = document.getElementById('fecha').value;
    const dias = parseInt(document.getElementById('dias').value);

    // Validar formato de fecha DD/MM/YYYY
    const fechaParts = fechaInput.split('/');
    if (fechaParts.length !== 3 || fechaParts[2].length !== 4) {
        alert('Por favor, ingresa una fecha en formato DD/MM/YYYY');
        return;
    }

    // Crear objeto Date con la fecha ingresada
    const fecha = new Date(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`);

    // Sumar días a la fecha
    fecha.setDate(fecha.getDate() + dias);

    // Ajustar al lunes más cercano
    const dayOfWeek = fecha.getDay();
    let lunesCercano;
    
    if (dayOfWeek === 1) {
        // Si es lunes, no se hace nada
        lunesCercano = fecha;
    } else if (dayOfWeek <= 3) {
        // Si estamos entre martes y jueves, ajustamos al lunes anterior
        lunesCercano = new Date(fecha);
        lunesCercano.setDate(fecha.getDate() - dayOfWeek + 1);
    } else {
        // Si estamos entre viernes y domingo, ajustamos al lunes siguiente
        lunesCercano = new Date(fecha);
        lunesCercano.setDate(fecha.getDate() + (8 - dayOfWeek));
    }

    // Sumar 7 días al lunes más cercano para calcular el final del periodo
    const lunesFin = new Date(lunesCercano);
    lunesFin.setDate(lunesFin.getDate() + 7);

    // Formatear ambas fechas en DD/MM/YYYY
    const formatearFecha = (fecha) => {
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JS son 0 indexados
        const año = fecha.getFullYear();
        return `${dia}/${mes}/${año}`;
    };

    const fechaInicio = formatearFecha(lunesCercano);
    const fechaFin = formatearFecha(lunesFin);

    // Mostrar resultado
    document.getElementById('resultado').innerText = `Hola ${nombre}, tus vacaciones son del ${fechaInicio} hasta el ${fechaFin}`;
});
