import types from './types';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';
const API_GROUPS_JOINED = '/api/groups/joined/:user_id';
const API_GROUPS_CREATED = '/api/groups/created/:author_id';
const API_GROUPS = '/api/groups';
const API_LOGIN =  '/api/login';
const API_USER = '/api/users/:user_id';
const API_EDIT_USER = '/api/users'
axios.defaults.withCredentials = true;


export function getCreatedGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS_CREATED);
   return {
      type: types.GET_CREATED_GROUPS,
      payload: resp
   }
}

export function getJoinedGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS_JOINED);
   return {
      type: types.GET_JOINED_GROUPS,
      payload: resp
   }
}

export function getUserInfo(userId) {
   const resp = axios.get(`${BASE_URL}/${API_USER/userID}` )
   return {
      type: types.GET_USER_INFO,
      payload: resp,
   }
}

export function editUserInfo() {
   const resp = axios.put(BASE_URL + API_EDIT_USER )
   return {
      type: types.EDIT_USER_INFO,
      payload: resp,
   }
}

export function createNewGroup(item) {
   const resp = axios.post(BASE_URL + API_GROUPS, item);
   console.log(resp)
   return {
      type: types.CREATE_NEW_GROUP,
      payload: resp
   }
}

export function loginApp(item) {
   const resp = axios.post(BASE_URL + API_LOGIN, item);
   return {
      type: types.LOGIN_APP,
      payload: resp
   }
}

