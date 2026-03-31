import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './select'

const bodyRegions = [
  { value: 'cervical', label: 'Cervical' },
  { value: 'thoracic', label: 'Thoracique' },
  { value: 'lumbar', label: 'Lombaire' },
  { value: 'shoulder', label: 'Epaule' },
  { value: 'elbow', label: 'Coude' },
  { value: 'wrist', label: 'Poignet' },
  { value: 'hip', label: 'Hanche' },
  { value: 'knee', label: 'Genou' },
  { value: 'ankle', label: 'Cheville' },
]

const phases = [
  { value: '0', label: 'Phase 0 - Inflammatoire aigue' },
  { value: '1', label: 'Phase 1 - Proliferation' },
  { value: '2', label: 'Phase 2 - Remodelage' },
]

const meta: Meta<typeof Select> = {
  title: 'Composants/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `
Menu deroulant avec placeholder, etats d'erreur et aide.

## Tailles
- **sm** : Compact (h-9)
- **md** : Standard (h-10) - defaut
- **lg** : Grand (h-12)
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helpText: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Region corporelle',
    placeholder: 'Selectionner une region...',
    options: bodyRegions,
  },
}

export const WithValue: Story = {
  args: {
    label: 'Region corporelle',
    options: bodyRegions,
    value: 'lumbar',
  },
}

export const WithError: Story = {
  args: {
    label: 'Phase de traitement',
    placeholder: 'Selectionner une phase...',
    options: phases,
    error: 'Veuillez selectionner une phase',
    required: true,
  },
}

export const WithHelpText: Story = {
  args: {
    label: 'Phase de traitement',
    placeholder: 'Selectionner une phase...',
    options: phases,
    helpText: 'La phase determine les exercices recommandes',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Region (verrouille)',
    options: bodyRegions,
    value: 'lumbar',
    disabled: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select label="Small (sm)" size="sm" placeholder="Selectionner..." options={bodyRegions} />
      <Select label="Medium (md)" size="md" placeholder="Selectionner..." options={bodyRegions} />
      <Select label="Large (lg)" size="lg" placeholder="Selectionner..." options={bodyRegions} />
    </div>
  ),
}
