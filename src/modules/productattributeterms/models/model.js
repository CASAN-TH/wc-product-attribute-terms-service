'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductattributetermsSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Productattributeterms name',
    // },
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    menu_order: {
        type: Number,
    },
    count: {
        type: Number,
    },






    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Productattributeterms", ProductattributetermsSchema);