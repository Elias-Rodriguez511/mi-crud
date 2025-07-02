import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [evaluacionAEditar, setEvaluacionAEditar] = useState(null);

  useEffect(() => {
    const evaluacionesGuardadas = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    setEvaluaciones(evaluacionesGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
  }, [evaluaciones]);

  const agregarOActualizarEvaluacion = (evaluacion) => {
    if (evaluacionAEditar) {
      setEvaluaciones(
        evaluaciones.map((e) => (e.id === evaluacionAEditar.id ? { ...evaluacion, id: evaluacionAEditar.id } : e))
      );
      setEvaluacionAEditar(null);
    } else {
      setEvaluaciones([...evaluaciones, { ...evaluacion, id: Date.now() }]);
    }
  };

  const eliminarEvaluacion = (id) => {
    setEvaluaciones(evaluaciones.filter((e) => e.id !== id));
  };

  const editarEvaluacion = (evaluacion) => {
    setEvaluacionAEditar(evaluacion);
  };

  return (
    <div className="App">
      <h1 className="main-title">Evaluación de Alumnos</h1>
      <div className="form-container">
        <h2>{evaluacionAEditar ? 'Editar Evaluación' : 'Agregar Nueva Evaluación'}</h2>
        <Form
          agregarOActualizarEvaluacion={agregarOActualizarEvaluacion}
          evaluacionAEditar={evaluacionAEditar}
        />
      </div>
      <div className="list-container">
        <h2>Evaluaciones Guardadas</h2>
        {evaluaciones.length === 0 ? (
          <p>No hay evaluaciones guardadas.</p>
        ) : (
          <List
            evaluaciones={evaluaciones}
            eliminarEvaluacion={eliminarEvaluacion}
            editarEvaluacion={editarEvaluacion}
          />
        )}
      </div>
    </div>
  );
}

export default App;