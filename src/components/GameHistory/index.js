import React from 'react';
import { connect } from 'react-redux'
import AuthorizedContainer from '../../container/AuthorizedContainer'
import styled from 'styled-components'
import { getHistories } from '../../actions/games'
import Pagination from '../Pagination'

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
        background: ${props => props.theme.colors.steam};
    }
    
    tbody tr:nth-child(even) {
        background: ${props => props.theme.colors.screechingWite};
    }
`

class GameHistory extends React.PureComponent {

    state = {
        page: 1,
    }

    componentDidMount() {
        // Get the histories record 10 per page
        this.props.getHistories(this.state.page,10,this.props.token)
    }

    handleOnPageChange = (page) => {
        this.setState({ page: page })
        this.props.getHistories(page,10,this.props.token)
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
                    {history.loading 
                    ? <p>Please wait...</p>
                    : history.data && history.data.histories.length < 1 
                        ? <p>No record found. Play some game!</p>
                        :
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
                                    history.data.histories
                                    .map( (item,idx) => {
                                        const count = ((history.data.currentPage - 1) * 10) + (idx + 1)
                                        return (
                                            <tr key={item._id}>
                                                <td>{count}</td>
                                                <td>{item.status}</td>
                                                <td>{item.player}%</td>
                                                <td>{item.opponent}%</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                    {/* Pagination */}
                    {!history.loading && history.data && history.data.pages > 1 &&
                        <Pagination 
                            mobile={window.screen.width >= 1024 ? false : true}
                            data={history.data} 
                            handleOnPageChange={this.handleOnPageChange} />
                    }
                </Content>
            </AuthorizedContainer>
        )
    }
}

const mapStateToProps = state => ({
    history: state.gamehistory,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
    getHistories: (page,perPage,token) => dispatch(getHistories(page,perPage,token))
})
export default connect(mapStateToProps,mapDispatchToProps)(GameHistory)