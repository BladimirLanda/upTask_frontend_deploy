//COMPONENT DROP TASK

import { useDroppable } from "@dnd-kit/core"

/*
npm install @dnd-kit/core
La librería core de dnd-kit es una de las soluciones modernas y accesibles
para implementar drag and drop (arrastrar y soltar) en aplicaciones React.
Es el paquete base de dnd-kit que te proporciona:
    -Los contextos, sensores y lógica fundamental para detectar y manejar 
    interacciones de arrastrar y soltar.
    -Hooks como useDraggable(), useDroppable(), DndContext, etc.
🔸Básicamente: es el motor o "core" que permite hacer drag and drop en React, 
sobre el que se puede construir componentes personalizados o usar otros paquetes 
de la misma familia @dnd-kit/sortable, @dnd-kit/accessibility, etc.
*/

//Type
type DropTaskProps = {
    status: string
}

function DropTask( { status } : DropTaskProps ) {
    //dnd-kit
    /*
    Elemento "zona de soltado" (droppable)
    Propiedad	¿Qué hace?
    isOver      Es un booleano que indica si en ese momento hay un draggable encima de esa drop zone. 
                Sirve para cambiar estilos, animaciones o cualquier lógica visual/interactiva cuando 
                se está arrastrando algo sobre esa zona.
    setNodeRef  Es una función que se asigna al ref del elemento HTML donde quieres que ocurra el drop. 
                Esto le dice a dnd-kit: “esta es la zona válida para soltar elementos”.
    */
    const { isOver, setNodeRef } = useDroppable( {id: status} );

    const style = {
        opacity: isOver ? 0.4 : undefined
    }

    //---VIEW---//
    return (
        <div className="mt-5 p-2 border text-xs font-semibold uppercase grid place-content-center 
        border-dashed border-slate-500 text-slate-500"
            style={style}
            ref={setNodeRef}
        >
            Soltar tarea aquí
        </div>
    )
}

export default DropTask