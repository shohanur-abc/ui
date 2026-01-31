'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	Zap,
	Leaf,
	Shield,
	Clock,
	ArrowRight,
} from 'lucide-react';

interface FeatureProps {
	icon: React.ElementType;
	iconColor: string;
	text: string;
}

interface AddressProps {
	id: string;
	label: string;
	name: string;
	address: string;
	features: FeatureProps[];
}

const PageHeader = () => (
	<div className="text-center mb-10">
		<Badge variant="outline" className="mb-4">
			Checkout Step 1 of 4
		</Badge>
		<h1 className="text-3xl @md:text-4xl font-bold mb-2">
			Where should we ship?
		</h1>
		<p className="text-muted-foreground max-w-lg mx-auto">
			Select your preferred delivery address from saved locations or add a new one
		</p>
	</div>
);

const Feature = ({ icon: Icon, iconColor, text }: FeatureProps) => (
	<div className="flex items-center gap-2 text-xs">
		<Icon className={`size-3.5 ${iconColor}`} />
		<span className="text-muted-foreground">{text}</span>
	</div>
);

const AddressCard = ({ id, label, name, address, features }: AddressProps) => (
	<label className="block cursor-pointer">
		<Card className="h-full transition-all hover:shadow-lg has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:shadow-lg has-[:checked]:shadow-primary/10">
			<CardContent className="pt-6 h-full flex flex-col">
				<div className="flex items-start gap-4 flex-1">
					<RadioGroupItem value={id} className="mt-1" />
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-2">
							<span className="font-semibold text-lg">{label}</span>
							{id === '1' && (
								<Badge className="text-xs">Default</Badge>
							)}
						</div>
						<div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
							<MapPin className="size-4 shrink-0 mt-0.5 text-primary" />
							<div>
								<p className="font-medium text-foreground">{name}</p>
								<p>{address}</p>
							</div>
						</div>

						<Separator className="my-4" />

						<div className="grid grid-cols-2 gap-2">
							{features.map((feature, i) => (
								<Feature key={i} {...feature} />
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</label>
);

const AddNewCard = () => (
	<Card className="h-full border-2 border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-all">
		<CardContent className="pt-6 h-full flex flex-col items-center justify-center text-center py-10">
			<div className="size-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
				<MapPin className="size-7 text-primary" />
			</div>
			<h3 className="font-semibold text-lg mb-1">Add New Address</h3>
			<p className="text-sm text-muted-foreground">
				Ship to a different location
			</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			features: [
				{ icon: Zap, iconColor: 'text-amber-500', text: 'Express available' },
				{ icon: Leaf, iconColor: 'text-green-500', text: 'Carbon neutral' },
				{ icon: Shield, iconColor: 'text-blue-500', text: 'Signature required' },
				{ icon: Clock, iconColor: 'text-purple-500', text: '2-day delivery' },
			],
		},
		{
			id: '2',
			label: 'Office',
			name: 'John Doe - Acme Inc.',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			features: [
				{ icon: Zap, iconColor: 'text-amber-500', text: 'Same-day possible' },
				{ icon: Clock, iconColor: 'text-purple-500', text: 'Next-day delivery' },
				{ icon: Shield, iconColor: 'text-blue-500', text: 'Secure reception' },
				{ icon: Leaf, iconColor: 'text-green-500', text: 'Green delivery' },
			],
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader />

				<RadioGroup defaultValue="1" className="grid @md:grid-cols-3 gap-4">
					{addresses.map((addr) => (
						<AddressCard key={addr.id} {...addr} />
					))}
					<AddNewCard />
				</RadioGroup>

				<div className="flex flex-col @sm:flex-row gap-4 mt-10 justify-center">
					<Button variant="ghost" size="lg">
						← Back to Cart
					</Button>
					<Button size="lg" className="gap-2">
						Continue to Shipping
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
