import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CompetitionSummary from '../components/companyCompetition/CompetitionSummary';
import CompetitionMessages from '../components/companyCompetition/CompetitionMessages';

class CompanyCompetitionSummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //all of the user variables for the company
    const { username, email, competitions, website, type } = this.props.user;


    return (
      <div className="container is-fluid">
        <div className="top-spacer"></div>
        <div className="tabs">
          <ul>
            <li className="is-active"><a>Summary</a></li>
            <li><a onClick={() => this.props.setView('submissions')}>Teams</a></li>
            <li><a onClick={() => this.props.setView('applications')}>Applications</a></li>
          </ul>
        </div>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-4 is-vertical">
            <article className="tile is-child notification">
              <p className="title is-2"><strong>Google Code Jam</strong></p>
              <p>05/14/2017 – 05/16/2017</p>
              <p>123 5th Street <br/> New York, NY 19102</p>
            </article>
            <CompetitionSummary />
          </div>
          <div className="tile is-parent is-8">
            <CompetitionMessages />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = () => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCompetitionSummary);
