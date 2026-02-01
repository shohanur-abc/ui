import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Trophy, Target, Heart, Lightbulb } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<CenteredAbout
					eyebrow="About Us"
					title="Building Digital Excellence Since 2012"
					description="We're a team of designers, developers, and strategists passionate about creating digital products that make an impact."
					image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
					values={[
						{
							icon: Trophy,
							title: 'Excellence',
							description: 'We pursue the highest standards in every project we deliver.',
						},
						{
							icon: Target,
							title: 'Results-Driven',
							description: 'Success is measured by the outcomes we create for our clients.',
						},
						{
							icon: Heart,
							title: 'Partnership',
							description: 'We build long-term relationships based on trust and transparency.',
						},
						{
							icon: Lightbulb,
							title: 'Innovation',
							description: 'We stay ahead of the curve with emerging technologies.',
						},
					]}
					cta={{ label: 'Meet Our Team', href: '/about' }}
				/>
			</div>
		</section>
	);
}

interface Value {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface CTA {
	label: string;
	href: string;
}

const CenteredAbout = ({
	eyebrow,
	title,
	description,
	image,
	values,
	cta,
}: {
	eyebrow: string;
	title: string;
	description: string;
	image: string;
	values: Value[];
	cta: CTA;
}) => (
	<div className="text-center">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
			{title}
		</h2>
		<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
			{description}
		</p>

		{/* Image */}
		<div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-10 @md:mb-14">
			<Image
				src={image}
				alt="Our team"
				fill
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
			<div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-4">
				<div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white">
					<div className="text-2xl font-bold">50+</div>
					<div className="text-sm opacity-80">Team Members</div>
				</div>
				<div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white">
					<div className="text-2xl font-bold">12</div>
					<div className="text-sm opacity-80">Countries</div>
				</div>
				<div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white">
					<div className="text-2xl font-bold">500+</div>
					<div className="text-sm opacity-80">Projects</div>
				</div>
			</div>
		</div>

		{/* Values */}
		<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6 @xl:gap-8 mb-10 @md:mb-14">
			{values.map(({ icon: Icon, title, description }, i) => (
				<div key={i} className="p-6 rounded-2xl bg-muted/50 text-left">
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
						<Icon className="size-6 text-primary" />
					</div>
					<h3 className="font-bold mb-2">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			))}
		</div>

		{/* CTA */}
		<Button size="lg" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
