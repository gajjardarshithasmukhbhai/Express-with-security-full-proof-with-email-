let i=0;
let der=(callback)=>{
	console.log('Gajjar Darshit hasmukhbhai');
	setInterval(()=>{
		
		i=++i;
		callback("gajjau"+i);
	},2);
}
der((ed)=>{
	console.log("hello++++"+ed);
});