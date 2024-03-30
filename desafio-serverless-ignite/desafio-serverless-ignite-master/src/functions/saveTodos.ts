import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../utils/dynamoClient';
import { v4 as uuidV4 } from 'uuid';
interface ITodoInput {
  title: string;
  deadline: string;
}
export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ITodoInput;
  const id = uuidV4();
  const todo = {
    id,
    user_id,
    done: false,
    title,
    deadline: new Date(deadline).toISOString(),
  };
  await document
    .put({
      TableName: 'todos',
      Item: todo,
    })
    .promise();
  return {
    statusCode: 201,
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
