import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    const guestNav = (
      <div className="ui stackable teal pointing menu">
        <NavLink className="item" activeClassName="item active" exact to="/"><i className="fa fa-free-code-camp" />freeCodeCamp Alumni Network</NavLink>
        <div className="right menu">
          <NavLink className="item" activeClassName="item active" exact to="/login">Login</NavLink>
        </div>
      </div>
    );

    const userNav = (
      <div className="ui stackable teal pointing menu">
        <NavLink className="item" activeClassName="active item" exact to="/dashboard"><i className="fa fa-free-code-camp"></i>freeCodeCamp Alumni Network</NavLink>
        <NavLink className="item" activeClassName="active item" exact to="/dashboard/profile">Profile</NavLink>
        <NavLink className="item" activeClassName="active item" exact to="/dashboard/community">Community</NavLink>
        <NavLink className="item" activeClassName="active item" exact to="/dashboard/mentorship">Mentorship</NavLink>
        <NavLink className="item" activeClassName="active item" exact to="/dashboard/chat">Mess Hall</NavLink>
        <div className="right menu">
          <a className="item" href="http://localhost:8080/logout">Logout</a>
        </div>
      </div>
    );
    return (
      <div>
        { this.props.user.get('verifiedUser') ? userNav : guestNav }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

NavBar.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(NavBar);
