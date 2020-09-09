import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Amplify from 'aws-amplify'
import awsconfig from '../../../src/aws-exports'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { UpdateTodoMutation, GetTodoQuery } from '../../../src/API'
import { updateTodo } from '../../../src/graphql/mutations'
import { getTodo } from '../../../src/graphql/queries'

import Form from '../../../src/component/Form'

Amplify.configure(awsconfig)

const TodosNew = () => {
  const [todo, setTodo]: [
    GetTodoQuery['getTodo'],
    React.Dispatch<{}>
  ] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const asyncFunc = async () => {
      const result = (await API.graphql(
        graphqlOperation(getTodo, { id })
      )) as GraphQLResult<GetTodoQuery>
      setTodo(result.data.getTodo)
    }
    asyncFunc()
  }, [])

  const onSubmit = async (newTodo) => {
    (await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          ...newTodo,
          id: todo.id,
        },
      })
    )) as GraphQLResult<UpdateTodoMutation>
    router.push('/todos/[id]', `/todos/${todo.id}`)
  }

  return !todo ? (
    <></>
  ) : (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
        <Grid item md={6}>
          <Link href="/todos/[id]" as={`/todos/${todo.id}`}>
            <Button component="a" variant="contained" color="default">
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Form onSubmit={onSubmit} values={todo}/>
    </>
  )
}

export default withAuthenticator(TodosNew)
