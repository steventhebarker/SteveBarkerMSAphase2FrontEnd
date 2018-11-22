import * as React from 'react';
import Modal from "react-responsive-modal";

interface IEditTedTalk {
    onCloseModal: any;
    open: any;
  }

export class EditTedTalkPopup extends React.Component<IEditTedTalk>{
public render(){
    return(
    <Modal open={this.props.open} onClose={this.props.onCloseModal}>
    <form>
  <div className="form-group">
    <label>Title:</label>
    <input
      type="text"
      className="form-control"
      id="ted-title-input"
      placeholder="Enter Title"
    />
  </div>
  <div className="form-group">
    <label>URL:</label>
    <input
      type="text"
      className="form-control"
      id="ted-url-input"
      placeholder="Enter URL"
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

  <button type="button" className="btn" onClick={this.addVideoToList}>
    Add Video
  </button>
</form>
</Modal>
    );
  }
    //////////////
  // POST meme
private addVideoToList() {
  const titleInput = document.getElementById("ted-title-input") as HTMLInputElement
  const videoUrlInput = document.getElementById("ted-url-input") as HTMLInputElement
  const topicInput = document.getElementById("ted-topic-input") as HTMLInputElement
  const speakerInput = document.getElementById("ted-speaker-input") as HTMLInputElement

  if (titleInput === null || videoUrlInput === null) {
    return;
  }

  const title = titleInput.value
  const videoUrl = videoUrlInput.value
  const topic = topicInput.value
  const speaker = speakerInput.value
  const url = "https://tedtalkapi.azurewebsites.net/api/ted"

  const object = {
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
    method: 'POST'
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

