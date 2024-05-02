import { gql } from "@apollo/client";


export const UPDATE_ROLE = gql`
    mutation UpdateRoles($where: RoleWhere, $update: RoleUpdateInput) {
        updateRoles(where: $where, update: $update) {
            roles {
                title
                permissions {
                    name
                }
                users {
                    email
                }
            }
        }
    }
`;
/*
{
  where: {
    title: GeneralUser
  },
  update: {
    title: GeneralUser,
    permissions: [
      {
        connect: [
          {
            where: {
              node: {
                id: null
              }
            }
          }
        ]
      }
    ],
    users: [
      {
        connect: [
          {
            where: {
              node: {
                email: devinobrien@me.com
              }
            }
          }
        ]
      }
    ]
  }
}
*/