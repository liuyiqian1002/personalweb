import API from 'api/api';

/**
 *  请求常量，并存储起来
 */
export function loadConstantsList(param) {
  return {
    types: ['LOAD_CONSTANTS_REQUEST', 'LOAD_CONSTANTS_SUCCESS', 'LOAD_CONSTANTS_FAILURE'],
    shouldCallAPI: (state) => {
      return true;
    },
    callAPI: API.query_hallSelectconstants(param),
    successCallback: (dispatch, result) => {
      console.log(result);
    },
  };
}

function flatArray(arr, obj) {
  arr.forEach((item) => {
    if (item.permissions) {
      // obj[item.menuPermission] = item;
      item.permissions.forEach((rowItem) => {
        obj[rowItem.permissionCode] = item.have ? rowItem : false;
      });
    }

    if (item.children) {
      flatArray(item.children, obj);
    } else {
      return;
    }
  });
}

/**
 *  请求常量，并存储起来
 */
export function loadPermissionList(param) {
  return {
    types: ['LOAD_PERMISSION_REQUEST', 'LOAD_PERMISSION_SUCCESS', 'LOAD_PERMISSION_FAILURE'],
    shouldCallAPI: (state) => {
      return true;
    },
    callAPI: API.role_viewSettingMenu(param),
    successCallback: (dispatch, result) => {
      if (result) {
        const obj = {};
        console.error(result);
        flatArray(result, obj);
        dispatch({
          type: 'app/SET_PERMISSION_LIST',
          payload: obj,
        });
      }
    },
  };
}
