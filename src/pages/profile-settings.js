import React from 'react';

// Components
import {
  ExampleWrapperSeamless,
  PageTitleWithoutButtons
} from '../layout-components';

import Blocks from '../components/settingBlocks';

export default function ProfileSettings() {
  return (
    <div className="p-md-4 p-3">
      <PageTitleWithoutButtons
        titleHeading="Profile Settings"
        titleDescription="Configure your profile information, account settings, income and expense categories and more."
      />

      <ExampleWrapperSeamless>
        <Blocks />
      </ExampleWrapperSeamless>
    </div>
  );
}
