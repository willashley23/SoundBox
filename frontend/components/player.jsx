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
            artist: "",
            trackName: "",
            albumArt: "",
            progress: 0,
            duration: 0,
            index: 0,
            tracks: []
        };

        // Common practice in React. Bind 'this' to all instance methods of the class so we can propogate them to the child components.
        // this.playPause = this.playPause.bind(this);
        // this.updateProgress = this.updateProgress.bind(this);
        // this.bindListeners = this.bindListeners.bind(this);
        // this.setDuration = this.setDuration.bind(this);
        // this.flip = this.flip.bind(this);

        this.flip = this.flip.bind(this);
    }


    componentWillMount() {
        this.getTracks().then(() => {
            // Bind listeners to the audio so we can update the UI accordingly
            //this.bindListeners();
            // ...and play the first track!
            
            //this.state.currentTrack.play();
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
            //currentTrack: new Audio(data.tracks[0].url),
            artist: data.artist,
            trackName: data.tracks[0].name,
            albumArt: data.tracks[0].cover_image,
            //playing: true,
        });
    }

    flip(direction) {
        // Do nothing if trying to go back when on first track or forward when on last track.
        if(direction === -1 && this.state.index === 0 || 
            direction === 1 && this.state.index === this.state.tracks.length - 1) return;
            
            let tracks = this.state.tracks;
            let currentIndex = this.state.index + direction;

            // let currentTrack = this.state.currentTrack;
            // currentTrack.src = tracks[`${currentIndex + direction}`].url;
            this.setState({
                playing: true,
                index: currentIndex,
                trackName: tracks[`${currentIndex}`].name,
                trackUrl: this.state.tracks[currentIndex].url,
                albumArt: tracks[`${currentIndex}`].cover_image,
            });
        
    }  
 

    render() {

        if (this.state.tracks.length) {
            return(
                <div className="playerContainer">
                    <div className='albumContainer'>
                        <Album tracks={this.state.tracks} duration={this.state.duration} index={this.state.index}/>
                    </div>
                    <Controls 
                        trackName={this.state.trackName}
                        artist={this.state.artist}
                        trackUrl={this.state.tracks[this.state.index].url}
                        duration={this.state.duration}
                        progress={this.state.progress}
                        index={this.state.index}
                        playing={this.state.playing}
                        flip={this.flip}
                    />
                </div>
            );
        }

        return(<div>Loading</div>)
    }
}