<script>
	import { cn } from "$lib/utils.js";
	let className = undefined;
	export { className as class };
</script>

<tr
	class={cn(
		" data-[state=selected]:bg-muted transition-colors",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</tr>
