function load() {
    let good = 0;
    document.body.innerHTML += "Checking app...";
    setTimeout(() => {
        document.body.innerHTML += "Checking Width...";
        if (window.outerWidth == 800){
            document.body.innerHTML += "<h4>Width is good at 800</h4>";
            good += 1;
        }else {
            document.body.innerHTML += "<h4>Width is BAD at " + window.outerWidth + "</h4>";
        }
    }, 1000)
    setTimeout(() => {
        document.body.innerHTML += "Checking Height...";
        if (window.outerHeight == 600){
            document.body.innerHTML += "<h4>Height is good at 600</h4>";
            good += 1;
        }else {
            document.body.innerHTML += "<h4>Height is BAD at " + window.outerHeight + "</h4>";
        }
    }, 2000)
    setTimeout(() => {
        if (good == 2){
            document.body.innerHTML += "<h1>APP has launched correctly, redirecting...</h1>";
            window.location = "http://127.0.0.1:800/app"
        }else if (good == 1){
            document.body.innerHTML += "<h1>APP has not launched correctly, please dont resize the app.</h1>";
        }else {
            document.body.innerHTML += "<h1>APP has not launched correctly, reopen app.exe</h1>";
        }
    }, 3000)


}

setTimeout(load, 1000)
