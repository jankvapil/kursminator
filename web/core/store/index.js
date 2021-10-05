import React from "react"
import Immer from "immer"
import globalHook from "use-global-hook"
import * as actions from "../actions"
import { initialState } from "./initialState"

const options = { Immer }
const useGlobal = globalHook(React, initialState, actions, options)

export default useGlobal