import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<HeaderSection
					badge="Skills Showcase"
					title="Technical Prowess"
					description="Highlighting key areas of technical expertise"
				/>

				<ShowcaseSplit
					leftPanel={{
						title: 'Core Technologies',
						subtitle: 'Primary stack',
						skills: [
							{ name: 'React / Next.js', level: 95 },
							{ name: 'TypeScript', level: 92 },
							{ name: 'Node.js', level: 88 },
							{ name: 'PostgreSQL', level: 85 },
						],
					}}
					rightPanel={{
						title: 'Growing Skills',
						subtitle: 'Currently learning',
						skills: [
							{ name: 'Rust', level: 45, trending: true },
							{ name: 'AI/ML', level: 55, trending: true },
							{ name: 'WebAssembly', level: 40, trending: true },
							{ name: 'Blockchain', level: 35, trending: true },
						],
					}}
				/>
			</div>
		</section>
	);
}

interface HeaderSectionProps {
	badge: string;
	title: string;
	description: string;
}

const HeaderSection = ({ badge, title, description }: HeaderSectionProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface Skill {
	name: string;
	level: number;
	trending?: boolean;
}

interface Panel {
	title: string;
	subtitle: string;
	skills: Skill[];
}

interface ShowcaseSplitProps {
	leftPanel: Panel;
	rightPanel: Panel;
}

const ShowcaseSplit = ({ leftPanel, rightPanel }: ShowcaseSplitProps) => (
	<div className="grid @lg:grid-cols-2 gap-6 @md:gap-8 max-w-5xl mx-auto">
		<PanelCard {...leftPanel} variant="primary" />
		<PanelCard {...rightPanel} variant="secondary" />
	</div>
);

interface PanelCardProps extends Panel {
	variant: 'primary' | 'secondary';
}

const PanelCard = ({ title, subtitle, skills, variant }: PanelCardProps) => (
	<Card className={variant === 'primary' ? 'border-primary/50' : ''}>
		<CardContent className="p-6 @md:p-8">
			<div className="flex items-center gap-3 mb-6">
				{variant === 'primary' ? (
					<Sparkles className="size-6 text-primary" />
				) : (
					<TrendingUp className="size-6 text-green-500" />
				)}
				<div>
					<h3 className="font-bold text-lg">{title}</h3>
					<p className="text-sm text-muted-foreground">{subtitle}</p>
				</div>
			</div>
			<div className="space-y-5">
				{skills.map(({ name, level, trending }, i) => (
					<div key={i}>
						<div className="flex items-center justify-between mb-2">
							<span className="font-medium">{name}</span>
							<div className="flex items-center gap-2">
								{trending && <TrendingUp className="size-4 text-green-500" />}
								<span
									className={`font-bold ${variant === 'primary' ? 'text-primary' : 'text-green-500'}`}
								>
									{level}%
								</span>
							</div>
						</div>
						<Progress value={level} className="h-2" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
