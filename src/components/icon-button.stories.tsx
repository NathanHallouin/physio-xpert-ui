import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from './icon-button'
import { X, Settings, ChevronLeft, ChevronRight, Plus, Minus, Heart, Share, Edit } from 'lucide-react'

const meta: Meta<typeof IconButton> = {
  title: 'Composants/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component: `
Bouton contenant uniquement une icone, optimise pour les interactions tactiles.

## Accessibilite
- Touch target minimum de 44x44px (conformite iOS/Android)
- Label accessible requis (prop \`label\`)

## Variantes
- **default**: Fond gris clair
- **primary**: Fond bleu clair
- **accent**: Fond violet clair
- **ghost**: Transparent
- **outline**: Bordure visible
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Settings />,
    label: 'Parametres',
  },
}

export const Primary: Story = {
  args: {
    icon: <Plus />,
    label: 'Ajouter',
    variant: 'primary',
  },
}

export const Accent: Story = {
  args: {
    icon: <Heart />,
    label: 'Favoris',
    variant: 'accent',
  },
}

export const Ghost: Story = {
  args: {
    icon: <X />,
    label: 'Fermer',
    variant: 'ghost',
  },
}

export const Outline: Story = {
  args: {
    icon: <Share />,
    label: 'Partager',
    variant: 'outline',
  },
}

export const Loading: Story = {
  args: {
    icon: <Settings />,
    label: 'Chargement',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    icon: <Edit />,
    label: 'Modifier',
    disabled: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={<Settings />} label="Small" size="sm" />
      <IconButton icon={<Settings />} label="Medium" size="md" />
      <IconButton icon={<Settings />} label="Large" size="lg" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton icon={<Settings />} label="Default" variant="default" />
      <IconButton icon={<Plus />} label="Primary" variant="primary" />
      <IconButton icon={<Heart />} label="Accent" variant="accent" />
      <IconButton icon={<X />} label="Ghost" variant="ghost" />
      <IconButton icon={<Share />} label="Outline" variant="outline" />
    </div>
  ),
}

export const NavigationButtons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton icon={<ChevronLeft />} label="Precedent" variant="outline" />
      <span className="px-4 text-gray-600">Page 1 / 5</span>
      <IconButton icon={<ChevronRight />} label="Suivant" variant="outline" />
    </div>
  ),
}

export const CounterButtons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton icon={<Minus />} label="Diminuer" variant="outline" size="sm" />
      <span className="w-12 text-center text-lg font-medium">5</span>
      <IconButton icon={<Plus />} label="Augmenter" variant="primary" size="sm" />
    </div>
  ),
}
