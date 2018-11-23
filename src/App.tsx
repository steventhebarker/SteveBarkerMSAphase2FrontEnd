import MediaStreamRecorder from "msr";
import * as React from "react";
import msaPhase2Logo from "./tedtalkViewerLogo.jpg";

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
} from "react-share";
import "./App.css";
import { AddTedTalkPopup } from "./components/AddTedTalkPopup";
import { EditTedTalkPopup } from "./components/EditTedTalkPopup";
import { TedTalkList } from "./components/TedTalkList";
import { YoutubePlayer } from "./components/YoutubePlayer";

interface IState {
  currentVideo: string;
  tedTalks: any[];
  open: boolean;
  editOpen: boolean;
  selectedID: any;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentVideo: "",
      editOpen: false,
      open: false,
      selectedID: 0,
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
  public changeVideo(tedTalk: any) {
    this.setState({ currentVideo: tedTalk.url.substring(32) });
    this.setState({ selectedID: tedTalk.id });
  }
  public render() {
    const { open, tedTalks, editOpen } = this.state;
    return (
      <div>
        <div className="header-wrapper">
          <div className="container header">
            <img className = "logo" src={msaPhase2Logo} height="120px" />
          </div>
          <div className="header">View your favourite Ted Talks here!</div>
        </div>
        <div className="fullcontainer">
          <table className="toptable">
            <tr>
              <th><FacebookShareButton
              url={"https://www.youtube.com/watch?v=" + this.state.currentVideo}
              quote={
                "Look at this Ted Talk I found on www.tedtalkviewer.azurewebsites.net !"
              }
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton></th>
              <th><TwitterShareButton
              url={"https://www.youtube.com/watch?v=" + this.state.currentVideo}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton></th>
              <th><LinkedinShareButton
              url={"https://www.youtube.com/watch?v=" + this.state.currentVideo}
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton></th>
            <th><GooglePlusShareButton
              url={"https://www.youtube.com/watch?v=" + this.state.currentVideo}
            >
              <GooglePlusIcon size={32} round={true} />
            </GooglePlusShareButton> </th>
            <th><RedditShareButton
              url={"https://www.youtube.com/watch?v=" + this.state.currentVideo}
            >
              <RedditIcon size={32} round={true} />
            </RedditShareButton> </th>
            </tr>
          </table>
          <table className="video-layout">
          <th>
          <YoutubePlayer  videoId={this.state.currentVideo} />
          </th>
          </table>
          <table className="searchbutton">
          <th>
            <div/>
            </th>
          <th>
          <div
              className="btn btn-primary btn-action btn-add midd"
              onClick={this.onOpenModal}
            >
              Add Ted Talk
            </div>
            </th>
            </table>
          <table className = "search-bar">
          <tr>
          <th>
          <input
            type="text"
            className = "search-box"
            id="topic-filter-input"
            placeholder="Search by topic"
          />
          </th>
          <th>
          <button type="button" className="btn" onClick={this.filterByTopic}>
            Search
          </button>
          </th>
          <th>
          <div className="btn" onClick={this.searchTagByVoice}>
            <i className="fa fa-microphone" />
          </div>
            </th>
            </tr>
          </table>


          <TedTalkList
            tedTalks={tedTalks}
            changeVideo={this.changeVideo}
            deleteVideo={this.deleteVideo}
            editVideo={this.editVideo}
          />
        </div>
        <AddTedTalkPopup open={open} onCloseModal={this.onCloseModal} />
        <EditTedTalkPopup
          tedTalks={this.state.tedTalks}
          selectedID={this.state.selectedID}
          editOpen={editOpen}
          onEditCloseModal={this.onEditCloseModal}
        />
      </div>
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private searchTagByVoice() {
    const mediaConstraints = {
      audio: true
    };
    const onMediaSuccess = (stream: any) => {
      const mediaRecorder = new MediaStreamRecorder(stream);
      mediaRecorder.mimeType = "audio/wav"; // check this line for audio/wav
      mediaRecorder.ondataavailable = (blob: any) => {
        // this.postAudio(blob);
        mediaRecorder.stop();
      };
      mediaRecorder.start(3000);
    };

    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

    function onMediaError(e: any) {
      console.error("media error", e);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // delete vide
  private filterByTopic() {
    console.log("jaboi just searched");
    const filterInput = document.getElementById(
      "topic-filter-input"
    ) as HTMLInputElement;
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

  private editVideo(id: any) {
    console.log("jaboi just got edited to mars");
    const url = "https://tedtalkapi.azurewebsites.net/api/ted/" + id;
    console.log(url);
    this.onEditOpenModal();
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

  // Modal open
  private onEditOpenModal = () => {
    this.setState({ editOpen: true });
  };

  // Modal close
  private onEditCloseModal = () => {
    this.setState({ editOpen: false });
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
          this.changeVideo(this.state.tedTalks[0]);
        }
      });
  }
}

export default App;
