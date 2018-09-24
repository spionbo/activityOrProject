/**
 * desc:
 * created by bo.peng 2018/9/24.
 * email:spion@qq.com
 */
import {EnthusiasmAction} from "../actions";
import {DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM} from "../../constants";
import {IStoreState} from "../index";

export function enthusiasm(state: IStoreState, action: EnthusiasmAction): IStoreState {
	switch (action.type) {
		case INCREMENT_ENTHUSIASM:
			return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
		case DECREMENT_ENTHUSIASM:
			return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
	}
	return state;
}