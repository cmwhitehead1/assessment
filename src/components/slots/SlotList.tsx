import React, { SyntheticEvent } from 'react'
import { Button } from 'react-bootstrap'
import {
  Ingredient,
  useDispatchGlobalState,
  useGlobalState,
} from '../../context/GlobalStateContext'

import './SlotList.scss'

const SlotList = () => {
  const globalState = useGlobalState()
  const globalStateDispatch = useDispatchGlobalState()

  // useEffect(() => {
  //   console.log(globalState.slots)
  // }, [globalState])

  const addToSlot = (event: SyntheticEvent) => {
    if (!globalState.selectedIngredientByName) return

    const slotId = event.currentTarget.parentElement?.id
    const slotName = globalState.selectedIngredientByName

    globalStateDispatch({
      type: 'ADD_INGREDIENT_TO_SLOT',
      value: {
        ingredient: globalState.selectedIngredientById,
        ingredientId: globalState.selectedIngredientById,
        slotId,
        slotName,
      },
    })
  }

  const removeFromSlot = (event: SyntheticEvent) => {
    const slotId = event.currentTarget.parentElement?.id

    const id = Number(event.currentTarget.id) - 1
    const ingredient: Ingredient = {
      id: Number(globalState.slots[id].associatedID),
      name: globalState.slots[id].name,
    }

    globalStateDispatch({
      type: 'REMOVE_INGREDIENT_FROM_SLOT',
      value: {
        ingredient,
        slotId,
      },
    })
  }

  return (
    <div className="slot-container">
      <ul>
        {globalState.slots.map((slot) => {
          return (
            <li key={slot.id}>
              <div className="slot-item" id={String(slot.id)}>
                <span>{slot.name}</span>

                {slot.assigned ? (
                  <Button id={String(slot.id)} onClick={removeFromSlot}>
                    Unassign
                  </Button>
                ) : (
                  <Button onClick={addToSlot}>+</Button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SlotList
