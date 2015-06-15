// ArtistBlock.js

// Styles
import '../css/ArtistBlock.scss';

// Lib Dependencies
import React from 'react';
import _ from 'lodash';

// Actions
import ChosenArtistActions from '../actions/chosen_artist_actions';


class ArtistBlock extends React.Component {
  constructor() {
    super();
  }


  /*
   * Creates an img element depending on if the artist has images
   *
   * @return {React.DOM}
   */
  image() {
    if (this.props.artist.images.length) {
      return <img src={this.props.artist.images[0].url}/>;

    } else {
      return <img src="http://cdn.flaticon.com/png/256/26834.png" width="80"/>;

    }
  }


  render() {
    return (
      <a
        className="ArtistBlock"
        key={this.props.artist.id}
        onClick={() => {ChosenArtistActions.chooseArtist(this.props.artist)}}
      >
        <div className="image-holder">
          {this.image()}
        </div>

        <div className="artist-name">
          {this.props.artist.name}
        </div>

      </a>
    );
  }

}

export default ArtistBlock;
