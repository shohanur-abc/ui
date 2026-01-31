import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BrandLogo = ({ src, alt }: { src: string; alt: string }) => (
	<div className="flex items-center justify-center p-4 @md:p-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
		<Image
			src={src}
			alt={alt}
			width={120}
			height={40}
			className="h-8 @md:h-10 w-auto object-contain"
		/>
	</div>
);

const SectionHeader = ({
	headline,
	subtext,
}: {
	headline: string;
	subtext: string;
}) => (
	<div className="text-center mb-8 @md:mb-10">
		<h2 className="text-xl @sm:text-2xl @md:text-3xl font-bold mb-2">
			{headline}
		</h2>
		<p className="text-muted-foreground">{subtext}</p>
	</div>
);

const MarqueeTrack = ({ logos }: { logos: { src: string; alt: string }[] }) => (
	<div className="flex animate-scroll">
		{[...logos, ...logos].map((logo, i) => (
			<BrandLogo key={i} src={logo.src} alt={logo.alt} />
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-card py-12 @md:py-16 @xl:py-20 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-5xl mx-auto">
					<SectionHeader
						headline="Trusted by Top Brands"
						subtext="We partner with the world's leading brands to bring you the best"
					/>
					<div className="overflow-hidden">
						<MarqueeTrack
							logos={[
								{
									src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
									alt: 'Amazon',
								},
								{
									src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
									alt: 'Google',
								},
								{
									src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
									alt: 'Apple',
								},
								{
									src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
									alt: 'Microsoft',
								},
								{
									src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
									alt: 'Netflix',
								},
								{
									src: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Spotify_logo.svg',
									alt: 'Spotify',
								},
							]}
						/>
					</div>
				</div>
			</div>
			<style jsx>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 25s linear infinite;
                }
            `}</style>
		</section>
	);
}
