'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, Building2, Users, MapPin, ArrowRight, Plus } from 'lucide-react';

interface AddressCardProps {
	icon: React.ElementType;
	iconColor: string;
	label: string;
	recipient: string;
	address: string;
	badge?: string;
	selected?: boolean;
}

const SectionTitle = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="text-center mb-10">
		<h1 className="text-3xl @md:text-4xl font-bold mb-2">{title}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const AddressCard = ({
	icon: Icon,
	iconColor,
	label,
	recipient,
	address,
	badge,
	selected,
}: AddressCardProps) => (
	<Card
		className={`relative cursor-pointer transition-all hover:shadow-lg ${
			selected ? 'ring-2 ring-primary shadow-lg' : ''
		}`}
	>
		{badge && (
			<Badge className="absolute -top-2 -right-2 shadow-sm">{badge}</Badge>
		)}
		<CardContent className="pt-6">
			<div className="flex items-center gap-4 mb-4">
				<Avatar className={`size-12 ${iconColor}`}>
					<AvatarFallback className={iconColor}>
						<Icon className="size-6" />
					</AvatarFallback>
				</Avatar>
				<div>
					<h3 className="font-semibold text-lg">{label}</h3>
					<p className="text-sm text-muted-foreground">{recipient}</p>
				</div>
			</div>
			<div className="flex items-start gap-2 text-sm text-muted-foreground">
				<MapPin className="size-4 shrink-0 mt-0.5" />
				<p>{address}</p>
			</div>
		</CardContent>
	</Card>
);

const AddNewCard = () => (
	<Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
		<CardContent className="pt-6 h-full flex flex-col items-center justify-center text-center py-10">
			<div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
				<Plus className="size-7 text-muted-foreground" />
			</div>
			<h3 className="font-semibold mb-1">Add New Address</h3>
			<p className="text-sm text-muted-foreground">
				Ship to a different location
			</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			icon: Home,
			iconColor: 'bg-blue-500/10 text-blue-500',
			label: 'Home',
			recipient: 'John Doe',
			address:
				'123 Main Street, Apt 4B, San Francisco, CA 94102, United States',
			badge: 'Default',
			selected: true,
		},
		{
			icon: Building2,
			iconColor: 'bg-purple-500/10 text-purple-500',
			label: 'Office',
			recipient: 'John Doe',
			address:
				'456 Market Street, Suite 100, San Francisco, CA 94103, United States',
		},
		{
			icon: Users,
			iconColor: 'bg-green-500/10 text-green-500',
			label: 'Family',
			recipient: 'Jane Doe',
			address: '789 Oak Avenue, Los Angeles, CA 90001, United States',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<SectionTitle
					title="Where to deliver?"
					subtitle="Select a saved address or add a new one"
				/>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					{addresses.map((addr, i) => (
						<AddressCard key={i} {...addr} />
					))}
					<AddNewCard />
				</div>

				<div className="flex flex-col @sm:flex-row justify-between items-center gap-4 mt-10 pt-8 border-t border-border">
					<Button variant="ghost" size="lg">
						← Back to Cart
					</Button>
					<Button size="lg" className="gap-2 w-full @sm:w-auto">
						Continue to Shipping
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
