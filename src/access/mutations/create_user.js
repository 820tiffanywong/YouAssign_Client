import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation Mutation($input: [UserCreateInput!]!) {
        createUsers(input: $input) {
            users {
                first
                last
                slug
                email
                bio
                img
                date_joined
            }
        }
    }
`;