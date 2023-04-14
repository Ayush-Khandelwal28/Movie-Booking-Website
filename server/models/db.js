
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieMania',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log('Mongo Connection Open!');
})
.catch(err=>{console.log('Oh no, mongo connection error!');console.log(err);});