import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation Mutation($where: UserWhere, $update: UserUpdateInput) {
        updateUsers(where: $where, update: $update) {
            users {
                first
                last
                slug
                email
                bio
            }
        }
    }
`;