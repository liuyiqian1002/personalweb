/**
 * 请求中间件
 * @param {*} param0
 */
function reuqestMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    const { types, callAPI, payload = {}, successCallback, shouldCallAPI } = action;

    if (!types) {
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every((type) => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI.then !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      ...payload,
      type: requestType,
    });

    return callAPI.then(
      (response) => {
        dispatch(
          Object.assign({}, payload, {
            response,
            type: successType,
          })
        );
        if (typeof successCallback !== 'function') {
          throw new Error('Expected successCallback to be a function.');
        }
        successCallback(dispatch, response);
      },
      (error) => {
        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType,
          })
        );
      }
    );
  };
}

export default reuqestMiddleware;
