# gtav-audio-occlusion

A tool for generating audio occlusion for V MLOs.

It was created as an incentive to help the community move to [FiveM](https://fivem.net/)'s native audio system.

## Disclaimer

This tool uses the CodeWalker XML format, so you need to extract/import game files with [CodeWalker](https://github.com/dexyfex/CodeWalker) before using the generated files.

If you don't know what is audio occlusion or how it works on V, the following content will be useful to you:

- [Nikez's documentation](https://github.com/nikez/gtav_audio_occlusion_documentation)
- [gtadps audio occlusion guide on rage.re](https://rage.re/docs?topic=40)

## Installation

**Download**

Get the latest version of the tool from the [releases](https://github.com/pedr0fontoura/gtav-audio-occlusion/releases) section.

**Build (for developers)**

```bash
# Clone this repository
$ git clone https://github.com/pedr0fontoura/gtav-audio-occlusion

# Navigate to the repo directory
$ cd gtav-audio-occlusion

# Install the project dependencies
$ yarn

# Run the tool
$ yarn start
```

## Preview

![Initial screen](.github/initial.png 'Initial screen')
![Empty project](.github/snaily.png 'Empty project')
![Create project modal](.github/create-project-modal.png 'Create project modal')
![Project screen](.github/project.png 'Project screen')
![Portals screen](.github/portals.png 'Portals screen')
![Entities screen](.github/entities.png 'Entities screen')
![Rooms screen](.github/rooms.png 'Rooms screen')
![Settings screen](.github/settings.png 'Settings screen')

## Acknowledgements

- [Nikez](https://github.com/nikez/gtav_audio_occlusion_documentation) for the initial documentation about audio occlusion.
- [appricotflower821](https://github.com/tangerinenuistance5) for the rage.re research and the path nodes original algorithm.
