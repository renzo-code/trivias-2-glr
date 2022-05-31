import { gql } from '@apollo/client'

export const QUERY_CONTENT_SHOW = gql`
  query {
    show(site_id: "larepublica", _id: "623cf028b68c8550e343e243") {
      _id
      name
      machine_name
      date_init
      date_end
      data {
        body
        categories {
          _id
          name
          type
          slug
          primary
        }
        multimedia {
          path
          type
          subtype
          data {
            title
            alt
            credits
            source
            type_video
            image_path
            embed
          }
        }
      }
      questions {
        items {
          _id
          title
          data {
            multimedia {
              path
              type
              subtype
              data {
                title
                alt
                credits
                source
                type_video
                image_path
                embed
              }
            }
          }
          options {
            type
            items {
              key
              text
              multimedia {
                path
                type
                subtype
                data {
                  title
                  alt
                  credits
                  source
                  type_video
                  image_path
                  embed
                }
              }
              answer
              statistic {
                count
                percentage
              }
              status
            }
            count
          }
        }
        count
      }
    }
  }
`