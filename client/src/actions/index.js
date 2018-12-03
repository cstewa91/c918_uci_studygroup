import types from './types';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';
const API_GROUPS_JOINED = '/api/groups/joined/';
const API_GROUPS_CREATED = '/api/groups/created/';
const API_GROUPS = '/api/groups';
const API_LOGIN = '/api/login';
const API_USER = '/api/users/';
const API_EDIT_USER = '/api/users';
const API_EDIT_GROUP_INFO = '/api/groups/';
const API_GET_GROUP_DETAILS = '/api/groups/details';
const API_NEW_ACCOUNT = '/api/users';
const API_JOIN_GROUP = '/api/groups/join';
const API_USERNAME = '/api/users/username';
const API_EMAIL = '/api/users/email';
const API_GROUP_NAME = '/api/groups/name';
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

export function getUserInfo() {
   return async function (dispatch) {
      const resp = await axios.get(BASE_URL + API_USER);
      dispatch({
         type: types.GET_USER_INFO,
         payload: resp,
      })
   }
}

export function editUserInfo(item) {
   const resp = axios.put(BASE_URL + API_EDIT_USER, item)
   return {
      type: types.EDIT_USER_INFO,
      payload: resp,
   }
}

export function createNewGroup(item) {
   return async function (dispatch) {
      const validGroupName = await axios.get(`${BASE_URL + API_GROUP_NAME}/${item.name}`)
      if (!validGroupName.data) {
         const resp = await axios.post(BASE_URL + API_GROUPS, item)
         const getGroup = await axios.get(BASE_URL + API_GROUPS_CREATED)
         dispatch({
            type: types.VALID_GROUPNAME,
            payload: resp
         })
      } else {
         dispatch({
            type: types.GROUPNAME_ALREADY_EXIST,
            error: 'Group name already in use'
         })
      }
   }
}

export function loginApp(item) {
   return async function (dispatch) {
      const resp = await axios.post(BASE_URL + API_LOGIN, item);
      console.log(resp)
      if (resp.data.success) {
         localStorage.setItem('token', resp.data.success)
         console.log(resp)
         dispatch({
            type: types.LOGIN_APP,
            payload: resp
         })
      } else {
         dispatch({
            type: types.ERROR_LOGIN,
            error: 'Invalid email or password'
         })
      }
   }

}

export function getAllGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS);
   return {
      type: types.GET_ALL_GROUPS,
      payload: resp
   }
}

export function getGroupDetails(groupId) {
   const resp = axios.get(`${BASE_URL + API_GET_GROUP_DETAILS}/${groupId}`);
   return {
      type: types.GET_GROUP_DETAILS,
      payload: resp
   }
}

export function editGroupInfo(groupId, item) {
   const resp = axios.put(`${BASE_URL + API_EDIT_GROUP_INFO}${groupId}`, item);
   return {
      type: types.EDIT_GROUP_INFO,
      payload: resp
   }
}

export function createAccount(item) {
   return async function (dispatch) {
      const validEmail = await axios.get(`${BASE_URL + API_EMAIL}/${item.email}`)
      const validUsername = await axios.get(`${BASE_URL + API_USERNAME}/${item.username}`)
      if (!validEmail.data && !validUsername.data) {
         const resp = await axios.post(BASE_URL + API_NEW_ACCOUNT, item)
         localStorage.setItem('token', resp.data.success)
         dispatch({
            type: types.CREATE_ACCOUNT,
            payload: resp
         })
      } else if (validEmail.data && !validUsername.data) {
         dispatch({
            type: types.EMAIL_ALREADY_EXISTS,
            error: 'Email already in use'
         })
      } else if (validUsername.data && !validEmail.data) {
         dispatch({
            type: types.USERNAME_ALREADY_EXISTS,
            error: 'Username already in use'
         })
      } else {
         dispatch({
            type: types.USERNAME_AND_EMAIL_EXIST
         })
      }
   }
}

export function joinGroup(groupId) {
   const resp = axios.post(BASE_URL + API_JOIN_GROUP, { group_id: groupId });
   console.log(resp);
   return {
      type: types.JOIN_GROUP,
      payload: resp
   }
}

export function userSignOut(){
   localStorage.removeItem('token');

   return {
      type: types.SIGN_OUT
   }
}