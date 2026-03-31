import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarGroup } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Composants/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `
Avatar avec image ou initiales generees automatiquement.

La couleur de fond est determinee par le nom pour une couleur coherente a chaque affichage.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    name: { control: 'text' },
    src: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {
  args: {
    name: 'Jean Dupont',
    size: 'lg',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    name: 'Marie Martin',
    size: 'lg',
  },
}

export const Square: Story = {
  args: {
    name: 'Pierre Durand',
    size: 'lg',
    shape: 'square',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center">
        <Avatar name="Jean D." size="xs" />
        <p className="text-xs text-gray-500 mt-1">xs</p>
      </div>
      <div className="text-center">
        <Avatar name="Jean D." size="sm" />
        <p className="text-xs text-gray-500 mt-1">sm</p>
      </div>
      <div className="text-center">
        <Avatar name="Jean D." size="md" />
        <p className="text-xs text-gray-500 mt-1">md</p>
      </div>
      <div className="text-center">
        <Avatar name="Jean D." size="lg" />
        <p className="text-xs text-gray-500 mt-1">lg</p>
      </div>
      <div className="text-center">
        <Avatar name="Jean D." size="xl" />
        <p className="text-xs text-gray-500 mt-1">xl</p>
      </div>
    </div>
  ),
}

export const ConsistentColors: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar name="Jean Dupont" size="lg" />
      <Avatar name="Marie Martin" size="lg" />
      <Avatar name="Pierre Durand" size="lg" />
      <Avatar name="Sophie Bernard" size="lg" />
      <Avatar name="Lucas Petit" size="lg" />
      <Avatar name="Emma Leroy" size="lg" />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4} size="md">
      <Avatar name="Jean Dupont" />
      <Avatar name="Marie Martin" />
      <Avatar name="Pierre Durand" />
      <Avatar name="Sophie Bernard" />
      <Avatar name="Lucas Petit" />
      <Avatar name="Emma Leroy" />
    </AvatarGroup>
  ),
}
