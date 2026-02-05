# Mod Overlay Guide

This document records the differences between the base Launchpad95 installation and this modified version. Use it later to assemble a minimal overlay package.

**Reference source**
- Original files live under `Launchpad95_Original\Launchpad95`.
- Do not modify anything in `Launchpad95_Original`.

**Core script changes (required)**
These files exist in both versions but have different contents. They must be overlaid on top of a base Launchpad95 install.
```
__init__.py
ButtonSliderElement.py
ClipSlotMK2.py
ColorsMK1.py
ColorsMK2.py
ConfigurableButtonElement.py
DefChannelStripComponent.py
DeviceControllerComponent.py
DeviceControllerStrip.py
DeviceControllerStripProxy.py
DeviceControllerStripServer.py
InstrumentControllerComponent.py
Launchpad.py
Log.py
LoopSelectorComponent.py
M4LInterface.py
MainSelectorComponent.py
NoteEditorComponent.py
NoteRepeatComponent.py
NoteSelectorComponent.py
PreciseButtonSliderElement.py
ScaleComponent.py
Settings.py
SkinMK1.py
SkinMK2.py
SpecialMixerComponent.py
SpecialProSessionComponent.py
SpecialProSessionRecordingComponent.py
SpecialSessionComponent.py
StepSequencerComponent.py
StepSequencerComponent2.py
SubSelectorComponent.py
TargetTrackComponent.py
TrackControllerComponent.py
LICENSE
web/index.html
```

**OSD additions (required for the dynamic UI)**
```
M4LDevice\L95_ext.js
M4LDevice\_osd.json
M4LDevice\_patcher.json
M4LDevice\_section_guide.json
M4LDevice\_section_info.json
M4LDevice\_section_modeinfo.json
M4LDevice\Launchpad95OSD_Dynamic.amxd
```

**OSD screenshots (required for Mode Button Guide)**
```
Launchpad95 Mode Screenshots\Device Controller Mode.png
Launchpad95 Mode Screenshots\Drum Step Sequencer Mode_Combined Mode.png
Launchpad95 Mode Screenshots\Drum Step Sequencer Mode_Multinote Mode.png
Launchpad95 Mode Screenshots\Instrument Controller Mode.png
Launchpad95 Mode Screenshots\Instrument Controller Mode_Scale Edition Mode.png
Launchpad95 Mode Screenshots\Melodic StepSequencer Mode.png
Launchpad95 Mode Screenshots\Mixer Mode.png
Launchpad95 Mode Screenshots\Pro Session Mode.png
Launchpad95 Mode Screenshots\Pro Session Mode_Arm.png
Launchpad95 Mode Screenshots\Pro Session Mode_Fixed Clip Length Recording.png
Launchpad95 Mode Screenshots\Pro Session Mode_Launch Quantization.png
Launchpad95 Mode Screenshots\Pro Session Mode_Metronome.png
Launchpad95 Mode Screenshots\Pro Session Mode_Mute.png
Launchpad95 Mode Screenshots\Pro Session Mode_Record Quantization.png
Launchpad95 Mode Screenshots\Pro Session Mode_Solo.png
Launchpad95 Mode Screenshots\Pro Session Mode_Tempo.png
Launchpad95 Mode Screenshots\Quick Scale Mode_Modus.png
Launchpad95 Mode Screenshots\Quick Scale Mode_Note Repeat.png
Launchpad95 Mode Screenshots\Quick Scale Mode_Root Note.png
Launchpad95 Mode Screenshots\Scale Mode.png
Launchpad95 Mode Screenshots\Session Mode.png
Launchpad95 Mode Screenshots\User1 Mode.png
Launchpad95 Mode Screenshots\User2 Mode.png
```

**Documentation assets (optional)**
```
Launchpad95 Mode HTML\...
README
Launchpad95 Manual - English.pdf
README.txt
```

**Removed or renamed relative to original**
- Original file not present in the mod folder:
```
M4LDevice\Launchpad95OSDHelper.amxd
```
- Renamed in this project:
```
README -> Readme_Lauchpad95
Launchpad95OSDHelper_ALmostWorking.amxd -> Launchpad95OSD_Dynamic.amxd
```

**Notes for packaging**
- A minimal overlay package should include only the files listed in ?Core script changes?, ?OSD additions?, and ?OSD screenshots?.
- Optional docs can be excluded if the package should be small.
- Refresh timing fix: `StepSequencerComponent2.py` now calls `_update_OSD()` inside `update()` to keep melodic sequencer Mode Info in sync. This is a safe, minimal drop-in change.
