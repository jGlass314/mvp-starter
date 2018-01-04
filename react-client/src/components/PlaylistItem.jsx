import React from 'react';

const PlaylistItem = (props) => (
  <div>
    <td><img style={{ width: 50, height: 50 }} src={ props.item.imageUrl } /></td>
    <td>{ props.item.name }</td>
    <td><a href={ props.item.externalUrl }>link</a></td>
    <td>{ props.item.ownerDisplayName }</td>
    <td>{ props.item.tracksCount } tracks</td>
    <td>{ props.item.searchCount } searches</td>
  </div>
)

export default PlaylistItem;