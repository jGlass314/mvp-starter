import React from 'react';
import PlaylistItem from './PlaylistItem.jsx';

const Playlist = (props) => (
  <div>
    {/* <h4> Playlist Component </h4> */}
    {/* There are { props.items.length } items. */}
    <table>
      <tbody style={{'align':'right'}}>
          { props.items.map(item => <PlaylistItem item={item}/>)}
      </tbody>
    </table>
  </div>
)

export default Playlist;