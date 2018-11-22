import * as React from 'react';

interface ITedTalkListProps {
    tedTalks: any;
    changeVideo: any;
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
            tedTalks.map((talk: any) =>
            <tr key = "1"  onClick={() => this.props.changeVideo(talk.url)}>
            <td>{talk.title}</td>
            <td>{talk.speaker}</td>
            <td>{talk.topic}</td>
            </tr> 
            )
        }
        </tbody>
      </table>
    }
  }