//COMPONENT PROJECT FORM
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage"
import { ProjectFormData } from "types";

//Type
//Tipos inferidos de VSC
type ProjectFormType = {
    register: UseFormRegister<ProjectFormData>,
    errors: FieldErrors<ProjectFormData>
}

/*
register(name, {options}): Conecta el input con react-hook-form.
    -Este input se llama 'projectName' en el objeto de datos del formulario.
    -Y quiero que sea obligatorio (required).
    -Si no se llena, almacena el input, su tipo (required) y su mensaje en errors.

✅ El ... es el spread operator, porque register devuelve un objeto con varias 
propiedades y eventos (onChange, onBlur, ref, etc.) y se los pasa todos al <input>.
    -name
    -onChange: Detecta cambios en el input y actualiza el valor en react-hook-form
    -onBlur: Detecta cuándo se sale del input para validar o marcarlo como tocado
    -ref: Guarda la referencia al input en el DOM (para enfoque o lectura directa)
    -name: Identifica a qué campo pertenece el valor dentro del formulario

errors."inputName": Contiene los errores de validación para un input.
    -Es una forma de consultar si hay un error de validación para un campo.
*/
export default function ProjectForm( { register, errors } :  ProjectFormType ) {

    //---VIEW---//
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Nombre del Proyecto
                </label>

                <input
                    type="text"
                    id="projectName"
                    className="w-full p-3 border border-gray-200"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>

                <input
                    type="text"
                    id="clientName"
                    className="w-full p-3 border border-gray-200"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                
                <textarea
                    id="description"
                    className="w-full p-3 border border-gray-200"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}