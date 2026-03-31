import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Composants/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `
Slider tactile avec support du drag, clavier et marques.

Optimise pour les interactions mobiles (touch targets 44px minimum).
        `,
      },
    },
  },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: { type: 'range', min: 0, max: 10 } },
    showValue: { control: 'boolean' },
    showMarks: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    trackColor: { control: 'text' },
    thumbColor: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
    step: 1,
    label: 'Intensite',
    showValue: true,
  },
}

export const WithMarks: Story = {
  args: {
    value: 3,
    min: 0,
    max: 10,
    step: 1,
    label: 'Echelle EVA',
    showValue: true,
    showMarks: true,
    minLabel: '0 - Aucune douleur',
    maxLabel: '10 - Douleur maximale',
  },
}

export const CustomColors: Story = {
  args: {
    value: 7,
    min: 0,
    max: 10,
    step: 1,
    label: 'Douleur',
    showValue: true,
    trackColor: 'bg-red-500',
    thumbColor: 'bg-red-600',
  },
}

export const SmallRange: Story = {
  args: {
    value: 2,
    min: 0,
    max: 4,
    step: 1,
    label: 'Difficulte percue',
    showValue: true,
    showMarks: true,
    minLabel: 'Facile',
    maxLabel: 'Tres difficile',
  },
}

export const Disabled: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
    label: 'Desactive',
    disabled: true,
    showValue: true,
  },
}

export const EVAScale: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <Slider
        value={3}
        onChange={() => {}}
        min={0}
        max={10}
        step={1}
        label="EVA avant seance"
        showValue
        showMarks
        minLabel="0"
        maxLabel="10"
      />
      <Slider
        value={1}
        onChange={() => {}}
        min={0}
        max={10}
        step={1}
        label="EVA apres seance"
        showValue
        showMarks
        minLabel="0"
        maxLabel="10"
        trackColor="bg-green-500"
        thumbColor="bg-green-600"
      />
    </div>
  ),
}
