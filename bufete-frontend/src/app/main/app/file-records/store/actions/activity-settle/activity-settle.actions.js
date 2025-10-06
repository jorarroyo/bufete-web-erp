export const SET_ACTIVITY_SETTLEMENT_SEARCH_CRITERIA = '[ACTIVITY-SETTLE APP] SET ACTIVITY SETTLEMENT SEARCH CRITERIA';

export function setActivitySettleSearchCriteria(event) {
  return {
    type: SET_ACTIVITY_SETTLEMENT_SEARCH_CRITERIA,
    searchText: event.target.value,
  };
}
