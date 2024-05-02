import { gql } from "@apollo/client";


export const UPDATE_EVENT = gql`
    mutation Mutation($where: EventWhere, $update: EventUpdateInput) {
        updateEvents(where: $where, update: $update) {
            events {
                id
            }
        }
    }
`