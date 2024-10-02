import { useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Error from './Error';
import type { DraftPatient } from '../types';
import { usePacientStore } from '../store';



export default function PatientForm() {

    const { addPatient } = usePacientStore()
    const activeId = usePacientStore(state => state.activeId)
    const pacients = usePacientStore(state => state.pacients)
    const updatePacients = usePacientStore(state => state.updatePatient)

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>()

    useEffect(() => {
        if (activeId) {
            const activePatient = pacients.filter(patient => patient.id === activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('date', activePatient.date)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])

    
    const registerPatient = (data:DraftPatient) => {
        if (activeId) {
            updatePacients(data)
            toast.success('Paciente Actualizado Correctamente')
        } else {
            addPatient(data)
            toast.success('Paciente Registrado Correctamente')
        }
        reset()
    }


    return (
        <div className="mx-5 md:w-1/2 lg:w-2/5">
            <h2 className="text-3xl font-black text-center">Seguimiento Pacientes</h2>

            <p className="mt-5 mb-10 text-lg text-center">
                Añade Pacientes y {''}
                <span className="font-bold text-indigo-600">Administralos</span>
            </p>

            <form
                className="px-5 py-10 mb-10 bg-white rounded-lg shadow-md"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm font-bold uppercase">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: 'El nombre del paciente es obligatorio',
                        })}
                    />

                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}

                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm font-bold uppercase">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: 'El Propietario es obligatorio',
                        })}
                    />
                    {errors.caretaker && (
                        <Error>{errors.caretaker?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm font-bold uppercase">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3 border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es Obligatorio",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email No Válido'
                            }
                        })} 
                    />

                    {errors.email && (
                        <Error>{errors.email?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm font-bold uppercase">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3 border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'La Fecha de alta es obligatorio',
                        })}
                    />

                    {errors.date && (
                        <Error>{errors.date?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm font-bold uppercase">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3 border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: 'Los sintomas son obligatorio',
                        })}
                    />

                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message}</Error>
                    )}
                </div>

                <input
                    type="submit"
                    className="w-full p-3 font-bold text-white uppercase transition-colors bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                    value='Guardar Paciente'
                />
            </form>
        </div>
    )
}