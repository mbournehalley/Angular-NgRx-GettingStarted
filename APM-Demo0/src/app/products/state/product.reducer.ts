export function reducer(state: any, { type, payload }) {
  switch (type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: payload,
      };
    default:
      return state;
  }
}
