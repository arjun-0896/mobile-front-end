import * as actions from '../../redux/index'
import React, { Component } from 'react';
import { Button, Text, ScrollView, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import StudentTeamView from './StudentTeamComponentView';

const mock = {
  teamName: "OSS project/Writing assignment 2_Team20",
  members: [
    {
      id: 6362,
      name: 'student6362',
      actions: []
    }, {
      id: 6433,
      name: 'student6433',
      actions: [
        {
          id: 0,
          name: 'View',
          handler: () => {}
        }, {
          id: 1,
          name: 'Edit',
          handler: () => {}
        }
      ]
    }, {
      id: 6420,
      name: 'student6420',
      actions: [
        {
          id: 0,
          name: 'View',
          handler: () => {}
        }, {
          id: 1,
          name: 'Edit',
          handler: () => {}
        }
      ]
    },
  ],
  invitations: [
    {id: 6433, name: 'student6433', status: 'accept'},
    {id: 6420, name: 'student6420', status: 'accept'},
  ],
}

const mapStateToProps = state => ({
    profile: state.profile,
    student: state.studentTeamView.student,
    current_due_date: state.studentTeamView.current_due_date,
    users_on_waiting_list: state.studentTeamView.users_on_waiting_list,
    teammate_review_allowed: state.studentTeamView.teammate_review_allowed,
    send_invs: state.studentTeamView.send_invs,
    recieved_invs: state.studentTeamView.recieved_invs,
    assignment: state.studentTeamView.assignment,
    assignment_topics: state.studentTeamView.assignment_topics,
    team: state.studentTeamView.team,
    participants: state.studentTeamView.participants,
    team_full: state.studentTeamView.team_full,
    team_topic: state.studentTeamView.team_topic,
    join_team_requests: state.studentTeamView.join_team_requests,
    alert: state.studentTeamView.alert,
    ad_content: state.studentTeamView.ad_content,
    loaded: state.studentTeamView.loaded
})
const mapDispatchToProps = dispatch => ({
    fetchStudentsTeamView: student_id => dispatch(actions.fetchStudentsTeamView(student_id)),
    updateTeamName: (student_id, team_name) => dispatch(actions.updateTeamName(student_id, team_name)),
    remove_participant_student_teams: (student_id, team_id) => dispatch(actions.remove_participant_student_teams(student_id, team_id)),
    invitePeopleToAssignment: (team_id, student_id, assignment_id, user_name) => dispatch(actions.invitePeopleToAssignment(team_id, student_id, assignment_id, user_name)),
    // getAdContent: team_id => dispatch(actions.getAdContent(team_id))  ,
    updateCommentForAdvertisement: (team_id,ad_content) => dispatch(actions.updateCommentForAdvertisement(team_id, ad_content))
})

class StudentTeamComponent extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Your team  '
  };

  componentDidMount(){
    this.props.fetchStudentsTeamView(this.props.profile.profile.id);
  }

  render(){
    return(
      <StudentTeamView profile={this.props.profile}
      teamName={mock.teamName}
      members={mock.members}
      invitations={mock.invitations}
      />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentTeamComponent);
