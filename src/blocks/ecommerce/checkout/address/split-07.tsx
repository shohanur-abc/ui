'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Verified, ArrowRight } from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface TestimonialProps {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const Testimonial = ({
	quote,
	author,
	role,
	avatar,
	rating,
}: TestimonialProps) => (
	<div className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
		<div className="flex gap-1 mb-4">
			{Array.from({ length: rating }).map((_, i) => (
				<Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
			))}
		</div>
		<p className="text-sm leading-relaxed mb-4">&quot;{quote}&quot;</p>
		<div className="flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={avatar} />
				<AvatarFallback>{author[0]}</AvatarFallback>
			</Avatar>
			<div>
				<div className="flex items-center gap-2">
					<span className="font-medium text-sm">{author}</span>
					<Verified className="size-3.5 text-primary" />
				</div>
				<span className="text-xs text-muted-foreground">{role}</span>
			</div>
		</div>
	</div>
);

const TrustIndicators = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="grid grid-cols-3 gap-4 mt-8">
		{items.map((item, i) => (
			<div key={i} className="text-center">
				<div className="text-2xl font-bold text-primary">{item.value}</div>
				<div className="text-xs text-muted-foreground">{item.label}</div>
			</div>
		))}
	</div>
);

const GradientDecorative = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	const trustItems = [
		{ value: '50K+', label: 'Happy Customers' },
		{ value: '4.9', label: 'Average Rating' },
		{ value: '24/7', label: 'Support' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<GradientDecorative />
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 relative">
				<div className="grid @lg:grid-cols-2 gap-10 @lg:gap-16 items-center">
					<div>
						<Badge variant="secondary" className="mb-4">
							Secure Checkout
						</Badge>
						<h1 className="text-3xl @md:text-4xl font-bold mb-2">
							Almost There!
						</h1>
						<p className="text-muted-foreground mb-8">
							Enter your shipping address to complete your order
						</p>

						<Testimonial
							quote="Fast shipping and excellent customer service. My order arrived earlier than expected and was packaged perfectly."
							author="Sarah Johnson"
							role="Verified Buyer"
							avatar="https://avatars.githubusercontent.com/u/1?v=4"
							rating={5}
						/>

						<TrustIndicators items={trustItems} />
					</div>

					<Card className="shadow-xl">
						<CardHeader>
							<CardTitle>Shipping Address</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<Field label="First Name" placeholder="John" />
								<Field label="Last Name" placeholder="Doe" />
							</div>
							<Field
								label="Email"
								placeholder="john@example.com"
								type="email"
							/>
							<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
							<Field label="Street Address" placeholder="123 Main Street" />
							<div className="grid grid-cols-3 gap-4">
								<Field label="City" placeholder="City" />
								<SelectField
									label="State"
									placeholder="State"
									options={states}
								/>
								<Field label="ZIP" placeholder="12345" />
							</div>
							<Button className="w-full mt-4 gap-2" size="lg">
								Continue to Payment
								<ArrowRight className="size-4" />
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
