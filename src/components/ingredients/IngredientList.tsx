import React, { useState, SyntheticEvent } from 'react'
import {
  useDispatchGlobalState,
  useGlobalState,
} from '../../context/GlobalStateContext'
import './IngredientsList.scss'

const IngredientList = () => {
  const globalState = useGlobalState()
  const globalStateDispatch = useDispatchGlobalState()
  const [selectedIngredient, setSelectedIngredient] = useState<SyntheticEvent>()

  /**
   * If prev selected is available remove the 'selected' class
   * Add the 'selected' class to the selected ingredient
   */
  const toggleSelectClass = (event: SyntheticEvent) => {
    if (selectedIngredient !== undefined) {
      // @ts-ignore
      selectedIngredient.target.classList.toggle('selected')
    }

    let target = event.currentTarget
    target.classList.toggle('selected')
  }

  const handleIngredientClick = (event: SyntheticEvent) => {
    event.preventDefault()

    toggleSelectClass(event)

    setSelectedIngredient(event)

    const ingredientName = event.currentTarget.innerHTML
    const ingredientId = event.currentTarget.id

    globalStateDispatch({
      type: 'SET_SELECTED_INGREDIENT',
      value: { name: ingredientName, id: ingredientId },
    })
  }

  return (
    <div className="ingredients-container">
      {globalState.ingredients.map((ingredient: any) => {
        return (
          <div
            id={ingredient.id}
            key={ingredient.id}
            className="circle"
            onClick={handleIngredientClick}
          >
            {ingredient.name}
          </div>
        )
      })}
    </div>
  )
}

export default IngredientList
