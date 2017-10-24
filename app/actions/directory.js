import * as directoryActions from '../constants/directory'

export function initDirectoryList(){
    return {
        type:directoryActions.INIT_DIRECTORY_LIST,
        payload:{
            directoryList:[]
        }
    }
}

export function loadDirectoryList(payload){
    return {
        type:directoryActions.LOAD_DIRECTORY_LIST,
        payload
    }
}