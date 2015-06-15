// search_store.js

// Lib Dependencies
import Reflux from 'reflux';
import {get as fetch} from 'superagent';

// Actions
import SearchArtistActions from '../actions/search_actions';

var SearchArtistStore = Reflux.createStore({
  listenables: SearchArtistActions,

  init() {
    this.searchedArtists = [];
    this.nextArtistSearch = null;
  },


  /*
   * Search spotify for artist based on searchString
   * If search string is blank clear searchedArtists and return
   *
   * @params {String} searchString
   */
  onSearchArtists(searchString) {
    if (!searchString.length) {
      this.searchedArtists = [];
      this.nextArtistSearch = null;
      this.trigger({artists: this.searchedArtists, nextSearch: this.nextArtistSearch});
      return;
    }

    fetch('https://api.spotify.com/v1/search')
      .query({q: searchString})
      .query({type: 'artist'})
      .end((err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        this.searchedArtists = res.body.artists.items;
        this.nextArtistSearch = res.body.artists.next;

        this.output();
      });
  },


  /*
   * Use the nextArtistSearch string to the get the next 20 artists for a search
   */
  onMoreArtists() {
    if (!this.nextArtistSearch) return;

    fetch(this.nextArtistSearch)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        this.searchedArtists = this.searchedArtists.concat(res.body.artists.items);
        this.nextArtistSearch = res.body.artists.next;
        this.output();
      });
  },


  /*
   * Trigger the envent to components
   */
  output() {
    this.trigger({
      artists: this.searchedArtists,
      nextSearch: this.nextArtistSearch
    });
  }
});


export default SearchArtistStore;
