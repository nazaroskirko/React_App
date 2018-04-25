import queryString from 'query-string';
import checkRole from 'utils/check-role';

function parseContentRange(contentRange) {
  const matches = /^(\d+)-(\d+)\/(\d+)$/.exec(contentRange);
  if (matches) {
    matches.shift();
    const [first, last, total] = matches.map(n => +n);
    return { first, last, total };
  }
}

export const currentUser = state => state.currentUser;
export const token = state => state.token;
export const users = state => state.users.results.map(checkRole);
export const user = state => state.oneUser.results;
export const osTypes = state => state.osTypes.results;
export const applicationTypes = state => state.applicationTypes.results;
export const statuses = state => state.statuses.results;
export const dataConcepts = state => state.dataConcepts.results;
export const rates = state => state.rates.results;
export const ratings = state => state.ratings.results;
export const protectedDataTypes = state => state.protectedDataTypes.results;
export const protectedDataLocations = state => state.protectedDataLocations.results;
export const id = (_, props) => Number.parseInt(props.match.params.id);
export const ratingId = (_, props) => Number.parseInt(props.match.params.ratingId);
export const search = (_, props) => queryString.parse(props.history.location.search);
export const requestsPaginationMeta = state => parseContentRange(state.requests.contentRange);
export const usersPaginationMeta = state => parseContentRange(state.users.contentRange);
