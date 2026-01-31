import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Calendar, Building2 } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Award} text="Certifications" />
					<Title text="Professional Certifications" />
					<Description text="Industry certifications that validate my expertise." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
					<CertificationCard
						title="AWS Solutions Architect"
						level="Professional"
						issuer="Amazon Web Services"
						issued="Jan 2023"
						expires="Jan 2026"
						credentialId="AWS-PSA-123456"
					/>
					<CertificationCard
						title="Google Cloud Professional"
						level="Data Engineer"
						issuer="Google Cloud"
						issued="Jun 2022"
						expires="Jun 2025"
						credentialId="GCP-DE-789012"
					/>
					<CertificationCard
						title="Kubernetes Administrator"
						level="CKA"
						issuer="CNCF"
						issued="Mar 2021"
						expires="Mar 2024"
						credentialId="CKA-345678"
					/>
					<CertificationCard
						title="MongoDB Developer"
						level="Associate"
						issuer="MongoDB"
						issued="Sep 2020"
						expires="Never"
						credentialId="MDB-DEV-901234"
					/>
					<CertificationCard
						title="Terraform Associate"
						level="HashiCorp"
						issuer="HashiCorp"
						issued="Dec 2022"
						expires="Dec 2024"
						credentialId="HCP-TFA-567890"
					/>
					<CertificationCard
						title="Scrum Master"
						level="PSM I"
						issuer="Scrum.org"
						issued="Jul 2019"
						expires="Never"
						credentialId="PSM-123456"
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

interface CertificationCardProps {
	title: string;
	level: string;
	issuer: string;
	issued: string;
	expires: string;
	credentialId: string;
}

const CertificationCard = ({
	title,
	level,
	issuer,
	issued,
	expires,
	credentialId,
}: CertificationCardProps) => (
	<Card className="hover:shadow-lg transition-shadow">
		<CardContent className="p-6">
			<div className="flex items-center justify-between mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Award className="size-5 text-primary" />
				</div>
				<Badge variant="secondary">{level}</Badge>
			</div>
			<h3 className="text-lg font-bold mb-1">{title}</h3>
			<p className="text-sm text-primary flex items-center gap-1.5 mb-4">
				<Building2 className="size-3" />
				{issuer}
			</p>
			<div className="space-y-2 text-xs text-muted-foreground">
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-1">
						<Calendar className="size-3" />
						Issued
					</span>
					<span>{issued}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-1">
						<Calendar className="size-3" />
						Expires
					</span>
					<span>{expires}</span>
				</div>
				<div className="flex items-center justify-between pt-2 border-t">
					<span>Credential ID</span>
					<span className="font-mono">{credentialId}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);
