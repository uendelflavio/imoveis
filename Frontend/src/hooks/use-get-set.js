import React from "react";

const useGetSet = initialState => {
  const state = React.useRef(initialState);
  const [, update] = React.useReducer(() => ({}));

  return React.useMemo(
    () => [
      () => state.current,
      newState => {
        state.current = newState;
        update();
      }
    ],
    []
  );
};

export default useGetSet;
