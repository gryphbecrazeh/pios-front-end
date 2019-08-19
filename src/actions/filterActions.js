import {
	GET_FILTERS,
	ADD_FILTER,
	EDIT_FILTER,
	DELETE_FILTER,
	FILTERS_CLEAR,
} from "./types";

export const getFilters = () => (dispatch, getState) => {
    return {
        type:GET_FILTERS
    
    }
};
export const addFilter = item => (dispatch, getState) => {
    return {
        type:ADD_FILTER
    }

};

export const editFilter = item => (dispatch, getState) => {
    return {
        type:EDIT_FILTER
    }
};

export const deleteFilter = id => (dispatch, getState) => {
    return {
        type:DELETE_FILTER
    }
};
export const clearFilters = () =>(dispatch,getState) =>  {
	return {
		type: FILTERS_CLEAR
	};
};
export const sortByDate = item => {
    return item.sort((a, b) => {
        return this.state.sort === false
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
    });
};
export const sortByTarget = item => {
    return item.sort((a, b) => {
        return this.state.sort === false
            ? a[this.state.sortTarget] - b[this.state.sortTarget]
            : b[this.state.sortTarget] - a[this.state.sortTarget];
    });
};
export const onChangeDate = (target, e) => {
    if (target === "start") {
        this.setState({ startDate: new Date(e) });
    } else {
        this.setState({ endDate: new Date(e) });
    }
};
export const filterByDateRange = (item, range1, range2) => {
    let arrangeDates = new Date(range2) > new Date(range1);
    let start = arrangeDates === true ? new Date(range1) : new Date(range2);
    let end = arrangeDates === true ? new Date(range2) : new Date(range1);
    return item.filter(
        item => new Date(item.date) >= start && new Date(item.date) <= end
    );
};
export const toggleSort = e => {
    this.setState({
        sort: !this.state.sort,
        sortTarget: e.target.name
    });
};
export const onChangeSearch = e => {
    this.setState({
        searchQuery: e.target.value ? e.target.value : false
    });
};
export const onChangeSeachCriteria = e => {
    let critera = this.props.keys.dbKeysList.filter(
        item => item.value === e.target.value
    )[0];
    this.setState({
        searchTarget: critera.value,
        searchTargetLabel: critera
    });
};
export const search = item => {
    return item.filter(order =>
        order[this.state.searchTarget].match(
            new RegExp(
                `${this.state.searchQuery === false ? ".+" : this.state.searchQuery}`,
                "gmi"
            )
        )
    );
};