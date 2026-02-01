'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Building2, GraduationCap, Stethoscope } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Industry Solutions" />
					<Title text="Tailored for Your Sector" />
					<Description text="Deep expertise across key industries with solutions designed for sector-specific challenges." />
				</div>

				<IndustryTabs
					items={[
						{
							id: 'technology',
							icon: Building2,
							label: 'Technology',
							title: 'Technology & Software',
							description:
								'Accelerate innovation and scale your technology business with our specialized services.',
							services: [
								{
									title: 'Product Development',
									description: 'Build and scale digital products.',
								},
								{
									title: 'Platform Engineering',
									description: 'Create robust technology platforms.',
								},
								{
									title: 'DevOps & SRE',
									description: 'Optimize operations and reliability.',
								},
								{
									title: 'Technical Due Diligence',
									description: 'Assess technology investments.',
								},
							],
						},
						{
							id: 'finance',
							icon: Briefcase,
							label: 'Finance',
							title: 'Financial Services',
							description:
								'Navigate digital transformation while maintaining compliance and security.',
							services: [
								{
									title: 'Core Banking Modernization',
									description: 'Upgrade legacy banking systems.',
								},
								{
									title: 'RegTech Solutions',
									description: 'Automate compliance workflows.',
								},
								{
									title: 'Fraud Detection',
									description: 'AI-powered fraud prevention.',
								},
								{
									title: 'Digital Payments',
									description: 'Modern payment infrastructure.',
								},
							],
						},
						{
							id: 'healthcare',
							icon: Stethoscope,
							label: 'Healthcare',
							title: 'Healthcare & Life Sciences',
							description:
								'Improve patient outcomes with secure, compliant healthcare technology solutions.',
							services: [
								{
									title: 'EHR Integration',
									description: 'Connect healthcare systems.',
								},
								{
									title: 'Telehealth Platforms',
									description: 'Virtual care solutions.',
								},
								{
									title: 'Clinical Analytics',
									description: 'Data-driven clinical insights.',
								},
								{
									title: 'HIPAA Compliance',
									description: 'Security and compliance services.',
								},
							],
						},
						{
							id: 'education',
							icon: GraduationCap,
							label: 'Education',
							title: 'Education & EdTech',
							description:
								'Transform learning experiences with innovative educational technology solutions.',
							services: [
								{
									title: 'LMS Development',
									description: 'Custom learning platforms.',
								},
								{
									title: 'Student Analytics',
									description: 'Track and improve outcomes.',
								},
								{
									title: 'Content Management',
									description: 'Educational content systems.',
								},
								{
									title: 'Accessibility',
									description: 'Inclusive learning experiences.',
								},
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface ServiceDetail {
	title: string;
	description: string;
}

interface IndustryItem {
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	title: string;
	description: string;
	services: ServiceDetail[];
}

const IndustryTabs = ({ items }: { items: IndustryItem[] }) => (
	<Tabs defaultValue={items[0].id} className="w-full">
		<TabsList className="w-full @md:w-auto h-auto flex-wrap justify-center gap-1 @md:gap-2 p-1.5 mb-8 @md:mb-10">
			{items.map(({ id, icon: Icon, label }) => (
				<TabsTrigger
					key={id}
					value={id}
					className="gap-2 px-4 py-2.5 data-[state=active]:shadow-md"
				>
					<Icon className="size-4" />
					<span className="hidden @xs:inline">{label}</span>
				</TabsTrigger>
			))}
		</TabsList>

		{items.map(({ id, title, description, services }) => (
			<TabsContent key={id} value={id}>
				<div className="text-center mb-8">
					<h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
					<p className="text-sm @md:text-base text-muted-foreground max-w-2xl mx-auto">
						{description}
					</p>
				</div>
				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
					{services.map(({ title: sTitle, description: sDesc }, i) => (
						<Card
							key={i}
							className="group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
						>
							<CardContent className="p-5 @md:p-6 text-center">
								<h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
									{sTitle}
								</h4>
								<p className="text-sm text-muted-foreground">{sDesc}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
