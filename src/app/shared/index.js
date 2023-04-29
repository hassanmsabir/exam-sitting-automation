import { actionAPI } from "./redux/actionAPI";
import { store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";

const useSharedDispatcher = () => useDispatch();
const useSharedSelector = useSelector;
export { store, useSharedDispatcher, useSharedSelector, actionAPI };
