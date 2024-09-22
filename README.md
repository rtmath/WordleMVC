# WordleMVC
![screenshot](https://github.com/user-attachments/assets/e22ec68d-4b8b-4a67-8e8c-8fa7365dead4)

This is a clone of Wordle implemented in C# ASP.NET MVC, with an additional RESTful WebAPI back-end.

The inclusion of the API back-end (or any back-end at all) is completely unnecessary for a project this simple; it is merely to demonstrate the establishment of a clear boundary between the UI and data layers.

___
### Overview of Application Structure

On page load, the View sends a request to the MVC controller to retrieve a Word ID for whatever the daily word-to-guess is. The MVC controller queries the API and retrieves the DB result from the API. The actual word itself is not stored anywhere on the front-end.

When the user submits their guess, the View sends the Word ID and the user's guess to the MVC controller, which passes it along to the API. The API compares the guess against the actual word, and returns an array of values indicating how correct (or not) each letter in the guess is. The MVC controller returns this information to the View, and the View updates state accordingly.

There are lots of improvements that could be made, including caching, error handling, guess validation, etc.
