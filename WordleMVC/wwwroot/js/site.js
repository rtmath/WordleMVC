"use strict";

(() => {
    let correct_word_id = 0;
    let game_over = false;
    let guess = "";
    let guess_results = [];
    let keyboard_buttons = document.querySelectorAll(".keyboard-btn");
    let num_guesses = 0;
    let previous_guess = "";

    const NO_MATCH = 0;
    const PARTIAL_MATCH = 1;
    const EXACT_MATCH = 2;

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
        if (guess.length > 0 && !game_over) guess = guess.substring(0, guess.length - 1);
    }

    function handleEnter() {
        if (guess.length == 5 && correct_word_id > 0 && !game_over) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status == 200) {
                    guess_results = stringToArray(this.responseText);
                    resolveGuessResults();
                }
            }

            xhr.open('POST', '/Main/CheckGuess/');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({ 'correctWordID': correct_word_id, 'guess': guess }));

            previous_guess = guess;
            guess = "";
        }
    }

    function handleCharacter(character) {
        if (guess.length < 5 && !game_over) guess += character;
    }

    function stringToArray(str) {
        // str is in format "[0,0,0,0,0]"
        return str.substring(1, str.length - 1).split(',').map(x => parseInt(x));
    }

    function resolveGuessResults() {
        let characters = document.querySelectorAll(".wordle-character");
        let correct_guess = true;

        for (var i = num_guesses * 5; i < (num_guesses * 5 + 5); i++) {
            if (guess_results[i % 5] == EXACT_MATCH) {
                characters[i].classList.add("exact-match");
                getKey(previous_guess[i % 5]).classList.add("exact-match");
            } else if (guess_results[i % 5] == PARTIAL_MATCH) {
                characters[i].classList.add("partial-match");
                getKey(previous_guess[i % 5]).classList.add("partial-match");
                correct_guess = false;
            } else {
                characters[i].classList.add("no-match");
                getKey(previous_guess[i % 5]).classList.add("no-match");
                disableKey(previous_guess[i % 5]);
                correct_guess = false;
            }
            characters[i].innerHTML = previous_guess[i % 5];
        }

        num_guesses++;
        if (num_guesses >= 6 || correct_guess) game_over = true;
        if (correct_guess) triggerVictory();
    }

    function getKey(c) {
        return Array.from(document.querySelectorAll(".keyboard-btn")).filter((x) => x.value == c)[0];
    }

    function disableKey(c) {
        getKey(c).disabled = true;
    }

    function triggerVictory() {
        let characters = document.querySelectorAll(".wordle-character");

        for (var i = (num_guesses - 1) * 5; i < (num_guesses - 1) * 5 + 5; i++) {
            characters[i].classList.add("victory-anim");
        }
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
                correct_word_id = parseInt(this.responseText);
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