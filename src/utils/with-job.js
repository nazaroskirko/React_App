import { withJob } from 'react-jobs';
import LoadingComponent from 'pages/loader';
import ErrorComponent from 'pages/error';

export default (options) => (
  withJob({
    LoadingComponent,
    ErrorComponent,
    ...options,
  })
);
