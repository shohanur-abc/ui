import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Award} text="Certifications" />
					<Title text="Professional Credentials" />
					<Description text="Industry-recognized certifications and qualifications." />
				</div>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
					<CertCard
						name="AWS Solutions Architect"
						issuer="Amazon Web Services"
						date="2024"
						href="https://aws.amazon.com"
					/>
					<CertCard
						name="GCP Data Engineer"
						issuer="Google Cloud"
						date="2023"
						href="https://cloud.google.com"
					/>
					<CertCard
						name="Kubernetes Admin"
						issuer="CNCF"
						date="2022"
						href="https://cncf.io"
					/>
					<CertCard
						name="MongoDB Developer"
						issuer="MongoDB Inc"
						date="2022"
						href="https://mongodb.com"
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

interface CertCardProps {
	name: string;
	issuer: string;
	date: string;
	href: string;
}

const CertCard = ({ name, issuer, date, href }: CertCardProps) => (
	<Link href={href} target="_blank" className="group">
		<Card className="h-full hover:shadow-lg transition-all text-center">
			<CardContent className="p-6">
				<div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
					<Award className="size-7 text-primary" />
				</div>
				<h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
					{name}
				</h3>
				<p className="text-xs text-muted-foreground mb-3">{issuer}</p>
				<div className="flex items-center justify-center gap-2">
					<Badge variant="secondary" className="text-xs">
						<Calendar className="size-3 mr-1" />
						{date}
					</Badge>
					<ExternalLink className="size-3 text-muted-foreground" />
				</div>
			</CardContent>
		</Card>
	</Link>
);
