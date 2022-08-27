# gtav-audio-occlusion

An "eh" tool for generating audio occlusion for V MLO's.

If you don't understand how audio occlusion works on V, I suggest you read [Nikez's documentation](https://github.com/nikez/gtav_audio_occlusion_documentation) and the [rage.re topic](https://rage.re/docs?topic=40) about it.

The tool uses the CodeWalker XML format, so you need to extract/import game files with [CodeWalker](https://github.com/dexyfex/CodeWalker) before using the generated files.

## Disclaimer

This repository is not maintained anymore, but may receive sporadic updates.

Also, the tool was not designed for public use, but my own. I made it public to incentivize and make the transition to using [FiveM](https://fivem.net/)'s native audio system easier for the community.

That said, feel free to fork this repository and change it to suit you the best.

If you're totally unsatisfied with this tool, there is another public audio occlusion tool you can try [here](https://github.com/tangerinenuistance5/OcclusionGenerator).

## Preview

The screenshots below are not updated and **do not** represent exactly how the tool looks or works.

![Tool Preview](https://i.imgur.com/F2FtY6u.png 'Tool Preview')
![Tool Preview](https://i.imgur.com/H9khmSb.png 'Tool Preview')
![Tool Preview](https://i.imgur.com/RNme5e1.png 'Tool Preview')
![Tool Preview](https://i.imgur.com/aMVjYKr.png 'Tool Preview')

## Installation

**Download**

Get the latest version of the tool from the releases section.

**Build**

1. Clone the repository.
2. Execute the build script.

   ```bash
   yarn build
   ```

3. Start the app.

   ```bash
   yarn start
   ```

## Credits

- [Nikez](https://github.com/nikez/gtav_audio_occlusion_documentation) for the original documentation about audio occlusion.
- [appricotflower821](https://github.com/tangerinenuistance5) for the path nodes generation algorithm and discovering unknow hashes.
