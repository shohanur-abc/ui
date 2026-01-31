import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	BarChart,
	Cloud,
	Code2,
	Database,
	Globe,
	Lock,
	Rocket,
	Server,
	Shield,
	Users,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

interface GridItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
					<Eyebrow icon={Zap} text="Platform Capabilities" />
					<Title text="Everything in" highlight="One Place" />
					<Description text="A complete toolkit for modern businesses. No integrations needed." />
				</div>

				<CompactGrid
					items={[
						{ icon: Zap, title: 'Fast' },
						{ icon: Shield, title: 'Secure' },
						{ icon: Globe, title: 'Global' },
						{ icon: Users, title: 'Teams' },
						{ icon: BarChart, title: 'Analytics' },
						{ icon: Code2, title: 'API' },
						{ icon: Database, title: 'Storage' },
						{ icon: Cloud, title: 'Cloud' },
						{ icon: Lock, title: 'Auth' },
						{ icon: Rocket, title: 'Deploy' },
						{ icon: Server, title: 'Scale' },
						{ icon: Database, title: 'Backup' },
					]}
				/>
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

const CompactGrid = ({ items }: { items: GridItem[] }) => (
	<div className="grid grid-cols-3 @sm:grid-cols-4 @lg:grid-cols-6 gap-3 @md:gap-4 max-w-4xl mx-auto">
		{items.map((item, index) => (
			<Card
				key={`${item.title}-${index}`}
				className="group text-center border-border/50 transition-all hover:border-primary/30 hover:shadow-md"
			>
				<CardContent className="p-4">
					<div className="mb-2 mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/15 group-hover:scale-105">
						<item.icon className="size-5 text-primary" />
					</div>
					<span className="text-xs font-medium">{item.title}</span>
				</CardContent>
			</Card>
		))}
	</div>
);
