import Reflux from 'reflux';

var SearchArtistAcitons = Reflux.createActions([
  'searchArtists',  // User types in search field
  'moreArtists'     // User clicks more artist link in search results
]);

export default SearchArtistAcitons;
