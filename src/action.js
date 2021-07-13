import { INCREASE_CAT } from './constant';

export function increaseCatSizeAction(howMuch) {
    return {
        type: INCREASE_CAT,
        payLoad: {
            howMuch,
        },
    }
}