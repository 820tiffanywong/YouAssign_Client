import { gql } from "@apollo/client";


export const CREATE_PERMISSION = gql`
    mutation CreatePermission($input: [PermissionCreateInput!]!) {
        createPermissions(input: $input) {
            permissions {
                name
                access
                resource
            }
        }
    }
`;
/*
{
  "input": [
        {
            "name": null,
            "access": null,
            "resource": null
        }
    ]
}
*/