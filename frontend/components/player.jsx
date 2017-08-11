import React from 'react';


export default class Player extends React.component  {

    constructor(props) {
        super(props);
        // Set the initial state of the app.
        this.state = {
            player: null,
            playing: false,
            currentTrack: null,
            artist: "",
            trackName: "",
            albumArt: "",
            progress: 0,
            duration: 0,
        };
    }


    componentDidMount() {
        this.getTracks.then(() => {
            // Bind listeners to the audio so we can update the UI accordingly
            this.bindListeners();
            // ...and play the first track!
            this.state.currentTrack.play();
        });
    }


    async getTracks() {
        /*
            Fetch should be fine for our purposes. No need to spend time downloading jQuery 
            or fussing with XHR.
        */
        const response = await fetch("https://s3-us-west-1.amazonaws.com/fbx-fed-homework/fed_home_assignment_api.json");
        const data = await response.json();

        this.setState({
            tracks: data.tracks,
            index: 0,
            currentTrack: new Audio(data.tracks[0].url),
            artist: data.artist,
            trackName: data.tracks[0].name,
            albumArt: data.tracks[0].cover_image,
            playing: true,
        });
    }

    updateProgress() {
        this.setState({
            progress: this.state.currentTrack.currentTime
        });
    }

    setDuration() {
        this.setState({
            duration: this.state.currentTrack.duration
        });
    }

    // Maybe we can combine these
    bindListeners() {
        this.state.currentTrack.addEventListener('loadedmetadata', (e) => {
            this.setDuration();
        });

        this.state.currentTrack.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        this.state.currentTrack.addEventListener('ended', () => {
            this.next();
        });
    }   

    render() {
        return(

        );
    }
}