import {DRIVER_MENU_PUSH} from './actionList';

export default function menuPushAction(isMenuOpen){
    return{
        type: DRIVER_MENU_PUSH,
        payload:{
            menu: isMenuOpen
        },
    }
}
