import types from './types';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';
const API_GROUPS_JOINED = '/api/groups/joined/:user_id';
const API_GROUPS_CREATED = '/api/groups/created/:user_id';
const API_GROUPS = '/api/groups';
const API_LOGIN =  '/api/login';
const API_USER = '/api/users/:user_id';
const API_EDIT_USER = '/api/users'
const API_EDIT_GROUP_INFO = '/api/groups/'
const API_GET_GROUP_DETAILS = '/api/groups/:user_id'
const API_NEW_ACCOUNT = '/api/users'
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
   const resp = axios.get(`${BASE_URL + API_USER}/${userId}` )
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

export function getGroupDetails(){
   const resp = axios.get(BASE_URL + API_GET_GROUP_DETAILS);
   return {
      type: types.GET_GROUP_DETAILS,
      payload: resp
   }
}

export function editGroupInfo(){
   const resp = axios.put(BASE_URL + API_EDIT_GROUP_INFO);
   return {
      type: types.EDIT_GROUP_INFO,
      payload: resp
   }
}

export function createAccount(item){
   const resp = axios.post(BASE_URL + API_NEW_ACCOUNT, item)
   console.log(resp)
   return {
      type: types.CREATE_ACCOUNT,
      payload:resp
   }
}

