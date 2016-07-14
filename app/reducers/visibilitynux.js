export default function(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_NUX_VISIBILITY':
            return action.isVisibleNUX;
        default:
            return state;
    }
}