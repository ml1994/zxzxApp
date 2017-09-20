import * as ActionTypes from '../constants/appState'
import {Loading} from 'react-native-root-views'

/**
 * loading中间件
 * @param dispatch
 * @param getState
 */
export default ({dispatch, getState}) => next => action => {
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