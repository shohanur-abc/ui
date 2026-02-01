'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
	ArrowRight,
	Check,
	X,
	Building,
	Store,
	Briefcase,
	GraduationCap,
	Heart,
	Factory,
} from 'lucide-react';
import { ComponentType, useState } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Industries" />
					<Title text="Solutions for Your Industry" />
					<Description text="Select your industry to see tailored solutions and success stories." />
				</div>

				<IndustrySelector
					industries={[
						{
							icon: Building,
							name: 'Real Estate',
							description: 'Property management and listings',
							solutions: ['Property Portals', 'CRM Systems', 'Virtual Tours'],
							stats: { clients: 45, projects: 120 },
						},
						{
							icon: Store,
							name: 'Retail & E-commerce',
							description: 'Online stores and inventory',
							solutions: ['E-commerce Platforms', 'Inventory Systems', 'POS Integration'],
							stats: { clients: 89, projects: 230 },
						},
						{
							icon: Briefcase,
							name: 'Financial Services',
							description: 'Banking and fintech solutions',
							solutions: ['Payment Gateways', 'Trading Platforms', 'Risk Analytics'],
							stats: { clients: 32, projects: 85 },
						},
						{
							icon: GraduationCap,
							name: 'Education',
							description: 'Learning platforms and tools',
							solutions: ['LMS Platforms', 'Student Portals', 'Assessment Tools'],
							stats: { clients: 56, projects: 145 },
						},
						{
							icon: Heart,
							name: 'Healthcare',
							description: 'Patient care and management',
							solutions: ['EMR Systems', 'Telemedicine', 'Appointment Booking'],
							stats: { clients: 28, projects: 72 },
						},
						{
							icon: Factory,
							name: 'Manufacturing',
							description: 'Production and supply chain',
							solutions: ['ERP Systems', 'IoT Monitoring', 'Supply Chain'],
							stats: { clients: 34, projects: 95 },
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface Industry {
	icon: ComponentType<{ className?: string }>;
	name: string;
	description: string;
	solutions: string[];
	stats: { clients: number; projects: number };
}

const IndustrySelector = ({ industries }: { industries: Industry[] }) => {
	const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
	const selected = selectedIndustry !== null ? industries[selectedIndustry] : null;

	return (
		<div className="space-y-8">
			{/* Industry grid */}
			<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-6 gap-4">
				{industries.map((industry, i) => {
					const Icon = industry.icon;
					const isSelected = selectedIndustry === i;

					return (
						<button
							key={i}
							onClick={() => setSelectedIndustry(isSelected ? null : i)}
							className={`p-4 rounded-xl border text-center transition-all ${
								isSelected
									? 'border-primary bg-primary/5 ring-2 ring-primary/20'
									: 'border-border hover:border-primary/50'
							}`}
						>
							<div
								className={`size-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
									isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
								}`}
							>
								<Icon className="size-6" />
							</div>
							<h3 className="font-semibold text-sm mb-1">{industry.name}</h3>
							<p className="text-xs text-muted-foreground">{industry.description}</p>
						</button>
					);
				})}
			</div>

			{/* Selected industry details */}
			{selected && (
				<Card className="py-0 animate-in fade-in slide-in-from-bottom-4 duration-300">
					<CardContent className="p-6 @md:p-8">
						<div className="grid @lg:grid-cols-3 gap-6 @lg:gap-8">
							{/* Solutions */}
							<div className="@lg:col-span-2">
								<div className="flex items-center gap-3 mb-4">
									{(() => {
										const Icon = selected.icon;
										return (
											<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
												<Icon className="size-5 text-primary" />
											</div>
										);
									})()}
									<div>
										<h3 className="font-bold text-lg">{selected.name} Solutions</h3>
										<p className="text-sm text-muted-foreground">
											Tailored services for your industry
										</p>
									</div>
								</div>

								<div className="grid @sm:grid-cols-3 gap-4 mb-6">
									{selected.solutions.map((solution, i) => (
										<div
											key={i}
											className="p-4 bg-muted/50 rounded-xl text-center"
										>
											<Check className="size-5 text-primary mx-auto mb-2" />
											<span className="text-sm font-medium">{solution}</span>
										</div>
									))}
								</div>

								<Button asChild>
									<Link href={`/industries/${selected.name.toLowerCase().replace(/\s+/g, '-')}`}>
										View {selected.name} Case Studies
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</div>

							{/* Stats */}
							<div className="p-5 bg-muted/50 rounded-xl">
								<h4 className="font-semibold mb-4">Our Experience</h4>
								<div className="space-y-4">
									<div>
										<div className="text-3xl font-bold text-primary">
											{selected.stats.clients}+
										</div>
										<div className="text-sm text-muted-foreground">
											Happy Clients
										</div>
									</div>
									<div>
										<div className="text-3xl font-bold text-primary">
											{selected.stats.projects}+
										</div>
										<div className="text-sm text-muted-foreground">
											Completed Projects
										</div>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{!selected && (
				<div className="text-center py-8 text-muted-foreground">
					<p>Select an industry above to see tailored solutions</p>
				</div>
			)}
		</div>
	);
};
