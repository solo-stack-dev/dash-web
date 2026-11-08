// Types enhanced-img imports with directives, which put `enhanced` last (`icon.webp?w=96;192&enhanced`);
// the stock `*?enhanced` only covers a bare `?enhanced`.
declare module '*&enhanced' {
	const value: import('@sveltejs/enhanced-img').Picture;
	export default value;
}
