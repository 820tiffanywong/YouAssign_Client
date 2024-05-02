import { gql } from "@apollo/client";

export const CONNECT_USER_TO_SKILL = gql`
    mutation Mutation($where: UserWhere, $connect: UserConnectInput) {
        updateUsers(where: $where, connect: $connect) {
            users {
                first
                last
                skills {
                    title
                }
                skillsConnection {
                    edges {
                        node {
                        title
                            img_src
                        }
                        rating
                        description
                        isShowcased
                    }
                }
            }
        }
    }
`;
/*
{
  "where": {
    "email": "devinobrien@me.com"
  },
  "connect": {
    "skills": [
      {
        "where": {
          "node": {
            "title": "React"
          }
        },
        "edge": {
          "rating": 5,
          "description": "I've developed React web applications for several years now",
          "isShowcased": true
        }
      }
    ]
  }
}
*/