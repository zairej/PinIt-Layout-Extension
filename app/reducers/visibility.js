export default function(state = false, action){
    switch (action.type){
        case 'TOGGLE_VISIBILITY':
            return action.isVisible;
        default:
            return state;
    }
}