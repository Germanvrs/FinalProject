const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Asegúrate de que sea único
    password: { type: String, required: true },
}, { collection: 'prototypes' });  // Ajusta el nombre de la colección si es necesario

const User = mongoose.model('User', userSchema);

module.exports = User;
