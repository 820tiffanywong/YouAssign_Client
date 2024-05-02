import { gql } from "@apollo/client";


export const DISCONNECT_ROLE = gql`
    mutation Mutation($disconnect: UserDisconnectInput, $where: UserWhere) {
        updateUsers(disconnect: $disconnect, where: $where) {
            users {
                first
                last
            }
        }
    }
`