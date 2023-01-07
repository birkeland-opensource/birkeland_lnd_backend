

var mongoose = require('mongoose');
const mongoatlasUrl = "mongodb+srv://elonmusk:ruban@cluster0.guvnoyy.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoatlasUrl, {
useNewUrlParser: true,
useUnifiedTopology: true,
retryWrites: false
})
.then(() => console.log('Connection to MongoDB Success'))
.catch((err) => console.error(err));


