import React, { Component } from 'react'; // class based React because I guess I will use pretty complex component so I will need some helper methods
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    // either we can do this or
    // this.props.mutate({
    //   variables: { id },
    //   refetchQueries: [{ query }]
    // });
    // or we can do this
    // we can only do this this.props.data.refetch only if this.props.data
    // receives queried/fetched data
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch()); // refetch will execute any queries
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) { return <div>laoding...</div>; }
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// always use backtik, not a single quote (ES6)
// this is just defined, not being executed yet

// graphql(query) will return a function
// export default graphql(query)(SongList); // old code
// below does not work - at this moment graphql cannot take multiple arguments
// export default graphql(query, mutation)(SongList);
// so let's do this, one at a time
export default graphql(mutation)(
  graphql(query)(SongList)
);
