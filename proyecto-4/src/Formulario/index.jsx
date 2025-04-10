import React, { useState } from 'react';
import { URL_BACKEND } from '../common/servers';

const Formulario = ({ obtenerDatos }) => {
  const [tarea, setTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  
  const cargarDatos = async (nuevaTarea) => {
    try {
      const response = await fetch(URL_BACKEND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaTarea)
      });
      
      if (response.status === 201) {
        alert("Tarea creada");
        obtenerDatos(); // Llama a obtenerDatos para actualizar la lista de tareas desde el servidor
      }
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };
  
  const eventoFormulario = (evt) => {
    evt.preventDefault();
    // Crear nueva tarea
    const nuevaTarea = {
      title: tarea,
      description: descripcion,
      status: "incomplete" // Asegurarse de que las nuevas tareas sean incomplete
    };
    cargarDatos(nuevaTarea);
    // Limpia el formulario
    setTarea("");
    setDescripcion("");
  };
  
  return (
    <>
      <form onSubmit={eventoFormulario} className='flex flex-column col-9 shadow p-3 rounded mt-4'>
        <h2 className='text-center mt-3'>To - do List</h2>
        <div className='input-group mb-3 col-12'>
          <label className='input-group-text'>
            <i className='bi bi-list-task me-1'></i>
          </label>
          <input
            type="text"
            placeholder='Tarea'
            onChange={(evt) => setTarea(evt.target.value)}
            value={tarea}
            className='form-control'
            required
          />
        </div>
        <div className='input-group mb-3 col-12'>
          <label className='input-group-text'>
            <i className='bi bi-chat me-1'></i>
          </label>
          <input
            type="text"
            onChange={(evt) => setDescripcion(evt.target.value)}
            value={descripcion}
            placeholder='Desplegar app en react'
            className='form-control'
            required
          />
        </div>
        <button className='btn btn-dark col-12'>Agregar</button>
      </form>
    </>
  );
};

export default Formulario;