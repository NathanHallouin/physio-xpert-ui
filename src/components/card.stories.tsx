import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardContent, CardFooter } from './card'
import { Button } from './button'
import { Badge } from './badge'

const meta: Meta<typeof Card> = {
  title: 'Composants/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `
Composant container reusable avec plusieurs variantes visuelles.

## Variantes
- **elevated**: Fond blanc avec ombre (defaut)
- **outlined**: Bordure sans ombre
- **filled**: Fond gris clair
- **ghost**: Transparent
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled', 'ghost'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    clickable: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    rounded: 'lg',
    children: 'Contenu de la carte',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Carte elevee</h3>
        <p className="text-gray-600 text-sm">
          Avec ombre et bordure subtile, ideale pour les contenus importants.
        </p>
      </div>
    ),
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Carte avec bordure</h3>
        <p className="text-gray-600 text-sm">
          Sans ombre, juste une bordure visible.
        </p>
      </div>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Carte remplie</h3>
        <p className="text-gray-600 text-sm">
          Fond gris clair pour un effet subtil.
        </p>
      </div>
    ),
  },
}

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    clickable: true,
    children: (
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Carte cliquable</h3>
        <p className="text-gray-600 text-sm">
          Hover et clic animes.
        </p>
      </div>
    ),
  },
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader action={<Badge variant="success">Actif</Badge>}>
        Titre de la carte
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Contenu de la carte avec header et footer separes.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">Annuler</Button>
        <Button variant="primary" size="sm">Confirmer</Button>
      </CardFooter>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="elevated">
        <CardHeader>Elevated</CardHeader>
        <CardContent>Variante par defaut</CardContent>
      </Card>
      <Card variant="outlined">
        <CardHeader>Outlined</CardHeader>
        <CardContent>Avec bordure</CardContent>
      </Card>
      <Card variant="filled">
        <CardHeader>Filled</CardHeader>
        <CardContent>Fond rempli</CardContent>
      </Card>
      <Card variant="ghost">
        <CardHeader>Ghost</CardHeader>
        <CardContent>Transparent</CardContent>
      </Card>
    </div>
  ),
}
