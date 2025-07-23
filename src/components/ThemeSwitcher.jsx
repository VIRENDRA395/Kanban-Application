import Switch from '@mui/joy/Switch';
import React from "react";
import { switchClasses } from '@mui/joy/Switch';
import LightThemeIcon from '../svg/LightThemeIcon';
import DarkThemeIcon from '../svg/DarkThemeIcon';

function ThemeSwitcher() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div id="theme-switcher">
      <LightThemeIcon />
      <Switch
        sx={{
            '--Switch-thumbSize': '14px',
            '--Switch-trackWidth': '40px',
            '--Switch-trackHeight': '20px',
            '--Switch-trackBackground': 'var(--main-purple)',
            '&:hover': {
              '--Switch-trackBackground': 'var(--main-purple-hover)',
            },
            [`&.${switchClasses.checked}`]: {
                '--Switch-trackBackground': 'var(--main-purple)',
                '&:hover': {
                  '--Switch-trackBackground': 'var(--main-purple-hover)',
                },
              },
          }}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
      <DarkThemeIcon />
    </div>
  );
}

export default ThemeSwitcher;
