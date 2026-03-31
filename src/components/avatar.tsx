import { type ImgHTMLAttributes, forwardRef, useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const avatarVariants = cva(
  'inline-flex items-center justify-center font-medium text-white overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
)

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function getColorFromName(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-cyan-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>,
    VariantProps<typeof avatarVariants> {
  src?: string | null
  name?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, name = '', size, shape, className, ...props },
  ref
) {
  const initials = useMemo(() => (name ? getInitials(name) : '?'), [name])
  const bgColor = useMemo(() => (name ? getColorFromName(name) : 'bg-gray-400'), [name])

  if (src) {
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape }), 'bg-gray-200', className)}
      >
        <img
          src={src}
          alt={name || 'Avatar'}
          className="w-full h-full object-cover"
          {...props}
        />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(avatarVariants({ size, shape }), bgColor, className)}
      aria-label={name || 'Avatar'}
    >
      {initials}
    </div>
  )
})

export interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: AvatarProps['size']
  className?: string
}

export function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const avatars = Array.isArray(children) ? children : [children]
  const visibleAvatars = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: visibleAvatars.length - index }}
        >
          {avatar}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'relative ring-2 ring-white rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-600 font-medium',
            avatarVariants({ size })
          )}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}

export { avatarVariants }
