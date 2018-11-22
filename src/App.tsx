import * as React from "react";
import TTVlogo from "./TTVlogo.gif";

const apiUrl = "https://tedtalkapi.azurewebsites.net/api";

import {
  FacebookIcon,
  FacebookShareButton,
  GooglePlusIcon,
  GooglePlusShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';
import "./App.css";
import { AddTedTalkPopup } from "./components/AddTedTalkPopup";
import { EditTedTalkPopup } from "./components/EditTedTalkPopup";
import { TedTalkList } from "./components/TedTalkList";
import { YoutubePlayer } from "./components/YoutubePlayer";

interface IState {
  currentVideo: string;
  tedTalks: any[];
  open: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentVideo: "",
      open: false,
      tedTalks: []
    };
    this.fetchTedTalks();
    this.filterByTopic = this.filterByTopic.bind(this);
    this.fetchTedTalks = this.fetchTedTalks.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
    this.editVideo = this.editVideo.bind(this);
  }
  // change video
  public changeVideo(url: string) {
    this.setState({ currentVideo: url.substring(32) });
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
                <FacebookShareButton
                url={"https://www.youtube.com/watch?v="+this.state.currentVideo}
                quote={"Look at this Ted Talk I found on www.tedtalkviewer.azurewebsites.net !"}
                >
                <FacebookIcon
                  size={32}
                  round={true} />
              </FacebookShareButton>

              <TwitterShareButton
                url={"https://www.youtube.com/watch?v="+this.state.currentVideo}
                >
                <TwitterIcon
                  size={32}
                  round={true} />
              </TwitterShareButton>

              <LinkedinShareButton
                url={"https://www.youtube.com/watch?v="+this.state.currentVideo}
                >
                <LinkedinIcon
                  size={32}
                  round={true} />
              </LinkedinShareButton>

              <GooglePlusShareButton
                url={"https://www.youtube.com/watch?v="+this.state.currentVideo}
                >
                <GooglePlusIcon
                  size={32}
                  round={true} />
              </GooglePlusShareButton>

              <RedditShareButton
                url={"https://www.youtube.com/watch?v="+this.state.currentVideo}
                >
                <RedditIcon
                  size={32}
                  round={true} />
              </RedditShareButton>
          
          <YoutubePlayer videoId={this.state.currentVideo} />
          <input
            type="text"
            className="form-control"
            id="topic-filter-input"
            placeholder="Search by topic"/>
          <button type="button" className="btn" onClick={this.filterByTopic}>
            Search
          </button>
          
          <TedTalkList
            tedTalks={tedTalks}
            changeVideo={this.changeVideo}
            deleteVideo={this.deleteVideo}
            editVideo = {this.editVideo}
          />
        </div>
        <AddTedTalkPopup open={open} onCloseModal={this.onCloseModal} />
        <EditTedTalkPopup open={open} onCloseModal={this.onCloseModal} />
      </div>
    );
  }
  // delete vide
  private filterByTopic(){
    console.log("jaboi just searched");
    const filterInput = document.getElementById("topic-filter-input") as HTMLInputElement
    const filter = filterInput.value;
    console.log(filter);
    this.fetchTedTalks(filter);
  }
  private deleteVideo(id: any) {
    console.log("Jaboi just got deleted");
    console.log(id);

    const newTedTalks = this.state.tedTalks.filter(obj => {
      return obj.id !== id;
    });

    this.setState({ tedTalks: newTedTalks });
    ////
    const url = "https://tedtalkapi.azurewebsites.net/api/ted/" + id;

    fetch(url, {
      method: "DELETE"
    });
    ////
  }

  private editVideo(id: any){
    console.log("jaboi just got edited to mars");
    const url = "https://tedtalkapi.azurewebsites.net/api/ted/" + id;
    console.log(url);
    
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
  private fetchTedTalks(topic?: any) {
    let url = apiUrl + "/ted";
    if (!!topic) {
      if (topic !== "") {
        url += "/topic?=" + topic;
      }
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
        if (!!this.state.tedTalks[0]) {
          console.log(this.state.tedTalks[0].url);
          this.changeVideo(this.state.tedTalks[0].url);
        }
      });
  }
}

export default App;
