import os
from .Log import log

from _Framework.ControlSurfaceComponent import ControlSurfaceComponent

class M4LInterface(ControlSurfaceComponent):

    def __init__(self):
        ControlSurfaceComponent.__init__(self)
        self._name = 'OSD'
        self._update_listener = None
        self._updateML_listener = None
        self._grid_leds_provider = None
        self._grid_leds = ['' for _ in range(80)]
        self._debug_grid_leds = False
        self._grid_log_counter = 0
        self._grid_log_every = 60
        self.hardware_model = 'mk1'
        self.mode = ' '
        self.mode_id = 'unknown'
        self.screenshots_dir = self._compute_screenshots_dir()
        self.clear()

    def disconnect(self):
        self._updateML_listener = None

    def set_mode(self, mode):
        self.clear()
        self.mode = mode

    def set_mode_id(self, mode_id):
        self.mode_id = mode_id

    def _compute_screenshots_dir(self):
        try:
            base = os.path.dirname(os.path.abspath(__file__))
            shots = os.path.normpath(os.path.join(base, 'Launchpad95 Mode Screenshots'))
            return shots
        except Exception:
            return ''

    def clear(self):
        self.info = [' ', ' ']
        self.attributes = [' ' for _ in range(8)]
        self.attribute_names = [' ' for _ in range(8)]

    @property
    def grid_leds(self):
        return self._grid_leds

    def set_grid_leds_provider(self, provider):
        self._grid_leds_provider = provider

    def set_debug_grid_leds(self, enabled, every=60):
        # "every" is measured in update() calls, not time.
        self._debug_grid_leds = bool(enabled)
        if every is not None and every > 0:
            self._grid_log_every = int(every)

    def _refresh_grid_leds(self):
        if self._grid_leds_provider is None:
            return
        try:
            self._grid_leds = list(self._grid_leds_provider())
        except Exception:
            return

    def set_update_listener(self, listener):
        self._update_listener = listener

    def remove_update_listener(self, listener):
        self._update_listener = None

    def update_has_listener(self):
        return self._update_listener is not None

    @property
    def updateML(self):
        return True

    def set_updateML_listener(self, listener):
        self._updateML_listener = listener

    def add_updateML_listener(self, listener):
        self._updateML_listener = listener
        return

    def remove_updateML_listener(self, listener):
        self._updateML_listener = None
        return

    def updateML_has_listener(self, listener):
        return self._updateML_listener is not None

    def update(self, args=None):
        self._refresh_grid_leds()
        if self._debug_grid_leds and (self._grid_log_counter % self._grid_log_every == 0):
            log("OSD grid_leds sample: " + str(self._grid_leds[:10]))
        self._grid_log_counter += 1
        if self.updateML_has_listener(None):
            # Notify Max for Live JS bridge (L95_ext.js) to refresh the OSD UI.
            self._updateML_listener()
