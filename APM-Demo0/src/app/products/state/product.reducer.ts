export function reducer(state: any, { type, payload }) {
  switch (type) {
    case 'TOGGLE_PRODUCT_CODe':
      return {
        ...state,
        showProductCode: payload,
      };
    default:
      return state;
  }
}
