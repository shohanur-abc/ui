import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Award} text="Certifications" />
					<Title text="Professional Certifications" />
					<Description text="Industry-recognized credentials." />
				</div>

				<div className="max-w-5xl mx-auto space-y-12">
					<CertZigzag
						name="AWS Solutions Architect Professional"
						issuer="Amazon Web Services"
						date="Jan 2024"
						expiry="Jan 2027"
						credentialId="AWS-SAP-123456"
						href="https://aws.amazon.com"
						skills={['Cloud Architecture', 'AWS Services', 'DevOps']}
						align="left"
					/>
					<CertZigzag
						name="Google Cloud Professional Data Engineer"
						issuer="Google Cloud"
						date="Mar 2023"
						expiry="Mar 2025"
						credentialId="GCP-PDE-789012"
						href="https://cloud.google.com"
						skills={['Data Engineering', 'BigQuery', 'ML Pipelines']}
						align="right"
					/>
					<CertZigzag
						name="Certified Kubernetes Administrator"
						issuer="Cloud Native Computing Foundation"
						date="Sep 2022"
						expiry="Sep 2025"
						credentialId="CKA-345678"
						href="https://cncf.io"
						skills={['Kubernetes', 'Containers', 'Orchestration']}
						align="left"
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface CertZigzagProps {
	name: string;
	issuer: string;
	date: string;
	expiry: string;
	credentialId: string;
	href: string;
	skills: string[];
	align: 'left' | 'right';
}

const CertZigzag = ({
	name,
	issuer,
	date,
	expiry,
	credentialId,
	href,
	skills,
	align,
}: CertZigzagProps) => (
	<div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
		<div className={`${align === 'right' ? '@lg:order-2' : ''}`}>
			<div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
				<Award className="size-8 text-primary" />
			</div>
			<h3 className="text-xl @md:text-2xl font-bold mb-2">{name}</h3>
			<p className="text-primary mb-4">{issuer}</p>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill, i) => (
					<Badge key={i} variant="secondary">
						{skill}
					</Badge>
				))}
			</div>
		</div>
		<Card className={`${align === 'right' ? '@lg:order-1' : ''}`}>
			<CardContent className="p-6">
				<div className="space-y-4">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Issued</span>
						<span className="flex items-center gap-1">
							<Calendar className="size-4" />
							{date}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Expires</span>
						<span>{expiry}</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Credential ID</span>
						<span className="font-mono text-xs">{credentialId}</span>
					</div>
					<Link
						href={href}
						target="_blank"
						className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
					>
						Verify Credential <ExternalLink className="size-3" />
					</Link>
				</div>
			</CardContent>
		</Card>
	</div>
);
