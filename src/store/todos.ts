
import { atom } from 'recoil'

const todosState = atom({
  key: 'todos',
  default: [],
})

export default todosState
