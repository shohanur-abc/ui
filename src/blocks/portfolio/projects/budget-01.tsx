import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, DollarSign, Coins, PiggyBank } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Coins} text="Budget" />
					<Title text="By Investment Level" />
					<Description text="Projects categorized by scope and budget tier." />
				</div>

				<BudgetTiers
					tiers={[
						{
							name: 'Starter',
							range: '$5K - $15K',
							icon: PiggyBank,
							color: 'from-green-500 to-emerald-500',
							description: 'Perfect for MVPs and landing pages',
							projects: [
								{
									image: 'https://picsum.photos/seed/bud1a/400/300',
									title: 'Portfolio Website',
									type: 'Web',
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/bud1b/400/300',
									title: 'Product Landing',
									type: 'Marketing',
									href: '#',
								},
							],
						},
						{
							name: 'Professional',
							range: '$25K - $75K',
							icon: DollarSign,
							color: 'from-blue-500 to-cyan-500',
							description: 'Full-featured applications',
							projects: [
								{
									image: 'https://picsum.photos/seed/bud2a/400/300',
									title: 'E-Commerce Store',
									type: 'Web App',
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/bud2b/400/300',
									title: 'Mobile App',
									type: 'iOS/Android',
									href: '#',
								},
							],
						},
						{
							name: 'Enterprise',
							range: '$100K+',
							icon: Coins,
							color: 'from-purple-500 to-pink-500',
							description: 'Large-scale enterprise solutions',
							projects: [
								{
									image: 'https://picsum.photos/seed/bud3a/400/300',
									title: 'Banking Platform',
									type: 'Fintech',
									href: '#',
								},
								{
									image: 'https://picsum.photos/seed/bud3b/400/300',
									title: 'Healthcare System',
									type: 'Enterprise',
									href: '#',
								},
							],
						},
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
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface Project {
	image: string;
	title: string;
	type: string;
	href: string;
}

interface BudgetTier {
	name: string;
	range: string;
	icon: ComponentType<{ className?: string }>;
	color: string;
	description: string;
	projects: Project[];
}

const BudgetTiers = ({ tiers }: { tiers: BudgetTier[] }) => (
	<div className="grid @lg:grid-cols-3 gap-6">
		{tiers.map(
			({ name, range, icon: Icon, color, description, projects }, i) => (
				<Card
					key={i}
					className="group border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 overflow-hidden"
				>
					{/* Gradient header */}
					<div className={`h-2 bg-gradient-to-r ${color}`} />

					<CardHeader>
						<div className="flex items-center gap-3 mb-2">
							<div
								className={`size-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
							>
								<Icon className="size-6" />
							</div>
							<div>
								<CardTitle className="text-lg">{name}</CardTitle>
								<p className="text-xl font-bold text-primary">{range}</p>
							</div>
						</div>
						<p className="text-sm text-muted-foreground">{description}</p>
					</CardHeader>

					<CardContent>
						<div className="space-y-3">
							{projects.map(({ image, title, type, href }, j) => (
								<Link
									key={j}
									href={href}
									className="group/item flex gap-3 p-2 rounded-lg transition-colors hover:bg-muted"
								>
									<div className="relative size-14 rounded-lg overflow-hidden bg-muted shrink-0">
										<Image
											src={image}
											alt={title}
											fill
											className="object-cover"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<h4 className="font-medium text-sm truncate group-hover/item:text-primary transition-colors">
											{title}
										</h4>
										<Badge variant="secondary" className="text-xs mt-1">
											{type}
										</Badge>
									</div>
									<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
								</Link>
							))}
						</div>

						<Button variant="outline" className="w-full mt-4 gap-2" asChild>
							<Link href={`#tier-${name.toLowerCase()}`}>
								View All {name} Projects <ArrowUpRight className="size-4" />
							</Link>
						</Button>
					</CardContent>
				</Card>
			),
		)}
	</div>
);
