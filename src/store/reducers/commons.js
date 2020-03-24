const NAMESPACE = "COMMONS";

export const commonConstants = {
  loading: `${NAMESPACE}_LOADING`,
  username: `${NAMESPACE}_USER_NAME`,
  password: `${NAMESPACE}_PASSWORD`,
};

const initialState = {
  loading: false,
  username: "",
  password: "",
};

function commonsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case commonConstants.loading:
      console.log("reducer - loading :" + payload);
      return {
        ...state,
        loading: payload,
      };
    case commonConstants.username:
      return {
        ...state,
        username: payload,
      };
    case commonConstants.password:
      return {
        ...state,
        password: payload,
      };
    default:
      return state;
  }
}

export default commonsReducer;
