import React from 'react';

const PlaylistItem = (props) => (
  <div>
    <td><img style={{ width: 50, height: 50 }} src={ props.item.images[0].url } /></td>
    <td>{ props.item.name }</td>
    <td><a href={ props.item.external_urls.spotify }>link</a></td>
    <td>{ props.item.owner.display_name }</td>
    <td>{ props.item.tracks.total } tracks</td>
    {/* <td>{ props.item.search_count ? props.item.search_count : 0 } searches</td> */}
  </div>
)

export default PlaylistItem;