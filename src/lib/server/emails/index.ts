import { render } from 'svelty-email';
import * as sendgrid from '@sendgrid/mail';
import { ENV } from '$lib/server/env';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

sendgrid.setApiKey(ENV.SENDGRID_API_KEY);

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

	await sendgrid.send({
		from: ENV.EMAIL_FROM,
		to: options.to,
		subject: options.subject,
		html: emailHtml,
		mailSettings: {
			sandboxMode: {
				enable: ENV.SENDGRID_SANDBOX_MODE
			}
		}
	});
};
