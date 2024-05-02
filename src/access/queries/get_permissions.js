import { gql } from "@apollo/client";


export const GET_PERMISSIONS = gql`
    query QueryPermissions($where: PermissionWhere) {
        permissions(where: $where) {
            id
            name
            access
            resource
            roles {
                title
            }
        }
    }
`;