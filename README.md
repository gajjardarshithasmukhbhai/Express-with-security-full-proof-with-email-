# Email sending Web App in MongoDB,ExpressJS,NodeJS
## MVC architecture
```text
in this webapp is fully bashed on MVC(model,view,controller base web-app) 
architecture with sendgrid mail service :-)
```
## Start Project
```text
start project 
step:1
	npm install
step:2
	localhost:5060
```
**in this web-app i learn lot**
---
```
in this web-app my main priority not only making webApp.But Also security si
I give security features like 
->session hijacking
->CSRF protection
->Encrypted protection system
```
## PACKAGES
| npm package 			    | command		     			  | application                          |
| --------------------------------- | ------------------------------------------- | ------------------------------------ |
| anime     	    		    | npm install animejs                         | animation                            |
| bcryptjs   	     		    | npm install bcryptjs                        | password encryption                  |
| csurf     	     		    | npm install csurf                           | csrf token	                         |
| express-session    		    | npm install express-session                 | session with cookie                  |
| font-awesome       		    | npm install font-awesome                    | font styling                         |
| nodemailer-sendgrid-transport     | npm install nodemailer-sendgrid-transport   | mail sending third party service     |
| toastr   			    | npm install toastr                          | notification beautiful               |
| body-parser     		    | npm install body-parser                     | take data                            |
| mongodb    			    | npm install mongodb                         | mongodb database driver              |
| Mdbootstrap   	            | npm install mdbootstarp                     | this bootstrap use for modern look design|



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
>Developer photo
---
![mern stack](https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/121575926/original/c69513a1385ec793159a35c4871f34f61009f458/make-web-app-using-mern-stack.png)
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
### Matrial Design
```text
In this web app i use the material design of bootstrap
this DESIGN provide mdbootsrap not conventional Bootstrap
```
### checkout my Company Website
[comapny website](https://darshitgajjars.herokuapp.com)

