import * as actions from '../redux/index'
import React, { Component } from 'react';
import { Text, ScrollView, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import {fetchProfile, fetchInstitutions, editProfile} from '../redux/actions/Profile';
import ProfileView from './ProfileComponentView';

const mapStateToProps = state => {
    return {
      institutions: state.institutions.institutions,
      profile: state.profile
    }
}
const mapDispatchToProps = dispatch => ({
    fetchInstitutions: () => dispatch(fetchInstitutions()),
    fetchProfile: () => dispatch(fetchProfile()),
    editProfile: (profile,aq) =>{dispatch(editProfile(profile,aq))}
})

class Preference extends Component {
  constructor(props) {
    super(props);
    this.state= this.propsToState(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleConfirmpassword= this.handleConfirmpassword.bind(this);
    this.handleNotificationChange = this.handleNotificationChange.bind(this);
    this.performedit = this.performedit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  static navigationOptions = {
    title: 'Preference  '
  };

  propsToState(props) {
    return {
      profileform : {
        fullname: props.profile.profile.fullname,
        password: '',
        email: props.profile.profile.email,
        institution_id: props.profile.profile.institution_id,
        email_on_review: props.profile.profile.email_on_review,
        email_on_submission: props.profile.profile.email_on_submission,
        email_on_review_of_review: props.profile.profile.email_on_review_of_review,
        copy_of_emails: props.profile.profile.copy_of_emails,
        handle: props.profile.profile.handle,
        timezonepref: props.profile.profile.timezonepref,
      },
      aq : {
        notification_limit: props.profile.aq==null?null:props.profile.aq.notification_limit
      },
      touched: {
        password: false,
        confirmpassword: false
      },
      confirmpassword: '',
      save: false,
    };
  }

  componentDidMount(){
    this.props.fetchInstitutions();
    this.props.fetchProfile()
      .then(() => {this.setState(this.propsToState(this.props))});
  }

  validate(password, confirmpassword){
    const errors = {
      password: '',
      confirmpassword: ''
    }
    if(this.state.profileform.password !== this.state.confirmpassword){
      errors.confirmpassword = 'passwords do not match';
    }
    return errors;
  }

  performedit(){
    this.props.editProfile(this.state.profileform, this.state.aq);
  }

  handleSubmit() {
    this.setState({ save: true}, ()=>{console.log(this.state.save); this.performedit()});
  }

  handleChange = (newValue) => {
      var profileform = {...this.state.profileform};
      profileform['timezonepref'] = newValue
      this.setState({ profileform });
  }

  handleConfirmpassword(value){
    this.setState({confirmpassword: value});
  }

  handleInputChange = (field) => (value) => {
    var profileform = {...this.state.profileform};
    profileform[field] = value;
    this.setState({profileform});
  }

  handleNotificationChange(event){
      const value = event.target.value;
      var aq = {...this.state.aq};
      aq['notification_limit'] =  value;
      this.setState({aq});
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render(){
    const errors = this.validate(this.state.profileform.password, this.state.confirmpassword);
    if(this.props){
      console.log('render(): this.state:', this.state);
      return(<ProfileView institutions={this.props.institutions}
          profileform={this.state.profileform}
          handleInputChange={this.handleInputChange}
          handleBlur={this.handleBlur}
          handleConfirmpassword={this.handleConfirmpassword}
          handleNotificationChange={this.handleNotificationChange}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={errors}
      />);
    } else {
      return(
        <View> 
          LOL
        </View>
      )
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Preference);
