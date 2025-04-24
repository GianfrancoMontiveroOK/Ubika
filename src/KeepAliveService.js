// src/KeepAliveService.js
import { useEffect } from 'react';
import { keepAliveRequest } from './api/auth'; // Asegúrate de que esta función esté correctamente implementada

const KeepAliveService = () => {

  useEffect(() => {
    const keepAliveInterval = 300000; // 5 minutos (300000 ms)

    const keepServerAlive = async () => {
      try {
        await keepAliveRequest();
        console.log('Servidor backend mantenido activo.');
      } catch (error) {
        console.error('Error en keep-alive:', error);
      }
    };

    // Iniciar el intervalo para mantener el servidor activo
    const intervalId = setInterval(keepServerAlive, keepAliveInterval);

    // Llamar a la función inmediatamente para la primera solicitud
    keepServerAlive();

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return null; // Este componente no necesita renderizar nada
};

export default KeepAliveService;
