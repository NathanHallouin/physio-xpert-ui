import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Composants/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `
Interrupteur a bascule pour les preferences et parametres.

Supporte label, description et 3 tailles.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    label: 'Activer les notifications',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Notifications activees',
  },
}

export const WithDescription: Story = {
  args: {
    checked: true,
    label: 'Mode antalgique',
    description: 'Adapte automatiquement les exercices quand l\'EVA depasse 7/10',
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Fonctionnalite bientot disponible',
    description: 'Cette option sera activable dans une prochaine mise a jour',
    disabled: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Switch checked={true} onChange={() => {}} label="Small (sm)" size="sm" />
      <Switch checked={true} onChange={() => {}} label="Medium (md)" size="md" />
      <Switch checked={true} onChange={() => {}} label="Large (lg)" size="lg" />
    </div>
  ),
}

export const SettingsExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Preferences</h3>
      <Switch checked={true} onChange={() => {}} label="Notifications push" description="Recevoir les rappels de seance" />
      <Switch checked={false} onChange={() => {}} label="Son des feedbacks" description="Jouer un son lors des transitions d'exercice" />
      <Switch checked={true} onChange={() => {}} label="Partage des donnees" description="Partager les resultats avec votre kinesitherapeute" />
      <Switch checked={false} onChange={() => {}} label="Mode sombre" disabled description="Bientot disponible" />
    </div>
  ),
}
