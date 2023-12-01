import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { App } from "app/App";
import { ReduxStoreProvider } from "../ReduxStoreProvider";

const meta: Meta<typeof App> = {
  title: "todo/app",
  component: App,
  tags: ["autodocs"],
  decorators: [ReduxStoreProvider],
};
export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {
  render: (args) => <App />,
};
