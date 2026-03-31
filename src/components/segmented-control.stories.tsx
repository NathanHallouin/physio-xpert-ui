import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SegmentedControl } from './segmented-control'
import { User, Users, Building } from 'lucide-react'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Composants/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    docs: {
      description: {
        component: `
Selecteur segmente pour choisir entre plusieurs options mutuellement exclusives.

Ideal pour :
- Toggles binaires (Face/Dos, Jour/Semaine/Mois)
- Filtres rapides
- Navigation secondaire
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof SegmentedControl<string>>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
      />
    )
  },
}

export const FrontBack: Story = {
  render: () => {
    const [value, setValue] = useState('front')
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { value: 'front', label: 'Face' },
          { value: 'back', label: 'Dos' },
        ]}
        aria-label="Vue du corps"
      />
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('individual')
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { value: 'individual', label: 'Individuel', icon: <User className="w-4 h-4" /> },
          { value: 'team', label: 'Equipe', icon: <Users className="w-4 h-4" /> },
          { value: 'org', label: 'Organisation', icon: <Building className="w-4 h-4" /> },
        ]}
      />
    )
  },
}

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState('day')
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        size="sm"
        options={[
          { value: 'day', label: 'Jour' },
          { value: 'week', label: 'Semaine' },
          { value: 'month', label: 'Mois' },
        ]}
      />
    )
  },
}

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState('all')
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        size="lg"
        options={[
          { value: 'all', label: 'Tous' },
          { value: 'active', label: 'Actifs' },
          { value: 'archived', label: 'Archives' },
        ]}
      />
    )
  },
}

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('pending')
    return (
      <div className="w-full max-w-md">
        <SegmentedControl
          value={value}
          onChange={setValue}
          fullWidth
          options={[
            { value: 'pending', label: 'En attente' },
            { value: 'completed', label: 'Termines' },
          ]}
        />
      </div>
    )
  },
}

export const WithDisabledOption: Story = {
  render: () => {
    const [value, setValue] = useState('basic')
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { value: 'basic', label: 'Basique' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise', disabled: true },
        ]}
      />
    )
  },
}
