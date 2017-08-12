import React from 'react';
import Utils from '../assets/util/utils';

export default class Controls extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentTrack: new Audio(`${props.trackUrl}`),
            duration: 0,
            progress: 0,
        }

        this.playPause = this.playPause.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.bindListeners = this.bindListeners.bind(this);
        this.setDuration = this.setDuration.bind(this);
        
        this.bindListeners();
    }

    componentDidMount() {
        this.setState({
            duration: this.state.currentTrack.duration,
        }, () => {this.state.currentTrack.play()} );
    }

    componentWillUpdate() {

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
        
        currentTrack.addEventListener('loadedmetadata', () => {
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

    render() {
        
        const {index, trackName, flip, artist} = this.props;

        let formattedProgress = Utils.formatTime(this.state.progress);
        let formattedDuration = Utils.formatTime(this.state.duration);
        let progressAsPercent = ((this.state.progress / this.state.duration) * 100).toString() + "%";
        let name = `${index + 1}. ${trackName}`;
        
        // Create the style object we will use to increase the width of the progress bar.
        let currentAudioProgress = {
            width: progressAsPercent
        };

        return(
            <div className='controlsContainer'>
                <div className='playerControls'>
                    <div className="previous" onClick={ () => { flip(-1) }} />
                    <div className={this.props.playing ? "playing playPause" : "paused playPause"} onClick={this.playPause} />
                    <div className="next" onClick={ () => { flip(1) }} />
                </div>
                <div className='playerInfo'>

                    <div className='artistInfo'>
                        <div className='artistName'><span>{artist}</span></div>
                        <div className='songTitle'><span>{name}</span></div>
                    </div>

                    <div className='progressBar'>
                    
                        <div className="elapsed" style={currentAudioProgress}>
                            <div className="bar" ></div>
                        </div>

                    </div>

                    <div className='progressTimer'>
                        <span className='currentTime'>{formattedProgress}</span>
                        <span className='totalTime'>{formattedDuration}</span>
                    </div>

                </div>
            </div>
        );
    }
}