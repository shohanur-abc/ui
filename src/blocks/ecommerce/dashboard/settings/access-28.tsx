import {
	AlertTriangle,
	Ban,
	Check,
	Globe,
	Lock,
	MapPin,
	Plus,
	Shield,
	Trash2,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

type IpRule = {
	id: string;
	ip: string;
	label: string;
	type: 'allow' | 'block';
	addedAt: string;
};

type GeoBlock = {
	country: string;
	code: string;
	blocked: boolean;
};

const IpRuleRow = ({ ip, label, type, addedAt }: IpRule) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div
				className={`flex size-8 items-center justify-center rounded-lg ${
					type === 'allow'
						? 'bg-emerald-500/10 text-emerald-500'
						: 'bg-destructive/10 text-destructive'
				}`}
			>
				{type === 'allow' ? <Check className="size-4" /> : <X className="size-4" />}
			</div>
			<div>
				<div className="flex items-center gap-2">
					<code className="font-mono text-sm">{ip}</code>
					<Badge variant="secondary" className="text-xs">
						{label}
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground">Added {addedAt}</p>
			</div>
		</div>
		<Button variant="ghost" size="icon-sm" className="text-destructive">
			<Trash2 className="size-4" />
		</Button>
	</div>
);

const GeoBlockRow = ({ country, code, blocked }: GeoBlock) => (
	<div className="flex items-center justify-between py-2">
		<div className="flex items-center gap-2">
			<span className="text-lg">{code}</span>
			<span className="text-sm">{country}</span>
		</div>
		<Switch defaultChecked={!blocked} />
	</div>
);

export default function Main() {
	const ipRules: IpRule[] = [
		{ id: '1', ip: '192.168.1.0/24', label: 'Office Network', type: 'allow', addedAt: 'Jan 10, 2026' },
		{ id: '2', ip: '10.0.0.1', label: 'Home', type: 'allow', addedAt: 'Dec 20, 2025' },
		{ id: '3', ip: '203.0.113.0', label: 'Suspicious', type: 'block', addedAt: 'Jan 5, 2026' },
		{ id: '4', ip: '198.51.100.0/24', label: 'Known Bot Network', type: 'block', addedAt: 'Dec 15, 2025' },
	];

	const geoBlocks: GeoBlock[] = [
		{ country: 'United States', code: '🇺🇸', blocked: false },
		{ country: 'United Kingdom', code: '🇬🇧', blocked: false },
		{ country: 'Canada', code: '🇨🇦', blocked: false },
		{ country: 'Germany', code: '🇩🇪', blocked: false },
		{ country: 'Russia', code: '🇷🇺', blocked: true },
		{ country: 'China', code: '🇨🇳', blocked: true },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Shield className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Access Control</CardTitle>
									<CardDescription>
										Control who can access your dashboard
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="space-y-6">
								<div>
									<Label className="text-base font-semibold">Access Mode</Label>
									<p className="text-sm text-muted-foreground mb-4">
										Choose how to restrict access to your account
									</p>
									<RadioGroup defaultValue="allowlist" className="space-y-3">
										{[
											{ value: 'open', label: 'Open Access', description: 'Allow access from anywhere' },
											{ value: 'allowlist', label: 'Allowlist Mode', description: 'Only allow specific IPs' },
											{ value: 'blocklist', label: 'Blocklist Mode', description: 'Block specific IPs' },
										].map((option) => (
											<Label
												key={option.value}
												htmlFor={option.value}
												className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
											>
												<RadioGroupItem value={option.value} id={option.value} className="mt-1" />
												<div>
													<span className="font-medium">{option.label}</span>
													<p className="text-sm text-muted-foreground">{option.description}</p>
												</div>
											</Label>
										))}
									</RadioGroup>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-6 @lg:grid-cols-2">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-base">IP Rules</CardTitle>
										<CardDescription>Manage allowed and blocked IPs</CardDescription>
									</div>
									<Button size="sm" variant="outline" className="gap-2">
										<Plus className="size-4" />
										Add Rule
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{ipRules.map((rule) => (
									<IpRuleRow key={rule.id} {...rule} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Globe className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle className="text-base">Geo Blocking</CardTitle>
										<CardDescription>Block access by country</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="divide-y pt-4">
								{geoBlocks.map((geo) => (
									<GeoBlockRow key={geo.country} {...geo} />
								))}
							</CardContent>
						</Card>
					</div>

					<Card className="border-amber-500/20 bg-amber-500/5">
						<CardContent className="flex items-start gap-4 pt-6">
							<AlertTriangle className="size-5 shrink-0 text-amber-500" />
							<div>
								<h4 className="font-medium">Important Notice</h4>
								<p className="mt-1 text-sm text-muted-foreground">
									Be careful when restricting access. If you block your own IP or
									location, you may lose access to your account. Keep recovery options
									configured.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
