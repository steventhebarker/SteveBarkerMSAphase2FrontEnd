import * as React from 'react';
import Modal from "react-responsive-modal";

interface ITedTalkPopup {
    onCloseModal: any;
    open: any;
  }

export class AddTedTalkPopup extends React.Component<ITedTalkPopup>{
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

  <button type="button" className="btn" onClick={console.log("jaboiii")}>
    Add Video
  </button>
</form>
</Modal>
    );
}
}