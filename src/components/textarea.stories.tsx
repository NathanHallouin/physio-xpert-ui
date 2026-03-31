import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Composants/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
Zone de texte multi-lignes avec compteur de caracteres optionnel.

Ideal pour les notes cliniques, commentaires patient, descriptions de symptomes.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helpText: { control: 'text' },
    showCount: { control: 'boolean' },
    maxLength: { control: 'number' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Notes cliniques',
    placeholder: 'Decrivez les observations...',
    rows: 4,
  },
}

export const WithCharCount: Story = {
  args: {
    label: 'Description des symptomes',
    placeholder: 'Decrivez vos symptomes en detail...',
    showCount: true,
    maxLength: 500,
    value: 'Douleur lombaire irradiant vers la jambe droite.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Notes',
    value: '',
    error: 'Ce champ est obligatoire',
    required: true,
  },
}

export const WithHelpText: Story = {
  args: {
    label: 'Observations post-seance',
    placeholder: 'Notez les reactions du patient...',
    helpText: 'Ces notes seront visibles dans le dossier patient',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Diagnostic',
    value: 'Lombalgie chronique non specifique - Phase 1 (inflammatoire)',
    disabled: true,
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea label="Normal" placeholder="Champ normal" />
      <Textarea label="Avec compteur" placeholder="Avec compteur" showCount maxLength={200} value="Texte exemple" />
      <Textarea label="Erreur" error="Champ obligatoire" required />
      <Textarea label="Aide" placeholder="Avec aide" helpText="Texte d'aide contextuel" />
      <Textarea label="Desactive" value="Contenu non modifiable" disabled />
    </div>
  ),
}
