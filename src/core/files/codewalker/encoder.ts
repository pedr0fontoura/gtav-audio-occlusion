import AudioOcclusion from '../../classes/audioOcclusion';
import AudioDynamixData from '../../classes/audioDynamixData';
import AudioGameData from '../../classes/audioGameData';

import * as XML from '../../types/xml';

export class CodeWalkerEncoder {
  constructor() {}

  public encodeAudioOcclusion(audioOcclusion: AudioOcclusion): XML.AudioOcclusionInteriorMetadata {
    audioOcclusion.beforeEncode();

    const encodedPortalInfoList = audioOcclusion.portalInfoList.map(portalInfo => {
      const encodedPortalEntityList: XML.PortalEntity[] = portalInfo.portalEntityList.map(portalEntity => {
        const encodedPortalEntity = {
          LinkType: {
            $: { value: portalEntity.linkType },
          },
          MaxOcclusion: {
            $: { value: portalEntity.maxOcclusion },
          },
          hash_E3674005: {
            $: { value: portalEntity.hash_E3674005 },
          },
          IsDoor: {
            $: { value: portalEntity.isDoor },
          },
          IsGlass: {
            $: { value: portalEntity.isGlass },
          },
        };

        return encodedPortalEntity;
      });

      const encodedPortalInfo: XML.PortalInfo = {
        InteriorProxyHash: {
          $: { value: portalInfo.interiorProxyHash },
        },
        PortalIdx: {
          $: { value: portalInfo.portalIdx },
        },
        RoomIdx: {
          $: { value: portalInfo.roomIdx },
        },
        DestInteriorHash: {
          $: { value: portalInfo.destInteriorHash },
        },
        DestRoomIdx: {
          $: { value: portalInfo.destRoomIdx },
        },
        PortalEntityList: {
          $: { itemType: 'hash_F6624EF9' },
          Item: encodedPortalEntityList,
        },
      };

      return encodedPortalInfo;
    });

    const encodedPathNodeList: XML.PathNode[] = audioOcclusion.pathNodeList.map(pathNode => {
      const encodedPathNodeChildList = {
        $: { itemType: 'hash_892CF74F' },
        Item: pathNode.pathNodeChildList.map(pathNodeChild => {
          return {
            PathNodeKey: {
              $: { value: pathNodeChild.pathNode.key },
            },
            PortalInfoIdx: {
              $: { value: pathNodeChild.portalInfo.infoIdx },
            },
          };
        }),
      };

      return {
        Key: {
          $: { value: pathNode.key },
        },
        PathNodeChildList: encodedPathNodeChildList,
      };
    });

    const encodedAudioOcclusion = {
      hash_DE5DB4C2: {
        PortalInfoList: {
          $: { itemType: 'hash_811C03CF' },
          Item: encodedPortalInfoList,
        },
        PathNodeList: {
          $: { itemType: 'hash_771E3577' },
          Item: encodedPathNodeList,
        },
      },
    };

    return encodedAudioOcclusion;
  }

  public encodeAudioDynamixData(audioDynamixData: AudioDynamixData): XML.AudioDynamixData {
    const encodedAudioDynamixData: XML.AudioDynamixData = {
      Dat15: {
        Version: { $: { value: 9037528 } },
        Items: {
          Item: [
            {
              $: { type: 'Scene', ntOffset: 0 },
              Name: audioDynamixData.scene.name,
              Flags: { $: { value: '0xAAAA0001' } },
              Unk01: '',
              Items: {
                Item: [{ Patch: audioDynamixData.patch.name, Group: '' }],
              },
            },
            {
              $: { type: 'Patch', ntOffset: 0 },
              Name: audioDynamixData.patch.name,
              Flags: { $: { value: '0xAAAA0001' } },
              Unk01: { $: { value: 500 } },
              Unk02: { $: { value: 500 } },
              Unk03: { $: { value: 0 } },
              Unk04: { $: { value: 0 } },
              Unk05: 'hash_0D0E6F19',
              Unk06: 'hash_E865CDE8',
              Unk07: { $: { value: 0 } },
              Items: {
                Item: [
                  {
                    Unk01: 'vehicles_train',
                    Unk02: { $: { value: -400 } },
                    Unk03: { $: { value: 1 } },
                    Unk04: { $: { value: 92 } },
                    Unk05: { $: { value: 93 } },
                    Unk06: { $: { value: 250 } },
                    Unk07: { $: { value: 0 } },
                    Unk08: { $: { value: 0 } },
                    Unk09: { $: { value: 1 } },
                    Unk10: { $: { value: 1 } },
                    Unk11: { $: { value: 1 } },
                  },
                  {
                    Unk01: 'vehicles_horns_loud',
                    Unk02: { $: { value: -900 } },
                    Unk03: { $: { value: 1 } },
                    Unk04: { $: { value: 92 } },
                    Unk05: { $: { value: 93 } },
                    Unk06: { $: { value: 0 } },
                    Unk07: { $: { value: 0 } },
                    Unk08: { $: { value: 0 } },
                    Unk09: { $: { value: 1 } },
                    Unk10: { $: { value: 1 } },
                    Unk11: { $: { value: 0.5 } },
                  },
                  {
                    Unk01: 'ambience',
                    Unk02: { $: { value: 600 } },
                    Unk03: { $: { value: 1 } },
                    Unk04: { $: { value: 92 } },
                    Unk05: { $: { value: 93 } },
                    Unk06: { $: { value: 0 } },
                    Unk07: { $: { value: 0 } },
                    Unk08: { $: { value: 0 } },
                    Unk09: { $: { value: 1 } },
                    Unk10: { $: { value: 1 } },
                    Unk11: { $: { value: 1 } },
                  },
                  {
                    Unk01: 'weather',
                    Unk02: { $: { value: -10400 } },
                    Unk03: { $: { value: 1 } },
                    Unk04: { $: { value: 92 } },
                    Unk05: { $: { value: 93 } },
                    Unk06: { $: { value: 250 } },
                    Unk07: { $: { value: 0 } },
                    Unk08: { $: { value: 0 } },
                    Unk09: { $: { value: 1 } },
                    Unk10: { $: { value: 1 } },
                    Unk11: { $: { value: 1 } },
                  },
                ],
              },
            },
          ],
        },
      },
    };

    return encodedAudioDynamixData;
  }

  public encodeAudioGameData(audioGameData: AudioGameData): XML.AudioGameData {
    const encodedAudioGameData: XML.AudioGameData = {
      Dat151: {
        Version: { $: { value: '25564071' } },
        Items: {
          Item: [
            {
              $: { type: 'AmbientZoneList', ntOffset: 0 },
              Name: 'ambient_zone_list',
              Zones: {
                Item: [audioGameData.ambientZone.name],
              },
            },
            {
              $: { type: 'Interior', ntOffset: 0 },
              Name: audioGameData.interior.name,
              Unk0: { $: { value: '0xAAAAA044' } },
              Unk1: { $: { value: '0xD4855127' } },
              Unk2: { $: { value: '0x00000000' } },
              Rooms: {
                Item: audioGameData.interior.rooms,
              },
            },
            {
              $: { type: 'AmbientZone', ntOffset: 0 },
              Name: audioGameData.ambientZone.name,
              Flags0: { $: { value: '0xAA800425' } },
              Shape: 'Box',
              Flags1: { $: { value: '0x00000000' } },
              OuterPos: {
                $: {
                  x: audioGameData.ambientZone.outerPos.x,
                  y: audioGameData.ambientZone.outerPos.y,
                  z: audioGameData.ambientZone.outerPos.z,
                },
              },
              OuterSize: {
                $: {
                  x: audioGameData.ambientZone.outerSize.x,
                  y: audioGameData.ambientZone.outerSize.y,
                  z: audioGameData.ambientZone.outerSize.z,
                },
              },
              OuterVec1: {
                $: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 0,
                },
              },
              OuterVec2: {
                $: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 0,
                },
              },
              OuterAngle: { $: { value: 0 } },
              OuterVec3: {
                $: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
              },
              InnerPos: {
                $: {
                  x: audioGameData.ambientZone.innerPos.x,
                  y: audioGameData.ambientZone.innerPos.y,
                  z: audioGameData.ambientZone.innerPos.z,
                },
              },
              InnerSize: {
                $: {
                  x: audioGameData.ambientZone.innerSize.x,
                  y: audioGameData.ambientZone.innerSize.y,
                  z: audioGameData.ambientZone.innerSize.z,
                },
              },
              InnerVec1: {
                $: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 0,
                },
              },
              InnerVec2: {
                $: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 0,
                },
              },
              InnerAngle: { $: { value: 0 } },
              InnerVec3: {
                $: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
              },
              UnkVec1: {
                $: {
                  x: 0,
                  y: 0,
                  z: 10,
                  w: 0,
                },
              },
              UnkVec2: {
                $: {
                  x: 1,
                  y: -1,
                  z: -1,
                  w: 0,
                },
              },
              UnkHash0: '',
              UnkHash1: audioGameData.ambientZone.unkHash01,
              UnkVec3: { $: { x: -1, y: 0, z: 0 } },
              Flags2: { $: { value: '0x00000000' } },
              Unk14: { $: { value: 4 } },
              Unk15: { $: { value: 1 } },
              Unk16: { $: { value: 0 } },
              Hashes: {
                Item: ['hash_4ACAAADD', 'hash_ED816221'],
              },
              ExtParams: '',
            },
            ...audioGameData.interiorRooms.map<XML.InteriorRoom>(interiorRoom => ({
              $: { type: 'InteriorRoom', ntOffset: 0 },
              Name: interiorRoom.name,
              Flags0: { $: { value: '0xAAAAAAAA' } },
              MloRoom: interiorRoom.mloRoom,
              Hash1: interiorRoom.hash1,
              Unk02: { $: { value: interiorRoom.unk02 } },
              Unk03: { $: { value: interiorRoom.unk03 } },
              Unk04: { $: { value: interiorRoom.unk04 } },
              Unk05: { $: { value: interiorRoom.unk05 } },
              Unk06: interiorRoom.unk06,
              Unk07: { $: { value: interiorRoom.unk07 } },
              Unk08: { $: { value: interiorRoom.unk08 } },
              Unk09: { $: { value: interiorRoom.unk09 } },
              Unk10: { $: { value: interiorRoom.unk10 } },
              Unk11: { $: { value: interiorRoom.unk11 } },
              Unk12: { $: { value: interiorRoom.unk12 } },
              Unk13: '',
              Unk14: 'hash_D4855127',
            })),
          ],
        },
      },
    };

    return encodedAudioGameData;
  }
}
