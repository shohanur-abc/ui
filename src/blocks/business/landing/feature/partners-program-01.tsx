import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	GraduationCap,
	Medal,
	Star,
	Trophy,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface PartnerTier {
	tier: string;
	benefits: string[];
	companies: number;
	icon: ComponentType<{ className?: string }>;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Users} text="Partner Program" />
					<Title text="Grow With Our" highlight="Partner Program" />
					<Description text="Join our ecosystem of partners and unlock exclusive benefits, resources, and revenue opportunities." />
				</div>

				<PartnerTiers
					tiers={[
						{
							tier: 'Silver',
							icon: Medal,
							benefits: [
								'Partner portal access',
								'Co-marketing resources',
								'Lead sharing',
								'Basic support',
							],
							companies: 250,
						},
						{
							tier: 'Gold',
							icon: Trophy,
							benefits: [
								'Everything in Silver',
								'Priority support',
								'Revenue sharing',
								'Dedicated manager',
								'Certification program',
							],
							companies: 75,
						},
						{
							tier: 'Platinum',
							icon: Star,
							benefits: [
								'Everything in Gold',
								'Custom integrations',
								'Joint go-to-market',
								'Executive sponsorship',
								'Early access features',
							],
							companies: 15,
						},
					]}
				/>

				<CTASection />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const PartnerTiers = ({ tiers }: { tiers: PartnerTier[] }) => (
	<div className="grid gap-6 @lg:grid-cols-3">
		{tiers.map((tier, index) => (
			<Card
				key={tier.tier}
				className={`border-border/50 transition-all hover:border-primary/30 hover:shadow-lg ${index === 1 ? 'ring-2 ring-primary/30' : ''}`}
			>
				<CardContent className="p-6 @md:p-8">
					<div className="flex items-center gap-3 mb-4">
						<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
							<tier.icon className="size-6 text-primary" />
						</div>
						<div>
							<h3 className="text-xl font-bold">{tier.tier}</h3>
							<p className="text-sm text-muted-foreground">
								{tier.companies}+ partners
							</p>
						</div>
					</div>
					<ul className="space-y-2 mb-6">
						{tier.benefits.map((benefit) => (
							<li key={benefit} className="flex items-center gap-2 text-sm">
								<div className="size-1.5 rounded-full bg-primary" />
								{benefit}
							</li>
						))}
					</ul>
					<Link
						href="/partners/apply"
						className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
					>
						Apply Now <ArrowRight className="size-3" />
					</Link>
				</CardContent>
			</Card>
		))}
	</div>
);

const CTASection = () => (
	<div className="mt-12 text-center p-6 rounded-2xl bg-primary/5 border border-primary/20">
		<h3 className="text-lg font-semibold mb-2">Ready to Partner?</h3>
		<p className="text-sm text-muted-foreground mb-4">
			Join 340+ partners already growing with us.
		</p>
		<Link
			href="/partners"
			className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
		>
			Learn more about our partner program <ArrowRight className="size-3" />
		</Link>
	</div>
);
