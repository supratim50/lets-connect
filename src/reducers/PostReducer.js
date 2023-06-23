export const postState = [];

export const postReducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            console.log("ADD", action.payload)
            return [{...action.payload}, ...state];
        case "SET":
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
}