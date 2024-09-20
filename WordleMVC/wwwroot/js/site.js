"use strict";

(() => {
    let correctWordID = 0;
    let guess = "";
    let keyboard_buttons = document.querySelectorAll(".keyboard-btn");

    keyboard_buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let button_value = e.target.value;
            if (button_value === "back") handleBack();
            else if (button_value === "enter") handleEnter();
            else handleCharacter(button_value);

            populateGuess();
        })
    });

    function handleBack() {
        if (guess.length > 0) guess = guess.substring(0, guess.length - 1);
    }

    function handleEnter() {
        if (guess.length == 5) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status == 200) {
                    console.log(this.responseText);
                }
            }

            xhr.open('POST', '/Main/CheckGuess');
            xhr.setRequestHeader("Content-Type", "text/json");
            xhr.send(JSON.stringify({ "id": correctWordID, "guess": guess }));

            guess = "";
        }
    }

    function handleCharacter(character) {
        if (guess.length < 5) guess += character;
    }

    function populateGuess() {
        let active_guess_slots = document.querySelectorAll(".active-guess-character");

        for (var i = 0; i < 5; i++) {
            active_guess_slots[i].innerHTML = guess[i] || "";
        }
    }

    function retrieveWordID() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status == 200) {
                console.log(this.responseText);
                correctWordID = parseInt(this.responseText);
            }
        }

        xhr.open('GET', '/Main/RetrieveWordID');
        xhr.send();
    }

    function onPageLoad() {
        retrieveWordID();
    }

    onPageLoad();
})();