import { gql } from "@apollo/client";


export const DISCONNECT_PERMISSION = gql`
    mutation UpdateRoles($where: RoleWhere, $disconnect: RoleDisconnectInput) {
        updateRoles(where: $where, disconnect: $disconnect) {
            roles {
                title
                permissions {
                name
                }
            }
        }
    }
`