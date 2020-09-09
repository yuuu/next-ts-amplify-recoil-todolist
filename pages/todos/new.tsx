import React from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Amplify from 'aws-amplify'
import awsconfig from '../../src/aws-exports'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { CreateTodoMutation } from '../../src/API'
import { createTodo } from '../../src/graphql/mutations'

import Form from '../../src/component/Form'

Amplify.configure(awsconfig)

const TodosNew = () => {
  const router = useRouter()

  const onSubmit = async (newTodo) => {
    (await API.graphql(
      graphqlOperation(createTodo, {
        input: {
          ...newTodo,
          completed: false,
          timestamp: Math.floor(Date.now() / 1000),
        },
      })
    )) as GraphQLResult<CreateTodoMutation>
    router.push('/')
  }

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
        <Grid item md={6}>
          <Link href="/">
            <Button component="a" variant="contained" color="default">
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Form onSubmit={onSubmit}/>
    </>
  )
}

export default withAuthenticator(TodosNew)