import { gql } from "@apollo/client";


export const UPDATE_PERMISSION = gql`
    mutation UpdatePermissions($where: PermissionWhere, $update: PermissionUpdateInput) {
        updatePermissions(where: $where, update: $update) {
            permissions {
                id
            }
        }
    }
`;