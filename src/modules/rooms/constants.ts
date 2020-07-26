import { registerEnumType } from '@nestjs/graphql'

export enum RoomType {
  OneToOne = 'ONE_TO_ONE',
  OrgChannel = 'ORG_CHANNEL'
}

registerEnumType(RoomType, {
  name: 'RoomType'
})
