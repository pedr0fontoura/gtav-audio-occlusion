import AudioOcclusion from '../../audioOcclusion';
import {
  AudioOcclusionInteriorMetadata,
  PortalInfo,
  PortalEntity,
  PathNode,
} from '../../types/ymt';

export class CodeWalkerEncoder {
  constructor() {}

  public encodeAudioOcclusion(audioOcclusion: AudioOcclusion): AudioOcclusionInteriorMetadata {
    const encodedPortalInfoList = audioOcclusion.PortalInfoList.map(portalInfo => {
      const encodedPortalEntityList: PortalEntity[] = portalInfo.PortalEntityList.map(
        portalEntity => {
          const encodedPortalEntity = {
            LinkType: {
              $: { value: portalEntity.LinkType },
            },
            MaxOcclusion: {
              $: { value: portalEntity.MaxOcclusion },
            },
            hash_E3674005: {
              $: { value: portalEntity.hash_E3674005 },
            },
            IsDoor: {
              $: { value: portalEntity.IsDoor },
            },
            IsGlass: {
              $: { value: portalEntity.IsGlass },
            },
          };

          return encodedPortalEntity;
        },
      );

      const encodedPortalInfo: PortalInfo = {
        InteriorProxyHash: {
          $: { value: portalInfo.InteriorProxyHash },
        },
        PortalIdx: {
          $: { value: portalInfo.PortalIdx },
        },
        RoomIdx: {
          $: { value: portalInfo.RoomIdx },
        },
        DestInteriorHash: {
          $: { value: portalInfo.DestInteriorHash },
        },
        DestRoomIdx: {
          $: { value: portalInfo.DestRoomIdx },
        },
        PortalEntityList: {
          $: { itemType: 'hash_F6624EF9' },
          Item: encodedPortalEntityList,
        },
      };

      return encodedPortalInfo;
    });

    const encodedPathNodeList: PathNode[] = audioOcclusion.PathNodeList.map(pathNode => {
      const encodedPathNodeChildList = {
        $: { itemType: 'hash_892CF74F' },
        Item: pathNode.PathNodeChildList.map(pathNodeChild => {
          return {
            PathNodeKey: {
              $: { value: pathNodeChild.PathNodeKey },
            },
            PortalInfoIdx: {
              $: { value: pathNodeChild.PortalInfoIdx },
            },
          };
        }),
      };

      return {
        Key: {
          $: { value: pathNode.Key },
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
}
