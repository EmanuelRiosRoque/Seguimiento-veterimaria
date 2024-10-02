import { Patient } from '../types'
import PatientDetailItem from './PatientDetailItem'
import { usePacientStore } from '../store'
import { toast } from 'react-toastify'

type PatientsDetailProps = {
    patient: Patient
}


export default function PatientsDetail({patient} : PatientsDetailProps) {

    const deletePatient = usePacientStore((state) => state.deletePatient)
    const getPatientById = usePacientStore((state) => state.getPatientById)
    const handleClick = () => {
        deletePatient(patient.id)
        toast.error('Paciente eliminado')
    }
  return (
    <div className='px-5 py-10 mx-5 my-10 bg-white shadow-md rounded-xl'>
        
        <PatientDetailItem label='ID' data={patient.id} />
        <PatientDetailItem label='Nombre' data={patient.name} />
        <PatientDetailItem label='Propietario' data={patient.caretaker} />
        <PatientDetailItem label='Email' data={patient.email} />
        <PatientDetailItem label='Fecha Alta' data={patient.date.toString()} />
        <PatientDetailItem label='Sintomas' data={patient.symptoms} />


        <div className='flex flex-col justify-between gap-3 mt-10 md:flex-row'>
            <button
                type='button' 
                className='px-10 py-2 font-bold text-white uppercase bg-indigo-600 rounded-lg hover:bg-indigo-700'
                onClick={()=> getPatientById(patient.id)}
            >
                Editar
            </button>

            <button
                type='button' 
                className='px-10 py-2 font-bold text-white uppercase bg-red-600 rounded-lg hover:bg-red-700'
                onClick={handleClick}
            >
                Eliminar 
            </button>
        </div>

    </div>
  )
}
