import { gql } from "@apollo/client";


export const UPDATE_COMPANY = gql`
    mutation Mutation($where: CompanyWhere, $update: CompanyUpdateInput, $disconnect: CompanyDisconnectInput) {
        updateCompanies(where: $where, update: $update, disconnect: $disconnect) {
            companies {
                id
            }
        }
    }
`