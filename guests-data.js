/**
 * ================================================================
 * LISTA DE INVITADOS — Karen & Daniel
 * ================================================================
 * Generada a partir de tu archivo Invitados.xlsx (54 invitados).
 *
 * - acompanantesPermitidos = Acompañantes + Niños permitidos.
 * - acompanantesNombres = nombres que venían entre paréntesis en tu
 *   Excel junto al nombre de la familia. OJO: en varios casos esa
 *   lista incluye tanto al invitado principal como al acompañante
 *   (por eso a veces trae más nombres que "acompanantesPermitidos").
 *   Por seguridad, el sitio NO los muestra como acompañantes
 *   confirmados automáticamente — solo se usan como referencia si
 *   los editas tú a mano más adelante.
 *
 * Esta lista es la que se usa MIENTRAS no conectes Google Sheets en
 * vivo (ver guests-remote.js).
 *
 * Formato: { id: "gNN", nombre: "...", acompanantesPermitidos: N, acompanantesNombres: [...] },
 * El "id" es el código del enlace personalizado: tusitio.com/?inv=gNN
 * ================================================================
 */

let GUEST_LIST = [
  { id: "g01", nombre: "Familia Vasquez Perez (Sonia y Yesid)", acompanantesPermitidos: 1, acompanantesNombres: ["Sonia", "Yesid"] },
  { id: "g02", nombre: "Familia Vasquez Drada (Victor, sandra y sara)", acompanantesPermitidos: 2, acompanantesNombres: ["Victor", "Sandra", "Sara"] },
  { id: "g03", nombre: "Familia Solarte Garcia (Vanesa y Yeison)", acompanantesPermitidos: 1, acompanantesNombres: ["Vanesa", "Yeison"] },
  { id: "g04", nombre: "Ana Maria Vasquez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g05", nombre: "Lesly Perez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g06", nombre: "Raul Perez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g07", nombre: "Luzmila Perez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g08", nombre: "Yamir Perez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g09", nombre: "Santiago Ospina", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g10", nombre: "Juan David Ospna", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g11", nombre: "Familia Ospina Perez (Fabiola y Ramon)", acompanantesPermitidos: 1, acompanantesNombres: ["Fabiola", "Ramon"] },
  { id: "g12", nombre: "Yesica Perez", acompanantesPermitidos: 1, acompanantesNombres: [] },
  { id: "g13", nombre: "Eduar Perez y Mateo Perez", acompanantesPermitidos: 1, acompanantesNombres: [] },
  { id: "g14", nombre: "Luisa Perez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g15", nombre: "Familia Castro Tejada (Osman y Emely )", acompanantesPermitidos: 1, acompanantesNombres: ["Osman", "Emely"] },
  { id: "g16", nombre: "Michelle Cortez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g17", nombre: "Isabela Clavijo", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g18", nombre: "Carlos Mario Escobar", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g19", nombre: "Familia Bedoya Perez (Marcela y Esposo)", acompanantesPermitidos: 1, acompanantesNombres: ["Marcela", "Esposo"] },
  { id: "g20", nombre: "Didier Garcia", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g21", nombre: "Diana Meneses", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g22", nombre: "Nataly Guzman", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g23", nombre: "Victoria Sanchez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g24", nombre: "Familia Cruz (Hoover, Felipe, y Liliana)", acompanantesPermitidos: 2, acompanantesNombres: ["Hoover", "Felipe", "Liliana"] },
  { id: "g25", nombre: "Familia Rosero Montoya (Alfonso, Mariluz y Samuel)", acompanantesPermitidos: 2, acompanantesNombres: ["Alfonso", "Mariluz", "Samuel"] },
  { id: "g26", nombre: "Familia Rosero Perdomo (Jhon, Regina y Joaquin)", acompanantesPermitidos: 2, acompanantesNombres: ["Jhon", "Regina", "Joaquin"] },
  { id: "g27", nombre: "Laady Cardona (Laady y novio)", acompanantesPermitidos: 1, acompanantesNombres: ["Laady", "Novio"] },
  { id: "g28", nombre: "Familia Maldonado Ortiz (Valeria y Luis)", acompanantesPermitidos: 1, acompanantesNombres: ["Valeria", "Luis"] },
  { id: "g29", nombre: "Juan Manuel Soto", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g30", nombre: "David Trujillo", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g31", nombre: "Laura Chaleal", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g32", nombre: "Juliana Castillo", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g33", nombre: "Jesus Gomez", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g34", nombre: "Rocio Ospina", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g35", nombre: "Adiela Montoya", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g36", nombre: "Familia Diaz Escobar(willly, Lina, nicolle, sofia)", acompanantesPermitidos: 3, acompanantesNombres: ["Willly", "Lina", "Nicolle", "Sofia"] },
  { id: "g37", nombre: "Familia Diaz Eusse (Heberth, ximena y maria jose)", acompanantesPermitidos: 2, acompanantesNombres: ["Heberth", "Ximena", "Maria Jose"] },
  { id: "g38", nombre: "Familia Saavedra Diaz (paty, esposo, Salome y dominic)", acompanantesPermitidos: 3, acompanantesNombres: ["Paty", "Esposo", "Salome", "Dominic"] },
  { id: "g39", nombre: "Alba Montoya y Maicol Duque", acompanantesPermitidos: 1, acompanantesNombres: [] },
  { id: "g40", nombre: "Ancizar Montoya", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g41", nombre: "Armando Rosero", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g42", nombre: "Familia Erazo Rosero", acompanantesPermitidos: 2, acompanantesNombres: [] },
  { id: "g43", nombre: "Judith Perdomo", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g44", nombre: "Familia Portilla Rosero", acompanantesPermitidos: 1, acompanantesNombres: [] },
  { id: "g45", nombre: "Familia Rosero (Gabriel e hijo)", acompanantesPermitidos: 1, acompanantesNombres: ["Gabriel E Hijo"] },
  { id: "g46", nombre: "Familia Rosero Jimenez (Cristian, Marisol e hija)", acompanantesPermitidos: 2, acompanantesNombres: ["Cristian", "Marisol E Hija"] },
  { id: "g47", nombre: "Ruby Rosero y acompañante", acompanantesPermitidos: 1, acompanantesNombres: [] },
  { id: "g48", nombre: "Susana Rosero", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g49", nombre: "Familia Montoya Marin (Ana Silvia y Andres)", acompanantesPermitidos: 1, acompanantesNombres: ["Ana Silvia", "Andres"] },
  { id: "g50", nombre: "Ximena Rosero", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g51", nombre: "Familia Rosero Madroñero (Omar y enriqueta)", acompanantesPermitidos: 1, acompanantesNombres: ["Omar", "Enriqueta"] },
  { id: "g52", nombre: "Vanessa Rosero y Acompañante", acompanantesPermitidos: 1, acompanantesNombres: [] },
  { id: "g53", nombre: "Valentina Salazar", acompanantesPermitidos: 0, acompanantesNombres: [] },
  { id: "g54", nombre: "Luis Rengifo", acompanantesPermitidos: 0, acompanantesNombres: [] },
];

// Normaliza texto para comparar sin tildes / mayúsculas al buscar.
function normalizar(texto){
  return texto
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
