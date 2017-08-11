# SoundBox

### To Run:

Clone the repo, cd into the root directory, and run `npm install`

then

`webpack`

finally

`npm start` (will be on port 8080) or just `open index.html`


## Top Level Description

Becuase writing components with React is a very fast and effective way to render UI and pass props down to children, I decided to go with React for this project.

Considering this app has minimal state, I felt that a state container such as Redux would be overkill. Since there is no need for a db layer, a simple static server will do just fine. 

### Components

I broke this player down into three main components:

The `Player`, which handles the state of the app and distributes it to its children. It creates an audio object via `new Audio(url)` and uses its instance methods such as `currentTime`, `duration`, `stop`, `play`, as well as its event listeners. 

The `Controls`, which recieve instance methods from the Player to call when the user interacts with them and update the UI as necessary.

And last, the `Album`, which stores all the album artowrk. I broke this component out of the player to avoid unecessary re-renders of images, though some are still unavoidable.

This is by no means the best way to approach this. There are plenty of other component hierarchies that would work fine. I personally think it would be interesting to make the progress bar its own component, since it updates the most. 

### The API
We can simply use `fetch` to hit the API, and `async` to await for the response and store it in the state. Since the payload of the API is small, we can store it all in the state, but in a production app, it would be wiser to only fetch the frist `n` tracks, store them in the state, and then fetch more tracks when the user is `n` tracks away from the end. 

### UI

I wanted to make the UI as accurate as possible, so I used color droppers to get the hex codes for all the colors in the comp. 

I added a less-loader to compile less into css with webpack, allowing me to make the style sheets more modular and contained. 

I store a few icons locally. They are SVGs because they scale well, meaning we won't lose sharpness depending on the display.

The progress bar works by taking the current time of the clip / total time and convering that into a percent. That percentage becomes the `width` property of a div that contains the green color on the progress bar. I didn't have time to make the progress bar draggable, but that would have been a decent use case for jQuery UI draggable. 

Transitions, box-shadows, hover effects, and cross blurs were added to make it feel more natural.


### Testing

I really wanted to write unit tests, but writing them with Jest/Enzyme for React is rather time consuming, and I didn't want to go well over 3 hours. 

