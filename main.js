var database = firebase.database();
var counter = 0;
const sendButton = document.querySelector(".icon");
const textInput = document.querySelector(".chat");
const chatBorder = document.querySelector(".chat-borders")

/* <div class="op-msg message">
                <p>
                    Hello
                </p>
                <button class="menu-dots btn btn-primary">
                    <i style="color: gray;" class="fas fa-ellipsis-h"></i>
                </button>
            </div> */

{/* <div class="msg message">
                <button class="menu-dots btn btn-primary">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <p>
                    Lorem, ipsum dolor sit amet
                </p>
            </div> */}


// Update: firebase.database().ref('Users/' + localStorage['userUpdateId']).update(createUser(newUName, newName, newSName, newEmail, newPassword));

function generateFirebaseItem(key, value) {
    return {
        id: key,
        data: value
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function createUser(name,email,password, messages){
    firebase.database().ref(`Users/` + uuidv4()).set(createUserObj(name, email, password, messages));
}

function createUserObj(name,email,pass,messages){
    return {
        name: name,
        email: email,
        password: pass,
        messages: messages
    }
}

function createMessage(message, to) {
    return {
        message: message,
        to: to
    };
}

function readUsers() {
    var MessagesArray = new Array();
    var ref = firebase.database().ref("Users").on('value', function (response) {
        response.forEach(function (item) {
            MessagesArray.push(generateFirebaseItem(item.key, item.val()));
        });
    });
    return MessagesArray;
}


// unda davamato userebi rom vakontrolo vin dawera meiji

// -- Pagination --

window.addEventListener("load", function(){
    if (window.location.href.split("/").pop() == "register.html"){
        const nameInp = document.querySelector("#name");
        const emailInp = document.querySelector("#email");
        const passwordInp = document.querySelector("#password");
        const confirmPassInp = document.querySelector("#confirmPass");
        const submit = document.querySelector(".btn");
        submit.addEventListener("click", function(){
            var name = nameInp.value;
            var email = emailInp.value;
            var password = passwordInp.value;
            var confirmPass = confirmPassInp.value;
            var messages = [""];
            if (password == confirmPass){
                createUser(name, email, password, messages);
                setTimeout(function(){
                    var tempArr = readUsers();
                    tempArr.forEach(o => {
                        if (o.data.email == email){
                            localStorage["user"] = o.id;
                            window.location.href = "./index.html";
                        }
                    })
                },5000)
            } else {
                prompt("Passwords Aren't Same");
            }
        })
    } else if (window.location.href.split("/").pop() == "index.html"){
        sendButton.addEventListener("click", function () {
            let text = textInput.value;
            for (var i = 0; i < text.length; i++) {
                if (text[i] === " ") {
                    counter += 1
                }
            }
            if (text.length != counter) {
                createData(text)
            }
        })

    }
})