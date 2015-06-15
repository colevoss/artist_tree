// Sidebar.js

// Styles
import '../css/Sidebar.scss';

// Lib Dependencies
import React from 'react';
import _ from  'lodash';

class Sidebar extends React.Component {
  constructor() {
    super();
  }


  /*
   * Create list of genres based on artist or no genre message
   *
   * @return {React.DOM}
   */
  genres() {
    if (this.props.artist.genres.length) {
      return (
        <ul className="genre-list square">
          {this.props.artist.genres.map((genre) => {
            return <li key={genre}>{_.capitalize(genre)}</li>;
          })}
        </ul>
      );

    } else {
      return "No genres listed";

    }
  }


  /*
   * Star elements to show popularity out of 5 stars
   *
   * @return {React.DOM}
   */
  popularity() {
    var fullStars, halfStars, emptyStars, roundedRating;

    // This creates a .0 or .5 ratings based on rating Spotify gives out of 100
    roundedRating = Math.round((this.props.artist.popularity / 20)  * 2) / 2;

    fullStars = Math.floor(roundedRating);
    halfStars = Math.ceil(roundedRating - fullStars);
    emptyStars = 5 - (fullStars + halfStars);

    return (
      <span>
        {_.times(fullStars, (i) => {
          return <i className="fa fa-star" key={i}></i>
        })}
        {halfStars ? <i className="fa fa-star-half-o"></i> : null}
        {_.times(emptyStars, (i) => {
          return <i className="fa fa-star-o" key={i + 'o'}></i>
        })}
      </span>
    )
  }


  /*
   * Sidebar to display if an artist is chosen
   *
   * @return {React.DOM}
   */
  artistSidebar() {
    return (
      <div className="Sidebar small-3 columns">
        <div className="artist-header">
          {this.props.artist.images.length ?
            <img className="header-image" src={_.last(this.props.artist.images).url} /> : null
          }
          <span className="artist-name">
            {this.props.artist.name}
            <a href={this.props.artist.external_urls.spotify} target="_blank" className="listen fa fa-headphones"></a>
          </span>
        </div>

        <div className="body small-12 columns">
          <div className="artist-details">
            <span className="detail-title">Followers: </span>{this.props.artist.followers.total}
          </div>

          <div className="artist-details">
            <span className="detail-title">Rating: </span>
            {this.popularity()}
          </div>

          <div className="artist-details">
            <span className="detail-title">Genres: </span>
            {this.genres()}
          </div>
        </div>
      </div>
    )
  }


  /*
   * Sidebar to display if no artist is chosen
   *
   * @return {React.DOM}
   */
  defaultSidebar() {
    return (
      <div className="Sidebar small-3 columns">
        <div className="default-header">
        </div>

        <div className="body">
          <p className="small-12 columns">
            Search for and choose an artist to see their information
              and related artists.
          </p>
        </div>
      </div>
    )
  }


  render() {
    if (this.props.artist) {
      return this.artistSidebar();

    } else {
      return this.defaultSidebar();

    }
  }

}

export default Sidebar;
