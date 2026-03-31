import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Composants/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `
Champ de saisie texte avec label, icones, etats d'erreur et aide.

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
    label: 'Email',
    placeholder: 'votre@email.com',
  },
}

export const WithHelpText: Story = {
  args: {
    label: 'Mot de passe',
    type: 'password',
    placeholder: '********',
    helpText: 'Minimum 8 caracteres, dont 1 majuscule et 1 chiffre',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'invalide',
    error: 'Adresse email invalide',
  },
}

export const Required: Story = {
  args: {
    label: 'Nom du patient',
    placeholder: 'Jean Dupont',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Champ desactive',
    value: 'Valeur non modifiable',
    disabled: true,
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Recherche',
    placeholder: 'Rechercher un patient...',
    leftIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Small (sm)" size="sm" placeholder="Taille sm" />
      <Input label="Medium (md)" size="md" placeholder="Taille md" />
      <Input label="Large (lg)" size="lg" placeholder="Taille lg" />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Normal" placeholder="Champ normal" />
      <Input label="Avec aide" placeholder="Champ avec aide" helpText="Texte d'aide pour guider l'utilisateur" />
      <Input label="Erreur" value="valeur invalide" error="Ce champ contient une erreur" />
      <Input label="Requis" placeholder="Champ requis" required />
      <Input label="Desactive" value="Non modifiable" disabled />
    </div>
  ),
}
