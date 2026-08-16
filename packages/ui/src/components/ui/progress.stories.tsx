import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "./progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => <Progress {...args} className="w-72" />,
};

export const Empty: Story = {
  args: {
    value: 0,
  },
  render: (args) => <Progress {...args} className="w-72" />,
};

export const Complete: Story = {
  args: {
    value: 100,
  },
  render: (args) => <Progress {...args} className="w-72" />,
};
