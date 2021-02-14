import React from 'react';

import { Button, Tooltip } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import SettingsIcon from '@material-ui/icons/Settings';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const SidebarFooter = () => {
  return (
    <>
      <div className="app-sidebar--footer">
        <ul>
          <li>
            <Tooltip arrow placement="top" title="Import Transactions">
              <NavLink to="/import">
                <Button
                  variant="text"
                  className="btn-transition-none d-40 mx-2 p-0">
                  <ImportExportIcon />
                </Button>
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <Tooltip arrow placement="top" title="Profile Settings">
              <NavLink to="/profile-settings">
                <Button
                  variant="text"
                  className="btn-transition-none d-40 mx-2 p-0">
                  <SettingsIcon />
                </Button>
              </NavLink>
            </Tooltip>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarFooter;
