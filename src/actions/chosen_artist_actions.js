import Reflux from 'reflux';

var ChosenArtistAcitons = Reflux.createActions([
  'chooseArtist',     // User selects artist in search results or related artists
  'traverseHistory',  // User clicks on history breadcrumbs
  'clearHistory'      // User selects artist in search resutls
]);

export default ChosenArtistAcitons;
