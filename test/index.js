import { createHTMLParser, css, svg, completeConfig as sanitizer } from '../bundle.js';

const html = createHTMLParser(sanitizer);
const file = new File(['Thanks for downloading my file :)'], 'thanks.txt', { type: 'text/plain' });
const styles = await new CSSStyleSheet().replace('#header { display: none; }');

const icon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="currentColor" role="presentation" aria-label="Close Popover">
	<path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
</svg>`;

const bg = new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
	<rect fill="#${crypto.getRandomValues(new Uint8Array(3)).toHex()}" x="0" y="0" width="10" height="10" rx="1" ry="1"></rect>
</svg>`], { type: 'image/svg+xml' });

document.adoptedStyleSheets = [css`:root {
	font-family: system-ui;
}

body {
	background-image: url(${bg});
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	min-height: 100dvh;
}

${styles.cssRules.item(0)}

#nav {
	display: flex;
	gap: 0.8em;
}

a[href], button {
	cursor: pointer;
}`];

document.body.append(html`<style>
	h1::after {
		display: inline-block;
		content: " Styles allowed!";
	}
</style>
<header id="header">
	<h1 onclick="alert(location.href)" data-foo="bar">Hello, World!</h1>
</header>
<nav id="nav" class="flex row">
	<button type="button" popovertarget="bacon" popovertargetaction="show" accesskey="b">Show Bacon Ipsum</button>
	<button type="button" popovertarget="math" popovertargetaction="show" accesskey="p">Pythagorean theorem</button>
	<a href="#foo">Normal Link</a>
	<a href="javascript:alert('javascript:')"><code>javascript:</code> Link</a>
	<a href="data:text/plain,Not%20Allowed" target="_blank"><code>data:</code> Link</a>
	<a href="file:${import.meta.url}"><code>file:</code> Link</a>
	<a href="${file}" download="${file.name}" target="_blank"><code>blob:</code> Download Link</a>
	<span>${await file.bytes()}</span>
</nav>
<main id="main"></main>
<div popover="auto" id="bacon">
	<template shadowrootmode="open" shadowrootserializable="">
		<div part="container">
			<slot name="close">x</slot>
			<b>Bacon Ipsum</b>
			<slot name="content">No Content</slot>
		</div>
	</template>
	<button type="button" popovertarget="bacon" popovertargetaction="hide" slot="close">
		${icon}
	</button>
	<p slot="content">Bacon ipsum dolor amet pork belly frankfurter drumstick jowl brisket capicola short ribs. Cow chislic ham hock t-bone shoulder salami rump corned beef spare ribs prosciutto bresaola picanha drumstick. Swine tail pork belly ribeye beef kielbasa. Beef cupim ball tip pastrami spare ribs strip steak tongue salami venison. Venison cupim meatball strip steak meatloaf prosciutto buffalo frankfurter hamburger flank boudin.</p>
</div>

<div popover="auto" id="math">
	<div>
		<b>Pythagorean theorem</b>
		<button type="button" popovertarget="math" popovertargetaction="hide">
			${icon}
		</button>
	</div>
	<math>
		<mrow>
			<msup>
				<mi>a</mi>
				<mn>2</mn>
			</msup>
			<mo>+</mo>
			<msup>
				<mi>b</mi>
				<mn>2</mn>
			</msup>
			<mo>=</mo>
			<msup>
				<mi>c</mi>
				<mn>2</mn>
			</msup>
		</mrow>
	</math>
</div>
<template id="tmp">
	<h1 onclick="alert('Broken Template')">From Template</h1>
</template>`);

document.getElementById('main').append(document.getElementById('tmp').content.cloneNode(true));
