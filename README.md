# Launchpad98 (Launchpad95 OSD Mod)

This project adds a dynamic on-screen display (OSD) on top of the original [Launchpad95](https://motscousus.com/stuff/2011-07_Novation_Launchpad_Ableton_Live_Scripts/) Remote Script. It is intended to be layered on top of a standard Launchpad95 installation so it can be shared as a mod overlay.

If you like this and/or want to support my projects, you can buy my next caffinated beverage by donating through Ko-Fi using the button below:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/markettwain)

## UI Examples
These screenshots show the Launchpad98 OSD UI reacting to the selected mode, with Launchpad95 info at the top and toggleable sections. Images used in the OSD are sourced from Launchpad95's website, with some customizations.

![Launchpad98 OSD toggled sections](toggledsections.png)

![Launchpad98 OSD demo](demo.png)

## FAQ

### What is Launchpad98?
Launchpad98 extends the Launchpad95 OSD with a Max for Live device and a JavaScript extension (L95_ext.js) that listens for mode changes and dynamically updates an on-screen UI with screenshots and mode info.

### Why does it exist?
It’s inspired by the original LPC-Live OSD—an incredible learning tool that’s now defunct and broken in modern versions of Ableton Live (the Wayback Machine is the only way to see it). LPC-Live is how I originally learned Ableton, and its dynamic, mode-aware UI set a standard that never really got replaced.

When LPC-Live broke years ago, I switched to Launchpad95. It was (and still is) an excellent control surface, and my prior LPC-Live experience helped me adapt quickly. But the lack of a dynamic UI showing the current mode was a real downgrade—especially for learning and muscle-memory building.

That gap became even more obvious years later while watching my younger brother struggle to learn Ableton. It was clear there was still a strong need for a modern, LPC-style dynamic OSD for Launchpad95. That’s when Launchpad98 was born (yes, a Launchpad2000 is also in the works—more on that later).

### Who is it for?
Launchpad95 is already a powerful tool, but Launchpad98’s dynamic OSD significantly improves clarity and usability for both beginners and experienced users—bringing back the kind of visual feedback that makes learning faster and performing more intuitive.

### Notes
- I have not tested on MacOS, won't be able to until this weekend, but it _should_ be platform agnostic.
- This has not been tested with [Launchpad Pro95](https://motscousus.com/stuff/2015-12_Novation_Launchpad_Pro_Ableton_Live_Scripts/), as I do not have a Launchpad Pro to test with (feel free to [donate to the fund](https://ko-fi.com/markettwain) if you'd like!).

## Installation Instructions

### Download the original Launchpad95 first
If you don't already have Launchpad95 installed, you must download and install it first from:

[Launchpad95 site](https://motscousus.com/stuff/2011-07_Novation_Launchpad_Ableton_Live_Scripts/)

Or you can download from the GitHub repo if you'd prefer, but note that the Launchpad95 user manual is on the dev's site linked above.
[Launchpad95 GitHub repo](https://github.com/hdavid/Launchpad95)

### Install Launchpad95 (base)
1. Download and unzip Launchpad95 from the link above.
2. Copy the `Launchpad95` folder into your Ableton Remote Scripts folder.
3. Example path (Windows):
```
C:\Users\<You>\Documents\Ableton\User Library\Remote Scripts\Launchpad95
```
4. Example path (macOS):
```
~/Music/Ableton/User Library/Remote Scripts/Launchpad95
```

### Install this mod (overlay)
1. From this project, either download the latest release and extract the contents into your Launchpad95 folder in your Ableton Remote Sripts (recommended), or download and copy the contents of the `Launchpad98` folder on top of the base `Launchpad95` folder.
2. Overwrite when prompted.
3. Use `Launchpad98/MOD_OVERLAY_GUIDE.md` to see exactly which files are changed/added.
4. If you are using the drop-in zip, unzip it and copy its contents directly into your existing `Launchpad95` folder, then overwrite.

### Install the OSD device
1. The modded OSD device is:
```
Launchpad98\M4LDevice\Launchpad98OSD.amxd
```
2. Recommended: keep the entire `M4LDevice` folder together so the device can load `L95_ext.js` and the JSON UI sections.
3. If you copy the `.amxd` into Ableton's Max for Live Presets folder, make sure these folders are still in Max's search path:
```
Launchpad98\M4LDevice\
Launchpad98\Launchpad95 Mode Screenshots\
```

## Which OSD should I use?
The dynamic behavior comes from `M4LDevice\L95_ext.js`. The modded OSD (`Launchpad98OSD.amxd`) is recommended because it includes the UI sections used by the script (info, mode guide, mode info). The original OSD can show basic info, but it will not expose all sections or dynamic layout features.
If you want, you can also run the Launchpad98 OSD alongside the original Launchpad95 OSD (for example, to keep the Launchpad95 Info in a separate window).

## Future Plans - Launchpad2000
While Launchpad98 is a significant upgrade to Launchpad95's existing OSD, I think we can do better. The next goal is to create an OSD overlay for Launchpad95 with a fully dynanmic Launchpad grid, each pad and button (and associated text) updating live in the OSD window alongside the connected Launchpad device, supporting the both the MK1 colors and full RGB on later Launchpad models.

That project is underway, and is called...Launchpad2000 (we're skipping 98 SE and ME, obviously).
