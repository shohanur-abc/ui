import { Send, Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BrandProps {
	name: string;
	tagline: string;
}

interface NewsletterFormProps {
	title: string;
	placeholder: string;
	buttonIcon: React.ElementType;
}

interface SocialLinksProps {
	items: { icon: React.ElementType; href: string; label: string }[];
}

interface CopyrightProps {
	text: string;
	links: { label: string; href: string }[];
}

const Brand = ({ name, tagline }: BrandProps) => (
	<div className="flex flex-col gap-2">
		<h3 className="text-xl font-bold">{name}</h3>
		<p className="text-sm text-muted-foreground">{tagline}</p>
	</div>
);

const NewsletterForm = ({ title, placeholder, buttonIcon: Icon }: NewsletterFormProps) => (
	<div className="flex flex-col gap-3">
		<h4 className="font-medium text-sm">{title}</h4>
		<form className="flex gap-2">
			<Input
				type="email"
				placeholder={placeholder}
				className="w-48 h-9"
			/>
			<Button size="sm" className="h-9 px-3">
				<Icon className="size-4" />
			</Button>
		</form>
	</div>
);

const SocialLinks = ({ items }: SocialLinksProps) => (
	<div className="flex gap-1">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<Button key={i} variant="ghost" size="icon-sm" asChild>
					<a href={item.href} aria-label={item.label}>
						<Icon className="size-4" />
					</a>
				</Button>
			);
		})}
	</div>
);

const Copyright = ({ text, links }: CopyrightProps) => (
	<div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4 pt-8 border-t">
		<p className="text-sm text-muted-foreground">{text}</p>
		<div className="flex gap-4">
			{links.map((link, i) => (
				<a key={i} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
					{link.label}
				</a>
			))}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container border-t">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col @lg:flex-row @lg:items-start @lg:justify-between gap-8">
						<Brand name="Company" tagline="Building the future of web development." />
						<div className="flex flex-col @sm:flex-row gap-8">
							<NewsletterForm
								title="Subscribe to updates"
								placeholder="Email"
								buttonIcon={Send}
							/>
							<SocialLinks
								items={[
									{ icon: Twitter, href: '#', label: 'Twitter' },
									{ icon: Github, href: '#', label: 'GitHub' },
									{ icon: Linkedin, href: '#', label: 'LinkedIn' },
									{ icon: Instagram, href: '#', label: 'Instagram' },
								]}
							/>
						</div>
					</div>
					<Copyright
						text="© 2024 Company. All rights reserved."
						links={[
							{ label: 'Privacy', href: '#' },
							{ label: 'Terms', href: '#' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}
