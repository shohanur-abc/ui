import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, Eye, FileCheck } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16">
					<div className="relative rounded-2xl overflow-hidden">
						<Image
							src="https://picsum.photos/seed/security/800/800"
							alt="Cybersecurity"
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
						<div className="absolute bottom-0 left-0 right-0 p-6">
							<Card className="bg-background/95 backdrop-blur py-0">
								<CardContent className="p-5">
									<div className="grid grid-cols-3 gap-4 text-center">
										<div>
											<p className="text-2xl font-bold text-primary">500+</p>
											<p className="text-xs text-muted-foreground">
												Security Audits
											</p>
										</div>
										<div>
											<p className="text-2xl font-bold text-primary">99.9%</p>
											<p className="text-xs text-muted-foreground">
												Threat Detection
											</p>
										</div>
										<div>
											<p className="text-2xl font-bold text-primary">0</p>
											<p className="text-xs text-muted-foreground">Breaches</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<div>
						<Eyebrow text="Cybersecurity" />
						<Title text="Enterprise Security Solutions" />
						<Description text="Protect your digital assets with comprehensive security services. Our experts identify vulnerabilities and implement robust protection." />

						<SecurityGrid
							items={[
								{
									icon: Shield,
									title: 'Threat Protection',
									description: 'Advanced threat detection and prevention',
								},
								{
									icon: Lock,
									title: 'Access Control',
									description: 'Multi-factor authentication and RBAC',
								},
								{
									icon: Eye,
									title: '24/7 Monitoring',
									description: 'Continuous security monitoring and alerts',
								},
								{
									icon: FileCheck,
									title: 'Compliance',
									description: 'SOC 2, HIPAA, GDPR compliance support',
								},
							]}
						/>

						<Button className="mt-8" asChild>
							<Link href="/contact">
								Get Security Assessment
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface SecurityItem {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const SecurityGrid = ({ items }: { items: SecurityItem[] }) => (
	<div className="grid @sm:grid-cols-2 gap-4 mt-8">
		{items.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="flex gap-3">
				<div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-4 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold text-sm">{title}</h3>
					<p className="text-xs text-muted-foreground">{description}</p>
				</div>
			</div>
		))}
	</div>
);
