import * as React from 'react';
import deleteIcon from "./deleteIcon.png";
import editIcon from "./editIcon.png";


interface ITedTalkListProps {
    tedTalks: any;
    changeVideo: any;
    deleteVideo: any;
    editVideo: any;
}

export class TedTalkList extends React.Component<ITedTalkListProps> {
    public render() {
        const tedTalks = this.props.tedTalks;
        return <table className="table table-striped maintable tablecolours">
        <tbody>
          <tr>
            <th className="titlewidth">Title</th>
            <th className="speakerwidth"> Speaker</th>
            <th className="topicwidth">Topic</th>
          </tr>
        {
            tedTalks.map((talk: any, id: number) =>
            <tr key={id} onClick={() => this.props.changeVideo(talk)}>
            <td className="titlewidth">{talk.title}</td>
            <td className="speakerwidth">{talk.speaker}</td>
            <td className="topicwidth">{talk.topic}</td>
            <td className="iconwidth"><img src={editIcon} height="20" onClick={() => this.props.editVideo(talk.id)}/></td>
            <td className="iconwidth"><img src={deleteIcon} height="20" onClick={() => this.props.deleteVideo(talk.id)}/></td>
            </tr> 
            )

            
        }
        </tbody>
      </table>
    }
  }