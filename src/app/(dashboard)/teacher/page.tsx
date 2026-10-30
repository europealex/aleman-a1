const TeacherPage = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">
          Profesor de Alemán con Gemini
        </h1>

        <p className="text-gray-600 mb-4">
          Bienvenido al panel del profesor.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="font-semibold">Lecciones</h2>
            <p>Gestiona las lecciones de alemán.</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="font-semibold">Estudiantes</h2>
            <p>Consulta el progreso de los estudiantes.</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <h2 className="font-semibold">Calendario</h2>
            <p>Próximas actividades y eventos.</p>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg">
            <h2 className="font-semibold">Anuncios</h2>
            <p>Mensajes importantes para la clase.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;   