import { render } from 'svelty-email';
import postmark from 'postmark';
import { ENV } from '$lib/server/env';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
const client = new postmark.ServerClient(ENV.SENDGRID_API_KEY);

export const sendEmail = async <T extends SvelteComponent>(options: {
	from: string;
	to: string;
	subject: string;
	template: ComponentType<T>; // Cant use SvelteComponent here because the sendgrid library has not updated its types
	content: ComponentProps<T>;
}) => {
	const emailHtml = render({
		template: options.template,
		props: options.content
	});

	await client.sendEmail({
		From: ENV.EMAIL_FROM,
		To: options.to,
		Subject: options.subject,
		HtmlBody: emailHtml,
	});
};
