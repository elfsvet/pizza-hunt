const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));
//  try this one next time 
// 127.0.0.1 or 0.0.0.0
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("mongodb is connected");
})
.catch((error)=>{
    console.log("mongodb not connected");
    console.log(error);
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));


//18.3.6
// Integrate Reply Functionality with the Front End