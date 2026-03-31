import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { ArrowLeft, ArrowRight, Check, Download, Trash2 } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Composants/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Composant bouton du design system PhysioXpert.

## Variantes disponibles

| Variante | Usage |
|----------|-------|
| \`primary\` | Action principale |
| \`secondary\` | Action secondaire |
| \`accent\` | Action d'accent |
| \`outline\` | Bouton leger |
| \`ghost\` | Bouton discret |
| \`gradient\` | Call-to-action fort |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'gradient'],
      description: 'Style visuel du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Le bouton prend toute la largeur disponible',
    },
    loading: {
      control: 'boolean',
      description: 'Affiche un spinner et desactive le bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'Desactive le bouton',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Variantes de base

export const Primary: Story = {
  args: {
    children: 'Bouton principal',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Bouton secondaire',
    variant: 'secondary',
  },
}

export const Accent: Story = {
  args: {
    children: 'Bouton accent',
    variant: 'accent',
  },
}

export const Outline: Story = {
  args: {
    children: 'Bouton outline',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Bouton ghost',
    variant: 'ghost',
  },
}

export const Gradient: Story = {
  args: {
    children: 'Valider le questionnaire',
    variant: 'gradient',
    size: 'lg',
  },
}

// Avec icones

export const WithLeftIcon: Story = {
  args: {
    children: 'Retour',
    variant: 'outline',
    leftIcon: <ArrowLeft className="w-4 h-4" />,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Continuer',
    variant: 'primary',
    rightIcon: <ArrowRight className="w-4 h-4" />,
  },
}

export const WithBothIcons: Story = {
  args: {
    children: 'Telecharger',
    variant: 'accent',
    leftIcon: <Download className="w-4 h-4" />,
    rightIcon: <Check className="w-4 h-4" />,
  },
}

// Etats

export const Loading: Story = {
  args: {
    children: 'Chargement...',
    variant: 'gradient',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Desactive',
    variant: 'primary',
    disabled: true,
  },
}

// Tailles

export const Small: Story = {
  args: {
    children: 'Petit',
    variant: 'primary',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: 'Moyen',
    variant: 'primary',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    children: 'Grand',
    variant: 'primary',
    size: 'lg',
  },
}

// Full width

export const FullWidth: Story = {
  args: {
    children: 'Pleine largeur',
    variant: 'gradient',
    fullWidth: true,
  },
}

// Showcase

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="gradient">Gradient</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
}

export const DestructiveAction: Story = {
  args: {
    children: 'Supprimer',
    variant: 'outline',
    leftIcon: <Trash2 className="w-4 h-4 text-red-500" />,
    className: 'text-red-600 border-red-300 hover:bg-red-50',
  },
}
