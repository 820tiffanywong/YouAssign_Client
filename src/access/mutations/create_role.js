import { gql } from "@apollo/client";


export const CREATE_ROLE = gql`
    mutation Mutation($input: [RoleCreateInput!]!) {
        createRoles(input: $input) {
            roles {
                title
                permissions {
                    name
                }
            }
        }
    }
`;
/*
{
  input: [
    {
      title: String!,
      permissions: {
        connect: [
          {
            where: {
              node: {
                name_IN: [String!]
              }
            }
          }
        ]
      }
    }
  ]
}
*/