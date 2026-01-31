import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Twitter, Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Connect" />
					<Title text="Find Me Online" />
					<Description text="Let's connect on your preferred platform." />
				</div>

				<SocialLinks
					items={[
						{
							icon: Twitter,
							platform: 'Twitter',
							handle: '@developer',
							href: 'https://twitter.com',
							color: 'text-sky-500',
						},
						{
							icon: Github,
							platform: 'GitHub',
							handle: '@devname',
							href: 'https://github.com',
							color: 'text-gray-800 dark:text-gray-200',
						},
						{
							icon: Linkedin,
							platform: 'LinkedIn',
							handle: '/in/developer',
							href: 'https://linkedin.com',
							color: 'text-blue-600',
						},
						{
							icon: Youtube,
							platform: 'YouTube',
							handle: '@devtube',
							href: 'https://youtube.com',
							color: 'text-red-500',
						},
						{
							icon: Mail,
							platform: 'Email',
							handle: 'hello@dev.com',
							href: 'mailto:hello@dev.com',
							color: 'text-primary',
						},
						{
							icon: Globe,
							platform: 'Website',
							handle: 'dev.com',
							href: 'https://dev.com',
							color: 'text-green-500',
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

interface SocialItem {
	icon: ComponentType<{ className?: string }>;
	platform: string;
	handle: string;
	href: string;
	color: string;
}

const SocialLinks = ({ items }: { items: SocialItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5 max-w-4xl mx-auto">
		{items.map(({ icon: Icon, platform, handle, href, color }, i) => (
			<a key={i} href={href} target="_blank" rel="noopener noreferrer">
				<Card className="py-0 group hover:shadow-lg transition-all hover:border-primary/30 cursor-pointer">
					<CardContent className="p-4 @md:p-5 flex items-center gap-4">
						<div
							className={`size-11 @md:size-12 rounded-xl bg-muted flex items-center justify-center shrink-0 ${color}`}
						>
							<Icon className="size-5 @md:size-6" />
						</div>
						<div>
							<div className="font-semibold text-sm @md:text-base group-hover:text-primary transition-colors">
								{platform}
							</div>
							<div className="text-xs @md:text-sm text-muted-foreground">
								{handle}
							</div>
						</div>
					</CardContent>
				</Card>
			</a>
		))}
	</div>
);
