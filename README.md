# Launchpad98 (Launchpad95 OSD Mod)

This project adds a dynamic on-screen display (OSD) and documentation assets on top of the original [Launchpad95](https://motscousus.com/stuff/2011-07_Novation_Launchpad_Ableton_Live_Scripts/) Remote Script. It is intended to be layered on top of a standard Launchpad95 installation so it can be shared as a mod overlay.

**FAQ**
Launchpad98 extends the Launchpad95 OSD using a Max for Live device plus a JS extension (`L95_ext.js`) that listens for mode changes and updates the on-screen UI (screenshots + mode info) dynamically.

It was inspired by the old [LPC-Live](https://web.archive.org/web/20171211222033/http://www.nativekontrol.com/LPC-Live_2.html) UI (broken in modern Ableton Live), which is how I learned to use Ableton (that WayWayBack machine link is the only way to view the old LPC-Live 2 page on NativeKontrol, the project is entirely defunct).

When LPC_Live first broke years ago, I found Launchpad95 as an approximate replacement and was able to get up to speed quickly due to my previous experience with LPC-Live, but the lack of a dyanmic UI showing the current user mode was a serious downgrade and made things more difficult. Years later, watching my little brother struggling to learn to use Ableton, I realized there was a real need for a working, LPC-Style dynamic OSD for Launchpad95, so Launchpad98 was born (yes, there's a Launchpad2000 in the works as well, more on that later).

Launchpad95 was already an excellent tool, but Launchpad98's dynamic OSD elevates the user experience significantly for beginners and veterans alike.

Notes:
- I have not tested on MacOS, won't be able to until my Mac arrives this weekend.
- This has not been tested with Launchpad95Pro, as I do not have a Launchpad Pro to test with.

## UI Examples
These screenshots show the Launchpad98 OSD UI reacting to the selected mode, with Launchpad95 info at the top and toggleable sections. Images sourced from the Launchpad95 manual.

![Launchpad98 OSD toggled sections](toggledsections.png)

![Launchpad98 OSD demo](demo.png)

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
While Launchpad98 is a significant upgrade to Launchpad95's existing OSD, I think we can do better. The next goal is to create an OSD overlay for Launchpad95 with a fully dynanmic Launchpad grid, each pad and button (and associated text) updating live in the OSD window alongside the connected Launchpad device, supporting the both the MK1 colors and full RGB on later models.

That project is underway, and is called...Launchpad2000 (we're skipping 98 SE and ME, obviously).