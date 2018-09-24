/**
 * desc:
 * created by bo.peng 2018/9/24.
 * email:spion@qq.com
 */
import * as React from 'react';
import {Error} from "tslint/lib/error";

export interface IProps {
	name: string;
	enthusiasmLevel?: number;
	onIncrement?: () => void;
	onDecrement?: () => void;
}

class Hello extends React.Component<IProps, object> {
	public render() {
		const { name, enthusiasmLevel = 1 } = this.props;

		if (enthusiasmLevel <= 0) {
			throw new Error('You could be a little more enthusiastic. :D');
		}

		return (
			<div className="hello">
				<div className="greeting">
					Hello {name + getExclamationMarks(enthusiasmLevel)}
				</div>
				<div>
					<button onClick={this.props.onDecrement}>-</button>
					<button onClick={this.props.onIncrement}>+</button>
				</div>
			</div>
		);
	}
}


// helpers

function getExclamationMarks(numChars: number) {
	return Array(numChars + 1).join('!');
}
export default Hello;
