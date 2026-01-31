import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Building2,
	Cloud,
	Code2,
	Database,
	Globe,
	Lock,
	Server,
	Shield,
} from 'lucide-react';
import { ComponentType } from 'react';

interface IntegrationItem {
	icon: ComponentType<{ className?: string }>;
	name: string;
	category: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Globe} text="Integrations" />
					<Title text="Connect with Your" highlight="Favorite Tools" />
					<Description text="Seamlessly integrate with 500+ applications you already use. No code required." />
				</div>

				<IntegrationGrid
					items={[
						{ icon: Cloud, name: 'Salesforce', category: 'CRM' },
						{ icon: Building2, name: 'HubSpot', category: 'Marketing' },
						{ icon: Database, name: 'Snowflake', category: 'Data' },
						{ icon: Code2, name: 'GitHub', category: 'Development' },
						{ icon: Server, name: 'AWS', category: 'Cloud' },
						{ icon: Shield, name: 'Okta', category: 'Security' },
						{ icon: Globe, name: 'Stripe', category: 'Payments' },
						{ icon: Lock, name: 'Auth0', category: 'Identity' },
					]}
				/>

				<MoreIntegrations count={500} />
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
		<Badge variant="secondary" className="gap-2 px-3 py-1">
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

const IntegrationGrid = ({ items }: { items: IntegrationItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-4 @md:gap-5 mb-8">
		{items.map((item) => (
			<Card
				key={item.name}
				className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg"
			>
				<CardContent className="p-4 @md:p-5 flex items-center gap-4">
					<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
						<item.icon className="size-6 text-primary" />
					</div>
					<div>
						<p className="font-semibold">{item.name}</p>
						<p className="text-xs text-muted-foreground">{item.category}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const MoreIntegrations = ({ count }: { count: number }) => (
	<div className="text-center">
		<p className="text-muted-foreground">
			Plus <span className="font-semibold text-primary">{count}+</span> more
			integrations available
		</p>
	</div>
);
