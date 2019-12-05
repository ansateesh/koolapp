/**
 * @file cartsDAO.js
 * @author Sateesh Anantharamaiah
 * @version 1.0
 * createdDate: 05/25/2019
 */
const mongoose = require('mongoose');
const appConstants = require('../constants/constants.js');
const cartsModel = require('../models/cartsModel.js');
const LOGGER = require('../logger/logger.js');
const FILE_NAME = 'cartsDAO.js';

/**
 * @description retrieves session per query.
 * @memberof cartsDAO
 * @function getCart
 * @param {Object} query
 * @param {Object} attributes
 * @param {function} callback
 */
function getCart(query,attributes,callback) {
    LOGGER.debug('DAO : Entering into getCart :: ' + FILE_NAME);

    cartsModel.findOne(query, attributes).exec(function (err, cartInfo) {
        if (err) {
            LOGGER.error('Error occured in getCart :: ' + FILE_NAME + ' ' + err);
            return callback(err, null);
        } else{
            LOGGER.debug('Exiting from getCart :: ' + FILE_NAME);
            return callback(null, cartInfo);
        }
    });
}

/**
 * @description inserts a cart object.
 * @memberof cartsDAO
 * @function createCart
 * @param {Object} cartObject
 * @param {function} callback
 */
function createCart(cartObject, callback) {
    LOGGER.debug('DAO : Entering into creatCart start :: ' + FILE_NAME);
    cartsModel.create(cartObject, function (err, result) {
        if (err) {
            LOGGER.error('Error occured in createCart :: ' + FILE_NAME + ' :: ' + err);
            return callback(err, null);
        } else {
            LOGGER.debug('Exiting from createCart  :: ' + FILE_NAME);
            return callback(null, result);
        }
    });
}

/**
 * @description inserts a cart object.
 * @memberof cartsDAO
 * @function createCart
 * @param {Object} cartObject
 * @param {function} callback
 */
function updateCart(query, cartObject, callback) {
    LOGGER.debug('DAO : Entering into creatCart start :: ' + FILE_NAME);
    cartsModel.updateOne(query, {$set: cartObject}).exec(function (err, result) {
        if (err) {
            LOGGER.error('Error occured in updateCart :: ' + FILE_NAME + ' :: ' + err);
            return callback(err, null);
        } else {
            LOGGER.debug('Exiting from updateCart  :: ' + FILE_NAME);
            return callback(null, result);
        }
    });
}

// exports
module.exports = { getCart, createCart, updateCart };
