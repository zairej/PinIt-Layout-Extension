export default function(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_IMAGES_ON_PAGE':
            return action.imagesOnPage;
        default:
            return state;
    }
}