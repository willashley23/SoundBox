import React from 'react';

export default class Album extends React.Component {

    constructor(props) {
        super(props);
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