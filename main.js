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

function createData(message) {
    firebase.database().ref(`Messages/` + uuidv4()).set(createMessage(message));
}

function createMessage(message) {
    return {
        message: message
    };
}

function readMessages() {
    var MessagesArray = new Array();
    var ref = firebase.database().ref("Messages").on('value', function (response) {
        response.forEach(function (item) {
            MessagesArray.push(generateFirebaseItem(item.key, item.val()));
        });
    });
    return MessagesArray;
}

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

// unda davamato userebi rom vakontrolo vin dawera meiji
