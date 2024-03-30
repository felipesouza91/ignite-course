import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../utils/dynamoClient';
export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const response = await document
    .scan({
      TableName: 'todos',
      FilterExpression: 'user_id = :id',
      ExpressionAttributeValues: {
        ':id': user_id,
      },
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
