export const initialState = {
    connectionStatus: false,
}
 
export const actionTypes = {
    SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
}

const reducer = (state, action) => {
    console.log(action)

    switch (action.type) {
      case actionTypes.SET_CONNECTION_STATUS:
        return {
          ...state,
          connectionStatus: action.SET_CONNECTION_STATUS,
        };
      default:
        return state;
    }
}

export default reducer