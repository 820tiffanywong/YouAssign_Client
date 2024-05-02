import { gql } from "@apollo/client";


export const GET_PROJECTS = gql`
    query Query($where: ProjectWhere) {
        projects(where: $where) {
            id
            title
            description
            clients {
                first
                last
                img
                email
            }
            employees {
                first
                last
                email
                img
            }
            skills_required {
                title
                id
                img_src
            }
        }
    }
`;
/*
{
    where: {
        id: null
    }
}
*/