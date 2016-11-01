//initializing commands
$(document).ready(function() {weather()});

function hook(str, args) {

    if (str[0] == '~') {
        eval(str.slice(1, str.length))
        return true
    }

    if (hookCommands.indexOf(str) > -1) {
        //call it as a function
        //args are an array
        window[str](args.join(" "));
        return true;
    }

}

//==================== CHALLENGE COMMANDS ==========================
var hookCommands = ['cstheory',
    'date',
    'listentothis',
    'play',
    'pawprint',
    'school',
    'spotify',
    'time',
    'weather',
    'wiki',
    'wolfram',
    'write'];

function name(str) {
    setName(str)
}

function machine(str) {
    setMachine(str)
}

function k_to_f(kelvin) {
	return ((9 / 5) * (kelvin - 273) + 32).toFixed(0);
}

function weather() {
    var json_url = "http://api.openweathermap.org/data/2.5/weather?q=Morningside+Heights,ny&appid=6e131a2916d5d45d8367b72a4675be0a";
    var city;
    var temp_curr;
    var temp_low;
    var temp_high;
    var description;
    var weatherCode;
    var humidity;

    $.when(
        $.getJSON(json_url)
    ).done(function(json_obj) {
        console.log(json_obj)
		city = json_obj["name"];
		temp_curr = k_to_f(json_obj["main"]["temp"]);
		temp_low = k_to_f(json_obj["main"]["temp_min"]);
		temp_high = k_to_f(json_obj["main"]["temp_max"]);
		description = json_obj.weather[0].description;
        weatherCode = Number(json_obj["weather"][0]["id"]);
        humidity = Number(json_obj["main"]["humidity"])
        var disgusting = (weatherCode > 500
            && weatherCode < 800
            || Number(temp_low) < 30
            || Number(temp_high) > 95
            || humidity > 75);
        //description = description.charAt(0).toUpperCase() + description.slice(1)
        var weatherString = "It's " + temp_curr + "&deg; out; " + description + ". "
        disgusting ? weatherString += "Disgusting." : weatherString += "Not bad."
        print(weatherString)
	})
}

function listentothis(str) {
    print("Loading /r/listentothis...")
    if (str != "top") window.location = "https://www.reddit.com/r/listentothis/"
    else window.location = "https://www.reddit.com/r/listentothis/top"
}

function wolfram(str) {
    if (str === "") {
        print("Usage: wolfram [query]");
        return
    } else {
        print("Loading " + "http://www.wolframalpha.com/input/?i=" +
        str.replace("+", "%2B"))
        console.log(str)
        window.location =
        "http://www.wolframalpha.com/input/?i=" +
        str.replace("+", "%2B");
    }
}

function wiki(str) {
    if (str === "") {
        print("Usage: wiki [query]");
        return
    } else {
        print("Loading " + "https://en.wikipedia.org/w/index.php?search=" +
        str.replace(" ", "%20"));
        window.location =
        "https://en.wikipedia.org/w/index.php?search=" +
        str.replace(" ", "%20");
    }
}

function loadURL(url) {
    print("Loading " + url + "...")
    window.location = url
}

function spotify(str) {
    print("Loading https://play.spotify.com/collection/songs...")
    window.location = "https://play.spotify.com/collection/songs"
}

function play(str) {
    loadURL("https://play.google.com/music/listen?hl=en&u=0#/wmp")
}

function cstheory(str) {
    loadURL("http://www.cs.columbia.edu/~aho/cs3261/")
}

function pawprint(str) {
    loadURL("https://pawprtprodmprt1.cuit.columbia.edu/myprintcenter/")
}

function school(str) {
    loadURL("https://drive.google.com/drive/u/0/folders/0B57efURGOOGiVzFMWnl1QktUd2s")
}

function write(str) {
    loadURL("https://drive.google.com/drive/u/0/folders/0B57efURGOOGid2tDS1cyVE1zWk0")
}

function time(str) {
    var today = new Date();
    var h = today.getHours();
    //america
    if (h >= 13) {
        h -= 12;
    } else if (h < 1) {
        h += 12;
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    print(h + ":" + m + ":" + s);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function date(s) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var date = new Date();
    var day = date.getDate();
    var weekday = date.getDay();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    print(days[weekday] + ", " + monthNames[monthIndex] + " " + day)
}
