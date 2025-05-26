//UTILS GENERAL

//DATE
export function formatDate(isoString : string) : string {
    const date = new Date(isoString);
    //Intl: API de Internacionalización de formateo de lenguaje
    //.NumberFormat(): Formateo de fechas
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    //.format(): Método de formateo pre-configurado
    return formatter.format(date);
}