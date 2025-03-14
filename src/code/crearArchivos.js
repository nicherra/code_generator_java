const { test } = require("./utils");
const { createBeanFile } = require("./createBean");
const { createModelFile } = require("./createModelFile");
const { createServiceMapperFile } = require("./createServiceMapper");
const { createTablaSQLFile } = require("./createTablaSQL");
const { createDtoFile } = require("./createDto");
const { createChangelogFile } = require("./createChangeLog");
const { createPrimefacesFiles } = require("./createPrimeFaces");
const { createServiceFile } = require("./createService");
const { createInterfaceServiceFile } = require("./createInterfaceService");

function crearArchivos({ NombreClase, atributos, test }) {
  console.log("creandoArchivos.....");
  this.test = test;
  //this.atributos = atributos;
  createBeanFile(NombreClase);
  createInterfaceServiceFile(NombreClase, atributos);
  createModelFile(NombreClase, atributos);
  createDtoFile(NombreClase, atributos);
  createChangelogFile(NombreClase, atributos);
  createPrimefacesFiles(NombreClase, atributos);
  createServiceMapperFile(NombreClase, atributos);
  createServiceFile(NombreClase, atributos);
  createTablaSQLFile(NombreClase, atributos);
  console.log("Terminado");
}

module.exports = { crearArchivos };
