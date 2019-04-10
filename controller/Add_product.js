const path=require('path');
let inner_data=[];
const fs=require('fs');
let Cart=require("../modal/cart.js");
// let Data_conn=require("../modal/update_cart.js");
var sequelize=require('../util/database.js');
var Database=require('../modal/all_file_data.js');
var texsting=require('../index.js');
var User=require('../modal/user.js');
var Signup=require('../modal/signup.js');
let getdb=require('../util/database.js');
let mongodb=require('mongodb');
let bcrypt=require('bcryptjs');
let nodemailer=require('nodemailer');
let sendGridTransporter=require('nodemailer-sendgrid-transport');
let transporter=nodemailer.createTransport(sendGridTransporter({
	auth:{
		api_key:"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",
	}
}))

exports.signup_enter_controller=(req,res,next)=>{
	let email=req.body.email1;
	let password=req.body.password1;
	let retype=req.body.password2;
	//signup se
	if(email!=null && password.length>5 && password==retype)
	{
		console.log("hasmukh Gajjar");
		return bcrypt.hash(password,12)
			.then(hashPassword=>{
			let signup=new Signup(email,hashPassword,hashPassword);
			setTimeout(()=>{
				signup.save()
				.then(resolve=>{
					req.session.loggedIn=true;
					res.redirect('shop');
					return transporter.sendMail({
						to:email,
						from:'darshit.gajjar1998@gmail.com',
						subject:'your successfully signed up Mr.DArshit Gajjar system',
						html:`<html><body><h1 style="color: green;">you Login Gajjar DArshit System</h1><p style="font-family: 'Open Sans', sans-serif;font-size: 17px;"><br>our web app makes it simple<br>to stay the loop.With our web app<br>give better protection<br>your Email is <b>${email}</b><br>your password is <b>${password}</b><br><hr>Made By cismox Technology,Inc<br>E-204 vinod Tower,kadi<br><hr></p><a href="https://darshitgajjars.herokuapp.com" style="font-size:20px;font-style: normal;">our comapny website</a></body></html>`,
					})
					.catch(err=>{
						console.log('sendgrid error',err);
					});		
				})
				.catch(err=>{
					console.log(err);
				});
			},60);
			});
			
	}
	else{
		console.log("gajjar darshit hasmukhbhai");
		res.render("signup",{show:"your password is minimu 5 character"});
	}
	
}
exports.add_product_data_controller=(req,res,next)=>{
		let UserId=User.UserId();
		let obj=new Database(req.body.Title,req.body.Image,req.body.price,req.body.description,UserId);
		obj.save()
		.then(resolve=>{
			if(resolve)
			{
				res.redirect("/shop");
			}
			else{
				res.render("index");
			}
		}).catch(err=>{
			console.log(err);
			res.end();
		});
}
exports.order_controller=(req,res,next)=>{
	res.render("order");
}
exports.admin_delete_product_controller=(req,res,next)=>{
	let delete_cart_id=req.params.iid;
	Database.productDelete(delete_cart_id)
	.then(e=>{
		res.redirect('/Admin_Product');
	})
	.catch(err=>{
		console.log('not solved');
			res.end();
	
	});
}
exports.add_products_controller=(req,res,next)=>{
	let email=req.body.email;
	let password=req.body.password;
		// User.saveUser(email,password)
		let sx=new User(email,password);
		sx.save()
		.then(resolve=>{
			if(resolve){
				console.log("gajju rock");
				req.session.loggedIn=true;
				res.redirect("/Add_product");//change res.redirect('Add_product');
				return transporter.sendMail({
					to:email,
					from:'darshit.gajjar1998@gmail.com',
					subject:'your successfully signed In Mr.DArshit Gajjar system',
					html:`<html><body><h1 style="color: green;">you Login Gajjar DArshit System</h1><p style="font-family: 'Open Sans', sans-serif;font-size: 17px;"><br>our web app makes it simple<br>to stay the loop.With our web app<br>give better protection<br>your Email is <b>${email}</b><br>your password is <b>${password}</b><br><hr>Made By cismox Technology,Inc<br>E-204 vinod Tower,kadi<br><hr></p><a href="https://darshitgajjars.herokuapp.com" style="font-size:20px;font-style: normal;">our comapny website</a></body></html>`,
				})
				.catch(err=>{
					console.log('sendgrid error',err);
				});
			
			}
			else{
				res.render("index",{valid:false});
			}
		})
		.catch(err=>{
			console.log(err);
				res.end();		
		});
	
}
exports.Logout_controller=(req,res,next)=>{
	req.session.destroy(err=>{
		res.redirect('/');
	});
}
exports.admin_product_controller=(req,res,next)=>{
	// res.clearCookie('loggedIn');
	let xy=req.session.loggedIn;
	if(xy)
	{
		Database.fetchall().then((ata)=>{
			res.render("Admin_product",{data:ata});
		});
	}
	else{
		res.render("index",{wer:"your account is not verified"});
	}
}
exports.admin_edit_product_controller=(req,res,next)=>{
	let confirmId;
	let user_data=req.params.id;
	let delete_cart_id=req.params.iid;
	Database.findProduct(user_data).then((ata)=>{
		res.render("Admin_edit_product",{verifies_data:ata,csrf:req.csrfToken()});
	}).catch(err=>{
			res.end();

	});	
}
exports.admin_update_product_controller=(req,res,next)=>{
	let Id=req.params.Id;
	let title=req.body.update_title;
	let price=req.body.update_price;
	let description=req.body.update_description;
	let image=req.body.update_image;
	let UserId=User.UserId();
	// let cookie=req.session.loggedIn;
	Database.upda(Id,title,price,description,image,UserId).then(er=>{
		res.redirect('/Admin_Product');
	})
	.catch(err=>{
		console.log(err)
			res.end();

	});	
}
exports.cart_controller=(req,res,next)=>{
	res.redirect("/Carts");
}
exports.carts_controller=(req,res,next)=>{
	let KmId=req.body.ProductId;
	let KmPrice=req.body.price;
	let KmTitle=req.body.Title;

	Cart.cart(KmId,KmPrice,KmTitle)
	.then(resolve=>{
		setTimeout(()=>{
			res.redirect("/Carts");				
		},50)
	}).catch(err=>{
		console.log(err);
			res.end();

	});
}
exports.SignUp_controller=(req,res,next)=>{
	res.render("signup");
}
exports.cart_show_controller=(req,res,next)=>{
	let obej;	
	let db=getdb.getDb();
		Cart.information()
		.then(products=>{
				let totalPrICE;
				let checking=true;
				let sd=Object.values(products[0]);//imporatant method
				let NaNobject=sd[4];//imporatant method
				let Id=sd[0];//imporatant method
				console.log(NaNobject,"<-");
				if(isNaN(NaNobject))
                    {
                    	checking=false;
                    	console.log('gajjau rock');
                        db.collection('user').updateOne({_id:new mongodb.ObjectId(Id)},{$set:{totalPrice:0}})
                        .then(wer=>{
							res.render("cart",{cart_data:obej,totalPrice:totalPrICE});

                        })
                        .catch(err=>{console.log('err',err)});
                    }
				products.map(wer=>{

					totalPrICE=wer.totalPrice;
				});
				//[{data}]->data leva Object.values(products[0].items);
				obej=Object.values(products[0].items);
				if(checking)
				{
					res.render("cart",{cart_data:obej,totalPrice:totalPrICE});
				}
			}).catch(err=>{
				res.end();
				console.log(err);
			});	
}
exports.products_controller=(req,res,next)=>{
	res.redirect("/Shop");
}
exports.carts_redirect_controller=(req,res,next)=>{
	res.render("cart");
}
exports.carts_delete_controller=(req,res,next)=>{
	let deleteId=req.params.deleteId;
	Cart.delete(deleteId).then(resolve=>{
		setTimeout(()=>{
			res.redirect("/Carts");//change1
		},50);
	})
	.catch(err=>{
		console.log(err);
			res.end();

	});
	// res.render("cart");
}
exports.product_controller=(req,res,next)=>{
	const uid=req.params.productId;
	Database.findId(uid).then((ata)=>{
			console.log(ata,"ata");
			res.render("product",{id_data:ata,csrf:req.csrfToken()});
	}).catch(err=>{
			res.end();

	});
}
exports.delete=(req,res,next)=>{
	res.end();
}
exports.shop_controller=(req,res,next)=>{
	let xy=req.session.loggedIn;
	console.log("darshu----------------------->>",req.session.gajjarDarshit);
	 // console.log("---->",req.session.loggedIn);
	if(xy){
				// res.redirect("/shop");
				// res.render("Add_product");
				Database.fetchall().then(products => {
	            res.render("shop", {
	                data: products,
	            	});
	        	})
		        .catch(err => {
		            console.log(err);
					res.end();
		        
		        });
		}
	else{
				res.render("index",{wer:"your account is not verified"});
			}
}
exports.home_controller=(req,res,next)=>{	
	res.render("index",{wer:"your account is not verified"});
}
exports.add_product_controller=(req,res,next)=>{
	let xy=req.session.loggedIn;
	console.log("darshu----------------------->>",req.session.gajjarDarshit);
	 // console.log("---->",req.session.loggedIn);
	if(xy){
		res.render("Add_product",{csrf:req.csrfToken()});
	}

	else{
		res.render("index",{wer:"your account is not verified please authicate"});
	}	
	
}