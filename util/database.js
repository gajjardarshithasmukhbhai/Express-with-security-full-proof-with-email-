let mongodb=require('mongodb');
let MongoClient=mongodb.MongoClient;
let _db;//apne object ma interested nathi but database jode communication thavu joi e jene lidhe variable banavyo
let mongoConnect=(callback)=>{
    MongoClient.connect('mongodb+srv://DARSHITgajjar:Zxcvb@123@cluster0-sjkiq.mongodb.net/gajju?retryWrites=true',{useNewUrlParser:true}/*Error solution of mongodb8*/)
        .then(client => {
            console.log('connected');
            _db=client.db();//jyare db('shop');->Zxcvb@123@cluster0-sjkiq.mongodb.net/test<-ne overwrite karse ahiya test database che kato test ni jaygyae apne potano db nu name lakhi sakay
            callback();
        })
        .catch(err => {
            console.log(err);
        });
}
const getDb=()=>{
	if(_db)//jo database connect hase toj permission apisu database connect thavani
	{
		return _db;
	}
	throw 'database is not Found sorry cismox owner';//otherwise error occur te thase
}	
exports.mongoConnect=mongoConnect;
exports.getDb=getDb;
