import types from './types';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000/'
const API_GROUPS_JOINED = 'api/groups/joined/:user_id'
const API_GROUPS_CREATED = 'api/groups/created/:author_id'
const API_GROUPS = 'api/groups';


export function getCreatedGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS);
   return {
      type: types.GET_CREATED_GROUPS,
      payload: resp
   }
}

export function getJoinedGroups() {
   const resp = axios.get(BASE_URL + API_GROUPS);
   return {
      type: types.GET_JOINED_GROUPS,
      payload: resp
   }
}