import React from 'react';
import Utils from '../assets/util/utils';

export default class ProgressBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            duration: 0,
            progress: 0
        }

        this.updateProgress = this.updateProgress.bind(this);
        this.bindListeners = this.bindListeners.bind(this);
        this.setDuration = this.setDuration.bind(this);

    }

    componentDidMount() {
        this.bindListeners();
    }

    updateProgress() {
        this.setState({
            progress: this.props.currentTrack.currentTime
        });
    }

    setDuration() {
        this.setState({
            duration: this.props.currentTrack.duration
        });
    }

    bindListeners() {
        let currentTrack = this.props.currentTrack;
        
        currentTrack.addEventListener('loadedmetadata', () => {
            this.setDuration();
        });

        currentTrack.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        currentTrack.addEventListener('ended', () => {
            this.props.flip(1);
        });
    }

    render() {

        let progressAsPercent = ((this.state.progress / this.state.duration) * 100).toString() + "%";
        let formattedProgress = Utils.formatTime(this.state.progress);
        let formattedDuration = Utils.formatTime(this.state.duration);

        // Create the style object we will use to increase the width of the progress bar.
        let currentAudioProgress = {
            width: progressAsPercent
        };

        return(
            <div>
                <div className="elapsed" style={currentAudioProgress}>
                    <div className="bar" ></div>
                </div>

                 <div className='progressTimer'>
                    <span className='currentTime'>{formattedProgress}</span>
                    <span className='totalTime'>{formattedDuration}</span>
                </div>
            </div>
        );
    }
}