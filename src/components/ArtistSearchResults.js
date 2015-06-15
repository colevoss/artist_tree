// ArtistSearchResults.js

// Lib Dependencies
import React from 'react';
import _ from  'lodash';

// Actions
import SearchArtistActions from '../actions/search_actions';
import ChosenArtistActions from '../actions/chosen_artist_actions';

// Stores
import SearchArtistStore from '../stores/search_store';
import ChosenArtistStore from '../stores/chosen_artist_store';


class ArtistSearchResults extends React.Component {

  /*
   * Set state and listen to SearchArtistStore
   */
  constructor() {
    super();

    this.state = {
      artists: [],
      nextSearch: null
    };

    SearchArtistStore.listen(this.setArtistsInState.bind(this));
  }


  /*
   * Callback fn for SearchArtistStore events
   * Sets state to search artist output
   *
   * @params {Object} data - SearchArtistStore.output
   */
  setArtistsInState(data) {
    this.setState({artists: data.artists, nextSearch: data.nextSearch});
  }


  /*
   * Click callback for search results item
   *
   * @params {Object} artist - artist to choose for app
   */
  chooseArtistClick(artist) {
    SearchArtistActions.searchArtists('');
    ChosenArtistActions.clearHistory();
    ChosenArtistActions.chooseArtist(artist);
  }


  /*
   * Creates DOM list of search results
   *
   * @return {React.DOM}
   */
  artistListItems() {
    return this.state.artists.map(function(artist) {
      return (
        <a
          className="result-item"
          key={artist.id}
          onClick={this.chooseArtistClick.bind(this, artist)}
        >
          {artist.images.length ? <img src={_.first(artist.images).url} /> : null}
          <span className="artist-name">
            {artist.name}
          </span>
        </a>
      )
    }.bind(this));
  }


  /*
   * Creates class based based on amount of artists in search results
   * If there are artists then we show the results DOM
   *
   * @return {React.DOM}
   */
  resultsClassName() {
    if (this.state.artists.length) {
      return "results-list";
    } else {
      return "results-list hide";
    }
  }


  render() {
    return (
      <div className={this.resultsClassName()}>
        <div className="results-container" ref="results">
          {this.artistListItems()}
        </div>

        <a
          className="more-artists"
          onClick={() => {SearchArtistActions.moreArtists()}}
        >
          More Artists
        </a>
      </div>
    )
  }
}

export default ArtistSearchResults;
