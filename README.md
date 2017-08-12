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

After refactoring the state, player has been broken down into four components:

`Player`: handles the state of the app and distributes it to its children. It fetches an array of tracks from the API and holds the tracks, current title, song number, track URL, and current album artwork. When the user `flip` to the next song, it updates all these props and passes them to the children via re-render. `flip` is the only event control-like event this component holds because it causes a cascading effect wherby the entire app state changes.

`Controls`: acts as the main interface between the audio and the user. Receives the current URL of a track to play, and creates an audio object via `new Audio(url)` and uses its instance methods such as `currentTime`, `duration`, `stop`, `play`. It holds a child component, `ProgressBar`. 

`ProgressBar`: holds the progress bar as well as the current time and total time of the clip. It is necessary to make this its own component because it will use the `currentTrack` object's event listener, `timechange`, to update its internal state each second, which will trigger a rerender. Since this is a lot of re-rendering, we want it to be contained to the smallest component possible, lest we re-render the entire app each second. 

`Album`: stores all the album artowrk. Sticks all the album artwork images into the DOM as `img` tags, where they will be absolutely positioned so as to sit on top on each other. Then, when we advance to the next track, the top most image tag transitons it's opacity via CSS, to give the illusion of a cross-blur to the image sitting below. Behind the scenes, the component is re-rendering and placing a special CSS class on tracks not playing to create this effect.

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

