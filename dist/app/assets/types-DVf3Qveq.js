const e=`
  id
  profileIds
  folder {
    id
    albumNanoId
    folderName
    folderDescription
    folderPassword {
      password
      policy
    }
    creatorId
    createdAt
    updatedAt
    fileReferencesPage {
      items {
        file {
          dataInBytes
          dataKey
          thumbnailDataKey
          durationInSeconds
        }
      }
    }
    contactsUsingInvite {
      items {
        id
        item {
          ... on Persona {
            publicDisplayName
          }
        }
      }
    }
    folderInviteParameters {
      usingFolderInviteGrantsRightToAddItems
    }      
  }
`,t=`
  mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Folder {
          id
          albumNanoId
          folderName
          folderDescription
          creatorId
          createdAt
          updatedAt
          folderPassword {
            password
            policy
          }
          fileReferencesPage {
            items {
              file {
                id
                ownerContactId
                dataKey
                thumbnailDataKey
                durationInSeconds
                dataInBytes
              }
            }
          }
          contactsUsingInvite {
            items {
              id
              item {
                ... on Persona {
                  publicDisplayName
                }
              }
            }
          }
          folderInviteParameters {
            usingFolderInviteGrantsRightToAddItems
          }
          folderPosition {
            id
            profileIds
          }
        }
      }
      nextToken
    }
  }
`;export{t as F,e as a};
