import React from 'react';
import Controls from './controls';
import Album from './album';

export default class Player extends React.Component  {

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

        // Common practice in React. Bind 'this' to all instance methods of the class so we can propogate them to the child components.
        this.playPause = this.playPause.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.bindListeners = this.bindListeners.bind(this);
        this.setDuration = this.setDuration.bind(this);
        this.flip = this.flip.bind(this);
    }


    componentDidMount() {
        this.getTracks().then(() => {
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

    bindListeners() {
        let currentTrack = this.state.currentTrack;
        
        currentTrack.addEventListener('loadedmetadata', (e) => {
            this.setDuration();
        });

        currentTrack.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        currentTrack.addEventListener('ended', () => {
            this.next();
        });
    }

    playPause() {
        if (!this.state.playing) {
            this.state.currentTrack.play();
            this.setState({playing: true});
        }
        else {
            this.setState({playing: false});
            this.state.currentTrack.pause();
        }
    }

    flip(direction) {
        // Do nothing if trying to go back when on first track or forward when on last track.
        if(direction === -1 && this.state.index === 0 || 
            direction === 1 && this.state.index === this.state.tracks.length - 1) return;
            
            let tracks = this.state.tracks;
            let currentIndex = this.state.index;

            let currentTrack = this.state.currentTrack;
            currentTrack.src = tracks[`${currentIndex + direction}`].url;
            this.setState({
                playing: true,
                index: currentIndex + direction,
                trackName: tracks[`${currentIndex + direction}`].name,
                albumArt: tracks[`${currentIndex + direction}`].cover_image,
                currentTrack,
            }, () => {this.state.currentTrack.play()});
        
    }   

    render() {
        return(
            <div className="playerContainer">
                <div className='albumContainer'>
                    <Album tracks={this.state.tracks} duration={this.state.duration} index={this.state.index}/>
                </div>
                <Controls 
                    trackName={this.state.trackName}
                    artist={this.state.artist}
                    duration={this.state.duration}
                    progress={this.state.progress}
                    index={this.state.index}
                    playPause={this.playPause} 
                    playing={this.state.playing}
                    flip={this.flip}
                />
            </div>
        );
    }
}