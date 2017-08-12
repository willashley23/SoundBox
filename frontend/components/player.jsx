import React from 'react';
import Controls from './controls';
import Album from './album';

export default class Player extends React.Component  {

    constructor(props) {
        super(props);
        
        // Set the initial state of the app.
        this.state = {
            artistName: "",
            trackName: "",
            albumArt: "",
            index: 0,
            tracks: []
        };

        this.flip = this.flip.bind(this);
    }


    componentWillMount() {
        this.getTracks().then(() => {
            // Do something if we need
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
            artistName: data.artist,
            trackName: data.tracks[0].name,
            albumArt: data.tracks[0].cover_image,
        });
    }

    flip(direction) {

        // Do nothing if trying to go back when on first track or forward when on last track.
        if(direction === -1 && this.state.index === 0 || 
            direction === 1 && this.state.index === this.state.tracks.length - 1) return;
            
        let tracks = this.state.tracks;
        let currentIndex = this.state.index + direction;

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
                        artist={this.state.artistName}
                        trackUrl={this.state.tracks[this.state.index].url}
                        index={this.state.index}
                        flip={this.flip}
                    />
                </div>
            );
        }

        return(<div>Loading</div>)
    }
}