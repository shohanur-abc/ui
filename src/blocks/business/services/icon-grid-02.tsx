import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Activity,
	Briefcase,
	Cog,
	GraduationCap,
	Headphones,
	LineChart,
	MessageCircle,
	RefreshCcw,
	Rocket,
	Search,
	Shield,
	Users,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="All Services" />
					<Title text="Everything You Need" />
					<Description text="A complete suite of services to help your business thrive in the digital age." />
				</div>

				<IconGrid
					items={[
						{
							icon: Briefcase,
							title: 'Consulting',
							description: 'Strategic guidance',
						},
						{
							icon: Cog,
							title: 'Development',
							description: 'Custom solutions',
						},
						{
							icon: LineChart,
							title: 'Analytics',
							description: 'Data insights',
						},
						{
							icon: Shield,
							title: 'Security',
							description: 'Protection services',
						},
						{
							icon: Users,
							title: 'Team Building',
							description: 'Staff augmentation',
						},
						{
							icon: Rocket,
							title: 'Launch',
							description: 'Go-to-market support',
						},
						{ icon: Search, title: 'Research', description: 'Market analysis' },
						{
							icon: MessageCircle,
							title: 'Communication',
							description: 'Brand messaging',
						},
						{
							icon: GraduationCap,
							title: 'Training',
							description: 'Skill development',
						},
						{
							icon: Headphones,
							title: 'Support',
							description: '24/7 assistance',
						},
						{
							icon: RefreshCcw,
							title: 'Optimization',
							description: 'Performance tuning',
						},
						{
							icon: Activity,
							title: 'Monitoring',
							description: 'Real-time tracking',
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

interface IconItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const IconGrid = ({ items }: { items: IconItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-6 gap-4">
		{items.map(({ icon: Icon, title, description }, i) => (
			<Card
				key={i}
				className="group py-0 text-center hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
			>
				<CardContent className="p-4 @md:p-5">
					<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
						<Icon className="size-6 @md:size-7" />
					</div>
					<h3 className="text-sm @md:text-base font-semibold mb-0.5">
						{title}
					</h3>
					<p className="text-xs text-muted-foreground">{description}</p>
				</CardContent>
			</Card>
		))}
	</div>
);
