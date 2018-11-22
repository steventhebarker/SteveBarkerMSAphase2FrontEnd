import deleteIcon from "C:/Users/steve/Desktop/phase2website/SteveBarkerMSAphase2FrontEnd/src/deleteIcon.png";
import editIcon from "C:/Users/steve/Desktop/phase2website/SteveBarkerMSAphase2FrontEnd/src/editIcon.png";
import notFavouriteIcon from "C:/Users/steve/Desktop/phase2website/SteveBarkerMSAphase2FrontEnd/src/notFavouriteIcon.png";
// import favouriteIcon from "C:/Users/steve/Desktop/phase2website/SteveBarkerMSAphase2FrontEnd/src/favouriteIcon.png";
import * as React from 'react';

interface ITedTalkListProps {
    tedTalks: any;
    changeVideo: any;
    deleteVideo: any;
    editVideo: any;
}

export class TedTalkList extends React.Component<ITedTalkListProps> {
    public render() {
        const tedTalks = this.props.tedTalks;
        return <table className="table table-striped">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Speaker</th>
            <th>Topic</th>
          </tr>
        {
            tedTalks.map((talk: any, id: number) =>
            <tr key={id} onClick={() => this.props.changeVideo(talk.url)}>
            <td>{talk.title}</td>
            <td>{talk.speaker}</td>
            <td>{talk.topic}</td>
            <td><img src={notFavouriteIcon} height="20" /></td>
            <td><img src={editIcon} height="20" onClick={() => this.props.editVideo(talk.id)}/></td>
            <td><img src={deleteIcon} height="20" onClick={() => this.props.deleteVideo(talk.id)}/></td>
            </tr> 
            )

            
        }
        </tbody>
      </table>
    }
  }