autowatch = 1;
var L95_EXT_LOADED = 1;
error("L95_EXT_ACTIVE");

var l95_osd = null;
var updateML_handler = null;

var mode;
var info_0, info_1;
var att_0,att_1,att_2,att_3,att_4,att_5,att_6,att_7;
var att_n_0,att_n_1,att_n_2,att_n_3,att_n_4,att_n_5,att_n_6,att_n_7;

var header = null;
var mode_info_box = null;
var mode_guide_pic = null;
var mode_guide_label = null;
var mode_info_label = null;

var section_info_bp = null;
var section_guide_bp = null;
var section_modeinfo_bp = null;

var toggle_info = null;
var toggle_guide = null;
var toggle_modeinfo = null;

var ui_ready = 0;
var show_info_section = 1;
var show_guide_section = 1;
var show_modeinfo_section = 1;

var margin_ratio = 0.10;
var section_gap = 8;
var menu_height = 24;
var guide_label_height = 20;
var info_label_height = 20;
var info_box_height = 220;

var info_base = null;
var info_scale = 1;
var info_content_w = 0;
var info_content_h = 0;

var screenshots_dir = "";
var last_mode_id = "";
var last_layout_mode_id = "";
var layout_dirty = 1;
var last_guide_rect = null;

var MODE_MAP = {
    "session": {
        "screenshot": "Session Mode.png",
        "w": 560,
        "h": 560,
        "info": "Session Mode\n- 8x8 grid launches clips; right column launches scenes.\n- Arrow buttons move scene/track banks.\n- Session button opens overview/zoom.\n- Standard clip colors and launch behavior."
    },
    "pro_session": {
        "screenshot": "Pro Session Mode.png",
        "w": 742,
        "h": 627,
        "info": "Pro Session Mode\n- Adds advanced functions to Session mode.\n- Hold side buttons for secondary actions.\n- Last row shows context tools (quantize/tempo/fixed length).\n- See sub-modes for specific workflows."
    },
    "pro_session_arm": {
        "screenshot": "Pro Session Mode_Arm.png",
        "w": 738,
        "h": 618,
        "info": "Pro Session - Arm/Record\n- Hold Record (scene button 8).\n- Last row arms tracks.\n- Record + pad arms track and launches clip.\n- Double press toggles auto record mode."
    },
    "pro_session_solo": {
        "screenshot": "Pro Session Mode_Solo.png",
        "w": 738,
        "h": 618,
        "info": "Pro Session - Solo\n- Hold Solo (scene button 7).\n- Last row solos tracks.\n- Solo + pad solos track and launches clip.\n- Double press toggles auto solo mode."
    },
    "pro_session_mute": {
        "screenshot": "Pro Session Mode_Mute.png",
        "w": 738,
        "h": 618,
        "info": "Pro Session - Mute\n- Hold Delete (scene button 6).\n- Last row mutes tracks.\n- Delete + pad deletes clip.\n- Shift + Delete clears devices."
    },
    "pro_session_fixed_length": {
        "screenshot": "Pro Session Mode_Fixed Clip Length Recording.png",
        "w": 741,
        "h": 616,
        "info": "Pro Session - Fixed Clip Length\n- Hold Double (scene button 5).\n- Toggle fixed-length recording.\n- Last row selects fixed clip lengths.\n- Double click toggles fixed length on/off."
    },
    "pro_session_record_quant": {
        "screenshot": "Pro Session Mode_Record Quantization.png",
        "w": 741,
        "h": 616,
        "info": "Pro Session - Record Quantization\n- Hold Quantize (scene button 4).\n- Last row selects record quantization.\n- Quantize + pad quantizes the clip."
    },
    "pro_session_metronome": {
        "screenshot": "Pro Session Mode_Metronome.png",
        "w": 739,
        "h": 618,
        "info": "Pro Session - Metronome/Tempo\n- Hold Tempo (scene button 3).\n- Toggle metronome and adjust tempo.\n- Tap tempo on the last row.\n- Shift + Tempo + Matrix can launch scenes."
    },
    "pro_session_launch_quant": {
        "screenshot": "Pro Session Mode_Launch Quantization.png",
        "w": 741,
        "h": 616,
        "info": "Pro Session - Launch Quantization\n- Hold Shift (scene button 2).\n- Last row selects launch quantization.\n- Shift + pad selects clip and shows details.\n- Double click shift hides detail view."
    },
    "pro_session_tempo": {
        "screenshot": "Pro Session Mode_Tempo.png",
        "w": 739,
        "h": 618,
        "info": "Pro Session - Tempo\n- Hold Tempo (scene button 3).\n- Tap tempo or adjust with pads.\n- Metronome toggle on last row."
    },
    "device_controller": {
        "screenshot": "Device Controller Mode.png",
        "w": 562,
        "h": 591,
        "info": "Device Controller Mode\n- 8 sliders control device parameters.\n- Top row selects device/bank.\n- Left/right move between banks.\n- Encoders map to device parameters."
    },
    "instrument": {
        "screenshot": "Instrument Controller Mode.png",
        "w": 652,
        "h": 559,
        "info": "Instrument Controller Mode\n- Grid plays notes based on selected scale.\n- Octave and scale controls on the side buttons.\n- Note Repeat and velocity tools available."
    },
    "instrument_scale": {
        "screenshot": "Instrument Controller Mode_Scale Edition Mode.png",
        "w": 672,
        "h": 559,
        "info": "Instrument - Scale Edit\n- Select scale, root note, and octave.\n- Toggle to exit scale edit and return to instrument mode."
    },
    "quick_scale_root": {
        "screenshot": "Quick Scale Mode_Root Note.png",
        "w": 653,
        "h": 558,
        "info": "Quick Scale - Root Note\n- Quick access to root notes.\n- Press same key again to toggle major/minor.\n- Use circle-of-fifths shortcuts.\n- Toggle to switch to Mode selection."
    },
    "quick_scale_mode": {
        "screenshot": "Quick Scale Mode_Modus.png",
        "w": 662,
        "h": 557,
        "info": "Quick Scale - Mode\n- Select scale mode (major/minor/etc).\n- Use top two rows for quick mode changes.\n- Toggle to switch to Root or Note Repeat."
    },
    "quick_scale_repeat": {
        "screenshot": "Quick Scale Mode_Note Repeat.png",
        "w": 654,
        "h": 558,
        "info": "Quick Scale - Note Repeat\n- Enable/disable note repeat.\n- Set swing and repeat rate.\n- Useful for Drum Rack performance.\n- Toggle to return to Root/Mode."
    },
    "drum_stepseq_combined": {
        "screenshot": "Drum Step Sequencer Mode_Combined Mode.png",
        "w": 654,
        "h": 601,
        "info": "Drum Step Sequencer - Combined\n- 8x8 grid shows 2 bars and 8 lanes.\n- Toggle velocity, length, or mute lanes.\n- Use arrows to move pages.\n- Dedicated scale overlay from Scale button."
    },
    "drum_stepseq_multinote": {
        "screenshot": "Drum Step Sequencer Mode_Multinote Mode.png",
        "w": 653,
        "h": 602,
        "info": "Drum Step Sequencer - Multinote\n- 8x8 grid: one note per row.\n- Left/Right buttons change pages.\n- Scale overlay available from Scale button.\n- Lock/Quantize/Mute/Velocity tools remain."
    },
    "drum_stepseq_scale": {
        "screenshot": "Scale Mode.png",
        "w": 672,
        "h": 559,
        "info": "Drum Step Sequencer - Scale Overlay\n- Select scale, root note, and octave.\n- Release Scale to return to step sequencing.\n- Works with both Combined and Multinote."
    },
    "melodic_stepseq_scale": {
        "screenshot": "Scale Mode.png",
        "w": 672,
        "h": 559,
        "info": "Melodic Step Sequencer\n- Press User 2 until green.\n- 7x8 grid edits pitch/velocity/length/octave.\n- Last row selects the active page.\n- Double press last scene toggles mono/poly."
    },
    "melodic_stepseq": {
        "screenshot": "Melodic StepSequencer Mode.png",
        "w": 661,
        "h": 590,
        "info": "Melodic Step Sequencer\n- Press User 2 until green.\n- 7x8 grid edits pitch/velocity/length/octave.\n- Last row selects the active page.\n- Double press last scene toggles mono/poly."
    },
    "mixer": {
        "screenshot": "Mixer Mode.png",
        "w": 560,
        "h": 559,
        "info": "Mixer Mode\n- Side buttons select Volume/Pan/Send A/B.\n- Last rows handle Stop/Solo/Arm/Active.\n- Arrows move tracks/scenes.\n- Customize levels in Settings.py (VOLUME_LEVELS)."
    },
    "user1": {
        "screenshot": "User1 Mode.png",
        "w": 560,
        "h": 558,
        "info": "User 1 Mode\n- Plain MIDI user mode (if enabled).\n- Launchpad sends notes/CC without script mapping."
    },
    "user2": {
        "screenshot": "User2 Mode.png",
        "w": 561,
        "h": 559,
        "info": "User 2 Mode\n- Plain MIDI user mode (if enabled).\n- Launchpad sends notes/CC without script mapping."
    }
};

var anim_task = null;
var anim_start_w = 0;
var anim_start_h = 0;
var anim_target_w = 0;
var anim_target_h = 0;
var anim_step = 0;
var anim_steps = 4;

function sane_dim(v, fallback, minv, maxv) {
    if (v === undefined || v === null || isNaN(v) || !isFinite(v)) { return fallback; }
    if (v < minv) { return minv; }
    if (v > maxv) { return maxv; }
    return v;
}

function safe_item(arr, idx, fallback) {
    if (!arr || arr.length <= idx) { return fallback; }
    var v = arr[idx];
    return (v === undefined || v === null) ? fallback : v;
}

function apply_guide_pic_rect(rect){
    if (!rect) { return; }
    last_guide_rect = rect;
    if (mode_guide_pic) {
        set_box_rect(mode_guide_pic, rect);
        try { mode_guide_pic.message("autofit", 0); } catch (e1) { }
        try { mode_guide_pic.message("forceaspect", 0); } catch (e2) { }
    }
}

function sync_guide_rect(){
    if (!last_guide_rect) { return; }
    apply_guide_pic_rect(last_guide_rect);
}

function bytes_to_uint32(bytes, offset) {
    var i = offset || 0;
    var b0 = bytes[i] & 0xff;
    var b1 = bytes[i + 1] & 0xff;
    var b2 = bytes[i + 2] & 0xff;
    var b3 = bytes[i + 3] & 0xff;
    return ((b0 << 24) >>> 0) + (b1 << 16) + (b2 << 8) + b3;
}

function bytes_to_string(bytes) {
    var s = "";
    for (var i = 0; i < bytes.length; i++) {
        s += String.fromCharCode(bytes[i]);
    }
    return s;
}

function read_png_size(path) {
    var f = null;
    try {
        f = new File(path, "read");
        if (!f) { return null; }
        var sig = f.readbytes(8);
        if (!sig || sig.length < 8) { f.close(); return null; }
        var pngSig = [137, 80, 78, 71, 13, 10, 26, 10];
        for (var i = 0; i < 8; i++) {
            if (sig[i] != pngSig[i]) { f.close(); return null; }
        }
        var lenBytes = f.readbytes(4);
        var typeBytes = f.readbytes(4);
        if (!lenBytes || lenBytes.length < 4 || !typeBytes || typeBytes.length < 4) {
            f.close();
            return null;
        }
        var type = bytes_to_string(typeBytes);
        if (type !== "IHDR") {
            f.close();
            return null;
        }
        var data = f.readbytes(8);
        if (!data || data.length < 8) { f.close(); return null; }
        var w = bytes_to_uint32(data, 0);
        var h = bytes_to_uint32(data, 4);
        f.close();
        return { w: w, h: h };
    } catch (e) {
        try { if (f) { f.close(); } } catch (e2) { }
        return null;
    }
}

function ensure_screenshot_size(data) {
    // Read PNG dimensions once per file to keep guide layout in sync with assets.
    if (!data || !data.screenshot) { return false; }
    if (!screenshots_dir || screenshots_dir === "") { compute_screenshots_dir(); }
    var path = screenshots_dir + data.screenshot;
    if (!path || path === "") { return false; }
    if (data._size_loaded && data._size_path === path) { return false; }
    var size = read_png_size(path);
    if (!size || !size.w || !size.h) { return false; }
    data._size_loaded = 1;
    data._size_path = path;
    if (data.w !== size.w || data.h !== size.h) {
        data.w = size.w;
        data.h = size.h;
        return true;
    }
    return false;
}

function bang() {
    locate_l95();
    locate_osd();
    init_ui();
    ui_ready = 1;
    update();
}

function bang2() {
    bang();
}

function update(args){
    if (!l95_osd) {
        locate_l95();
    }
    if (!mode || !mode_guide_pic || !mode_info_box) {
        locate_osd();
    }
    if (!ui_ready && (mode || mode_guide_pic || mode_info_box)) {
        init_ui();
        ui_ready = 1;
    }
    if (!l95_osd) {
        return;
    }

    var shots = l95_osd.get("screenshots_dir");
    if (shots && shots.length) { shots = shots[0]; }
    if (shots && shots.length) { set_screenshots_dir(shots); }

    var info = l95_osd.get("info") || [];
    var attributes = l95_osd.get("attributes") || [];
    var attribute_names = l95_osd.get("attribute_names") || [];
    var mode_val = l95_osd.get("mode");
    var mode_id_val = l95_osd.get("mode_id");

    if (mode_val && mode_val.length) { mode_val = mode_val[0]; }
    if (mode_id_val && mode_id_val.length) { mode_id_val = mode_id_val[0]; }

    if (mode) { mode.message("set", mode_val); }
    if (info_0) { info_0.message("set", safe_item(info, 0, " ")); }
    if (info_1) { info_1.message("set", safe_item(info, 1, " ")); }

    if (att_0) { att_0.message("set", safe_item(attributes, 0, " ")); }
    if (att_1) { att_1.message("set", safe_item(attributes, 1, " ")); }
    if (att_2) { att_2.message("set", safe_item(attributes, 2, " ")); }
    if (att_3) { att_3.message("set", safe_item(attributes, 3, " ")); }
    if (att_4) { att_4.message("set", safe_item(attributes, 4, " ")); }
    if (att_5) { att_5.message("set", safe_item(attributes, 5, " ")); }
    if (att_6) { att_6.message("set", safe_item(attributes, 6, " ")); }
    if (att_7) { att_7.message("set", safe_item(attributes, 7, " ")); }

    if (att_n_0) { att_n_0.message("set", safe_item(attribute_names, 0, " ")); }
    if (att_n_1) { att_n_1.message("set", safe_item(attribute_names, 1, " ")); }
    if (att_n_2) { att_n_2.message("set", safe_item(attribute_names, 2, " ")); }
    if (att_n_3) { att_n_3.message("set", safe_item(attribute_names, 3, " ")); }
    if (att_n_4) { att_n_4.message("set", safe_item(attribute_names, 4, " ")); }
    if (att_n_5) { att_n_5.message("set", safe_item(attribute_names, 5, " ")); }
    if (att_n_6) { att_n_6.message("set", safe_item(attribute_names, 6, " ")); }
    if (att_n_7) { att_n_7.message("set", safe_item(attribute_names, 7, " ")); }

    mode_id_val = resolve_mode_id(mode_id_val, mode_val);
    update_mode_assets(mode_id_val);

    sync_guide_rect();
}

function init_ui(){
    compute_screenshots_dir();
    show_info_section = 1;
    show_guide_section = 1;
    show_modeinfo_section = 1;
    layout_dirty = 1;

    if (toggle_info) { toggle_info.message("set", 1); }
    if (toggle_guide) { toggle_guide.message("set", 1); }
    if (toggle_modeinfo) { toggle_modeinfo.message("set", 1); }

    apply_section_visibility();
    update_mode_assets("session");
}

function resolve_mode_id(mode_id_val, mode_val){
    var id = mode_id_val;
    if (!id || id === "" || !MODE_MAP[id]) {
        var m = (mode_val || "").toLowerCase();
        if (m.indexOf("drum step sequencer") >= 0) {
            if (m.indexOf("scale") >= 0) { id = "drum_stepseq_scale"; }
            else if (m.indexOf("multi") >= 0) { id = "drum_stepseq_multinote"; }
            else { id = "drum_stepseq_combined"; }
        } else if (m.indexOf("melodic step sequencer") >= 0) {
            if (m.indexOf("scale") >= 0) { id = "melodic_stepseq_scale"; }
            else { id = "melodic_stepseq"; }
        }
    }
    return id;
}

function set_mode_info(text){
    var t = text || "";
    if (mode_info_box) {
        mode_info_box.message("set", t);
    } else if (info_0 || info_1) {
        var lines = t.replace(/\r/g, "").split("\n");
    if (info_0) { info_0.message("set", lines[0] || ""); }
        if (info_1) { info_1.message("set", lines.slice(1).join(" ")); }
    }
}

function set_box_rect(box, rect){
    if (!box) { return; }
    try { box.presentation_rect = rect; } catch (e1) { }
    try { box.patching_rect = rect; } catch (e2) { }
}

function osd_patcher(){
    try {
        var x = this.patcher.getnamed("osd");
        if (x && x.subpatcher) { return x.subpatcher(); }
    } catch (e) { }
    return null;
}

function send_osd_rect(name, x, y, w, h){
    var p = osd_patcher();
    if (!p || !name) { return; }
    try { p.message("script", "sendbox", name, "presentation_rect", x, y, w, h); } catch (e1) { }
    try { p.message("script", "sendbox", name, "patching_rect", x, y, w, h); } catch (e2) { }
}

function send_child_rect(bp, name, x, y, w, h){
    if (!bp || !name || !bp.subpatcher) { return; }
    try { bp.subpatcher().message("script", "sendbox", name, "presentation_rect", x, y, w, h); } catch (e1) { }
    try { bp.subpatcher().message("script", "sendbox", name, "patching_rect", x, y, w, h); } catch (e2) { }
}

function capture_info_base(){
    if (info_base) { return; }
    info_base = {};
    info_content_w = 0;
    info_content_h = 0;
    var items = [
        mode, info_0, info_1,
        att_0, att_1, att_2, att_3, att_4, att_5, att_6, att_7,
        att_n_0, att_n_1, att_n_2, att_n_3, att_n_4, att_n_5, att_n_6, att_n_7
    ];
    for (var i = 0; i < items.length; i++) {
        var b = items[i];
        if (!b) { continue; }
        var r = b.presentation_rect || b.patching_rect;
        if (!r) { continue; }
        info_base[i] = [r[0], r[1], r[2], r[3]];
        info_content_w = Math.max(info_content_w, r[0] + r[2]);
        info_content_h = Math.max(info_content_h, r[1] + r[3]);
    }
}

function apply_info_margin(mx, my){
    if (!info_base) { capture_info_base(); }
    if (!info_base) { return; }
    var items = [
        mode, info_0, info_1,
        att_0, att_1, att_2, att_3, att_4, att_5, att_6, att_7,
        att_n_0, att_n_1, att_n_2, att_n_3, att_n_4, att_n_5, att_n_6, att_n_7
    ];
    for (var i = 0; i < items.length; i++) {
        var b = items[i];
        var r = info_base[i];
        if (!b || !r) { continue; }
        set_box_rect(b, [Math.round(r[0] * info_scale) + mx, r[1] + my, Math.round(r[2] * info_scale), r[3]]);
    }
    if (header) {
        set_box_rect(header, [mx, my - 2, Math.round(info_content_w * info_scale), 22]);
    }
}

function info_line_count(text){
    if (!text) { return 1; }
    var t = (""+text).replace(/\r/g, "");
    if (!t.length) { return 1; }
    return t.split("\n").length;
}

function set_bp_rect(bp, x, y, w, h){
    if (bp) {
        try { bp.presentation_rect = [x, y, w, h]; } catch (e1) { }
        try { bp.patching_rect = [x, y, w, h]; } catch (e2) { }
    }
}

function set_hidden(box, hidden){
    if (box) {
        try { box.hidden = hidden ? 1 : 0; } catch(e) { }
        try { box.message("hidden", hidden ? 1 : 0); } catch(e2) { }
    }
}

function apply_section_visibility(){
    var hide_info = show_info_section ? 0 : 1;
    var hide_guide = show_guide_section ? 0 : 1;
    var hide_modeinfo = show_modeinfo_section ? 0 : 1;

    set_hidden(section_info_bp, hide_info);
    set_hidden(section_guide_bp, hide_guide);
    set_hidden(section_modeinfo_bp, hide_modeinfo);
}

// L95 DEBUG OVERRIDES START
var log_enabled = 0;
var log_path = "";
var last_screenshot_path = "";
var boot_task = null;
var boot_attempts = 0;
var boot_max = 12;
var l95_located = 0;
var ui_located = 0;
var max_screen_w = 0;
var window_pad = 8;
var sync_done = 1;
var section_pad = 10;
var _modeinfo_guard_until = 0;
var _modeinfo_last_toggle = 1;
var _modeinfo_last_value = 1;

function _bool_from(v){
    if (v === undefined || v === null) { return 0; }
    if (typeof v == "object" && v.length !== undefined) { v = v[0]; }
    if (typeof v == "string") {
        var s = v.replace(/\s+/g, "");
        if (s === "" || s === "0" || s === "0.0" || s === "false") { return 0; }
        return 1;
    }
    return (v != 0);
}

function sync_toggle_state(){
    try {
        if (toggle_info && toggle_info.getvalueof) {
            show_info_section = _bool_from(toggle_info.getvalueof());
        }
        if (toggle_guide && toggle_guide.getvalueof) {
            show_guide_section = _bool_from(toggle_guide.getvalueof());
        }
        if (toggle_modeinfo && toggle_modeinfo.getvalueof) {
            show_modeinfo_section = _bool_from(toggle_modeinfo.getvalueof());
        }
    } catch (e) { }
}

function get_base_dir(){
    var p = this.patcher.filepath;
    if ((!p || p.length === 0) && this.patcher.parentpatcher) {
        p = this.patcher.parentpatcher.filepath;
    }
    if ((!p || p.length === 0)) {
        var osd = this.patcher.getnamed("osd");
        if (osd && osd.subpatcher) {
            p = osd.subpatcher().filepath;
        }
    }
    if (!p || p.length === 0) { return ""; }
    p = p.replace(/\\/g, "/");
    var idx = p.lastIndexOf("/");
    if (idx >= 0) { return p.substring(0, idx); }
    return "";
}

function derive_repo_base(){
    if (!screenshots_dir || screenshots_dir.length === 0) { return ""; }
    var p = screenshots_dir.replace(/\\/g, "/");
    if (p.charAt(p.length - 1) == "/") { p = p.substring(0, p.length - 1); }
    var marker = "/Launchpad95 Mode Screenshots";
    var idx = p.lastIndexOf(marker);
    if (idx >= 0) { return p.substring(0, idx); }
    idx = p.lastIndexOf("/");
    if (idx >= 0) { return p.substring(0, idx); }
    return "";
}

function ensure_log_path(){
    if (log_path && log_path.length) { return log_path; }
    var base = get_base_dir();
    if (base && base.length) {
        log_path = base + "/L95_log.txt";
        return log_path;
    }
    var repo = derive_repo_base();
    if (repo && repo.length) {
        log_path = repo + "/M4LDevice/L95_log.txt";
        return log_path;
    }
    return "";
}

function log(msg){
    if (!log_enabled) { return; }
    try {
        var path = ensure_log_path();
        if (!path || path.length === 0) { return; }
        var f = new File(path, "append");
        if (!f || !f.isopen) { return; }
        f.writeline(new Date() + " " + msg);
        f.close();
    } catch (e) {
        // ignore
    }
}

function start_boot(){
    if (boot_task) { boot_task.cancel(); }
    boot_attempts = 0;
    boot_task = new Task(function(){
        boot_attempts++;
        update();
        if (l95_osd && mode_guide_pic && mode_info_box) {
            log("boot complete");
            boot_task.cancel();
            return;
        }
        if (boot_attempts >= boot_max) {
            log("boot timeout");
            boot_task.cancel();
        }
    }, this);
    boot_task.interval = 200;
    boot_task.repeat(boot_max);
}

function loadbang(){
    log("loadbang");
    bang();
    start_boot();
}

function compute_max_screen_w(){
    if (max_screen_w > 0) { return max_screen_w; }
    var w = 0;
    for (var k in MODE_MAP) {
        if (!MODE_MAP.hasOwnProperty(k)) { continue; }
        var d = MODE_MAP[k];
        if (d && d.w && d.w > w) { w = d.w; }
    }
    max_screen_w = sane_dim(w, 720, 320, 2000);
    return max_screen_w;
}

function compute_screenshots_dir(){
    var p = this.patcher.filepath;
    if ((!p || p.length === 0) && this.patcher.parentpatcher) {
        p = this.patcher.parentpatcher.filepath;
    }
    if ((!p || p.length === 0)) {
        var osd = this.patcher.getnamed("osd");
        if (osd && osd.subpatcher) {
            p = osd.subpatcher().filepath;
        }
    }
    if (!p || p.length === 0) {
        return;
    }
    p = p.replace(/\\/g, "/");
    var idx = p.lastIndexOf("/");
    if (idx >= 0) {
        var base = p.substring(0, idx);
        var new_path = base + "/../Launchpad95 Mode Screenshots/";
        if (new_path != screenshots_dir) {
            screenshots_dir = new_path;
            log("screenshots_dir " + screenshots_dir);
        }
    }
}

function set_screenshots_dir(path){
    if (!path || path.length === 0) { return; }
    path = path.replace(/\\/g, "/");
    if (path.charAt(path.length - 1) != "/") { path += "/"; }
    if (path != screenshots_dir) {
        screenshots_dir = path;
        log("screenshots_dir " + screenshots_dir);
    }
}

function update_mode_assets(mode_id_val){
    if (!mode_id_val || mode_id_val === "") { mode_id_val = "session"; }
    var mode_changed = (mode_id_val != last_mode_id);
    if (mode_changed) {
        last_mode_id = mode_id_val;
        log("mode_id " + mode_id_val);
    }
    var data = MODE_MAP[mode_id_val];
    if (!data) { data = MODE_MAP["session"]; }
    if (data) {
        if (ensure_screenshot_size(data)) {
            layout_dirty = 1;
        }
        if (mode_changed || layout_dirty || last_layout_mode_id !== mode_id_val) {
            apply_layout(data);
            layout_dirty = 0;
            last_layout_mode_id = mode_id_val;
        }
        if (mode_changed) {
            set_mode_info(data.info);
            load_screenshot(data.screenshot);
        }
    }
}

function load_screenshot(filename){
    if (!filename || filename === "") { return; }
    if (!screenshots_dir || screenshots_dir === "") { compute_screenshots_dir(); }
    var path = screenshots_dir + filename;
    if (path == last_screenshot_path) { return; }
    last_screenshot_path = path;
    log("load_screenshot " + path);
    if (mode_guide_pic) { mode_guide_pic.message("read", path); }
    sync_guide_rect();
}

function locate_l95(){
    var api = new LiveAPI();
    var l95_id = -1;
    for (var i = 0; i < 16; i++) {
        api.goto("control_surfaces " + i);
        if (!api.type) { continue; }
        var t = api.type.toLowerCase();
        if (t.indexOf("launchpad") == -1) { continue; }
        var cmp_count = api.getcount("components");
        for (var j = 0; j < cmp_count; j++) {
            api.goto("control_surfaces " + i + " components " + j);
            if (api.type == "M4LInterface") {
                l95_id = i;
                l95_osd = new LiveAPI("control_surfaces " + l95_id + " components " + j);
                updateML_handler = new LiveAPI(update, "control_surfaces " + l95_id + " components " + j);
                updateML_handler.property = "updateML";
                break;
            }
        }
        if (l95_id != -1) { break; }
    }
    if (l95_id != -1) {
        if (l95_located != 1) { log("found M4LInterface on control_surfaces " + l95_id); }
        l95_located = 1;
    } else if (l95_located == 0) {
        log("M4LInterface not found");
        l95_located = -1;
    }
}

function locate_osd(){
    var display = this.patcher;
    var x = this.patcher.getnamed("osd");
    if (!x) { return; }
    display = x.subpatcher();

    section_info_bp = display.getnamed("section_info_bp");
    section_guide_bp = display.getnamed("section_guide_bp");
    section_modeinfo_bp = display.getnamed("section_modeinfo_bp");

    if (section_info_bp && section_info_bp.subpatcher) {
        var info_p = section_info_bp.subpatcher();
        header = info_p.getnamed("header");
        mode = info_p.getnamed("mode");
        info_0 = info_p.getnamed("info_0");
        info_1 = info_p.getnamed("info_1");
        att_0 = info_p.getnamed("att_0");
        att_1 = info_p.getnamed("att_1");
        att_2 = info_p.getnamed("att_2");
        att_3 = info_p.getnamed("att_3");
        att_4 = info_p.getnamed("att_4");
        att_5 = info_p.getnamed("att_5");
        att_6 = info_p.getnamed("att_6");
        att_7 = info_p.getnamed("att_7");
        att_n_0 = info_p.getnamed("att_n_0");
        att_n_1 = info_p.getnamed("att_n_1");
        att_n_2 = info_p.getnamed("att_n_2");
        att_n_3 = info_p.getnamed("att_n_3");
        att_n_4 = info_p.getnamed("att_n_4");
        att_n_5 = info_p.getnamed("att_n_5");
        att_n_6 = info_p.getnamed("att_n_6");
        att_n_7 = info_p.getnamed("att_n_7");
    }

    if (section_guide_bp && section_guide_bp.subpatcher) {
        var guide_p = section_guide_bp.subpatcher();
        mode_guide_label = guide_p.getnamed("mode_guide_label");
        mode_guide_pic = guide_p.getnamed("mode_guide_pic");
    }

    if (section_modeinfo_bp && section_modeinfo_bp.subpatcher) {
        var mi_p = section_modeinfo_bp.subpatcher();
        mode_info_label = mi_p.getnamed("mode_info_label");
        mode_info_box = mi_p.getnamed("mode_info");
    }

    toggle_info = display.getnamed("toggle_info");
    toggle_guide = display.getnamed("toggle_guide");
    toggle_modeinfo = display.getnamed("toggle_modeinfo");

    if (section_info_bp && section_guide_bp && section_modeinfo_bp && !ui_located) {
        log("ui located");
        ui_located = 1;
    }

    if (!mode && !info_0 && !info_1) {
        // Fallback to original patcher objects if custom bpatchers are missing.
        display = this.patcher;
        header = display.getnamed("header");
        mode = display.getnamed("mode");
        info_0 = display.getnamed("info_0");
        info_1 = display.getnamed("info_1");
        att_0 = display.getnamed("att_0");
        att_1 = display.getnamed("att_1");
        att_2 = display.getnamed("att_2");
        att_3 = display.getnamed("att_3");
        att_4 = display.getnamed("att_4");
        att_5 = display.getnamed("att_5");
        att_6 = display.getnamed("att_6");
        att_7 = display.getnamed("att_7");
        att_n_0 = display.getnamed("att_n_0");
        att_n_1 = display.getnamed("att_n_1");
        att_n_2 = display.getnamed("att_n_2");
        att_n_3 = display.getnamed("att_n_3");
        att_n_4 = display.getnamed("att_n_4");
        att_n_5 = display.getnamed("att_n_5");
        att_n_6 = display.getnamed("att_n_6");
        att_n_7 = display.getnamed("att_n_7");
        if (!mode_guide_pic) { mode_guide_pic = display.getnamed("mode_guide_pic"); }
        if (!mode_guide_label) { mode_guide_label = display.getnamed("mode_guide_label"); }
        if (!mode_info_box) { mode_info_box = display.getnamed("mode_info"); }
        if (!mode_info_label) { mode_info_label = display.getnamed("mode_info_label"); }
    }

    // Refresh cached layout measurements once we (re)locate UI objects.
    info_base = null;
    info_content_w = 0;
    info_content_h = 0;
    layout_dirty = 1;
}


function get_window_size(p){
    try {
        var cur = p.wind.size;
        if (!cur) { return [0, 0]; }
        if (cur.length >= 4) {
            return [Math.abs(cur[2] - cur[0]), Math.abs(cur[3] - cur[1])];
        }
        return [cur[0], cur[1]];
    } catch (e) {
        return [0, 0];
    }
}

function set_window_size(p, w, h){
    try {
        var cur = p.wind.size;
        if (cur && cur.length >= 4) {
            var left = cur[0];
            var top = cur[1];
            p.wind.size = [left, top, left + w, top + h];
        } else {
            p.wind.size = [w, h];
        }
    } catch (e) {
        // ignore
    }
}

function resize_window(h, w){
    if (!isFinite(w) || !isFinite(h)) { return; }
    try {
        var osd = this.patcher.getnamed("osd");
        if (osd && osd.subpatcher) {
            var p = osd.subpatcher();
            if (p && p.wind && p.wind.size) {
                animate_window(p, w, h);
            }
        }
    } catch (e) {
        // ignore
    }
}

function animate_window(p, w, h){
    try {
        var cur = get_window_size(p);
        if (!cur || cur.length < 2) {
            set_window_size(p, w, h);
            return;
        }
        anim_start_w = sane_dim(cur[0], w, 200, 3000);
        anim_start_h = sane_dim(cur[1], h, 200, 3000);
        anim_target_w = w;
        anim_target_h = h;
        anim_step = 0;
        if (anim_task) { anim_task.cancel(); }
        anim_task = new Task(function() {
            anim_step++;
            var t = anim_step / anim_steps;
            if (t > 1) { t = 1; }
            var nw = Math.round(anim_start_w + (anim_target_w - anim_start_w) * t);
            var nh = Math.round(anim_start_h + (anim_target_h - anim_start_h) * t);
            set_window_size(p, nw, nh);
            if (t >= 1) { anim_task.cancel(); }
        }, this);
        anim_task.interval = 20;
        anim_task.repeat(anim_steps);
    } catch (e) {
        try { set_window_size(p, w, h); } catch (e2) { }
    }
}

function apply_layout(data){
    if (!data) { return; }
    if (!section_info_bp && !section_guide_bp && !section_modeinfo_bp) { return; }

    // Layout is driven by explicit show_* messages to avoid stale toggle reads.
    capture_info_base();

    var guide_img_w = (data.w && data.w > 0) ? data.w : 720;
    var guide_img_h = (data.h && data.h > 0) ? data.h : Math.max(120, Math.round(guide_img_w * 0.75));
    var guide_pad_bottom = 16;

    var base_w = sane_dim(info_content_w, 420, 200, 3000);
    var base_h = sane_dim(info_content_h, 60, 40, 400);

    var section_w = Math.max(guide_img_w, base_w + 120) + (section_pad * 2);

    var info_pad = Math.max(6, section_pad - 2);
    info_scale = 1;

    var info_w = Math.max(section_w, Math.round(base_w * info_scale) + (info_pad * 2));
    var info_h = base_h + (info_pad * 2) + 2;

    var guide_h = section_pad + guide_label_height + section_pad + guide_img_h + section_pad + guide_pad_bottom;

    var info_lines = info_line_count(data.info);
    var line_h = 12;
    var info_box_h = Math.max(28, (info_lines * line_h) + 4);

    var mi_pad = Math.max(6, section_pad - 2);
    var mi_pad_top = 0;
    var mi_content_w = Math.max(120, section_w - (mi_pad * 2));
    var mi_h = mi_pad_top + info_label_height + mi_pad + info_box_h + mi_pad;
    var mi_w = section_w;

    var content_h = 0;
    var visible = 0;
    var sections = [];

    if (show_info_section && section_info_bp) { sections.push(["info", info_h]); }
    if (show_guide_section && section_guide_bp) { sections.push(["guide", guide_h]); }
    if (show_modeinfo_section && section_modeinfo_bp) { sections.push(["modeinfo", mi_h]); }

    visible = sections.length;
    for (var si = 0; si < sections.length; si++) {
        content_h += sections[si][1];
    }
    if (visible > 1) { content_h += section_gap * (visible - 1); }

    var x = window_pad;
    var y = menu_height + window_pad;

    for (var s = 0; s < sections.length; s++) {
        var type = sections[s][0];
        var h = sections[s][1];
        if (type == "info") {
            apply_info_margin(info_pad, info_pad);
            set_bp_rect(section_info_bp, x, y, info_w, info_h);
            send_osd_rect("section_info_bp", x, y, info_w, info_h);
        } else if (type == "guide") {
            set_bp_rect(section_guide_bp, x, y, section_w, guide_h);
            send_osd_rect("section_guide_bp", x, y, section_w, guide_h);
            if (mode_guide_label) {
                set_box_rect(mode_guide_label, [section_pad, section_pad, 220, guide_label_height]);
            }
            if (mode_guide_pic) {
                apply_guide_pic_rect([section_pad, section_pad + guide_label_height + section_pad, guide_img_w, guide_img_h]);
            }
            send_child_rect(section_guide_bp, "mode_guide_label", section_pad, section_pad, 220, guide_label_height);
            send_child_rect(section_guide_bp, "mode_guide_pic", section_pad, section_pad + guide_label_height + section_pad, guide_img_w, guide_img_h);
        } else if (type == "modeinfo") {
            set_bp_rect(section_modeinfo_bp, x, y, mi_w, mi_h);
            send_osd_rect("section_modeinfo_bp", x, y, mi_w, mi_h);
            if (mode_info_label) {
                set_box_rect(mode_info_label, [mi_pad, mi_pad_top, 220, info_label_height]);
            }
            if (mode_info_box) {
                set_box_rect(mode_info_box, [mi_pad, mi_pad_top + info_label_height + mi_pad, mi_content_w, info_box_h]);
            }
            send_child_rect(section_modeinfo_bp, "mode_info_label", mi_pad, mi_pad_top, 220, info_label_height);
            send_child_rect(section_modeinfo_bp, "mode_info", mi_pad, mi_pad_top + info_label_height + mi_pad, mi_content_w, info_box_h);
        }
        y += h;
        if (s < sections.length - 1) { y += section_gap; }
    }

    var win_w = section_w + (window_pad * 2);
    var win_h = (sections.length > 0) ? (y + window_pad) : (menu_height + (window_pad * 2));

    win_w = sane_dim(win_w, section_w + 24, 320, 2600);
    win_h = sane_dim(win_h, menu_height + 60, menu_height + 60, 2600);

    resize_window(win_h, win_w);
}

function show_info(v){
    show_info_section = _bool_from(v);
    apply_section_visibility();
    var data = MODE_MAP[last_mode_id] || MODE_MAP["session"];
    layout_dirty = 1;
    apply_layout(data);
    set_mode_info(data.info);
}

function show_guide(v){
    show_guide_section = _bool_from(v);
    apply_section_visibility();
    var data = MODE_MAP[last_mode_id] || MODE_MAP["session"];
    layout_dirty = 1;
    apply_layout(data);
    set_mode_info(data.info);
    load_screenshot(data.screenshot);
}

function show_modeinfo(v){
    show_modeinfo_section = _bool_from(v);
    apply_section_visibility();
    var data = MODE_MAP[last_mode_id] || MODE_MAP["session"];
    layout_dirty = 1;
    apply_layout(data);
    set_mode_info(data.info);
}
// L95 DEBUG OVERRIDES END
