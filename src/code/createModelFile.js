const fs = require("fs");

const { campoTabla, getters, modelPath, setters } = require("./utils.js");

console.log("campoTabla", campoTabla);
function createModelFile(NombreClase, atributos) {
  console.log("createModelFile");
  const nombreClase = NombreClase.charAt(0).toLowerCase() + NombreClase.slice(1);
  const modelContent = `package ar.com.mbsoft.erp.model.impl;

import ar.com.mbsoft.erp.annotations.MBSecurity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@MBSecurity
@Table(name = "${NombreClase}")
public class ${NombreClase} extends AbstractPersistentObject{

${atributos
  .map((a) => {
    return campoTabla(a);
  })
  .join("\n")}

${getters()}

${setters()}


}

`;

  fs.writeFile(modelPath + `${NombreClase}.java`, modelContent, (err) => {
    if (err) {
      console.error("Error al escribir el archivo:", err);
    } else {
      console.log("Archivo escrito correctamente");
    }
  });
}

module.exports = { createModelFile };
