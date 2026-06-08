/*
	Theme (theme wizard by xobyte) // https://xobyte.org/ThemeWizard/
*/
window.themeDebugger = true;
window.themes = {};
window.themes.list = {};
window.themes.set = function(theme){
	if(document.getElementById("theme-controller")){
		document.getElementById("theme-controller").parentElement.removeChild(document.getElementById("theme-controller"));
	}
  window.themes.get = "Pending...";
	if(window.themeDebugger){
  		console.log("Trying to set theme...");
  	}
	if(window.themes.list[theme] && !window.themes.passive){
		if(window.themeDebugger){
  			console.log("Theme Exists");
  		}
		var src = window.themes.list[theme];
		let req = new XMLHttpRequest();
		req.open("GET", src, true);
  		req.responseType = "text";
  		req.onload = function(){
  			if(req.readyState === req.DONE){
  				if(req.status === 200){
  					if(window.themeDebugger){
  						console.log("Loaded theme & saved preference");
  					}
  					localStorage.theme = theme;
  					window.themes.get = theme;
  					let response = req.response;
  					var style = document.createElement("STYLE");
  					style.id = "theme-controller";
  					style.innerHTML = response;
  					document.body.appendChild(style);
  					if(window.themes.switch){
  			      window.themes.switch.value = theme;
  		      }
  				}
  			}
  		};
  		req.onerror = function(){
  		  window.themes.get = false;
  		}
  		req.send();
	}
	delete window.themes.passive;
};
window.themes.get = false;
window.themes.initialize = function(data){
	// use this to declare your themes & their names/aliases and automatically load your last saved theme
	/*

		The data received should be JSON and strucuted like this,

		{
			"Dark Theme" : "/dark.css",
			"Light Theme" : "/light.css",
			"A Rainbow Theme" : "/rainbow.css"
		}

	*/
	window.themes.list = data;
	if(window.localStorage.theme){
		if(window.themeDebugger){
  			console.log("Recognizing preference...");
  		}
		window.themes.set(window.localStorage.theme);
	}
	if(document.getElementById("theme-switcher")){
		if(window.themeDebugger){
  			console.log("Hooray! You're letting your users decide!");
  		}
  	var selectorLabel = document.createElement("OPTGROUP");
		  selectorLabel.label = "Select a Theme";
  	var def = document.createElement("OPTION");
			def.value = "default";
			def.innerText = "Default";
			if(!localStorage.theme){
			  def.default = true;
			  def.selected = true;
			}
		selectorLabel.appendChild(def);
		
		window.themes.switch = document.getElementById("theme-switcher");
		window.themes.switch.onchange = function(){
			if(window.themeDebugger){
  				console.log("The User wants to change the theme...");
  			}
  		if(this.value === "default"){
  		  delete localStorage.theme;
  		  window.location.reload();
  		}
			else if(window.themes.list[this.value]){
				window.themes.set(this.value);
			} else {
				if(window.themeDebugger){
  					console.log("But the theme doesn't exist.");
  				}
			}
		};
		for(options in window.themes.list){
			if(window.themeDebugger){
  				console.log("Creating an option for " + options + "...");
  		}
			var opt = document.createElement("OPTION");
				opt.value = options;
				opt.innerText = options;
		  selectorLabel.appendChild(opt);
		}
		window.themes.switch.appendChild(selectorLabel);
	}
}

/*
	change select drop down css // https://stackoverflow.com/a/75000523
*/
setSelectHover();

function setSelectHover(selector = "select") {
    let selects = document.querySelectorAll(selector);
    selects.forEach((select) => {
        let selectWrap = select.parentNode.closest(".select-wrap");
        // wrap select element if not previously wrapped
        if (!selectWrap) {
            selectWrap = document.createElement("div");
            selectWrap.classList.add("select-wrap");
            select.parentNode.insertBefore(selectWrap, select);
            selectWrap.appendChild(select);
        }
        // set expanded height according to options
        let size = select.querySelectorAll("option").length;

        // adjust height on resize
        const getSelectHeight = () => {
            selectWrap.style.height = "auto";
            let selectHeight = select.getBoundingClientRect();
            selectWrap.style.height = selectHeight.height + "px";
        };
        getSelectHeight(select);
        window.addEventListener("resize", (e) => {
            getSelectHeight(select);
        });

        /**
         * focus and click events will coincide
         * adding a delay via setTimeout() enables the handling of
         * clicks events after the select is focused
         */
        let hasFocus = false;
        select.addEventListener("focus", (e) => {
            select.setAttribute("size", size);
            setTimeout(() => {
                hasFocus = true;
            }, 150);
        });

        // close select if already expanded via focus event
        select.addEventListener("click", (e) => {
            if (hasFocus) {
                select.blur();
                hasFocus = false;
            }
        });

        // close select if selection was set via keyboard controls
        select.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                select.removeAttribute("size");
                select.blur();
            }
        });

        // collapse select
        select.addEventListener("blur", (e) => {
            select.removeAttribute("size");
            hasFocus = false;
        });
    });
}