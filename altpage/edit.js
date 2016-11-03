var editBlob = '<div id="editWrapper"><textarea id="editArea" rows="40" cols="80" spellcheck="false"></textarea></div>'
var editing = false;
var currentFileName = ""
var files = {}

//files are stored as an object with keys (filenames) and values (innerHTML)

//add some grabbing from local storage here, package files into a json dict
//and then get 'em
if (localStorage.getItem("textFiles")) {
    files = JSON.parse(localStorage.getItem("textFiles"))
}

function edit(fileName) {
    //make sure there's no window open already
    if (editing) return;
    //make sure there's a filename
    if (fileName === "") {
        print("Usage: edit [filename]")
        return
    }

    //open the editor window
    $("#terminal").append(editBlob)
    currentFileName = fileName;
    //open it if it exists
    if (files[fileName]) {
        document.getElementById("editArea").value = files[fileName]
    }
    document.getElementById("editArea").focus();
    editing = true;
    save()
}

function save() {
    if(!editing) {
        print("No file open to save.")
        return
    }
    files[currentFileName] = editArea.value;
    localStorage.setItem("textFiles", JSON.stringify(files))
    print(currentFileName + " saved.")
}

function close() {
    var editArea = document.getElementById("editArea");
    if (!editing) {
        print("No file open.")
        return
    }
    editing = false;
    //save the file
    console.log(editArea.value)
    files[currentFileName] = editArea.value;
    localStorage.setItem("textFiles", JSON.stringify(files))
    $("#editWrapper").remove()
}

function rm(fileName) {
    if (fileName === "") {
        print("Usage: rm [filename]")
        return
    }

    if (files.hasOwnProperty(fileName)) {
        delete files[fileName]
        print(fileName + " deleted.")
        close()
    } else {
        print(fileName + " doesn't exist.")
    }
    localStorage.setItem("textFiles", JSON.stringify(files))
}
