const fs = require("fs");
const {
  campo,
  campoTabla,
  NombreClase,
  nombreClase,
  atributos,
  createDto,
  dtoPath,
  esClase,
  fromDto,
  get,
  getDto,
  getters,
  interfaceServicePath,
  mbsoft,
  modelPath,
  nameFieldTabla,
  primefacesPath,
  rootPath,
  serviceMapperPath,
  servicePath,
  set,
  setDto,
  setters,
  test,
  tiposNumericos,
  tiposTiempo,
  tiposUsados,
} = require("utils");
function createModelFile() {
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
