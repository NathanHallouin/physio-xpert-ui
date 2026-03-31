import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress, StepProgress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Composants/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: `
Barre de progression avec variantes de couleur et format personnalisable.

Inclut aussi \`StepProgress\` pour les progressions par etapes numerotees.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 65,
    label: 'Progression',
    showValue: true,
  },
}

export const Gradient: Story = {
  args: {
    value: 80,
    variant: 'gradient',
    label: 'Questionnaire',
    showValue: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} variant="default" label="Default" showValue />
      <Progress value={80} variant="gradient" label="Gradient" showValue />
      <Progress value={100} variant="success" label="Success" showValue />
      <Progress value={45} variant="warning" label="Warning" showValue />
      <Progress value={20} variant="error" label="Error" showValue />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} size="sm" label="Small" showValue />
      <Progress value={60} size="md" label="Medium" showValue />
      <Progress value={60} size="lg" label="Large" showValue />
    </div>
  ),
}

export const CustomFormat: Story = {
  args: {
    value: 3,
    max: 5,
    label: 'Exercices completes',
    showValue: true,
    valueFormat: (v, m) => `${v}/${m} exercices`,
  },
}

export const SessionProgress: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress
        value={6}
        max={10}
        variant="gradient"
        label="Seance en cours"
        showValue
        valueFormat={(v, m) => `${v}/${m} exercices`}
      />
      <div className="flex gap-4 text-sm">
        <span className="text-green-600 font-medium">4 verts</span>
        <span className="text-orange-500 font-medium">1 orange</span>
        <span className="text-red-500 font-medium">1 rouge</span>
      </div>
    </div>
  ),
}

export const Steps: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Etape 2 sur 4</p>
        <StepProgress currentStep={2} totalSteps={4} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Avec labels</p>
        <StepProgress
          currentStep={3}
          totalSteps={5}
          labels={['EVA', 'Zones', 'Questions', 'Resume', 'Fin']}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Small</p>
        <StepProgress currentStep={2} totalSteps={4} size="sm" />
      </div>
    </div>
  ),
}
