# Generate Occlusion Hash

1 -> Get the interior archetypeName from the .ymap file

2 -> If the archetypeName starts with `hash_` get the name from the .ytyp file name.

3 -> Calculate the joaat hash of the archetypeName

4 -> Calculate the occlusion hash using the formula.
`archetypeNameHash ^ (MLOPos.x * 100) ^ (MLOPos.y * 100) ^ (MLOPos.z * 100)`

5 -> If the result is negative, then the .ymt filename is the Occlusion Hash unsigned

# Generating Rooms Hashes

- Limbo aka outside don't need to be calculated using the room hash formula.

- Room hash = OcclusionHash ^ joaat(room)

- PathNodeList.Key = startRoomHash - EndRoomHash
  e.g:
  Outside -> Room 1 = joaat("outside") - Room1 Hash

# Audio Occlusion Paths RE

Interior: v_lesters

File name: 4193197238 (Occlusion hash unsigned)

Occlusion hash: -101770058

Filter PortalInfoList for InteriorProxyHash = -101770058

6 entries `<InteriorProxyHash value="-101770058" />`

Total portals 14 (0 - 13)

Relevant Portals: 8, 9, 10, 11, 12, 13

35 PathNodes

## Portals

[8] limbo -> hallWay | 0 -> 2

[9] mainRoom -> hallWay | 1 -> 2

[10] mainRoom -> back_room | 1 -> 3

[11] hallWay -> limbo | 2 -> 0

[12] hallWay -> mainRoom | 2 -> 1

[13] back_room -> mainRoom | 3 -> 1

## Rooms

[0] limbo -> 3086856661 (outside)

[1] mainRoom -> 199779901 -> -234390901

[2] HallWay -> 3321989788 -> 1072600618

[3] back_room -> 840886649 -> -873335345

## Paths

Indexes are different from the file, they just represent the order of the paths.

Fields:

Key: (base path key, startRoomHash - endRoomHash) -> (base key + channel)(channel), ...
(base key + channel) -> PathNodeKey: (referenced path node key) | PortalInfoIdx: (referenced portal index)

[0] 1 -> 3 | Key: 638944444 -> 638944445(1), 638944446(2)
638944445 -> PathNodeKey: 0 | PortalInfoIdx: 10
638944446 -> PathNodeKey: 0 | PortalInfoIdx: 10

[1] 2 -> 1 | Key: 1306991519 -> 1306991520(1), 1306991521(2), 1306991522(3)
1306991520 -> PathNodeKey: 0 | PortalInfoIdx: 12
1306991521 -> PathNodeKey: 0 | PortalInfoIdx: 12
1306991522 -> PathNodeKey: 0 | PortalInfoIdx: 12

[2] 0 -> 2 | Key: 2014256043 -> 2014256044(1), 2014256045(2), 2014256046(3)
2014256044 -> PathNodeKey: 0 | PortalInfoIdx: 8
2014256045 -> PathNodeKey: 0 | PortalInfoIdx: 8
2014256046 -> PathNodeKey: 0 | PortalInfoIdx: 8

[3] 2 -> 0 | Key: -2014256043 -> -2014256042(1), -2014256041(2)
-2014256042 -> PathNodeKey: 0 | PortalInfoIdx: 11
-2014256041 -> PathNodeKey: 0 | PortalInfoIdx: 11

[4] 1 -> 2 | Key: -1306991519 -> -1306991518(1), -1306991517(2)
-1306991518 -> PathNodeKey: 0 | PortalInfoIdx: 9
-1306991517 -> PathNodeKey: 0 | PortalInfoIdx: 9

[5] 3 -> 1 | Key: -638944444 -> -638944443(1), -638944442(2), -638944441(3)
-638944443 -> PathNodeKey: 0 | PortalInfoIdx: 13
-638944442 -> PathNodeKey: 0 | PortalInfoIdx: 13
-638944441 -> PathNodeKey: 0 | PortalInfoIdx: 13

[6] Key 1 -> 0 | Key: 973719734 -> 973719736(2), 973719737(3)
973719736 -> PathNodeKey: -2014256042 | PortalInfoIdx: 9
973719737 -> PathNodeKey: -2014256041 | PortalInfoIdx: 9

[7] Key 2 -> 3 | Key: 1945935963 -> 1945935965(2), 1945935966(3)
1945935965 -> PathNodeKey: 638944445 | PortalInfoIdx: 12
1945935966 -> PathNodeKey: 638944446 | PortalInfoIdx: 12

[8] Key 3 -> 2 | Key: -1945935963 -> -1945935961(2), -1945935960(3)
-1945935961 -> PathNodeKey: -1306991518 | PortalInfoIdx: 13
-1945935960 -> PathNodeKey: -1306991517 | PortalInfoIdx: 13

[9] Key 0 -> 1 | Key: -973719734 -> -973719732(2), -973719731(3)
-973719732 -> PathNodeKey: 1306991520 | PortalInfoIdx: 8
-973719731 -> PathNodeKey: 1306991521 | PortalInfoIdx: 8

[10] Key 3 -> 0 | Key: 334775290 -> 334775293(3)
334775293 -> PathNodeKey: 973719736 | PortalInfoIdx: 13

[11] Key 1 -> 3 | Key: 638944444 -> 638944447(3)
638944447 -> PathNodeKey: 1945935965 | PortalInfoIdx: 9
638944447 -> PathNodeKey: 0 | PortalInfoIdx: 10

[12] Key 2 -> 0 | Key: -2014256043 -> -2014256040(3)
-2014256040 -> PathNodeKey: 0 | PortalInfoIdx: 11
-2014256040 -> PathNodeKey: 973719736 | PortalInfoIdx: 12

[13] Key 1 -> 2 | Key: -1306991519 -> -1306991516(3)
-1306991516 -> PathNodeKey: 0 | PortalInfoIdx: 9
-1306991516 -> PathNodeKey: -1945935961 | PortalInfoIdx: 10

[14] Key 0 -> 3 | Key: -334775290 -> -334775287(3)
-334775287 -> PathNodeKey: 1945935965 | PortalInfoIdx: 8

[?] Key ? -> ? | Key: ? -> ?, ?
? -> PathNodeKey: ? | PortalInfoIdx: ?
? -> PathNodeKey: ? | PortalInfoIdx: ?
