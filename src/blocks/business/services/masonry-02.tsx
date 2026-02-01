import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Check, Clock, DollarSign, Users } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-4 mb-10 @md:mb-14">
					<div className="max-w-2xl">
						<Eyebrow text="Case Studies" />
						<Title text="Success Stories" />
						<Desc text="Real results from real projects. See how we've helped businesses transform." />
					</div>
					<Button variant="outline" asChild>
						<Link href="/case-studies">
							View All Cases
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>

				<CaseStudyMasonry
					cases={[
						{
							image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
							category: 'E-commerce',
							title: 'Global Marketplace Platform',
							client: 'RetailMax',
							description: 'Built a multi-vendor marketplace handling 50,000+ daily transactions.',
							metrics: [
								{ icon: DollarSign, value: '$12M', label: 'Revenue Increase' },
								{ icon: Users, value: '2.5M', label: 'Active Users' },
								{ icon: Clock, value: '6 mo', label: 'Time to Launch' },
							],
							featured: true,
						},
						{
							image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
							category: 'FinTech',
							title: 'Banking App Modernization',
							client: 'CityBank Digital',
							description: 'Complete digital transformation of legacy banking systems.',
							metrics: [
								{ icon: Users, value: '500K', label: 'New Users' },
							],
						},
						{
							image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
							category: 'Healthcare',
							title: 'Telemedicine Platform',
							client: 'MedConnect',
							description: 'HIPAA-compliant video consultation system.',
							metrics: [
								{ icon: Users, value: '100K', label: 'Consultations' },
							],
						},
						{
							image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=500&fit=crop',
							category: 'SaaS',
							title: 'Analytics Dashboard',
							client: 'DataFlow Inc.',
							description: 'Real-time business intelligence platform.',
							metrics: [
								{ icon: Clock, value: '60%', label: 'Time Saved' },
							],
							tall: true,
						},
						{
							image: 'https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=600&h=400&fit=crop',
							category: 'Logistics',
							title: 'Fleet Management System',
							client: 'SwiftShip',
							description: 'IoT-powered tracking and optimization.',
							metrics: [
								{ icon: DollarSign, value: '30%', label: 'Cost Reduction' },
							],
						},
						{
							image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&h=400&fit=crop',
							category: 'EdTech',
							title: 'Learning Platform',
							client: 'EduSmart',
							description: 'Personalized learning experience for students.',
							metrics: [
								{ icon: Users, value: '1M+', label: 'Students' },
							],
						},
					]}
				/>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Desc = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface CaseMetric {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

interface CaseStudy {
	image: string;
	category: string;
	title: string;
	client: string;
	description: string;
	metrics: CaseMetric[];
	featured?: boolean;
	tall?: boolean;
}

const CaseStudyMasonry = ({ cases }: { cases: CaseStudy[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{cases.map((caseStudy, i) => {
			if (caseStudy.featured) {
				return (
					<Card
						key={i}
						className="py-0 @md:col-span-2 @xl:col-span-2 overflow-hidden group"
					>
						<div className="grid @lg:grid-cols-2">
							<div className="relative aspect-[4/3] @lg:aspect-auto">
								<Image
									src={caseStudy.image}
									alt={caseStudy.title}
									fill
									className="object-cover transition-transform group-hover:scale-105"
								/>
							</div>
							<CardContent className="p-6 @md:p-8 flex flex-col">
								<Badge variant="secondary" className="w-fit mb-4">
									{caseStudy.category}
								</Badge>
								<h3 className="text-xl @md:text-2xl font-bold mb-2">
									{caseStudy.title}
								</h3>
								<p className="text-sm text-muted-foreground mb-2">
									Client: {caseStudy.client}
								</p>
								<p className="text-muted-foreground mb-6">
									{caseStudy.description}
								</p>

								<div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
									{caseStudy.metrics.map(({ icon: Icon, value, label }, j) => (
										<div key={j} className="text-center">
											<Icon className="size-5 text-primary mx-auto mb-1" />
											<div className="text-lg font-bold">{value}</div>
											<div className="text-xs text-muted-foreground">{label}</div>
										</div>
									))}
								</div>

								<Button className="mt-auto w-fit" asChild>
									<Link href={`/case-studies/${caseStudy.title.toLowerCase().replace(/\s+/g, '-')}`}>
										Read Full Case Study
										<ArrowUpRight className="size-4" />
									</Link>
								</Button>
							</CardContent>
						</div>
					</Card>
				);
			}

			return (
				<Card
					key={i}
					className={`py-0 overflow-hidden group ${caseStudy.tall ? '@xl:row-span-2' : ''}`}
				>
					<div className={`relative ${caseStudy.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
						<Image
							src={caseStudy.image}
							alt={caseStudy.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
						<div className="absolute inset-x-0 bottom-0 p-5">
							<Badge className="bg-white/20 text-white mb-3">
								{caseStudy.category}
							</Badge>
							<h3 className="text-lg font-bold text-white mb-1">
								{caseStudy.title}
							</h3>
							<p className="text-sm text-white/80 mb-3">{caseStudy.description}</p>
							<div className="flex items-center gap-4">
								{caseStudy.metrics.slice(0, 1).map(({ icon: Icon, value, label }, j) => (
									<div key={j} className="flex items-center gap-2 text-white">
										<Icon className="size-4" />
										<span className="text-sm font-bold">{value}</span>
										<span className="text-xs opacity-80">{label}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</Card>
			);
		})}
	</div>
);
