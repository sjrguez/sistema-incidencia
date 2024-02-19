
export function compareObjects(objeto1: any,  objeto2: any) {
    const cambios = {};

    // Comparamos las claves del primer objeto
    for (const clave in objeto1) {
        if (objeto1.hasOwnProperty(clave)) {
            // Si la clave no está en el segundo objeto o los valores son diferentes
            if (!objeto2.hasOwnProperty(clave) || objeto1[clave] !== objeto2[clave]) {
                cambios[clave] = objeto2[clave];
            }
        }
    }

    // Comparamos las claves del segundo objeto
    for (const clave in objeto2) {
        if (objeto2.hasOwnProperty(clave) && !objeto1.hasOwnProperty(clave)) {
            cambios[clave] = objeto2[clave];
        }
    }

    return cambios;
}