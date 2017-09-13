import AppRootStackNav from '../appRootStackNav'


// console.log(AppRootStackNav.router)
//const initialState = AppRootStackNav.router.getStateForAction(AppRootStackNav.router.getActionForPathAndParams('Login'));

export default (state, action)=>{
  const nextState = AppRootStackNav.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}
