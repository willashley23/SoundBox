import React from 'react';
import Utils from '../assets/util/utils';

export default class Controls extends React.Component {
    
    constructor(props) {
        super(props);
        this.formattedDuration = "";
        this.duration;
    }

    // Only format the duration once.
    componentWillUpdate() {
        if (!this.duration || this.props.duration !== this.duration) {
            this.formattedDuration = Utils.formatTime(this.props.duration);
            this.duration = this.props.duration;
        }
    }

    render() {
        // Destructure props so we don't have to constatly retype 'this.props'
        const {artist, trackName, playing, playPause, flip, progress, duration} = this.props;
        
        let formattedProgress = Utils.formatTime(progress);
        let progressAsPercent = ((progress / duration) * 100).toString() + "%";
        
        // Create the style object we will use to increase the width of the progress bar.
        let currentAudioProgress = {
            width: progressAsPercent
        };

        return(
            <div className='controlsContainer'>
                <div className='playerControls'>
                    <div className="previous" onClick={ () => { flip(-1) }} />
                    <div className={this.props.playing ? "playing playPause" : "paused playPause"} onClick={playPause} />
                    <div className="next" onClick={ () => { flip(1) }} />
                </div>
                <div className='playerInfo'>

                    <div className='artistInfo'>
                        <div className='artistName'><span>{artist}</span></div>
                        <div className='songTitle'><span>{trackName}</span></div>
                    </div>

                    <div className='progressBar'>
                    
                        <div className="elapsed" style={currentAudioProgress}>
                            <div className="bar" ></div>
                        </div>

                    </div>

                    <div className='progressTimer'>
                        <span className='currentTime'>{formattedProgress}</span>
                        <span className='totalTime'>{this.formattedDuration}</span>
                    </div>

                </div>
            </div>
        );
    }
}