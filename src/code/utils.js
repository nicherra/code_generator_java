const { createBeanFile } = require("./createBean");
const { createServiceMapperFile } = require("./createServiceMapper");
const os = require("os");

const username = os.userInfo().username;
console.log("Usuario:", username);

//const NombreClase = "Medico";
//const nombreClase = NombreClase.charAt(0).toLowerCase() + NombreClase.slice(1);
/*
const atributos = [
  { type: "String", name: "nombre", nullable: true },
  { type: "Usuario", name: "usuario", relacion: "@OneToMany" },
];
*/

let test = true;
const rootPath = `C:/Users/${username}/IdeaProjects/erp-web/`;
const dtoPath = test ? "" : rootPath + "src/main/java/ar/com/mbsoft/erp/dto/impl/generated/";
const primefacesPath = test ? "" : rootPath + "src/main/webapp/faces/" + nombreClase + "/";
const servicePath = test ? "" : rootPath + "src/main/java/ar/com/mbsoft/erp/service/impl/";
const serviceMapperPath = test ? "" : rootPath + "src/main/java/ar/com/mbsoft/erp/service/impl/mapper/";
const modelPath = test ? "" : rootPath + "src/main/java/ar/com/mbsoft/erp/model/impl/";
const interfaceServicePath = test ? "" : rootPath + "src/main/java/ar/com/mbsoft/erp/service/";
const beanPath = test ? "" : rootPath + "src/main/java/ar/com/mbsoft/erp/bean/impl/";

const mbsoft = `
______  _________________________________________
___   |/  /__  __ )_  ___/_  __ \__  ____/__  __/
__  /|_/ /__  __  |____ \_  / / /_  /_   __  /   
_  /  / / _  /_/ /____/ // /_/ /_  __/   _  /    
/_/  /_/  /_____/ /____/ \____/ /_/      /_/   
\n
`;
console.log(mbsoft);
const tiposUsados = [
  "BigDecimal",
  "String",
  "Long",
  "Boolean",
  "boolean",
  "int",
  "Integer",
  "Date",
  "long",
  "float",
  "Float",
  "double",
  "Double",
  "char",
  "Character",
  "byte",
  "Byte",
  "short",
  "Short",
  "Object",
  "LocalDate",
  "LocalTime",
  "LocalDateTime",
];
const tiposNumericos = [
  "BigDecimal",
  "Long",
  "long",
  "Integer",
  "int",
  "float",
  "Float",
  "double",
  "Double",
  "byte",
  "Byte",
  "short",
  "Short",
];

const tiposTiempo = ["Date", "LocalDate", "LocalTime", "LocalDateTime"];

function esClase(type) {
  return !tiposUsados.includes(type);
}

function set(name, value) {
  return nombreClase + ".set" + name.charAt(0).toUpperCase() + name.slice(1) + "(" + value + ");";
}

function get(name) {
  return nombreClase + ".get" + name.charAt(0).toUpperCase() + name.slice(1) + "()";
}

function setDto(name, value) {
  return nombreClase + "Dto.set" + name.charAt(0).toUpperCase() + name.slice(1) + "(" + value + ");";
}

function getDto(name) {
  return nombreClase + "Dto.get" + name.charAt(0).toUpperCase() + name.slice(1) + "()";
}
function fromDto(name) {
  return "fromDto(" + get(name) + ")";
}

function createDto(name) {
  return "createDto(" + getDto(name) + ")";
}

function nameFieldTabla(atributo) {
  let inicial = "nID";
  if (tiposNumericos.includes(atributo.type)) inicial = "n";
  if (atributo.type === "String") inicial = "c";
  if (atributo.type === "Boolean" || atributo.type === "boolean") inicial = "l";
  if (tiposTiempo.includes(atributo.type)) inicial = "t";
  return inicial + atributo.name.charAt(0).toUpperCase() + atributo.name.slice(1);
}

function getters() {
  return atributos
    .map((a) => {
      return (
        "    public " +
        a.type +
        " get" +
        a.name.charAt(0).toUpperCase() +
        a.name.slice(1) +
        "() { return this." +
        a.name +
        ";}"
      );
    })
    .join("\n");
}

function setters() {
  return atributos
    .map((a) => {
      return (
        "    public void" +
        " set" +
        a.name.charAt(0).toUpperCase() +
        a.name.slice(1) +
        "(" +
        a.type +
        " " +
        a.name +
        ")" +
        " { return this." +
        a.name +
        " = " +
        a.name +
        ";}"
      );
    })
    .join("\n");
}

function campo(atributo) {
  return "private " + atributo.type + " " + atributo.name + ";";
}

function campoTabla(atributo) {
  const notNull = "    @NotNull\n";
  let anotation = "";
  if (atributo.relacion) {
    anotation =
      "    " +
      atributo.relacion +
      `(fetch = FetchType.Lazy)\n    @JoinColumn(name ="${nameFieldTabla(atributo)}"${
        atributo.nullable ? "" : ",nullable=false"
      })\n    `;
  } else {
    anotation = `    @Column(name = "${nameFieldTabla(atributo)}" ${atributo.nullable ? "" : ",nullable=false"})\n    `;
  }
  return (atributo.nullable ? "" : notNull) + anotation + campo(atributo) + "\n";
}

function crearArchivos(NombreClase, atributos, test) {
  console.log("creandoArchivos.....");
  test = test;
  createBeanFile();
  createInterfaceService();
  console.log("Terminado");
}

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/*---------------------------------------------------*/
module.exports = {
  test,
  rootPath,
  dtoPath,
  primefacesPath,
  servicePath,
  serviceMapperPath,
  modelPath,
  interfaceServicePath,
  mbsoft,
  tiposUsados,
  tiposNumericos,
  tiposTiempo,
  esClase,
  set,
  get,
  setDto,
  getDto,
  fromDto,
  createDto,
  nameFieldTabla,
  getters,
  setters,
  campo,
  campoTabla,
  beanPath,
  crearArchivos,
};
