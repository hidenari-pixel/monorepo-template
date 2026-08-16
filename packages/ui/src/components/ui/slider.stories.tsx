import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider } from "./slider";

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => <Slider {...args} className="w-72" />,
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
  render: (args) => <Slider {...args} className="w-72" />,
};

export const Disabled: Story = {
  args: {
    defaultValue: [30],
    max: 100,
    disabled: true,
  },
  render: (args) => <Slider {...args} className="w-72" />,
};
