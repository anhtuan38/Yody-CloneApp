import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from "../constants";

const initialState = {
  cityList: {
    data: [],
    loading: false,
  },
  districtList: {
    data: [],
    loading: false,
  },
  wardList: {
    data: [],
    loading: false,
  },
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST(LOCATION_ACTION.GET_CITIES):
      return {
        ...state,
        cityList: {
          ...state.cityList,
          loading: true,
        },
      };
    case SUCCESS(LOCATION_ACTION.GET_CITIES):
      const { data } = payload;
      return {
        ...state,
        cityList: {
          ...state.cityList,
          data,
          loading: false,
        },
      };
    case FAIL(LOCATION_ACTION.GET_CITIES):
      return {
        ...state,
        cityList: {
          ...state.cityList,
          loading: false,
        },
      };

    case REQUEST(LOCATION_ACTION.GET_DISTRICTS):
      return {
        ...state,
        districtList: {
          ...state.districtList,
          loading: true,
        },
      };
    case SUCCESS(LOCATION_ACTION.GET_DISTRICTS):
      const result = payload;
      return {
        ...state,
        districtList: {
          ...state.districtList,
          data: result.data,
          loading: false,
        },
      };
    case FAIL(LOCATION_ACTION.GET_DISTRICTS):
      return {
        ...state,
        districtList: {
          ...state.districtList,
          loading: false,
        },
      };

    case REQUEST(LOCATION_ACTION.GET_WARDS):
      return {
        ...state,
        wardList: {
          ...state.wardList,
          loading: true,
        },
      };
    case SUCCESS(LOCATION_ACTION.GET_WARDS):
      const res = payload;
      return {
        ...state,
        wardList: {
          ...state.wardList,
          data: res.data,
          loading: false,
        },
      };
    case FAIL(LOCATION_ACTION.GET_WARDS):
      return {
        ...state,
        wardList: {
          ...state.wardList,
          loading: false,
        },
      };
    default:
      return state;
  }
}

export { initialState };
export default reducer;
