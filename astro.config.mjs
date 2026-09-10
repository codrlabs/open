// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';

// https://astro.build/config
export default defineConfig({
	site: 'https://open.codrlabs.com',
	integrations: [
		starlight({
			title: 'codrlabs open',
			description:
				'The open side of codrlabs — software built in the open, and the people we mentor through building it.',
			plugins: [starlightThemeRapide()],
			logo: {
				// Trimmed mark. The original org avatar carried ~28% transparent
				// padding, which shrank the mark in the header and read as an
				// oversized gap before the wordmark.
				src: './src/assets/codrlabs-mark.png',
				alt: 'codrlabs',
			},
			favicon: '/favicon.png',
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
						{ label: 'The platform', slug: 'start/platform' },
						{ label: 'Contributing', slug: 'start/contributing' },
					],
				},
				{
					label: 'Practices',
					items: [{ autogenerate: { directory: 'practices' } }],
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
