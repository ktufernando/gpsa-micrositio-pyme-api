const logger = require('../loaders/logger');
const { CodeError } = require('../utils/ApplicationError');
const axios = require('axios');
const fs = require("fs");
const path = require('path');
const moment = require('moment');


// -----> GET Services Cuil data  ####
const getCuil = async (dni) => {
    logger.silly('Obteniendo dni');
    
    let resp = {
        isValid: false
    }
    
    if (!dni || dni === '' || dni.length != 8){
        logger.silly('Error de invalido');
        throw new CodeError('El dni es invalido', 400, resp);
    } else if (dni === '11111111') {
        logger.silly('dni valido');
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaCuil;
    } else if (dni === '22222222') {
        logger.silly('Servicio no disponible');
        throw new CodeError('Servicio no disponible');
    }

}

// -----> GET Service Marital State  ####
const getMaritalState = async () => {
    logger.silly('Obteniendo los datos de estados civiles');
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaEstadoCivil;
    return data;
}


// -----> GET Service Countries ####
const getCountries = async () => {
    logger.silly('Obteniendo los datos de paises');
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaPaises;
}


// -----> GET Service Validation Birth Day  ####
const getValidateBirthDay = async (applicantDayOfBirth) => {
    logger.silly('Validando la fecha de nacimiento: ', applicantDayOfBirth);

    const date = moment(applicantDayOfBirth, "DD%2FMM%2FYYYY");

    let resp = {
        isValid: date.isValid()
    }

    if (resp.isValid) {
        if(date.isAfter(moment())){
            logger.silly('Fecha de nacimiento es mayor a la fecha actual');
            throw new CodeError('Fecha de nacimiento es mayor a la fecha actual', 400, resp);
        }
        return resp;
    } else {
        logger.silly('Fecha de nacimiento invalida');
        throw new CodeError('La fecha de nacimiento en invalida', 400, resp);
    }
}


// -----> GET Service Localities ####
const getLocalities = async (code) => {
    logger.silly('Obteniendo los datos de las localidades');

    
    let resp = {
        isValid: false
    }
    
    if (!code || code === '' || code.length != 4){
        logger.silly('Error Codigo Postal invalido');
        throw new CodeError('El Codigo Postal es invalido', 400, resp);
    } else if (code === '1426') {
        logger.silly('Codigo Postal valido');
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/qrDataMock.json'))).respuestaLocalidades;
    } else if (code === '2222') {
        logger.silly('Servicio no disponible');
        throw new CodeError('Servicio no disponible', 504);
    }
}


module.exports = {
    getCuil,
    getMaritalState,
    getCountries,
    getValidateBirthDay,
    getLocalities

};