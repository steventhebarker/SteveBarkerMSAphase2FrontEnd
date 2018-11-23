import * as React from 'react';
import Modal from "react-responsive-modal";

interface IEditTedTalk {
  tedTalks: any;
    selectedID: any;
    onEditCloseModal: any;
    editOpen: any;
  }

export class EditTedTalkPopup extends React.Component<IEditTedTalk>{
  constructor(props: any) {
    super(props);
    this.state = {
    editOpen: "",
    onEditCloseModal: "",
    selectedID: "",
    tedTalks: ""
    };
    this.editVideoFromList = this.editVideoFromList.bind(this);
  }
public render(){
  const item1 = this.props.tedTalks.find((obj:any) => obj.id === this.props.selectedID) || {url: ''};
    console.log(this.props.selectedID);
    console.log(item1);
    return(
    <Modal open={this.props.editOpen} onClose={this.props.onEditCloseModal}>
    <form>
  <div className="form-group">
    <label>Title:</label>
    <input
      type="text"
      className="form-control"
      id="ted-title-input"
      placeholder="Enter Title"
      // value= {item1.title}
    />
  </div>
  <div className="form-group">
    <label>URL:</label>
    <input
      type="text"
      className="form-control"
      id="ted-url-input"
      placeholder="Enter URL"
      value = {item1.url}
    />
    <small className="form-text text-muted">
      This is the YouTube link to the video
    </small>
  </div>
  <div className="form-group">
    <label>Topic:</label>
    <input
      type="text"
      className="form-control"
      id="ted-topic-input"
      placeholder="Enter the topic of the talk"
    />
    <small className="form-text text-muted">
      Adding a topic can help make searching easier
    </small>
  </div>
  <div className="form-group">
    <label>Speaker:</label>
    <input
      type="text"
      className="form-control"
      id="ted-speaker-input"
      placeholder="Enter the Speaker's name"
    />
    <small className="form-text text-muted">
      Adding the speaker's name can help make searching easier
    </small>
  </div>

  <button type="button" className="btn" onClick={this.editVideoFromList}>
    Edit Video
  </button>
</form>
</Modal>
    );
  }
    //////////////
  // POST meme
private editVideoFromList() {
  const titleInput = document.getElementById("ted-title-input") as HTMLInputElement
  const videoUrlInput = document.getElementById("ted-url-input") as HTMLInputElement
  const topicInput = document.getElementById("ted-topic-input") as HTMLInputElement
  const speakerInput = document.getElementById("ted-speaker-input") as HTMLInputElement

  if (titleInput === null || videoUrlInput === null) {
    return;
  }
  const id = this.props.selectedID
  const title = titleInput.value
  const videoUrl = videoUrlInput.value
  const topic = topicInput.value
  const speaker = speakerInput.value
  const url = "https://tedtalkapi.azurewebsites.net/api/ted/"+this.props.selectedID

  const object = {
    id,
    speaker,
    title,
    topic,
    uploaded: "",
    url: videoUrl,
  }

  fetch(url, {
    body: JSON.stringify(object),
    headers: {'Content-Type': "application/json-patch+json",
    'cache-control': 'no-cache'},
    method: 'PUT'
  })
      .then((response : any) => {
    if (!response.ok) {
      // Error State
      alert(response.statusText)
    } else {
      location.reload()
    }
    })
}
/////////////
}

