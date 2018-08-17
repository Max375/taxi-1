import {CHANGE_SCREEN} from  "./actionList";

export default function changeScreenAction(screen) {
    return{
        type: CHANGE_SCREEN,
        payload:{
            currentScreen: screen
        },
    }
}