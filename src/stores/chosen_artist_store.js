// chosen_artist_store.js

// Lib Dependencies
import Reflux from 'reflux';
import {get as fetch} from 'superagent';

// Actions
import ChosenArtistActions from '../actions/chosen_artist_actions';

var ChosenArtistStore = Reflux.createStore({
  listenables: ChosenArtistActions,

  init() {
    this.chosenArtist = null;
    this.history = [];
  },


  /*
   * Makes request to Spotify API and triggers event to Components with results
   *
   * @params {Object} artist - Artist object in spotify form
   */
  onChooseArtist(artist) {
    // If artist has already been selected and put into history
    // we will clone it and push it onto history again so it acts
    // somewhat independent of its former self
    var dupArtist = _.includes(this.history, artist);
    if (dupArtist) {
        var clone = _.cloneDeep(artist);
        this.chosenArtist = clone;
        this.history.push(clone);

        this.output();
        return;
    }

    fetch(`https://api.spotify.com/v1/artists/${artist.id}/related-artists`)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        // Put related artists into related key of artist
        // to make them one object
        artist.related = res.body.artists
        this.chosenArtist = artist

        this.history.push(this.chosenArtist);

        this.output();
      })
  },


  /*
   * Clear history array and chosenArtist when new
   * artist is chosen from search results
   */
  onClearHistory() {
    this.history = [];
    this.chosenArtist = null;
    this.output();
  },


  /*
   * Go back to most recent instance of artist in history
   */
  onTraverseHistory: function(artistId) {
    // We do last index in case the artist is in the history twice.
    // If it is we go to the most recently selected instance of them.
    var artistIndex = _.findLastIndex(this.history, {id: artistId});

    this.history = _.slice(this.history, 0, artistIndex + 1);
    this.chosenArtist = _.last(this.history);
    this.output();
  },


  /*
   * Trigger the event to components
   */
  output() {
    this.trigger({
      artist: this.chosenArtist,
      history: this.history
    });
  }
});

export default ChosenArtistStore;
