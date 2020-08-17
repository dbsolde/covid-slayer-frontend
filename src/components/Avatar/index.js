import React from 'react'
import PropTypes from 'prop-types'
import avatar from '../../assets/default.png'


const Avatar = (props) => {
    const playerAvatar = props.avatar ? props.avatar : avatar
    return <img 
                src={playerAvatar} 
                className="avatar" 
                alt="avatar" />
}

Avatar.propTypes = {
    avatar: PropTypes.string.isRequired
}


export default Avatar