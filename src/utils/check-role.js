function fullName({ name = '', surname = '', middleName = '' }) {
  let fName = surname;
  if (name.length > 0) fName += (' ' + name.charAt(0) + '.');
  if (middleName.length > 0) fName += (' ' + middleName.charAt(0) + '.');
  return fName;
}

function requestStatusFilter({ roles }) {
  const res = [];
  let statuses = [];
  const roleToStatuses = {
    analyst: ['New'],
    expert: ['New', 'Rated', 'Created'],
    moderator: ['Approved', 'Released'],
    researcher: ['Created'],
  };
  roles && roles.forEach(r => {
    statuses = statuses.concat(roleToStatuses[r] || []);
  });
  statuses.forEach(s => {
    !!~res.indexOf(s) === false && res.push(s);
  });
  return res;
}

export default function checkRole(user) {
  user = user || {};
  const { roles = [] } = user;
  user.hasRole = (r) => roles.includes(r);
  user.isSuperAdmin = user.hasRole('webadmin');
  user.isAdmin = user.hasRole('useradmin');
  user.isModerator = user.hasRole('moderator');
  user.isExpert = user.hasRole('expert');
  user.isAnalyst = user.hasRole('analyst');
  user.isResearcher = user.hasRole('researcher');
  user.fullName = user.fullName || fullName(user);
  user.isAnyAdmin = user.isAdmin || user.isSuperAdmin;
  user.hasAnyRole = user.isAnyAdmin || user.isAnalyst || user.isExpert || user.isModerator || user.isResearcher;
  user.allowedRequestStatuses = requestStatusFilter(user);
  return user;
}
