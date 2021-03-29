import { useReducer, useContext, createContext } from 'react'
import InitialSlotState from './initialState/SlotState'
import InitialIngredientsState from './initialState/IngredientsState'

interface Children {
  children: JSX.Element | JSX.Element[]
}

export interface Slot {
  id: number
  name: string
  assigned: boolean
  associatedID: number
}
export interface Ingredient {
  id: number
  name: string
}
interface State {
  ingredients: Array<Ingredient>
  slots: Array<Slot>
  selectedIngredientByName: string
  selectedIngredientById: number
}

const initialGlobalState: State = {
  ingredients: InitialIngredientsState,
  slots: InitialSlotState,
  selectedIngredientByName: '',
  selectedIngredientById: 0,
}

type Dispatch = {
  type: string
  value: string | boolean | object
}

type IGlobalStateContext = State
type DispatchContext = React.Dispatch<React.SetStateAction<Dispatch>>

const GlobalStateContext = createContext<IGlobalStateContext>(
  initialGlobalState
)
const GlobalDispatchContext = createContext<DispatchContext>(() => null)

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'SET_SELECTED_INGREDIENT':
      return {
        ...state,
        selectedIngredientById: action.value.id,
        selectedIngredientByName: action.value.name,
      }
    case 'ADD_INGREDIENT_TO_SLOT':
      // Update the ingredientsList state
      const filteredIngredientsList = state.ingredients.filter(
        (ingredient: Ingredient) => {
          return ingredient.id !== parseInt(action.value.ingredient)
        }
      )
      // Update the slot state
      const slots = state.slots.map((slot: Slot) => {
        if (slot.id === parseInt(action.value.slotId)) {
          slot.name = action.value.slotName
          slot.assigned = true
          slot.associatedID = action.value.ingredientId
        }
        return slot
      })

      return {
        ...state,
        slots,
        ingredients: filteredIngredientsList,
        selectedIngredientById: '',
        selectedIngredientByName: 0,
      }
    case 'REMOVE_INGREDIENT_FROM_SLOT':
      const ingredients = [action.value.ingredient, ...state.ingredients]

      return {
        ...state,
        ingredients,
        slots: state.slots.map((slot: Slot) => {
          if (slot.id === parseInt(action.value.slotId)) {
            slot.associatedID = 0
            slot.name = `S${action.value.slotId} Unassigned`
            slot.assigned = false
          }
          return slot
        }),
      }
    default:
      return state
  }
}

export const GlobalStateProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(reducer, initialGlobalState)

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalStateContext)
export const useDispatchGlobalState = () => useContext(GlobalDispatchContext)
