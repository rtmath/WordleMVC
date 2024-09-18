"use strict";

(() => {
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
            console.log(`Submitting guess ${guess}`);
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
})();