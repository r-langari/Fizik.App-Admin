import { INCREASE_CAT } from './constant';
const initialState = {
    count: 4,
    criticismsBadgeCount : 0,
    productsBadgeCount : 0,
    policeBadgeCount : 0,
    requestsBadgeCount : 0,
}

const clone = obj => JSON.parse(JSON.stringify(obj));

const catReducer = (state = initialState, action) => {

    switch(action.type) {
        case INCREASE_CAT:
            state.criticismsBadgeCount = action.payLoad.howMuch.criticismsBadgeCount;
            state.productsBadgeCount = action.payLoad.howMuch.productsBadgeCount;
            state.policeBadgeCount = action.payLoad.howMuch.policeBadgeCount;
            state.requestsBadgeCount = action.payLoad.howMuch.requestsBadgeCount;
            return clone(state);
        default: return state;
    }
}

export default catReducer;