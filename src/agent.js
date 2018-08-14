import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

let API_ROOT = 'http://localhost:3010/api/v1';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
};

const requests = {
  del: (url, body) =>
    superagent.del(`${API_ROOT}${url}`).query(body)
      .use(tokenPlugin)
      .then(responseBody),
  get: (url, params) =>
    superagent.get(`${API_ROOT}${url}`, params)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/users/current'),
  login: (email, password, grant_type, subdomain) =>
    requests.post('/oauth/token', {email, password, grant_type, subdomain}),
  register: (email, password, password_confirmation) =>
    requests.post('/users', {email, password, password_confirmation}),
  save: user =>
    requests.put('/users', {user})
};

const User = {
  all: () =>
    requests.get('/users/'),
  del: (id) =>
    requests.del(`/users/${id}`),
  bulkDel: (ids) =>
    requests.del('/users/bulk_destroy', {'ids[]': ids}),
  create: (user) =>
    requests.post('/users', {user}),
  get: (id) =>
    requests.get(`/users/${id}`),
  update: (id, user) =>
      requests.put(`/users/${id}`, {user})
};

export default {
  Auth,
  User,
  setToken: _token => {
    token = _token;
  }
};
