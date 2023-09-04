import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {AppWithRedux} from '../AppWithRedux/AppWithRedux';
import {ReduxStoreProvider} from '../ReduxStoreProvider';

const meta: Meta<typeof AppWithRedux> = {
    title: 'todo/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProvider]
};
export default meta
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
    render: (args) => <AppWithRedux/>
}