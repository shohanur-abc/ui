'use client';

import * as React from 'react';
import {
	Package,
	AlertTriangle,
	Bell,
	Mail,
	MessageSquare,
	Plus,
	Trash2,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type AlertRule = {
	id: string;
	name: string;
	condition: string;
	threshold: number;
	enabled: boolean;
	channels: ('email' | 'push' | 'sms')[];
};

type AlertRuleRowProps = {
	rule: AlertRule;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
};

const AlertRuleRow = ({ rule, onToggle, onDelete }: AlertRuleRowProps) => (
	<div className="flex items-center gap-4 rounded-lg border p-4">
		<div className={`flex size-10 items-center justify-center rounded-lg ${rule.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
			<AlertTriangle className={`size-5 ${rule.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
		</div>
		<div className="min-w-0 flex-1">
			<p className="font-medium">{rule.name}</p>
			<p className="text-sm text-muted-foreground">
				{rule.condition} {rule.threshold}
			</p>
		</div>
		<div className="flex items-center gap-2">
			{rule.channels.includes('email') && <Mail className="size-4 text-muted-foreground" />}
			{rule.channels.includes('push') && <Bell className="size-4 text-muted-foreground" />}
			{rule.channels.includes('sms') && <MessageSquare className="size-4 text-muted-foreground" />}
		</div>
		<Switch checked={rule.enabled} onCheckedChange={() => onToggle(rule.id)} />
		<Button variant="ghost" size="icon-sm" onClick={() => onDelete(rule.id)}>
			<Trash2 className="size-4 text-destructive" />
		</Button>
	</div>
);

type NewRuleFormProps = {
	onAdd: (rule: Omit<AlertRule, 'id'>) => void;
};

const NewRuleForm = ({ onAdd }: NewRuleFormProps) => {
	const [name, setName] = React.useState('');
	const [condition, setCondition] = React.useState('stock-below');
	const [threshold, setThreshold] = React.useState(10);
	const [channels, setChannels] = React.useState<AlertRule['channels']>(['email']);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onAdd({
			name,
			condition,
			threshold,
			enabled: true,
			channels,
		});
		setName('');
		setThreshold(10);
	};

	return (
		<form onSubmit={handleSubmit} className="rounded-lg border border-dashed p-4 space-y-4">
			<p className="font-medium">Add New Alert Rule</p>
			<div className="grid gap-4 @lg:grid-cols-4">
				<div className="space-y-2">
					<Label>Rule Name</Label>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="e.g., Low Stock Alert"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label>Condition</Label>
					<Select value={condition} onValueChange={setCondition}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="stock-below">Stock falls below</SelectItem>
							<SelectItem value="stock-above">Stock exceeds</SelectItem>
							<SelectItem value="days-cover">Days of cover below</SelectItem>
							<SelectItem value="no-movement">No movement for days</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label>Threshold</Label>
					<Input
						type="number"
						value={threshold}
						onChange={(e) => setThreshold(parseInt(e.target.value) || 0)}
						min={0}
					/>
				</div>
				<div className="flex items-end">
					<Button type="submit" className="w-full">
						<Plus className="mr-2 size-4" />
						Add Rule
					</Button>
				</div>
			</div>
		</form>
	);
};

export default function Main() {
	const [rules, setRules] = React.useState<AlertRule[]>([
		{ id: '1', name: 'Critical Low Stock', condition: 'Stock falls below', threshold: 10, enabled: true, channels: ['email', 'push'] },
		{ id: '2', name: 'Reorder Point Alert', condition: 'Stock falls below', threshold: 50, enabled: true, channels: ['email'] },
		{ id: '3', name: 'Overstock Warning', condition: 'Stock exceeds', threshold: 500, enabled: false, channels: ['email'] },
		{ id: '4', name: 'Dead Stock Alert', condition: 'No movement for days', threshold: 90, enabled: true, channels: ['email', 'sms'] },
	]);

	const handleToggle = (id: string) => {
		setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
	};

	const handleDelete = (id: string) => {
		setRules((prev) => prev.filter((r) => r.id !== id));
	};

	const handleAdd = (rule: Omit<AlertRule, 'id'>) => {
		setRules((prev) => [...prev, { ...rule, id: Date.now().toString() }]);
	};

	const activeRules = rules.filter((r) => r.enabled).length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Alert Rules</CardTitle>
								<CardDescription>Configure inventory alert notifications</CardDescription>
							</div>
							<Badge variant="secondary">
								{activeRules} Active Rules
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						{rules.map((rule) => (
							<AlertRuleRow
								key={rule.id}
								rule={rule}
								onToggle={handleToggle}
								onDelete={handleDelete}
							/>
						))}
						<NewRuleForm onAdd={handleAdd} />
					</CardContent>
					<CardFooter className="flex justify-end gap-3 border-t pt-6">
						<Button variant="outline">Test Alerts</Button>
						<Button>Save Changes</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
