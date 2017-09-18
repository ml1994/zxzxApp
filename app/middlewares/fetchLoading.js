/**
 * loading
 * @param dispatch
 * @param getState
 */
const loadingMiddleware = ({dispatch, getState}) => next => action => {
    let beforeFetching = getState().appState.fetching;
    let result = next(action);
    let fetching = getState().appState.fetching;
    if (action.type === ActionTypes.FETCHING) {
      Loading.show();
    } else if (beforeFetching === true && fetching === false) {
      Loading.hide();
    }
    return result;
  };