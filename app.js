const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const path = require('path'); 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  // Esto es necesario para manejar datos en formato JSON

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://0260679:German12@cluster1.tfg6v.mongodb.net/prototypes?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

app.get('/', (req, res) => {
    res.render('prototype');  
});

// Ruta para registrar usuario
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Verificar si ya existe un usuario con el mismo correo
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "El correo ya está registrado" });
        }

        // Crear un nuevo usuario
        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        console.log('Usuario registrado:', newUser);

        // Responder con éxito
        res.json({ success: true, message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.json({ success: false, message: "Error al registrar el usuario" });
    }
});

app.get('/courses', (req, res) => {
    res.render('courses');  
});

app.get('/quizzes&exam', (req, res) => {
    res.render('quizzes&exam');  
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus');  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
