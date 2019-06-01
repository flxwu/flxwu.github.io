/* eslint-disable react-hooks/rules-of-hooks */
const [, updateState] = React => React.useState();
const forceUpdate = React => React.useCallback(() => updateState({}), []);
export { forceUpdate };
