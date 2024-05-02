import { gql } from "@apollo/client";


export const CREATE_TIMESTAMP = gql`
    mutation CreateTimestamps($input: [TimestampCreateInput!]!) {
        createTimestamps(input: $input) {
            timestamps {
                date
                hours_logged
                description
                user {
                    first
                    last
                    email
                }
                project {
                    title
                    id
                }
            }
        }
    }
`