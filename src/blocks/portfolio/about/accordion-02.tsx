import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, Code, Database, Palette, Server, Smartphone, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-8 @xl:gap-16 items-start">
                    <ProfileSection
                        src="https://picsum.photos/seed/acc2/800/1000"
                        name="Sarah Chen"
                        role="Full-Stack Developer"
                        bio="I bring ideas to life through code. Specialized in building performant, accessible, and beautiful web applications."
                        cta={{ label: 'View Projects', href: '/projects', icon: ArrowRight }}
                    />
                    <SkillsAccordion
                        items={[
                            {
                                id: 'frontend',
                                icon: Code,
                                title: 'Frontend Development',
                                skills: [
                                    { name: 'React / Next.js', level: 95 },
                                    { name: 'TypeScript', level: 90 },
                                    { name: 'Tailwind CSS', level: 92 },
                                    { name: 'Vue.js', level: 75 },
                                ],
                            },
                            {
                                id: 'backend',
                                icon: Server,
                                title: 'Backend Development',
                                skills: [
                                    { name: 'Node.js', level: 88 },
                                    { name: 'Python', level: 82 },
                                    { name: 'GraphQL', level: 85 },
                                    { name: 'REST APIs', level: 90 },
                                ],
                            },
                            {
                                id: 'database',
                                icon: Database,
                                title: 'Database & Storage',
                                skills: [
                                    { name: 'PostgreSQL', level: 88 },
                                    { name: 'MongoDB', level: 80 },
                                    { name: 'Redis', level: 75 },
                                    { name: 'S3 / Cloud Storage', level: 85 },
                                ],
                            },
                            {
                                id: 'mobile',
                                icon: Smartphone,
                                title: 'Mobile Development',
                                skills: [
                                    { name: 'React Native', level: 80 },
                                    { name: 'Flutter', level: 65 },
                                    { name: 'iOS (Swift)', level: 50 },
                                ],
                            },
                            {
                                id: 'design',
                                icon: Palette,
                                title: 'Design & UX',
                                skills: [
                                    { name: 'Figma', level: 85 },
                                    { name: 'UI Design', level: 78 },
                                    { name: 'Prototyping', level: 80 },
                                ],
                            },
                            {
                                id: 'devops',
                                icon: Wrench,
                                title: 'DevOps & Tools',
                                skills: [
                                    { name: 'Docker', level: 82 },
                                    { name: 'AWS', level: 78 },
                                    { name: 'CI/CD', level: 85 },
                                    { name: 'Git', level: 95 },
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ProfileSectionProps {
    src: string
    name: string
    role: string
    bio: string
    cta: CTAData
}

const ProfileSection = ({ src, name, role, bio, cta }: ProfileSectionProps) => (
    <div className="sticky top-8">
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6">
            <Image src={src} alt={name} fill className="object-cover" />
        </div>
        <Badge variant="secondary" className="mb-3">Technical Skills</Badge>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-primary font-medium mb-4">{role}</p>
        <p className="text-muted-foreground mb-6">{bio}</p>
        <Button className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

interface SkillItem {
    name: string
    level: number
}

interface AccordionItemData {
    id: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    skills: SkillItem[]
}

interface SkillsAccordionProps {
    items: AccordionItemData[]
}

const SkillsAccordion = ({ items }: SkillsAccordionProps) => (
    <Accordion type="multiple" defaultValue={['frontend', 'backend']} className="space-y-2">
        {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                        <item.icon className="size-5 text-primary" />
                        <span className="font-medium">{item.title}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                    <div className="space-y-4">
                        {item.skills.map((skill) => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm">{skill.name}</span>
                                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                </div>
                                <Progress value={skill.level} className="h-2" />
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)
