export const USER_STATE = {};

export const userReducer = (state, action) => {
    switch(action.type) {
        case "SET_USER":
            return action.payload;
        case "UPDATE_PROFILE_IMAGE":
            return {...USER_STATE, ...{profileUrl: action.profileUrl}};
        case "UPDATE_COVER_IMAGE":
            return {...USER_STATE, ...{coverPhoto: action.coverPhoto}};
        case "UPDATE_USER_DETAILS":
            return {...USER_STATE, ...action.userDetails};
        default:
            return state;
                
    }
}