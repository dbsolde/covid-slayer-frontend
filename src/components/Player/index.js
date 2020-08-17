import React from 'react';
import styled from 'styled-components'
import Avatar from '../Avatar'
import PropTypes from 'prop-types'


const PlayerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 49%;
    padding: 10px;
    .player {
        display: flex;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        .player-name {
            font-size: 1.500em;
            margin-left: 10px;
        }
    }
`
const HealthBarWrapper = styled.div`
    margin-top: 20px;
    position: relative;
    width: 100%;
    background: ${props => props.theme.colors.screechingWite};

`
const HealthBar = styled.div`
    
    width: ${props => props.health}%;
    height: 32px;
    text-align: center;
    border-radius: ${props => props.health < 100 ? '5px 0 0 5px' : '5px'};

    background: ${props => props.health < 30 ? 'red' : 'green'};
    color: ${props => props.health <= 51 ? '#000' : '#fff'};
    transition: .5s ease all;
    span {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 6px;
    }
`

const Player = (props) => {
    return (
        <PlayerWrapper>
            <div className="player">
                <Avatar accountType={props.playerName} avatar={props.avatarImage} />
                <span className="player-name">{props.playerName}</span>
            </div>
            <HealthBarWrapper>
                <HealthBar health={Number(props.health)}>
                    <span>{props.health}%</span>
                </HealthBar>
            </HealthBarWrapper>
        </PlayerWrapper>
    )
}

Player.propTypes = {
    playerName: PropTypes.string,
    health: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avatarImage: PropTypes.string
}

export default Player;