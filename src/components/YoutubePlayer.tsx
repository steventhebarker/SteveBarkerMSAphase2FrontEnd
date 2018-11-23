import * as React from 'react';
import YouTube from 'react-youtube';
 
interface IYoutubePlayerProps {
  videoId: string;
}


export class YoutubePlayer extends React.Component<IYoutubePlayerProps>{
  public render() {
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
      },
      width: '100%'

    };
 
    return (
      <YouTube
        onReady={this._onReady}
        opts={opts}
        videoId = {this.props.videoId}
      />
    );
  }
 
  public _onReady(event: any) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}