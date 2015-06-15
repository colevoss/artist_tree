// Content.js

// Styles
import '../css/Content.scss';

// Lib Dependencies
import React from 'react';

// Component
import Sidebar from './Sidebar'
import ArtistBlock from './ArtistBlock';

// Stores
import ChosenArtistStore from '../stores/chosen_artist_store';

// Actions
import ChosenArtistActions from '../actions/chosen_artist_actions';

class Content extends React.Component {
  /*
   * Set state and listen to ChosenArtistStore
   */
  constructor() {
    super();

    this.state = {
      artist: null,
      history: []
    }

    ChosenArtistStore.listen(this.setArtistsState.bind(this));
  }


  /*
   * Callback fn for ChosenArtistStore
   *
   * @params {Object} data - ChosenArtistStore.output
   */
  setArtistsState(data) {
    this.setState(data)
  }


  /*
   * Create array of ArtistBlock elements for each artist
   * Artists are displayed in order of popularity (high > low)
   *
   * @return {Array}
   */
  relatedArtists() {
    if (!this.state.artist) return;

    var artists = _.sortBy(this.state.artist.related, 'popularity').reverse().map((artist) => {
      return <ArtistBlock artist={artist} key={artist.id}/>;
    });

    return artists;
  }


  /*
   * Create breadcrumb DOM based on state.history
   *
   * @return {React.DOM}
   */
  historyBreadCrumbs() {
    if (!this.state.history.length) return;

    return (
      <ul className="breadcrumbs">
        {this.state.history.map((artist) => {
          return (
            <li key={artist.id + _.uniqueId()}>
              <a onClick={() => ChosenArtistActions.traverseHistory(artist.id)}>
                {artist.name}
              </a>
            </li>
          );
        })}
      </ul>
    )
  }


  render() {
    return (
      <div className="Content row">
        <Sidebar artist={this.state.artist}/>
        {this.historyBreadCrumbs()}
        <div className="artist-container">
          {this.relatedArtists()}
        </div>
      </div>
    );
  }
}

export default Content;
