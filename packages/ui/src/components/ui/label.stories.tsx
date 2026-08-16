import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Your email address",
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} htmlFor="label-email">
        Email
      </Label>
      <Input id="label-email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-terms" />
      <Label {...args} htmlFor="label-terms">
        Accept terms and conditions
      </Label>
    </div>
  ),
};
