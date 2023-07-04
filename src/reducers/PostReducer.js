export const postState = [];

export const postReducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            return [{...action.payload}, ...state];
        case "SET":
            return action.payload;
        default:
            return state;
    }
}