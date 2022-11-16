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

<details>
  <summary><b>Initial screen</b></summary>
  
  ![Initial screen](.github/images/initial.png 'Initial screen')
</details>

<details>
  <summary><b>Empty project</b></summary>
  
  ![Empty project](.github/images/snaily.png 'Empty project')
</details>

<details>
  <summary><b>Create project modal</b></summary>
  
  ![Create project modal](.github/images/create-project-modal.png 'Create project modal')
</details>

<details>
  <summary><b>Project</b></summary>
  
  ![Project screen](.github/images/project.png 'Project screen')
</details>

<details>
  <summary><b>Portals</b></summary>
  
  ![Portals screen](.github/images/portals.png 'Portals screen')
</details>

<details>
  <summary><b>Entities</b></summary>
  
  ![Entities screen](.github/images/entities.png 'Entities screen')
</details>

<details>
  <summary><b>Rooms</b></summary>
  
  ![Rooms screen](.github/images/rooms.png 'Rooms screen')
</details>

<details>
  <summary><b>Settings</b></summary>
  
  ![Settings screen](.github/images/settings.png 'Settings screen')
</details>

## Acknowledgements

- [Nikez](https://github.com/nikez) for the initial documentation about audio occlusion.
- [appricotflower821](https://github.com/tangerinenuistance5) for the rage.re research and the path nodes original algorithm.
