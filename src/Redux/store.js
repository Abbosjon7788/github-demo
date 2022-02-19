import { configureStore } from '@reduxjs/toolkit'
import reducer from './Reducers/Reducer'

export default configureStore({
     reducer: { reducer },
})