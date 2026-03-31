import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Composants/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
Composant label/tag pour afficher des statuts et categories.

## Variantes de couleur
- **default**: Gris neutre
- **primary**: Bleu principal
- **accent**: Violet accent
- **success**: Vert
- **warning**: Orange
- **error**: Rouge
- **info**: Bleu informatif
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dot: {
      control: 'boolean',
    },
    outline: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
}

export const Primary: Story = {
  args: {
    children: 'Nouveau',
    variant: 'primary',
  },
}

export const Success: Story = {
  args: {
    children: 'Valide',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'En attente',
    variant: 'warning',
  },
}

export const Error: Story = {
  args: {
    children: 'Erreur',
    variant: 'error',
  },
}

export const WithDot: Story = {
  args: {
    children: 'En ligne',
    variant: 'success',
    dot: true,
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outline',
    variant: 'primary',
    outline: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
}

export const WithDots: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>En ligne</Badge>
      <Badge variant="warning" dot>Inactif</Badge>
      <Badge variant="error" dot>Hors ligne</Badge>
    </div>
  ),
}
