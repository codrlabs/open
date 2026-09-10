// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://open.codrlabs.com',
	integrations: [
		starlight({
			title: 'codrlabs open',
			description:
				'Open-source projects built and mentored in the open by codrlabs.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/codrlabs',
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'What this is', slug: 'start/what-this-is' },
						{ label: 'Contributing', slug: 'start/contributing' },
					],
				},
				{
					label: 'Vizably',
					items: [{ autogenerate: { directory: 'vizably' } }],
				},
			],
		}),
	],
});
