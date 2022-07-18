import { registerEnumType } from '@nestjs/graphql';

export enum RoomType {
  OneToOne = 'OneToOne',
  OrgChannel = 'OrgChannel',
}

registerEnumType(RoomType, {
  name: 'RoomType',
});
