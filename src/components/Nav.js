// Nav.js

// Styles
import '../css/App.scss';
import '../css/Nav.scss';

// Lib Dependencies
import React from 'react';
import _ from  'lodash';

// Actions
import SearchArtistActions from '../actions/search_actions';

// Stores
import SearchArtistStore from '../stores/search_store';

// Components
import ArtistSearchResults from './ArtistSearchResults';


class Nav extends React.Component {
  constructor() {
    super();
  }


  /*
   * Trigger search action in SearchArtistActions
   */
  handleSearchChange(e) {
    SearchArtistActions.searchArtists(e.target.value);
  }


  render() {
    return (
      <nav className="top-bar Nav">
        <ul className="title-area">
          <li className="name">
            <h1>
              <a href="#">Spotify Artist Tree</a>
            </h1>
          </li>
        </ul>

        <section className="top-bar-section">
          <ul className="right">
            <li className="has-form">
              <div className="row collapse">
                <div className="small-12 columns">
                  <input
                    type="text"
                    placeholder="Search For Artists"
                    onChange={this.handleSearchChange}
                    onFocus={this.handleSearchChange}
                  />
                </div>
              </div>
            </li>

            <ArtistSearchResults />
          </ul>
        </section>
      </nav>
    )
  }
}

export default Nav;
