import { gql } from "@apollo/client";

export const GET_COMPANY = gql`
    query Query($where: CompanyWhere) {
        companies(where: $where) {
            id
            name
            logo
            backgroundImage
            description
            employees {
                first
                last
                email
                img
            }
        }
    }
`