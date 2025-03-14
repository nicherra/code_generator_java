const fs = require("fs");
const { dtoPath, changelogPath } = require("./utils");

function createChangelogFile(NombreClase, atributos) {
  const nombreClase = NombreClase.charAt(0).toLowerCase() + NombreClase.slice(1);
  const dtoContent = `<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.5.xsd">
    <changeSet author="generado" id="new_model_${NombreClase}">
        <sqlFile path="sql/db-changelog-XXX.sql" relativeToChangelogFile="true"/>
    </changeSet>
</databaseChangeLog>

`;

  fs.writeFile(changelogPath + `db-changelog-XXX.xml`, dtoContent, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
    } else {
      console.log("Archivo escrito correctamente");
    }
  });
}

module.exports = { createChangelogFile };
