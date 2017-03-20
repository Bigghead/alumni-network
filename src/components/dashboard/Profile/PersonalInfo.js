import React from 'react';
import ListItem from '../../common/ListItem';
import FormField from '../../common/FormField';

const inputOptions = 'small left icon'; 

const PersonalInfo = ({ username, showProfile, toggle, profileUrl, email, handleInputChange, location, bio, displayName, errors }) => {
  return (
    <div>
      <div className="ui teal ribbon label profileWrapper" onClick={() => { toggle('showProfile') }}>Personal Info</div>
      <form className={`ui form profilePane ${showProfile ? 'show' : 'hide'}`}>
        <div className="ui list">
          <ListItem icon="spy icon">
            {username}
          </ListItem>
          <ListItem icon="github icon">
            <a href={profileUrl} target="_blank">GitHub Profile</a>
          </ListItem>
          <ListItem>
            <FormField
              onChange={handleInputChange}
              placeholder="Enter Display Name..."
              name="displayName"
              value={displayName}
              errors={errors}
              inputOptions={inputOptions}
              icon='user icon'
              tooltip="Display Name" />
          </ListItem>
          <ListItem>
            <FormField
              onChange={handleInputChange}
              placeholder="Enter Email..."
              type="email"
              name="email"
              value={email}
              errors={errors}
              inputOptions={inputOptions}
              icon="mail icon"
              tooltip="Email" />
          </ListItem>
          <ListItem>
            <FormField
              onChange={handleInputChange}
              placeholder="Enter Location..."
              name="location"
              value={location}
              errors={errors}
              inputOptions={inputOptions}
              icon="marker icon"
              tooltip="Location" />
          </ListItem>
          <ListItem>
            <div className="six wide field">
              <textarea
                onChange={handleInputChange}
                name='bio'
                placeholder="Enter a short bio here"
                rows="3"
                value={bio} />
            </div>
          </ListItem>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;