import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Chip, ChipGroup } from './chip'

const meta: Meta<typeof Chip> = {
  title: 'Composants/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component: `
Tag selectionnable pour les filtres et selections multiples.

Inclut aussi \`ChipGroup\` pour gerer la selection de plusieurs chips.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Lombaire',
    selected: false,
  },
}

export const Selected: Story = {
  args: {
    children: 'Lombaire',
    selected: true,
  },
}

export const WithRemove: Story = {
  args: {
    children: 'Cervical',
    selected: true,
    onRemove: fn(),
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Chip selected size="sm" onSelect={() => {}}>Small</Chip>
      <Chip selected size="md" onSelect={() => {}}>Medium</Chip>
      <Chip selected size="lg" onSelect={() => {}}>Large</Chip>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip selected variant="primary" onSelect={() => {}}>Primary</Chip>
      <Chip selected variant="accent" onSelect={() => {}}>Accent</Chip>
      <Chip selected variant="success" onSelect={() => {}}>Success</Chip>
      <Chip selected variant="warning" onSelect={() => {}}>Warning</Chip>
      <Chip selected variant="error" onSelect={() => {}}>Error</Chip>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Desactive',
    disabled: true,
  },
}

export const BodyRegionsGroup: Story = {
  render: () => (
    <ChipGroup
      options={[
        { value: 'cervical', label: 'Cervical' },
        { value: 'thoracic', label: 'Thoracique' },
        { value: 'lumbar', label: 'Lombaire' },
        { value: 'shoulder', label: 'Epaule' },
        { value: 'hip', label: 'Hanche' },
        { value: 'knee', label: 'Genou' },
      ]}
      value={['lumbar', 'knee']}
      onChange={() => {}}
      multiple
    />
  ),
}

export const SingleSelect: Story = {
  render: () => (
    <ChipGroup
      options={[
        { value: '0', label: 'Phase 0' },
        { value: '1', label: 'Phase 1' },
        { value: '2', label: 'Phase 2' },
      ]}
      value={['1']}
      onChange={() => {}}
      multiple={false}
      variant="accent"
    />
  ),
}
