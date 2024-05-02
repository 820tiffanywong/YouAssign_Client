import { gql } from "@apollo/client";


export const CREATE_EVENT = gql`
    mutation Mutation($input: [EventCreateInput!]!) {
        createEvents(input: $input) {
            events {
                date
                topic
                description
            }
        }
    }
`