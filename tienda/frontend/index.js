// index.js
// Este archivo se encarga de inicializar la aplicación y cargar los scripts necesarios

// Función para inicializar la aplicación
function initApp() {
    console.log('Aplicación inicializada');
    
    // Aquí puedes cargar cualquier otro script o inicializar componentes adicionales
    // Por ejemplo, cargar el script principal
    loadScript('script.js');
  }
  
  // Función para cargar scripts dinámicamente
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    document.head.appendChild(script);
  }
  
  // Ejecutar la inicialización cuando se cargue el DOM
  document.addEventListener('DOMContentLoaded', initApp);