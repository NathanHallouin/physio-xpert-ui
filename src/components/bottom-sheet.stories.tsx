import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { BottomSheet, BottomSheetActions } from './bottom-sheet'
import { Button } from './button'

const meta: Meta<typeof BottomSheet> = {
  title: 'Composants/BottomSheet',
  component: BottomSheet,
  parameters: {
    docs: {
      description: {
        component: `
Modal qui apparait depuis le bas de l'ecran, typique des interfaces mobiles.

## Caracteristiques
- Drag-to-dismiss (glisser vers le bas pour fermer)
- Handle visible pour indiquer l'interaction
- Overlay cliquable pour fermer
- Support du clavier (Escape)
- Accessibilite complete (ARIA, focus trap)

## Hauteurs
- **auto**: S'adapte au contenu (max 90vh)
- **half**: 50% de l'ecran
- **full**: 95% de l'ecran
        `,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    height: {
      control: 'select',
      options: ['auto', 'half', 'full'],
    },
    showHandle: {
      control: 'boolean',
    },
    draggable: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Ouvrir le Bottom Sheet</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Titre du Bottom Sheet"
          description="Une description optionnelle"
        >
          <p className="text-gray-600">
            Contenu du bottom sheet. Vous pouvez glisser vers le bas pour fermer.
          </p>
        </BottomSheet>
      </div>
    )
  },
}

export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Confirmation</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmer l'action"
        >
          <p className="text-gray-600 mb-4">
            Etes-vous sur de vouloir continuer? Cette action ne peut pas etre annulee.
          </p>
          <BottomSheetActions>
            <Button variant="outline" onClick={() => setOpen(false)} fullWidth>
              Annuler
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)} fullWidth>
              Confirmer
            </Button>
          </BottomSheetActions>
        </BottomSheet>
      </div>
    )
  },
}

export const HalfHeight: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Demi-hauteur</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Options"
          height="half"
        >
          <div className="space-y-2">
            {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'].map((opt) => (
              <button
                key={opt}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                {opt}
              </button>
            ))}
          </div>
        </BottomSheet>
      </div>
    )
  },
}

export const FullHeight: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Pleine hauteur</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Formulaire complet"
          height="full"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Entrez votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                placeholder="Votre message..."
              />
            </div>
          </div>
          <BottomSheetActions>
            <Button variant="primary" fullWidth>
              Envoyer
            </Button>
          </BottomSheetActions>
        </BottomSheet>
      </div>
    )
  },
}

export const WithoutHandle: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Sans handle</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Information"
          showHandle={false}
        >
          <p className="text-gray-600">
            Ce bottom sheet n'a pas de handle visible, mais peut toujours etre ferme
            en cliquant sur l'overlay ou sur le bouton X.
          </p>
        </BottomSheet>
      </div>
    )
  },
}

export const NonDraggable: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Non draggable</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Contenu important"
          draggable={false}
        >
          <p className="text-gray-600">
            Ce bottom sheet ne peut pas etre ferme en glissant vers le bas.
            Utilisez le bouton X ou cliquez sur l'overlay.
          </p>
        </BottomSheet>
      </div>
    )
  },
}
