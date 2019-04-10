let mongodb=require('mongodb');
let getdb=require('../util/database.js');
module.exports=class Product{
	constructor(title,Image,Price,description,userId)
	{
		this.title=title;
		this.Image=Image;
		this.Price=Price;
		this.description=description;
        this.userId=userId;
	}
	save()
	{
        let db = getdb.getDb();//call the method
        let check_array=[];
        return db.collection('user').find().toArray()
        .then(ew=>{
                check_array=ew;
                if(check_array.length>0)//use che
                {
                    db.collection('products').insertOne(this)
                    .catch(err => {
                        console.log(err);
                    });
                    return true;
                    
                }
                else{
                    return false;
                }
            }
        ).catch(err=>{console.log(err)});
        
        
	}
	static fetchall()
	{
        let db = getdb.getDb();//call the method
        return db.collection('products').
        	   find().toArray().
        	   then(products=>{
        	   		return products;
        	   }).
        	   catch(err=>{
        	   		console.log("My"+err);
        	   });
	}
	static findProduct(id)
	{
		let db = getdb.getDb();//call the method
		
        return db.collection('products').
        	   find({_id:new mongodb.ObjectId(id)}).next().
        	   then(products=>{
        	   		return products;
        	   }).
        	   catch(err=>{
        	   		console.log("My"+err);
        	   });
	}
	static upda(id,title,price,description,image,userId)
	{
		this.title=title;
		this.price=price;
		this.description=description;
		this.image=image;
        this.userId=userId;
		let Id=mongodb.ObjectId(id);
		let db = getdb.getDb();//call the method
        return db.collection('products')
        .update({_id:Id},{"title":this.title,"Image":this.image,"Price":this.price,"description":this.description,"userId":this.userId},{upsert:true})
            .then(products => {
                return products;
            }).
        catch(err => {
            console.log("My" + err);
        });
	}
	static productDelete(id)
	{
		let se=new mongodb.ObjectId(id);
		let db = getdb.getDb();//call the method
		return db.collection('products').
        deleteOne({
                _id:se,
            })
            .catch(err=>{
            	console.log(err,"my error");
            });
	}
    static findId(uid)
    {
        console.log(uid,"</");
        // let see=new mongodb.ObjectId(uid);
        let db = getdb.getDb();//call the method
        return db.collection('products').
               find({_id:new mongodb.ObjectId(uid)}).next().
               then(products=>{
                    console.log(">",products,"<");
                    return products;
               }).
               catch(err=>{
                    console.log("My"+err);
               });
    }
    static get_user()
    {
        let db = getdb.getDb();//call the method
        let check_array=[];
        return db.collection('user').find().toArray()
        .then(ew=>{
                check_array=ew;
                if(check_array.length>0)//use che
                {
                    db.collection('products').insertOne(this)
                    .catch(err => {
                        console.log(err);
                    });
                    return true;
                }
                else{
                    return false;
                }
            }
        ).catch(err=>{console.log(err)});
    }
}