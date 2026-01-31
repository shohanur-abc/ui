import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Award} text="Certifications" />
                    <Title text="Professional Certifications" />
                    <Description text="Industry-recognized certifications and credentials." />
                </div>

                <div className="max-w-3xl space-y-4">
                    <CertificationCard
                        name="AWS Solutions Architect Professional"
                        issuer="Amazon Web Services"
                        issueDate="Jan 2024"
                        expiryDate="Jan 2027"
                        credentialId="AWS-SAP-123456"
                        href="https://aws.amazon.com/verification"
                        tags={['Cloud Architecture', 'AWS', 'DevOps']}
                    />
                    <CertificationCard
                        name="Google Cloud Professional Data Engineer"
                        issuer="Google Cloud"
                        issueDate="Mar 2023"
                        expiryDate="Mar 2025"
                        credentialId="GCP-PDE-789012"
                        href="https://google.com/verification"
                        tags={['Data Engineering', 'BigQuery', 'ML']}
                    />
                    <CertificationCard
                        name="Certified Kubernetes Administrator"
                        issuer="Cloud Native Computing Foundation"
                        issueDate="Sep 2022"
                        expiryDate="Sep 2025"
                        credentialId="CKA-345678"
                        href="https://cncf.io/verification"
                        tags={['Kubernetes', 'Containers', 'DevOps']}
                    />
                    <CertificationCard
                        name="MongoDB Certified Developer"
                        issuer="MongoDB Inc."
                        issueDate="Jun 2022"
                        expiryDate="No Expiry"
                        credentialId="MCD-901234"
                        href="https://mongodb.com/verification"
                        tags={['Database', 'NoSQL', 'Backend']}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface CertificationCardProps {
    name: string
    issuer: string
    issueDate: string
    expiryDate: string
    credentialId: string
    href: string
    tags: string[]
}

const CertificationCard = ({ name, issuer, issueDate, expiryDate, credentialId, href, tags }: CertificationCardProps) => (
    <Card className="group hover:shadow-lg transition-all">
        <CardContent className="p-6">
            <div className="flex flex-col @md:flex-row gap-4 @md:gap-6">
                <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Award className="size-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{name}</h3>
                    <p className="text-sm text-primary mb-3">{issuer}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="size-3.5" />
                            Issued: {issueDate}
                        </span>
                        <span>Expires: {expiryDate}</span>
                        <span className="font-mono">ID: {credentialId}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                </div>
                <Link href={href} target="_blank" className="self-start shrink-0">
                    <Badge variant="outline" className="gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors">
                        Verify
                        <ExternalLink className="size-3" />
                    </Badge>
                </Link>
            </div>
        </CardContent>
    </Card>
)
