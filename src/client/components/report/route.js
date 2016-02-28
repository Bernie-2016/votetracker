import { validState } from '../../data/states';
import Report from './index';
import ReportLayout from './layout';
import SelectLocation from './location';
import Caucus from './caucus';

function validateState(nextState, redirect) {
  if (!validState(nextState.params.state)) {
    redirect('/');
  }
}

export default {
  path: 'report/:state/',
  onEnter: validateState,
  component: ReportLayout,
  indexRoute: { component: Report },
  childRoutes: [
    { path: ':county/',
      indexRoute: { component: SelectLocation },
      childRoutes: [
        { path: ':location', component: Caucus },
      ],
    },
  ],
};
