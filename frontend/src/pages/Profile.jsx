import { useState, useEffect } from "react"
import { profile } from "../services/profileService";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [userInfo, setUserInfo] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    genero: "",
    fechaNacimiento: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile();
        const { data } = response;
        setUserInfo({
          nombres: data.names,
          apellidos: data.last_names,
          correo: data.email,
          genero: data.gender,
          fechaNacimiento: data.birthday,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 p-4 justify-center">
      <div className="w-full md:w-1/4 bg-black p-4 rounded-3xl flex flex-col text-white items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtD5YlDWhxT9GvhYoGuGo67l7cnac6CzZ7XA&s"
          className="w-40 h-40 rounded-full mb-5"
        />
        <h2 className="text-lg font-bold">Información Personal</h2>
        <p>Nombres: {userInfo.nombres}</p>
        <p>Apellidos: {userInfo.apellidos}</p>
        <p>Correo: {userInfo.correo}</p>
        <p>Género: {userInfo.genero === "M" ? "Masculino" : userInfo.genero === "F" ? "Femenino" : "Otro"}</p>
        <p>Fecha nacimiento: {userInfo.fechaNacimiento}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Editar Perfil
        </button>
      </div>

      <div className="w-full md:w-1/2 bg-green-200 p-4 rounded">
        <h2 className="text-lg font-bold">Preferencias</h2>
        <p>Gustos: Mascotas, Lectura, Programación</p>
        <p>Idioma: Español</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Editar Información</h2>
            <form>
              <label className="block mb-2 text-sm font-medium">
                Nombres:
                <input
                  type="text"
                  name="nombres"
                  className="block w-full p-2 border rounded mt-1"
                  value={userInfo.nombres}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Apellidos:
                <input
                  type="text"
                  name="apellidos"
                  className="block w-full p-2 border rounded mt-1"
                  value={userInfo.apellidos}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Correo:
                <input
                  type="email"
                  name="correo"
                  className="block w-full p-2 border rounded mt-1"
                  value={userInfo.correo}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Género:
                <select
                  name="genero"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  value={userInfo.genero}
                  onChange={handleChange}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="Otro">Bombastik</option>
                </select>
              </label>
              <label>
                Fecha nacimiento:
                <input
                  name="fechaNacimiento"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="date"
                  value={userInfo.fechaNacimiento}
                  onChange={handleChange}
                />
              </label>

              {/* Botones */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )
      }
    </div>
  )
}