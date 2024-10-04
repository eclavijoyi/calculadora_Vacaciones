const trabajadores = [];

// Evento para calcular las vacaciones
document.getElementById("fechaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const dias = parseInt(document.getElementById("dias").value);

  if (nombre === "" || fecha === "" || isNaN(dias)) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Limpiar campos del formulario
  document.getElementById("nombre").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("dias").value = "";

  // Función para formatear fechas en DD/MM/YYYY
  const formatearFecha = (fecha) => {
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  // Crear objeto Date
  const fechaParts = fecha.split("/");
  const fechaObj = new Date(
    `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`
  );

  if (isNaN(fechaObj.getTime())) {
    alert("Fecha inválida. Por favor ingresa una fecha válida.");
    return;
  }

  // Sumar los días
  fechaObj.setDate(fechaObj.getDate() + dias);

  // Ajustar al lunes más cercano
  const dayOfWeek = fechaObj.getDay();
  let lunesCercano = new Date(fechaObj);

  if (dayOfWeek === 0) {
    // Si es domingo, sumamos 1 día
    lunesCercano.setDate(fechaObj.getDate() + 1);
  } else if (dayOfWeek > 1) {
    // Si es martes (2) a sábado (6), sumamos hasta el siguiente lunes
    lunesCercano.setDate(fechaObj.getDate() + (8 - dayOfWeek));
  }

  // Sumar 7 días al lunes más cercano
  const lunesFin = new Date(lunesCercano);
  lunesFin.setDate(lunesFin.getDate() + 7);

  // Agregar el trabajador al array
  trabajadores.push({
    nombre,
    inicio: formatearFecha(lunesCercano),
    final: formatearFecha(lunesFin),
  });

  // Mostrar todos los resultados en la tabla
  const resultado = document
    .getElementById("resultado")
    .getElementsByTagName("tbody")[0];
  resultado.innerHTML = ""; // Limpiar resultados anteriores

  // Insertar cada trabajador en la tabla
  trabajadores.forEach((trabajador) => {
    const row = resultado.insertRow();
    row.insertCell(0).innerText = trabajador.nombre;
    row.insertCell(1).innerText = trabajador.inicio;
    row.insertCell(2).innerText = trabajador.final;
  });
});

// Función para exportar a Excel
document.getElementById("exportButton").addEventListener("click", function () {
  // Crear un nuevo libro y hoja
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(
    trabajadores.map((trabajador) => ({
      Nombre: trabajador.nombre,
      Inicio: trabajador.inicio,
      Final: trabajador.final,
    }))
  );

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(wb, ws, "Vacaciones");

  // Guardar el archivo
  XLSX.writeFile(wb, "vacaciones.xlsx");
});

// Función para limpiar la tabla y los campos
document.getElementById("clearButton").addEventListener("click", function () {
  // Limpiar campos del formulario
  document.getElementById("nombre").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("dias").value = "";

  // Limpiar la lista de trabajadores
  trabajadores.length = 0;

  // Limpiar la tabla
  const resultado = document
    .getElementById("resultado")
    .getElementsByTagName("tbody")[0];
  resultado.innerHTML = ""; // Limpiar resultados anteriores
});
