'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2 } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @xl:grid-cols-[1fr_2fr] gap-12 @xl:gap-16">
					<div>
						<Eyebrow icon={Building2} text="Companies" />
						<Title text="Where I've Made Impact" />
						<Description text="Each company has shaped my expertise in unique ways." />
					</div>

					<CompanyAccordion
						items={[
							{
								id: 'google',
								logo: 'https://github.com/google.png',
								initials: 'G',
								company: 'Google',
								role: 'Staff Software Engineer',
								period: '2021 - Present',
								achievements: [
									'Led design system migration',
									'Improved Core Web Vitals by 40%',
									'Mentored 15+ engineers',
									'Shipped 3 major products',
								],
							},
							{
								id: 'meta',
								logo: 'https://github.com/facebook.png',
								initials: 'M',
								company: 'Meta',
								role: 'Senior Software Engineer',
								period: '2019 - 2021',
								achievements: [
									'Built Instagram Stories features',
									'Optimized feed rendering',
									'Cross-platform mobile development',
									'A/B testing infrastructure',
								],
							},
							{
								id: 'stripe',
								logo: 'https://github.com/stripe.png',
								initials: 'S',
								company: 'Stripe',
								role: 'Software Engineer',
								period: '2017 - 2019',
								achievements: [
									'Payment dashboard redesign',
									'Fraud detection UI',
									'Merchant onboarding flow',
									'Component library',
								],
							},
						]}
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

interface CompanyItem {
	id: string;
	logo: string;
	initials: string;
	company: string;
	role: string;
	period: string;
	achievements: string[];
}

const CompanyAccordion = ({ items }: { items: CompanyItem[] }) => (
	<Accordion type="single" collapsible defaultValue={items[0]?.id}>
		{items.map(
			({ id, logo, initials, company, role, period, achievements }) => (
				<AccordionItem key={id} value={id} className="border-b">
					<AccordionTrigger className="hover:no-underline py-6">
						<div className="flex items-center gap-4 text-left">
							<Avatar className="size-12 rounded-lg border">
								<AvatarImage src={logo} alt={company} />
								<AvatarFallback className="rounded-lg">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<h3 className="text-lg font-semibold">{company}</h3>
								<p className="text-sm text-muted-foreground">
									{role} · {period}
								</p>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pb-6 pl-16">
						<h4 className="text-sm font-medium mb-3">Key Achievements</h4>
						<div className="grid @sm:grid-cols-2 gap-2">
							{achievements.map((achievement, i) => (
								<div
									key={i}
									className="flex items-center gap-2 text-sm text-muted-foreground"
								>
									<span className="size-1.5 rounded-full bg-primary shrink-0" />
									{achievement}
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			),
		)}
	</Accordion>
);
