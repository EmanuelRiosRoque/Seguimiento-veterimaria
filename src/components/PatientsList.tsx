import { usePacientStore } from "../store"
import PatientsDetail from "./PatientsDetail"



export default function PatientsList() {
  const patients = usePacientStore((state) => state.pacients)
  return (
    <div className="overflow-y-scroll md:w-1/2 lg:3/5 md:h-screen">
      {patients.length ? (
        <>
          <h2 className="text-3xl font-black text-center ">Listado de pacientes</h2>
          <p className="mt-5 mb-10 text-xl text-center ">
            Administra tus {''}
            <span className="font-bold text-indigo-600 ">Paxientes y citas</span>
          </p>

          {patients.map(patient => (
              <PatientsDetail
                key={patient.id}
                patient={patient}
                
              />
          ))}
        </>
      ) : (
        <>
        <h2 className="text-3xl font-black text-center ">No hay pacientes</h2>
        <p className="mt-5 mb-10 text-xl text-center ">
          Comienza agregando pacientes {''}
          <span className="font-bold text-indigo-600 ">y aparecerán en este lugar</span>
        </p>
        </>
      )}
    </div>
  )
}
