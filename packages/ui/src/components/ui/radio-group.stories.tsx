import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "comfortable",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="rg-default" />
        <Label htmlFor="rg-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="rg-comfortable" />
        <Label htmlFor="rg-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="rg-compact" />
        <Label htmlFor="rg-compact">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: "option-1",
    disabled: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="rg-disabled-1" />
        <Label htmlFor="rg-disabled-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="rg-disabled-2" />
        <Label htmlFor="rg-disabled-2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
};
