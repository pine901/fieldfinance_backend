/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Basic Schema
const BasicSchema = new Schema({
    firstName: {
        type: String,
        default: "",
    },
    secondName: {
        type: String,
        default: "",
    },
    dateBirth: {
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    homeAddress: {
        type: String,
        default: "",
    },
    nationalNumber: {
        type: String,
        default: "",
    },
    branch: {
        type: String,
        default: "",
    },
    rank: {
        type: String,
        default: "",
    },
    regiment: {
        type: String,
        default: "",
    },
    isRegular: {
        type: String,
        default: "",
    },
    serviceNumber: {
        type: String,
        default: "",
    },
    workAddress: {
        type: String,
        default: "",
    },
    encryptedPassword: {
        type: String,
        default: "",
    },

});

export default mongoose.model("users", BasicSchema);
