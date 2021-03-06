import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {updateViewed} from '../actions/ViewedActions.js'

import StudentProfileEditable from './StudentProfile/StudentProfileEditable';
import StudentProfilePublic from './StudentProfile/StudentProfilePublic';
import StudentProfilePrivate from './StudentProfile/StudentProfilePrivate';


import axios from 'axios';

class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      student: null
    }
    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);

  }

  componentDidMount() {
    axios.get('/api/user/' + this.props.match.params.id)
    .then(response => {
      if (!response.data.user || response.data.user.type !== 'student') {
        this.props.history.push('/error');
      }
      this.setState({
        student: response.data.user
      })
      this.props.updateViewed(response.data.user)
    })
  }


  startEdit() {
    this.setState({edit: true})
  }

  endEdit() {
    this.setState({edit: false})
  }

  isEditing() {
    if (!this.state.student) {
      return <div></div>;
    } else if (this.state.edit && (this.props.user._id === this.props.match.params.id)) {
      return <StudentProfileEditable endEdit={this.endEdit} id={this.props.match.params.id}/>
    } else if (this.props.user._id === this.props.match.params.id) {
      return <StudentProfilePrivate startEdit={this.startEdit} id={this.props.match.params.id}/>
    } else {
      return <StudentProfilePublic id={this.props.match.params.id} student={this.state.student}/>
    }
  }

  render() {
    console.log('THIS IS THE USER WITH RESUME AND PHOTO', this.state.student);
    return (
      <ReactCSSTransitionGroup
        transitionName="smallfade"
        transitionAppear={true}
        transitionAppearTimeout={350}
        transitionEnter={false}
        transitionLeave={false}>
      <div>
        {this.isEditing()}
      </div>
    </ReactCSSTransitionGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateViewed: (user) => dispatch(updateViewed(dispatch, user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
