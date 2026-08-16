import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
  render: (args) => <Textarea {...args} className="w-72" />,
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
  render: (args) => <Textarea {...args} className="w-72" />,
};

export const WithLabel: Story = {
  args: {
    placeholder: "Type your message here.",
  },
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="textarea-message">Your message</Label>
      <Textarea {...args} id="textarea-message" />
    </div>
  ),
};
