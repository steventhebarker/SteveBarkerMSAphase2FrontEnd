import * as React from "react";
import TTVlogo from "./TTVlogo.gif";

const apiUrl = "https://tedtalkapi.azurewebsites.net/api";

import "./App.css";
import { AddTedTalkPopup } from './components/AddTedTalkPopup';
import { TedTalkList } from './components/TedTalkList';
import { YoutubePlayer } from './components/YoutubePlayer';


interface IState {
  currentVideo: string;
  tedTalks: any[];
  open: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentVideo: "2CeurT8vjU0",
      open: false,
      tedTalks: []
    };
    this.fetchTedTalks();

    this.fetchTedTalks = this.fetchTedTalks.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
  }
  // change video
  public changeVideo(url: string){
    this.setState({ currentVideo: url.substring(32)});
  }
  public render() {
    const { open, tedTalks } = this.state;
    return (
      <div>
        <div className="header-wrapper">
          <div className="container header">
            <img src={TTVlogo} height="80" />
            <div
              className="btn btn-primary btn-action btn-add"
              onClick={this.onOpenModal}
            >
              Add Ted Talk
            </div>
          </div>
          <div className="header">View your favourite Ted Talks here!</div>
        </div>
        <div className="container">
         <TedTalkList tedTalks={tedTalks} changeVideo={this.changeVideo}/>
         <YoutubePlayer videoId = {this.state.currentVideo}/>
        </div>
        <AddTedTalkPopup open = {open} onCloseModal = {this.onCloseModal}/>
      </div>
    );
  }

  // private onButtonPress = () => {
  // 	this.fetchTedTalks();
  // }

  // Modal open
  private onOpenModal = () => {
    this.setState({ open: true });
  };

  // Modal close
  private onCloseModal = () => {
    this.setState({ open: false });
  };




  // GET memes
  private fetchTedTalks(speaker?: any) {
    let url = apiUrl + "/ted";
    if (!!speaker) {
      url += "/speaker?=" + speaker;
    }
    fetch(url, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          tedTalks: json
        });
      });
  }
}

export default App;
