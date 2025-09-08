import { fetchJSON } from "./fetch-utils.js";

//Devuelve un arreglo de alojamientos(de tipo objeto)
export async function fetchAlojamientos() {
  const alojamientos = await fetchJSON("../json/alojamientos.json");
  if (!alojamientos) {
    return;
  } else {
    return alojamientos;
  }
}

export function filtrarAlojamientosPorPresupuesto(
  alojamientosArr,
  presupuesto
) {
  //Filtra solo los alojamientos acorde al presupuesto
  const alojamientosFiltrados = alojamientosArr.filter(
    (alojamiento) => alojamiento.precio <= presupuesto
  );

  //Ordena los alojamientos filtrados de menor a mayor
  alojamientosFiltrados.sort((a, b) => a.precio - b.precio);

  return alojamientosFiltrados;
}
