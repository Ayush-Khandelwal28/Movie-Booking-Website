
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Arghadeep:simcity2013@cluster0.lkscjpk.mongodb.net/movieMania',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log('Mongo Connection Open!');
})
.catch(err=>{console.log('Oh no, mongo connection error!');console.log(err);});