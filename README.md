# Email sending Web App in MongoDB,ExpressJS,ReactJS,NodeJS
**in this web-app i learn lot**
---
```
in this web-app my main priority not only making webApp.But Also security si
I give security features like 
->session hijacking
->CSRF protection
->Encrypted protection system
```
### Encrypted password code
```javascript
let bcrypt=require('bcryptjs');
return bcrypt.hash(password,12)
			.then(hashPassword=>{
        console.log("hashpassword",hashPassword);
      })
      .catch(err=>{
        console.log("error",err);
      });
```
---
### CSRF Token
```javascript
var csrf=require('csurf');
var csrfprotection=csrf();
app.get("/cart",csrfprotection,cart.cart_controller);
app.post("/Cart",csrfprotection,cart.carts_controller);
```
---
**when you request post method so that time CSRF invalid Error is occur so solve this thing**
```html
<input type="hidden" name="_csrf" value="#{csrf}">
```
---
**when you want to use csrf token pass one to another page so make sure name is**
#### _csrf 
**in input text**


### E-Mail sending
```javascript
const nodemailer=require('nodemailer');
let transporter=nodemailer.createTransport({
service:'gmail',
auth:{
	user:'testing.gajjar1998@gmail.com',
	pass:'Mnbvcxz@123'
}
});
let mailOptions={
	from:'testing.gajjar1998@gmail.com',
	to:email,
	subject: `Hello user you signup`,
	html:`your html code`,
}
transporter.sendMail(mailOptions,(err,data)=>{
	if(err)
	{
		console.log("darshit error avi",err);
	}
	else{
		console.log('email sent');
	}
});	
```
>Application photo
---
### session protection and cookies
**connect-mongodb-session package install in npm** 
```javascript
let MongoDBStore=require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb+srv://DARSHITgajjar:Zxcvb@123@cluster0-sjkiq.mongodb.net/gajju?retryWrites=true',
  collection: 'mySessions',
});
app.use(session({
	secret:'Gajjar darshit Hasmukhbhai',/*any text given sigin time e hash code ma hash code rupe cookie ma te store te thase production ma long string hovi joie*/
	resave:false,/*aa em batave upcoming req ma te session te save thato nathi*/
	saveUninitialized:false,/*the session cookie will not be set on the browser unless the session is modified.*/
	store:store,
	cookie:{
	 	maxAge:50000,
	}
}));

```
### checkout my Website
[comapny website](https://darshitgajjars.herokuapp.com)

