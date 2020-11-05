
//Consists of the javascript code for the slider in the page "LoginOrSignUP.html" and the code for Form validation with JSON.


//for the automatic slide.
var indexSlide=0;
displaySlides();

function displaySlides() {
	// body..
	let i;
	let slides = document.getElementsByClassName('Imageslider');
	for (i=0 ; i< slides.length ; i++)
	{
		slides[i].style.display="none";
	}	
	indexSlide++;
	if (indexSlide > slides.length)
	{
		indexSlide = 1
	}
	slides[indexSlide-1].style.display="block";
	setTimeout(displaySlides,3000);
}

		


function navSlide(){
	let navBar = document.getElementById('nav-bar');
	if (navBar.style.display==="none")
	{
		navBar.style.display="block";
	}
	else{
		navBar.style.display='none';
	}
}



//for the popup slider(SignIN/SignUP overlay)
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('popup-container');

signUpButton.addEventListener('click',() => container.classList.add('right-panel-active'));

signInButton.addEventListener('click',() => container.classList.remove('right-panel-active'));

//for displaying the popup 

document.getElementById("button").addEventListener("click",function(){
	document.querySelector(".popup-container").style.display="flex";
	document.querySelector(".content").style.opacity="0.2";
	document.querySelector(".content").style.zIndex="-1";
})

	 
//for closing the popup when pressed anywhere else but the vital sections.

var hidepopUp=document.getElementById("popup-container");

	document.onclick=function(div){
			if(div.target.id !== "popup-container" && 
			   div.target.id !== "button"    	   && 
			   div.target.id !== "signUp"    	   && 
			   div.target.id !== "signIn"    	   &&
			   div.target.id !== "login"     	   &&
			   div.target.id !== "register"  	   &&
			   div.target.id !== "social"    	   &&
			   div.target.id !== "name"            &&
			   div.target.id !== "email"     	   &&
			   div.target.id !== "pass"      	   &&
			   div.target.id !== "e-mail"    	   &&
			   div.target.id !== "password"        &&
			   div.target.id !== "forget-link")
			   {
						hidepopUp.style.display="none";
						document.querySelector(".content").style.opacity="1";
						document.querySelector(".content").style.zIndex="0";
				}
		}


//USE OF JSON SERVER

//for registering the user
let entry = document.querySelector(".form-signUp");


entry.addEventListener('submit',(e)=>{
	e.preventDefault();

	let uname = document.querySelector("#name").value;
	let email =document.querySelector("#email").value;
	let pass =document.querySelector("#pass").value;

	data = {
		name: uname ,
		email:email,
		password:pass
	};	//adds data 

	axios.post('http://localhost:3000/user',data).then(()=>{
		console.log("The User has been sucessfully registered");
		//alert("You have sucessfully registered your account");
	}).catch((e)=>{
		console.log( "Error"+e);
	});

	e.target.reset();

});

//for logging in the user if registered. 
let login = document.querySelector(".form-signin");

login.addEventListener('submit',(e)=>{
	e.preventDefault();

	let pass =document.querySelector("#password").value;
	let email =document.querySelector("#e-mail").value;
	
	axios.get('http://localhost:3000/user').then((res)=>{
		console.log(res);
		return res.data;

	}).then((data)=>{

		let userData= data.filter((item)=>{
				return (item.email ==email && item.password ==pass);
		})
		if(userData.length > 0){
			setTimeout(()=>{
				window.location='./index.html';
			},1000);
		}else {
			alert("Invalid username or password. If not a member, consider signing up first.");

		}

	}).catch((e)=>{
		console.log( "Error"+e);
	});

	e.target.reset();

});


  
 


