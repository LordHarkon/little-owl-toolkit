import { useEffect, useState } from "react";
import { Switch } from "~/components/Switch";
import { settings } from "~/store";

type SettingsType = {
  isDarkTheme: boolean;
  alwaysOnTop: boolean;
  startMinimized: boolean;
  startOnBoot: boolean;
  closeToTray: boolean;
  minimizeToTray: boolean;
};

const Settings = () => {
  const [loadedSettings, setLoadedSettings] = useState<SettingsType>();

  useEffect(() => {
    const loadSettings = async () => {
      const isDarkTheme = (await settings.get<boolean>("isDarkTheme")) ?? true;
      const alwaysOnTop = (await settings.get<boolean>("alwaysOnTop")) ?? true;
      const startMinimized = (await settings.get<boolean>("startMinimized")) ?? false;
      const startOnBoot = (await settings.get<boolean>("startOnBoot")) ?? false;
      const closeToTray = (await settings.get<boolean>("closeToTray")) ?? false;
      const minimizeToTray = (await settings.get<boolean>("minimizeToTray")) ?? false;

      setLoadedSettings({
        isDarkTheme,
        alwaysOnTop,
        startMinimized,
        startOnBoot,
        closeToTray,
        minimizeToTray,
      });
    };

    loadSettings();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <Switch size="small">Always On Top</Switch>
      <Switch size="small">Start Minimzed</Switch>
      <Switch size="small">Start on Boot</Switch>
      <Switch size="small">Close to Tray</Switch>
      <Switch size="small">Minimize to Tray</Switch>
      {/* TODO: Add ChatGPT API key input, and add ChatGPT chat. Or maybe make it a premium feature, idk. */}
    </div>
  );
};

export default Settings;
