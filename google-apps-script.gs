/**
 * ================================================================
 * BACKEND REAL PARA LA INVITACIÓN — Karen & Daniel
 * ================================================================
 * Este script hace DOS cosas conectadas a tu Google Sheet:
 *
 *  1. doGet()  -> le entrega al sitio web la lista de invitados
 *                 (nombre + cuántos acompañantes tiene permitidos)
 *                 para que el formulario busque el nombre y sepa
 *                 si esa persona puede llevar acompañante.
 *  2. doPost() -> recibe cada confirmación del formulario y la
 *                 escribe en tu hoja, en las columnas "Confirmado"
 *                 y "Fecha de confirmación".
 *
 * ---------------- CÓMO INSTALARLO (5 minutos) ------------------
 * 1. Abre tu Google Sheet de invitados.
 * 2. Ve a Extensiones → Apps Script.
 * 3. Borra el contenido de Code.gs y pega TODO este archivo.
 * 4. Revisa las constantes de configuración abajo (nombre de hoja
 *    y nombres de columnas) y ajústalas para que coincidan EXACTO
 *    con los encabezados de tu hoja.
 * 5. Haz clic en "Implementar" → "Nueva implementación".
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier usuario
 * 6. Copia la URL que te entrega ("Web app URL").
 * 7. Pega esa URL en:
 *      - guests-remote.js  (constante APPS_SCRIPT_URL) → para leer
 *      - script.js         (constante APPS_SCRIPT_URL) → para escribir
 * 8. ¡Listo! El sitio lee y escribe directo en tu hoja.
 *
 * Cada vez que agregues o edites invitados en la hoja, el sitio
 * los reflejará automáticamente — no hay que tocar código.
 * ================================================================
 */

// --------- CONFIGURACIÓN: ajusta estos nombres a tu hoja real ---------
const NOMBRE_HOJA = "Invitados";                      // pestaña de tu Sheet
const COLUMNA_NOMBRE = "Nombre";                       // nombre del invitado
const COLUMNA_ACOMPANANTES_PERMITIDOS = "Acompañantes"; // cuántos acompañantes puede traer (0, 1, 2...)
const COLUMNA_CONFIRMADO = "Confirmado";               // columna donde se escribirá Sí/No
const COLUMNA_FECHA = "Fecha de confirmación";         // columna donde se escribirá la fecha
const COLUMNA_NOMBRE_ACOMPANANTE = "Nombre acompañante"; // opcional, se crea si no existe

/* ------------------------- LECTURA (doGet) ------------------------- */
function doGet(e) {
  try {
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRE_HOJA);
    if (!hoja) throw new Error("No se encontró la hoja: " + NOMBRE_HOJA);

    const encabezados = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
    const colNombre = encabezados.indexOf(COLUMNA_NOMBRE);
    const colAcompanantes = encabezados.indexOf(COLUMNA_ACOMPANANTES_PERMITIDOS);

    if (colNombre === -1) throw new Error("No se encontró la columna: " + COLUMNA_NOMBRE);

    const filas = hoja.getRange(2, 1, Math.max(hoja.getLastRow() - 1, 0), hoja.getLastColumn()).getValues();

    const invitados = filas
      .filter((fila) => fila[colNombre] && fila[colNombre].toString().trim() !== "")
      .map((fila, i) => ({
        id: "g" + String(i + 1).padStart(2, "0"),
        nombre: fila[colNombre].toString().trim(),
        acompanantesPermitidos: colAcompanantes !== -1 ? (Number(fila[colAcompanantes]) || 0) : 0,
      }));

    return respuesta({ ok: true, invitados: invitados });
  } catch (err) {
    return respuesta({ ok: false, error: err.message });
  }
}

/* ------------------------- ESCRITURA (doPost) ------------------------- */
function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRE_HOJA);
    if (!hoja) throw new Error("No se encontró la hoja: " + NOMBRE_HOJA);

    const encabezados = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];

    const colNombre = encabezados.indexOf(COLUMNA_NOMBRE) + 1;
    let colConfirmado = encabezados.indexOf(COLUMNA_CONFIRMADO) + 1;
    let colFecha = encabezados.indexOf(COLUMNA_FECHA) + 1;
    let colAcompanante = encabezados.indexOf(COLUMNA_NOMBRE_ACOMPANANTE) + 1;

    // Si faltan columnas, las crea al final.
    if (colConfirmado === 0) { colConfirmado = hoja.getLastColumn() + 1; hoja.getRange(1, colConfirmado).setValue(COLUMNA_CONFIRMADO); }
    if (colFecha === 0) { colFecha = hoja.getLastColumn() + 1; hoja.getRange(1, colFecha).setValue(COLUMNA_FECHA); }
    if (colAcompanante === 0) { colAcompanante = hoja.getLastColumn() + 1; hoja.getRange(1, colAcompanante).setValue(COLUMNA_NOMBRE_ACOMPANANTE); }

    const valoresNombre = hoja.getRange(2, colNombre, Math.max(hoja.getLastRow() - 1, 0), 1).getValues();
    let filaEncontrada = -1;
    for (let i = 0; i < valoresNombre.length; i++) {
      if (normalizar(valoresNombre[i][0]) === normalizar(datos.nombre)) {
        filaEncontrada = i + 2; // +2: la hoja empieza en fila 2 y el arreglo es 0-indexado
        break;
      }
    }

    if (filaEncontrada === -1) {
      return respuesta({ ok: false, error: "Invitado no encontrado en la hoja." });
    }

    hoja.getRange(filaEncontrada, colConfirmado).setValue(datos.asistencia === "si" ? "Sí" : "No");
    hoja.getRange(filaEncontrada, colFecha).setValue(new Date(datos.fechaConfirmacion));
    if (datos.llevaAcompanante && datos.nombreAcompanante) {
      hoja.getRange(filaEncontrada, colAcompanante).setValue(datos.nombreAcompanante);
    }

    return respuesta({ ok: true });
  } catch (err) {
    return respuesta({ ok: false, error: err.message });
  }
}

function normalizar(texto) {
  return texto.toString().trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
