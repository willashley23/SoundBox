import React from 'react';

export default class Album extends React.Component {

    constructor(props) {
        super(props);
        this.duration;
    }

    shouldComponentUpdate() {
        let bool = this.props.duration === this.duration || !this.props.tracks ? false : true;
        this.duration = this.props.duration !== this.duration ? this.props.duration : this.duration;
        return bool;
    }

    componentDidMount() {
        if (!this.duration) {
            this.duration = this.props.duration;
        }
    }

    render() {
        let artwork;
        if (this.props.tracks) {
            artwork = this.props.tracks.map( (track, idx) => {
                return <img src={track.cover_image} className={ idx < this.props.index ? "hidden" : ""} />;
            }).reverse();
        }

        // Insert the images into the dom, stacking them on top of each other for faster client side rendering.
        return(
            <div className="albumArtwork">
                {artwork}
            </div>
        );
    }
}