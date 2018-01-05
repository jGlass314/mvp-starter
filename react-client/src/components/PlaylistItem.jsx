import React from 'react';

const PlaylistItem = (props) => {
  let score;
  if(props.item.search_count) {
    score = <td><b>Score: </b>{ props.item.search_count ? props.item.search_count : 0 }</td>;
  } 
  return (
  <div>
    <tr>
      <td><img style={{ width: 50, height: 50 }} src={ props.item.images[0].url } /></td>
      <td>{ props.item.name }</td>
      <td><a href={ props.item.external_urls.spotify }>link</a></td>
      <td>{ props.item.owner.display_name }</td>
      <td>{ props.item.tracks.total } tracks</td>
      {score}
      {/* <td><b>Score: </b>{ props.item.search_count ? props.item.search_count : 0 }</td> */}
    </tr>
  </div>
  )
}

export default PlaylistItem;