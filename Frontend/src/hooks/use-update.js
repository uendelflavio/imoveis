import React from "react";
const updateReducer = num => (num + 1) % 1000000;
export default function useUpdate() {
  const [, update] = React.useReducer(updateReducer, 0);
  return update;
}
