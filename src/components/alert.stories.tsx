import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'Composants/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `
Alertes et notifications avec 4 variantes : info, success, warning, error.

Chaque variante a son icone, ses couleurs et peut etre optionnellement fermable.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'Votre prochaine seance est prevue pour demain a 14h.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Seance terminee',
    children: 'Vous avez complete 8 exercices avec 6 verts et 2 oranges.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Attention',
    children: 'Votre EVA est a 7/10. Le mode antalgique a ete active automatiquement.',
  },
}

export const ErrorVariant: Story = {
  args: {
    variant: 'error',
    title: 'Erreur de connexion',
    children: 'Impossible de synchroniser vos donnees. Verifiez votre connexion internet.',
  },
}

export const Dismissible: Story = {
  args: {
    variant: 'success',
    title: 'Profil enregistre',
    children: 'Vos modifications ont ete sauvegardees avec succes.',
    dismissible: true,
  },
}

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'Pensez a remplir votre questionnaire quotidien.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information">
        Votre prochaine seance est prevue pour demain.
      </Alert>
      <Alert variant="success" title="Succes">
        Seance terminee avec succes.
      </Alert>
      <Alert variant="warning" title="Avertissement">
        EVA elevee detectee, mode antalgique active.
      </Alert>
      <Alert variant="error" title="Erreur">
        Echec de la synchronisation.
      </Alert>
    </div>
  ),
}

export const MedicalAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="error" title="Red Flag detecte">
        Symptome neurologique : perte de sensibilite perineale. Consultez un medecin immediatement.
      </Alert>
      <Alert variant="warning" title="Yellow Flag">
        Kinesiophobie detectee (score Tampa &gt; 37). Approche cognitive recommandee.
      </Alert>
      <Alert variant="success" title="Progression">
        3 exercices ont passe au niveau superieur cette semaine.
      </Alert>
    </div>
  ),
}
