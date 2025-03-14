const fs = require("fs");
const { dtoPath, nameFieldTabla, getFieldTypeSQL } = require("./utils");

function createTablaSQLFile(NombreClase, atributos) {
  const nombreClase = NombreClase.charAt(0).toLowerCase() + NombreClase.slice(1);
  const atributos_with_FK = [];
  const dtoContent = `CREATE TABLE ${NombreClase}(
    nID BIGINT IDENTITY (1, 1) NOT NULL,
	nIDUsuario VARCHAR(255) NOT NULL,
	nVersion bigint NOT NULL,
	observacion VARCHAR(max) NOT NULL,
${atributos
  .map((a) => {
    if (nameFieldTabla(a).includes("nID")) atributos_with_FK.append(a);
    return nameFieldTabla(a) + getFieldTypeSQL(a) + !a.nullable ? "NOT NULL" : "" + ",";
  })
  .join("\n")}
${atributos_with_FK
  .map((a) => {
    return (
      "FOREIGN KEY (" +
      nameFieldTabla(a) +
      ") REFERENCES " +
      a.name.charAt(0).toUpperCase() +
      a.name.slice(1) +
      "(nID),"
    );
  })
  .join("\n")}
)`;

  fs.writeFile(dtoPath + `db-changelog-XXX.sql`, dtoContent, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
    } else {
      console.log("Archivo escrito correctamente");
    }
  });
}

module.exports = { createTablaSQLFile };
