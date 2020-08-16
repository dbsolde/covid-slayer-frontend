import React from 'react';
import { connect } from 'react-redux'
import AuthorizedContainer from '../../container/AuthorizedContainer'
import styled from 'styled-components'
import { getHistories } from '../../actions/games'

const Content = styled.div`
    background: ${props => props.theme.colors.white};
    padding: 20px;
    border-radius: 5px;

    h3 {
        margin: 0;
    }
`
const Table = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    thead {
        text-align:center;
        background: ${props => props.theme.colors.table.headBg};
        color: ${props => props.theme.colors.white};
        tr {
            td {
                padding: 10px;
                font-weight: 700;
            }
        }
    }
    tbody {
        text-align:center;
        tr {
            td {
                padding: 10px;
            }
        }
    }
    tbody tr:nth-child(odd) {
        background: #ddd;
    }
    
    tbody tr:nth-child(even) {
        background: #eee;
    }
`

class GameHistory extends React.PureComponent {

    componentDidMount() {
        this.props.getHistories()
    }

    render() {
        const {
            history
        } = this.props
        
        return (
            <AuthorizedContainer>
                <h2>Game History</h2>
                <Content>
                    <h3>Recent games</h3>
                    <Table>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Status</td>
                                <td>Player Health</td>
                                <td>Covid Monster Health</td>
                            </tr>
                        </thead>
                        <tbody>
                            {history.data && 
                                history.data.map( (item,idx) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{idx+1}</td>
                                            <td>{item.status}</td>
                                            <td>{item.player}%</td>
                                            <td>{item.opponent}%</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Content>
            </AuthorizedContainer>
        )
    }
}

const mapStateToProps = state => ({
    history: state.gamehistory
})

const mapDispatchToProps = dispatch => ({
    getHistories: () => dispatch(getHistories())
})
export default connect(mapStateToProps,mapDispatchToProps)(GameHistory)