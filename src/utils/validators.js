export const required = (val) => val && val.length > 0;
export const minLength = len => (val) => val && val.length >= len;
export const isEmail = val => !val || /(.+)@(.+){2,}\.(.+){2,}/.test(val);

export const passwordsMatch = vals => vals.user && (vals.user.password === vals.user.passwordConfirmation);
export const passwordMinLength = vals => vals.user && (vals.user.password.length >= 6);
export const email = vals => vals.user && /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(vals.user.email);

export const emailValidators = { required, isEmail, minLength: minLength(5) };
