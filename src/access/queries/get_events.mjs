import { gql } from "@apollo/client";


export const GET_EVENTS = gql`
    query Query($where: EventWhere) {
        events(where: $where) {
            id
            date
            topic
            description
            likes {
                email
                first
                last
            }
        }
    }
`
