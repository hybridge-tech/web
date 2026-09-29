// Update this file as the company's positioning and services evolve.
export const company = {
  name: 'Hybridge Technologies',
  email: import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'soporte@hybridge.com.ar',
  tagline: 'Good ideas deserve great engineering.',
}

export const services = [
  {
    number: '01',
    icon: 'code',
    title: 'Software engineering',
    description: 'Thoughtful digital products, built around your business. From the first prototype to the next stage of growth.',
    tags: ['Web applications', 'APIs & integrations', 'Digital products'],
  },
  {
    number: '02',
    icon: 'cloud',
    title: 'Cloud & infrastructure',
    description: 'A dependable foundation for what comes next. Infrastructure designed to keep your systems running and your team moving.',
    tags: ['Cloud architecture', 'DevOps', 'Deployment & operations'],
  },
  {
    number: '03',
    icon: 'compass',
    title: 'Technology consulting',
    description: 'A clearer path through complex decisions. We connect technical expertise with the things your business needs to achieve.',
    tags: ['Technical strategy', 'Architecture', 'Engineering guidance'],
  },
] as const

export const approach = [
  { title: 'Understand the challenge', description: 'We start with a conversation. Your goals, your context, and the problem worth solving.' },
  { title: 'Connect the dots', description: 'Together, we turn the big picture into a practical plan with clear priorities.' },
  { title: 'Build, learn, evolve', description: 'We deliver thoughtfully, stay close to your team, and make room for what comes next.' },
]
