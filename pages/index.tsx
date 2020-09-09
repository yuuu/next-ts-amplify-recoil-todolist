import React from 'react'
import { useEffect } from 'react'

import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import Amplify from 'aws-amplify'
import awsconfig from '../src/aws-exports'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { ListTodosQuery } from '../src/API'
import { listTodos } from '../src/graphql/queries'

import Todo from '../src/component/Todo'

import { useRecoilState } from 'recoil'
import todosState from '../src/store/todos'

Amplify.configure(awsconfig)

const TodosIndex = () => {
  const [todos, setTodos] = useRecoilState(todosState)

  useEffect(() => {
    const asyncFunc = async () => {
      const result = (await API.graphql(
        graphqlOperation(listTodos)
      )) as GraphQLResult<ListTodosQuery>
      setTodos(result.data.listTodos.items)
    }
    asyncFunc()
  }, [])

  return (
    <>
			<Grid container direction="column" spacing={2}>
				<Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
				<Grid item md={6}>
          <Link href="/todos/new">
            <Button component="a" variant="contained" color="primary">
              New
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={2}>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Grid>
    </>
  )
}

export default withAuthenticator(TodosIndex)
