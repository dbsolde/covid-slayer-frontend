import React from 'react';
import styled from 'styled-components'
import Avatar from '../Avatar'

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
    background: #eee;

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

class Player extends React.PureComponent {

    render() {
        const {
            playerName,
            health,
            avatarImage
        } = this.props

        return (
            <PlayerWrapper>
                <div className="player">
                    <Avatar accountType={playerName} avatar={avatarImage} />
                    <span className="player-name">{playerName}</span>
                </div>
                <HealthBarWrapper>
                    <HealthBar health={Number(health)}>
                        <span>{health}%</span>
                    </HealthBar>
                </HealthBarWrapper>
            </PlayerWrapper>
        )
    }
}

export default Player;