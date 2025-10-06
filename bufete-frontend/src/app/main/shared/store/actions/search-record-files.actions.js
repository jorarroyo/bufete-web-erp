export const SET_RECORDS_SEARCH_TEXT = '[FILE-RECORDS APP] SET RECORDS SEARCH TEXT';

export function setRecordsSearchText(event) {
  return {
    type: SET_RECORDS_SEARCH_TEXT,
    searchText: event.target.value,
  };
}