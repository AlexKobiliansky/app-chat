import React from 'react';
import './Avatar.sass';
import generateAvatar from '../../helpers/generateAvatar';

const Avatar = user => {
  if (user.avatar) {
    return <img className="avatar" src={user.avatar} alt='alt'/>
  } else {
    const {color, colorLighten} = generateAvatar(user._id);
    const firstChar = user.fullName.charAt(0).toUpperCase();
    return <div
      className="avatar avatar--symbol"
      style={{backgroundImage: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96%)`}}
    >{firstChar}</div>
  }

};

export default Avatar;