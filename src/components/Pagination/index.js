import React from 'react';
import styled from 'styled-components';

const PaginationList = styled.ul`
    lis-style: none;
    padding: 0;
    display: flex;
    border-radius: 0.25rem;
    justify-content: center;
`;

const PaginationItem = styled.li`
    list-style: none;
    &:first-child {
        button {
            border-top-left-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
        }
    }
    &:last-child {
        button {
            border-top-right-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
        }
    }
    &.active {
        button {
            background: ${props => props.theme.colors.primary.background};
        }
    }
    &.disabled {
        opacity: .5;
        button:hover {
            background: ${props => props.theme.colors.steam};
        }
    }
`;
const PageLink = styled.button`
    background: ${props => props.theme.colors.steam};
    border: none;
    padding:  ${props => props.mobile ? '5px 8px':'0.5rem 0.75rem'} ;
    line-height: 1.25;
    cursor: pointer;    
    &:focus {
        outline: 0;
    }
    .arrow-only {
        display: none;
    }

    &:hover {
        background: ${props => props.theme.colors.white};
    }   
`;

// Pagination helper
class Pagination extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            pager: this.getPager(this.props.data.rowCount, this.props.data.currentPage, this.props.data.pageSize)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const pager = this.getPager(this.props.data.rowCount, this.props.data.currentPage, this.props.data.pageSize)            
            this.setState({pager: pager})
        }
    }

    setPage = (page) => {
		const {data} = this.props
        const pageSize = data.pageSize || 10;
        
        const pager = this.getPager(data.rowCount, page, pageSize)

        if (page < 1 || page > pager.totalPages) {
            return;
        }
        
        this.setState({ pager: pager })

		if (data.currentPage !== page) {
			this.props.handleOnPageChange(page)
        }
    }
    
    getPager = (totalItems, currentPage, pageSize) => {
		currentPage = currentPage || 1
        pageSize = pageSize || 10
        
		let totalPages = Math.ceil(totalItems / pageSize)
		let startPage = ''
		let endPage = ''
        const totaldisplay =  this.props.mobile ? 5:10
        const startPage2 = this.props.mobile ? 4:9
        const currentPage2 = this.props.mobile ? 1:4
        const startPage3 = this.props.mobile ? 1:5
        const endPage2 = this.props.mobile ? 2:4
        const currentPage3 = this.props.mobile ? 4:6

		if (totalPages <= totaldisplay) {
			startPage = 1
			endPage = totalPages
		} else {
			if (currentPage <= currentPage3) {
				startPage = 1;
				endPage =totaldisplay
			} else if (currentPage +currentPage2 >= totalPages) {
				startPage = totalPages - startPage2;
				endPage = totalPages;
			} else {
				startPage = currentPage -startPage3 ;
				endPage = currentPage + endPage2;
			}
        }

		const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i)

		return {
			totalItems: totalItems,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			startPage: startPage,
            endPage: endPage,
			pages: pages
		}
	}

    render() {
        const { pager } = this.state
        const { data } = this.props

        let totalPages = Math.ceil(data.rowCount / data.pageSize)
        
		if (totalPages <= 1) {
			return null
        }

        return (
            <nav aria-label="pagination">
                <PaginationList>
                    <PaginationItem className={`first ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                        <PageLink onClick={() => this.setPage(1)}>                            
                            <span>First</span>
                        </PageLink>
                    </PaginationItem>

                    <PaginationItem className={`previous ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                        <PageLink onClick={() => this.setPage(pager.currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">«</span>
                            <span className="arrow-only">
                                <span>Previous</span>
                            </span>
                        </PageLink>
                    </PaginationItem>
        
                    {pager.pages.map((page, index) =>
                        <PaginationItem key={index} className={`pages ${pager.currentPage === page ? 'active' : ''}`}>
                            <PageLink onClick={() => this.setPage(page)}>{page}</PageLink>
                        </PaginationItem>
                    )}

                    <PaginationItem className={`next ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <PageLink onClick={() => this.setPage(pager.currentPage + 1)}>
                            <span aria-hidden="true">»</span>
                            <span className="arrow-only">
                                <span>Next</span>
                            </span>
                        </PageLink>
                    </PaginationItem>

                    <PaginationItem className={`last ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <PageLink onClick={() => this.setPage(pager.totalPages)}>
                            <span>Last</span>
                        </PageLink>
                    </PaginationItem>
                </PaginationList>
            </nav>
        )
    }
}

export default Pagination