/**
 * desc:
 * created by bo.peng 2018/9/24.
 * email:spion@qq.com
 */
import {IStoreState} from "../redux";
import Hello from "../components/Hello";
import * as actions from '../redux/actions/';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: IStoreState) {
	return {
		enthusiasmLevel,
		name: languageName,
	}
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
	return {
		onIncrement: () => dispatch(actions.incrementEnthusiasm()),
		onDecrement: () => dispatch(actions.decrementEnthusiasm()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);