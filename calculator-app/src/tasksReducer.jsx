import {formatResult} from './App.jsx'

const calculateResult = (operation, a, b) => {
	switch(operation) {
		case '+':
			return Number(b) + Number(a);
		case '-':
			return Number(b) - Number(a);
		case 'X':
			return Number(b) * Number(a);
		case '/':
			return Number(b) / Number(a);
		default:
			return 0;
	}
};
export function tasksReducer(tasks, action) {
	switch(action.type) {
		case 'display_numbers': {
			if(tasks.a.length > 8) {
				return {
					...tasks,
					a: tasks.a
				}
			} else {
				return {
					...tasks,
					a: tasks.a + '' + action.a
				}
			}
		}
		case 'add_operation': {
			return {
				...tasks,
				oper: action.oper,
				a: 0,
				b: tasks.a
			}
		}
		case 'percent': {
			return {
				...tasks,
				a: tasks.a === 0 || tasks.a === '0' ? 0 : Number(formatResult(tasks.a)) / 100,
				b: 0,
				oper: action.oper,
				res: tasks.res > 0 ? Number(formatResult(tasks.res)) / 100 : tasks.res,
			}
		}
		case 'equal': {
			const result = calculateResult(tasks.oper, tasks.a, tasks.b);
			return {
				...tasks,
				a: result,
				b: result,
				oper: tasks.oper,
				res: result
			}
		}
		case 'reset': {
			return {
				...tasks,
				a: 0,
				b: 0,
				oper: null,
				res: 0
			}
		}
		case 'invert': {
			return {
				...tasks,
				a: -tasks.a,
				res: -tasks.res
			}
		}
		case 'dot': {
			if(!/\./.test(tasks.a)) {
				return {
					...tasks,
					a: tasks.a + '.'
				}
			}
		}
		default: return tasks;
	}
}