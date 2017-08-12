import React from 'react';
import ProgressBar from './progressBar';

export default class Controls extends React.Component {
    
    constructor(props) {
        super(props);
 
        this.state = {
            currentTrack: new Audio(`${props.trackUrl}`),
        }
        
        this.playPause = this.playPause.bind(this);
    }

    componentDidMount() {
        this.setState({
            playing: true,
        }, () => {
            this.state.currentTrack.play() 
        });
    }

    componentWillUpdate() {
        
        if(this.props.trackUrl) {
            
            let currentTrack = this.state.currentTrack;
            currentTrack.src = this.props.trackUrl;
            
            this.setState({
                currentTrack,
            }, () => {this.state.currentTrack.play()});
        }
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
        
        let name = `${index + 1}. ${trackName}`;
        
        return(
            <div className='controlsContainer'>
                <div className='playerControls'>
                    <div className="previous" onClick={ () => { flip(-1) }} />
                    <div className={this.state.playing ? "playing playPause" : "paused playPause"} onClick={this.playPause} />
                    <div className="next" onClick={ () => { flip(1) }} />
                </div>
                <div className='playerInfo'>

                    <div className='artistInfo'>
                        <div className='artistName'><span>{artist}</span></div>
                        <div className='songTitle'><span>{name}</span></div>
                    </div>

                    <div className='progressBar'>
                    
                        <ProgressBar currentTrack={this.state.currentTrack}/>

                    </div>

                </div>
            </div>
        );
    }
}