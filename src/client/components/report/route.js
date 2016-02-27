import { validState } from '../../data/states';
import Report from './index';

function validateState(nextState, redirect) {
  if (!validState(nextState.params.state)) {
    redirect('/');
  }
}

export default {
  path: 'report/:state',
  onEnter: validateState,
  component: Report,
};
