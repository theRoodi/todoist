import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppWithRedux } from "../app/AppWithRedux";
import { ReduxStoreProvider } from "../ReduxStoreProvider";

const meta: Meta<typeof AppWithRedux> = {
  title: "todo/app",
  component: AppWithRedux,
  tags: ["autodocs"],
  decorators: [ReduxStoreProvider],
};
export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
  render: (args) => <AppWithRedux />,
};
