import React from 'react'
import Link from 'next/link'

import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { DeleteTodoMutation } from '../../src/API'
import { deleteTodo } from '../../src/graphql/mutations'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import { useRecoilState } from 'recoil'
import todosState from '../../src/store/todos'

const Todo = ({ todo }) => {
  const [todos, setTodos] = useRecoilState(todosState)

  const onArchive = async () => {
    (await API.graphql(
      graphqlOperation(deleteTodo, {
        input: {
          id: todo.id,
        },
      })
    )) as GraphQLResult<DeleteTodoMutation>
    setTodos(todos.filter((item) => item.id !== todo.id))
  }
  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            <Link href={`/todos/${todo.id}`}>{todo.name}</Link>
          </Typography>
          <Typography color="textSecondary">
            created at {new Date(todo.timestamp * 1000).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Done"
          />
          <Button variant="contained" color="secondary" onClick={onArchive}>
            Archive
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Todo
