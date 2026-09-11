// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';

// https://astro.build/config
export default defineConfig({
	site: 'https://open.codrlabs.com',
	integrations: [
		starlight({
			title: 'Codrlabs Open',
			description:
				'The open side of Codrlabs — software built in the open, and the people we mentor through building it.',
			plugins: [starlightThemeRapide()],
			logo: {
				// Trimmed mark. The original org avatar carried ~28% transparent
				// padding, which shrank the mark in the header and read as an
				// oversized gap before the wordmark.
				src: './src/assets/codrlabs-mark.png',
				// Empty on purpose: the visible site title sits in the same link,
				// so a non-empty alt made screen readers announce the name twice.
				alt: '',
			},
			favicon: '/favicon.png',
			// Link previews and search. Starlight already emits og:title,
			// og:description, og:url, og:site_name, twitter:card and a canonical URL;
			// these add what it does not: the share image, the embed accent colour,
			// a touch icon and structured data. Matching tags override Starlight's.
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://open.codrlabs.com/og.png' } },
				{ tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:alt',
						content: 'Codrlabs Open — software built in the open, and the people we mentor through building it.',
					},
				},
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://open.codrlabs.com/og.png' } },
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image:alt',
						content: 'Codrlabs Open — software built in the open, and the people we mentor through building it.',
					},
				},
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#ac0c90' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify({
						'@context': 'https://schema.org',
						'@graph': [
							{
								'@type': 'Organization',
								'@id': 'https://open.codrlabs.com/#organization',
								name: 'Codrlabs Open',
								url: 'https://open.codrlabs.com/',
								logo: 'https://open.codrlabs.com/favicon.png',
								email: 'open@codrlabs.com',
								sameAs: ['https://github.com/codrlabs'],
								parentOrganization: {
									'@type': 'Organization',
									name: 'Codrlabs',
									url: 'https://codrlabs.com/',
								},
							},
							{
								'@type': 'WebSite',
								'@id': 'https://open.codrlabs.com/#website',
								url: 'https://open.codrlabs.com/',
								name: 'Codrlabs Open',
								inLanguage: 'en',
								publisher: { '@id': 'https://open.codrlabs.com/#organization' },
							},
						],
					}),
				},
			],
			editLink: {
				baseUrl: 'https://github.com/codrlabs/open/edit/main/',
			},
			lastUpdated: true,
			customCss: [
				'@fontsource-variable/plus-jakarta-sans',
				'@fontsource-variable/dm-sans',
				'./src/styles/brand.css',
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/codrlabs',
				},
				{
					icon: 'discord',
					label: 'Discord',
					href: 'https://discord.com/invite/4KajkBHaQ',
				},
				{
					icon: 'linkedin',
					label: 'LinkedIn',
					href: 'https://www.linkedin.com/company/codrlabs',
				},
				{
					icon: 'email',
					label: 'Email',
					href: 'mailto:open@codrlabs.com',
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'What this is', slug: 'start/what-this-is' },
						{ label: 'Mentoring', slug: 'start/mentoring' },
						{ label: 'The fine print', slug: 'start/fine-print' },
						{ label: 'Contributing', slug: 'start/contributing' },
					],
				},
				{
					label: 'Practices',
					items: [{ autogenerate: { directory: 'practices' } }],
				},
				{
					label: 'AI assistance',
					items: [{ autogenerate: { directory: 'ai' } }],
				},
				{
					label: 'Projects',
					items: [
						{ label: 'All projects', slug: 'projects/all' },
						{
							label: 'Corspat',
							slug: 'projects/corspat',
							badge: { text: 'Archived', variant: 'default' },
						},
						{
							label: 'Tympy',
							slug: 'projects/tympy',
							badge: { text: 'Archived', variant: 'default' },
						},
					],
				},
				{
					label: 'Vizably',
					badge: { text: 'Active', variant: 'success' },
					items: [{ autogenerate: { directory: 'vizably' } }],
				},
			],
		}),
	],
});
